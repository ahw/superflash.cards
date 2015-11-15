/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import Store from '../store/store.js'
import * as Actions from '../actions'
import Swipeable from 'react-swipeable'
import url from 'url'

// TODO: Is this being used?
// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()

import AllCardsButton from '../components/buttons/AllCardsButton'
import Card from '../components/Card'
import DeckCover from '../components/DeckCover'
import DeckList from '../components/DeckList'

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
    let query = url.parse(window.location.toString(), true).query
    let googleSheetId = query.id || '1gjMUw1XFuFAhU1DFCEcIg7HY980pnc6fFy7OKSKV09U'
    this.props.dispatch(Actions.fetchCards(googleSheetId))
    window.FastClick.attach(document.body)
  }

  render() {
    if (this.props.selectedDeck) {

      let deckId = this.props.selectedDeck
      let deck = this.props.decks[deckId]
      let card = this.props.entities.cards[deck.cardIds[deck.currentCardIndex]]
      let unansweredOrWrongCardIds = deck.cardIds.filter((cardId) => {
        return this.props.entities.cards[cardId].lastAnsweredRight !== true
      })

      let hasAnsweredAllCorrectly = false
      // let nextUnansweredOrWrongCardId = unansweredOrWrongCardIds[0]

      if (unansweredOrWrongCardIds.length === 0) {
        hasAnsweredAllCorrectly = true
      }
      // } else if (unansweredOrWrongCardIds.length > 1) {
      //   nextUnansweredOrWrongCardId = unansweredOrWrongCardIds.filter((id) => { return id !== card.id })[0]
      // } else {
      //   nextUnansweredOrWrongCardId = unansweredOrWrongCardIds[0]
      // }

      // let nextUnansweredOrWrongCardIndex = deck.cardIds.indexOf(nextUnansweredOrWrongCardId)

      function onFlip() {
        this.props.dispatch(Actions.markAsSeen(card.id))
      }

      function onSeen() {
        console.log.bind(console, 'Card@onSeen')
      }

      function onAnsweredCorrectly() {
        this.props.dispatch(Actions.markAnsweredRight(card.id))
        this.props.dispatch(Actions.gotoNextCard(deckId))

        // if (nextUnansweredOrWrongCardIndex !== -1) {
        //   this.props.dispatch(Actions.gotoCardIndex(deckId, nextUnansweredOrWrongCardIndex))
        // } else {
        //   this.props.dispatch(Actions.gotoNextCard(deckId))
        // }
      }

      function onAnsweredIncorrectly() {
        this.props.dispatch(Actions.markAnsweredWrong(card.id))
        this.props.dispatch(Actions.gotoNextCard(deckId))
        // if (nextUnansweredOrWrongCardIndex !== -1) {
        //   this.props.dispatch(Actions.gotoCardIndex(deckId, nextUnansweredOrWrongCardIndex))
        // } else {
        //   this.props.dispatch(Actions.gotoNextCard(deckId))
        // }
      }

      function onSkip() {
        this.props.dispatch(Actions.gotoNextCard(deckId))
      }

      function onBackToAllDecks() {
        this.props.dispatch(Actions.updateSelectedDeck(null))
      }

      return (
        <div>
          <Swipeable
            onSwipedDown={onSkip.bind(this)}
            onSwipedLeft={onAnsweredIncorrectly.bind(this)}
            onSwipedRight={onAnsweredCorrectly.bind(this)}
            onSwipedUp={onBackToAllDecks.bind(this)}>
              <Card
                key={card.id}
                cardIndex={deck.currentCardIndex}
                totalCards={deck.cardIds.length}
                hasAnsweredAllCorrectly={hasAnsweredAllCorrectly}
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
      return <DeckList
        onSelectDeck={(deckId) => {this.props.dispatch(Actions.updateSelectedDeck(deckId))}}
        decks={this.props.decks}
        cardEntities={this.props.entities.cards}/>
    }
  }
}

function select(state) {
  return state
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
