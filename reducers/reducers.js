import {
  ADD_CARD,
  UPDATE_LAST_SEEN_TIMESTAMP
} from '../actions'
import { combineReducers } from 'redux'
// import crypto from 'crypto'
// import * as reducers from './reducers'

function generateId(card) {
  return (card.question + card.answer).replace(/[^a-zA-Z]/g, "_")
  // let sha = crypto.createHash('sha1');
  // sha.update(card.question + card.answer);
  // let id = sha.digest('hex');
  // return id
}

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
    let card = Object.assign({}, action.payload, {id: id})
    return Object.assign({}, cardEntities, {[id]: card})
  }

  // Assert: nothing required
  return cardEntities
}

function decksReducer(decks = {}, action) {
  if (action.type === ADD_CARD) {
    if (decks[action.payload.deck]) {
      let updatedCardList = [...decks[action.payload.deck].cardIds, generateId(action.payload)]
      let updatedDeck = Object.assign({}, decks[action.payload.deck], {cardIds: updatedCardList})
      return Object.assign({}, decks, {[action.payload.deck]: updatedDeck})
    } else {
      // Initialize a new deck with an array of 1 card
      let newDeck = {
        cardIds: [generateId(action.payload)],
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

const rootReducer = combineReducers({
  entities: entitiesReducer,
  decks: decksReducer
})

export default rootReducer
