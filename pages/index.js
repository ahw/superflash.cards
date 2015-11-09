/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import Store from '../store/store.js'
import * as Actions from '../actions'

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
      let newestTimestamp = 0
      let oldestTimestamp = Date.now()
      let leastRecentlySeenCard = null
      let mostRecentlySeenCard = null
      let firstNullCard = null

      let cards = this.props.decks[this.props.selectedDeck].cardIds.map(cardId => {
        let card = this.props.entities.cards[cardId]

        if (card.lastSeen && card.lastSeen > newestTimestamp) {
          newestTimestamp = card.lastSeen
          mostRecentlySeenCard = card
        }

        if (card.lastSeen && card.lastSeen < oldestTimestamp) {
          oldestTimestamp = card.lastSeen
          leastRecentlySeenCard = card
        }

        if (card.lastSeen === null && firstNullCard === null) {
          firstNullCard = card
        }

        // onFlip={() => {card.lastSeen = Date.now(); window.localStorage.setItem(card.id, JSON.stringify(card)); this.forceUpdate()}}
        // onSeen={() => {card.lastSeen = Date.now(); this.forceUpdate();}}
        // onFlip={this.props.dispatch(Actions.markAsSeen(card.id))}
        // onFlip={console.log.bind(console, 'Card@onFlip')}
        return (<Card
          key={card.id}
          onFlip={() => {this.props.dispatch(Actions.markAsSeen(card.id))}}
          onSeen={console.log.bind(console, 'Card@onSeen')}
          onAnsweredCorrectly={console.log.bind(console, 'Card@onAnsweredCorrectly')}
          onAnsweredIncorrectly={console.log.bind(console, 'Card@onAnsweredIncorrectly')}
          {...card} />
        )
      })

      return (
        <div>
          <AllCardsButton onClick={() => {this.props.dispatch(Actions.updateSelectedDeck(null))}}/>
          {cards}
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
