import { combineReducers } from 'redux';
// import * as reducers from './reducers';
function getId(card) {
  return (card.question + card.answer).replace(/[^a-zA-Z]/g, "");
}

function cards(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_LAST_SEEN_TIMESTAMP':
      // TODO: Could just update with action.payload
      let updatedCard = Object.assign({}, state[action.payload.id], {lastSeenTimestamp: action.payload.lastSeenTimestamp});
      let updatedCards = Object.assign({}, state, {[action.payload.id]: updatedCard});
      return updatedCards;
    case 'ADD_CARD':
      // TODO: Could just update with action.payload
      let updatedCards1 = Object.assign({}, state, {[getId(action.payload.card)]: action.payload.card});
      return updatedCards1;
    default:
      return state;
  }
}

function decks(state = {}, action) {
  switch (action.type) {
    case 'ADD_CARD':
      if (state[action.payload.card.deck]) {
        // Append this card id to the deck list
        return Object.assign({}, state, {[action.payload.card.deck]: [...state[action.payload.card.deck], getId(action.payload.card)]});
      } else {
        // Initialize this deck with an array of 1 card
        return Object.assign({}, state, {[action.payload.card.deck]: [getId(action.payload.card)]});
      }
    default:
      return state;
  }
}

const flashCardsReducer = combineReducers({
  cards,
  decks
});

export default flashCardsReducer;
