import {
  generateId,
  ADD_CARD,
  UPDATE_SELECTED_DECK,
  UPDATE_LAST_SEEN_TIMESTAMP
} from '../actions'
import { combineReducers } from 'redux'
// import crypto from 'crypto'
// import * as reducers from './reducers'

function deckEntitiesReducer(deckEntities = {}, action) {

  if (action.type === ADD_CARD) {
    let deck = action.payload.deck
    if (deck && deckEntities[deck]) {
      return deckEntities // Deck already exists
    } else if (deck) {
      // Create a new deck entity
      return Object.assign({}, deckEntities, {[deck]: deck})
    } else {
      return deckEntities
    }
  } else {
    // Adding a new card is the only time we'd have to update decks
    return deckEntities
  }
}

function cardEntitiesReducer(cardEntities = {}, action) {
  if (action.type === ADD_CARD) {
    let id = generateId(action.payload)
    let card = Object.assign({}, action.payload, {id: id, lastSeen: null})
    return Object.assign({}, cardEntities, {[id]: card})
  }

  // Assert: nothing required
  return cardEntities
}

function decksReducer(decks = {}, action) {
  if (action.type === ADD_CARD) {
    let cardId = generateId(action.payload)

    if (decks[action.payload.deck]) {
      let updatedCardList = [...decks[action.payload.deck].cardIds, cardId]
      let updatedDeck = Object.assign({}, decks[action.payload.deck], {cardIds: updatedCardList})
      return Object.assign({}, decks, {[action.payload.deck]: updatedDeck})
    } else {
      // Initialize a new deck with an array of 1 card
      let newDeck = {
        cardIds: [cardId],
        nextCardIndex: 0
      }
      return Object.assign({}, decks, {[action.payload.deck]: newDeck})
    }
  } else {
    // Assert: nothing to do
    return decks
  }
}

function entitiesReducer(entities = {}, action) {
  return {
    decks: deckEntitiesReducer(entities.decks, action),
    cards: cardEntitiesReducer(entities.cards, action)
  }
}

function selectedDeckReducer(selectedDeck = null, action) {
  if (action.type === UPDATE_SELECTED_DECK) {
    return action.payload
  }
  return selectedDeck
}

const rootReducer = combineReducers({
  entities: entitiesReducer,
  decks: decksReducer,
  selectedDeck: selectedDeckReducer
})

export default rootReducer
