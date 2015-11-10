import {
  generateId,
  ADD_CARD,
  UPDATE_CARD,
  UPDATE_CARD_MARK_AS_SEEN,
  UPDATE_CARD_ANSWERED_RIGHT,
  UPDATE_CARD_ANSWERED_WRONG,
  UPDATE_SELECTED_DECK,
  UPDATE_NEXT_CARD_INDEX
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
    let card = Object.assign({}, action.payload, {
      id: id,
      numRightAnswers: 0,
      numWrongAnswers: 0,
      lastSeen: null
    })
    return Object.assign({}, cardEntities, {[id]: card})
  }

  if (action.type === UPDATE_CARD) {
    let id = action.payload.id
    let card = Object.assign({}, cardEntities[id], action.payload.cardData)
    return Object.assign({}, cardEntities, {[id]: card})
  }

  if (action.type === UPDATE_CARD_MARK_AS_SEEN) {
    let id = action.payload.id
    let card = Object.assign({}, cardEntities[id], {lastSeen: action.payload.timestamp, lastUpdated: action.payload.timestamp})
    return Object.assign({}, cardEntities, {[id]: card})
  }

  if (action.type === UPDATE_CARD_ANSWERED_RIGHT) {
    let id = action.payload.id
    let lastUpdated = action.payload.lastUpdated
    let card = Object.assign({}, cardEntities[id], {
      lastAnsweredRight: true,
      numRightAnswers: cardEntities[id].numRightAnswers + 1,
      lastRightAnswerTimestamp: lastUpdated,
      lastUpdated: lastUpdated
    })
    return Object.assign({}, cardEntities, {[id]: card})
  }

  if (action.type === UPDATE_CARD_ANSWERED_WRONG) {
    let id = action.payload.id
    let lastUpdated = action.payload.lastUpdated
    let card = Object.assign({}, cardEntities[id], {
      lastAnsweredRight: false,
      numWrongAnswers: cardEntities[id].numWrongAnswers + 1,
      lastWrongAnswerTimestamp: lastUpdated,
      lastUpdated: lastUpdated
    })
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
  }
  
  if (action.type === UPDATE_NEXT_CARD_INDEX) {
    let nextIndex = (decks[action.payload.deckId].nextCardIndex + 1) % decks[action.payload.deckId].cardIds.length
    let updatedDeck = Object.assign({}, decks[action.payload.deckId], {nextCardIndex: nextIndex})
    return Object.assign({}, decks, {[action.payload.deckId]: updatedDeck})
  }
  
  // Assert: nothing to do
  return decks
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
