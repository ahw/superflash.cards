import {
  generateId,
  ADD_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  UPDATE_SELECTED_DECK,
  GOTO_NEXT_CARD_INDEX,
  GOTO_CARD_INDEX
} from '../actions'
import { combineReducers } from 'redux'
// import crypto from 'crypto'
// import * as reducers from './reducers'

function deckEntitiesReducer(deckEntities = {}, action) {

  if (action.type === ADD_CARD_SUCCESS) {
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
  if (action.type === ADD_CARD_SUCCESS) {
    let id = action.payload.id
    return Object.assign({}, cardEntities, {[id]: action.payload})
  }

  if (action.type === UPDATE_CARD_SUCCESS) {
    let id = action.payload.id
    let card = Object.assign({}, cardEntities[id], action.payload.card)
    return Object.assign({}, cardEntities, {[id]: card})
  }

  // Assert: nothing required
  return cardEntities
}

function decksReducer(decks = {}, action) {
  if (action.type === ADD_CARD_SUCCESS) {
    let cardId = action.payload.id

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
  
  if (action.type === GOTO_NEXT_CARD_INDEX) {
    let deckId = action.payload.deckId
    let currentCardIndex = decks[deckId].nextCardIndex
    let wrongOrUnansweredCards = decks[deckId].cardIds.filter((cardId) => {
      // TODO: Here is where we could search for all the wrong or unanswered
      // cards so that the next card we go to is not just one that has already
      // been answered correctly. If ALL cards have been answered correctly then
      // this should just go back to the very first card in the list and start
      // all over again. See (possibly)
      // http://rackt.org/redux/docs/recipes/ComputingDerivedData.html
    })

    let nextIndex = (decks[deckId].nextCardIndex + 1) % decks[deckId].cardIds.length
    let updatedDeck = Object.assign({}, decks[deckId], {nextCardIndex: nextIndex})
    return Object.assign({}, decks, {[deckId]: updatedDeck})
  }
  
  if (action.type === GOTO_CARD_INDEX) {
    let deckId = action.payload.deckId
    // In case cardIndex is out of range, take the mod of the number of cards
    let nextIndex = action.payload.cardIndex % decks[deckId].cardIds.length
    let updatedDeck = Object.assign({}, decks[deckId], {nextCardIndex: nextIndex})
    return Object.assign({}, decks, {[deckId]: updatedDeck})
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
