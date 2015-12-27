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
import CardNavigation from '../components/CardNavigation'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
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
      let card = deck.cards[deck.currentCardIndex]
      let unansweredOrWrongCards = deck.cards.filter((card) => {
        return card.lastAnsweredRight !== true
      })

      let hasAnsweredAllCorrectly = false

      if (unansweredOrWrongCards.length === 0) {
        hasAnsweredAllCorrectly = true
      }

      function onFlip() {
        this.props.dispatch(Actions.markAsSeen(card.id))
      }

      function onSeen() {
        console.log.bind(console, 'Card@onSeen')
      }

      function onAnsweredCorrectly() {
        this.props.dispatch(Actions.markAnsweredRight(card.id))
        this.props.dispatch(Actions.gotoNextCard(deckId))
      }

      function onAnsweredIncorrectly() {
        this.props.dispatch(Actions.markAnsweredWrong(card.id))
        this.props.dispatch(Actions.gotoNextCard(deckId))
      }

      function onSkip() {
        this.props.dispatch(Actions.gotoNextCard(deckId))
      }

      function onBackToAllDecks() {
        this.props.dispatch(Actions.updateSelectedDeck(null))
      }

      return (
        <div style={{background: deck.isInRerunMode ? 'yellow' : 'transparent'}}>
          <CardNavigation cards={deck.cards} currentCardIndex={deck.currentCardIndex}/>
          <Swipeable
            onSwipedDown={onSkip.bind(this)}
            onSwipedLeft={onAnsweredIncorrectly.bind(this)}
            onSwipedRight={onAnsweredCorrectly.bind(this)}
            onSwipedUp={onBackToAllDecks.bind(this)}>
              <Card
                key={card.id}
                cardIndex={deck.currentCardIndex}
                totalCards={deck.cards.length}
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
        decks={this.props.decks} />
    }
  }
}

function select(state) {
  return state
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
