/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import Store from '../store/store.js'
import * as Actions from '../actions'
// import Swiper from 'react-swiper'
import Swipeable from 'react-swipeable'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AllCardsButton from '../components/buttons/AllCardsButton'
import Card from '../components/Card'
import DeckCover from '../components/DeckCover'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      entities: {},
      decks: {},
      selectedDeck: null
    }
  }

  componentDidMount() {
    let googleSheetId = '1NsOHF4qDMybMc7pwqFAAyf0mTUtwpCSAn8Jhl_cNQ6c'
    this.props.dispatch(Actions.fetchCards(googleSheetId))
  }

  render() {
    if (this.props.selectedDeck) {

      let deckId = this.props.selectedDeck
      let deck = this.props.decks[deckId]
      let card = this.props.entities.cards[deck.cardIds[deck.nextCardIndex]]

      function onFlip() {
        this.props.dispatch(Actions.markAsSeen(card.id))
      }

      function onSeen() {
        console.log.bind(console, 'Card@onSeen')
      }

      function onAnsweredCorrectly() {
        this.props.dispatch(Actions.markAnsweredRight(card.id))
        this.props.dispatch(Actions.nextCard(deckId))
      }

      function onAnsweredIncorrectly() {
        this.props.dispatch(Actions.markAnsweredWrong(card.id))
        this.props.dispatch(Actions.nextCard(deckId))
      }

      function onSkip() {
        this.props.dispatch(Actions.nextCard(deckId))
      }

      function onBackToAllDecks() {
        this.props.dispatch(Actions.updateSelectedDeck(null))
      }

      // <AllCardsButton onClick={() => {this.props.dispatch(Actions.updateSelectedDeck(null))}}/>

      return (
        <div>
          <Swipeable
            onSwipedDown={onSkip.bind(this)}
            onSwipedLeft={onAnsweredIncorrectly.bind(this)}
            onSwipedRight={onAnsweredCorrectly.bind(this)}
            onSwipedUp={onBackToAllDecks.bind(this)}>
              <Card
                key={card.id}
                cardIndex={deck.nextCardIndex}
                totalCards={deck.cardIds.length}
                onFlip={() => {this.props.dispatch(Actions.markAsSeen(card.id))}}
                onSeen={console.log.bind(console, 'Card@onSeen')}
                onAnsweredCorrectly={onAnsweredCorrectly.bind(this)}
                onAnsweredIncorrectly={onAnsweredIncorrectly.bind(this)}
                onSkip={onSkip.bind(this)}
                onBackToAllDecks={onBackToAllDecks.bind(this)}
                {...card} />
          </Swipeable>
        </div>
      )

    } else {

      let deckCovers = Object.keys(this.props.decks).map(deckId => {
        return (<DeckCover
          key={deckId}
          onClick={() => {this.props.dispatch(Actions.updateSelectedDeck(deckId))}}
          name={deckId}
          cards={this.props.entities.cards}
          cardIds={this.props.decks[deckId].cardIds}/>)
      })

      
      return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', alignContent: 'stretch'}}>
          {deckCovers}
        </div>
      )
    }

  }

}

function select(state) {
  return state
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
