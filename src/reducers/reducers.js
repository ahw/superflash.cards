import {
  generateId,
  ADD_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  UPDATE_SELECTED_DECK,
  GOTO_NEXT_CARD_INDEX,
  GOTO_CARD_INDEX,
  MATHJAX_PROCESS_BEGIN,
  MATHJAX_PROCESS_END,
} from '../actions';
import { combineReducers } from 'redux';

function decksReducer(decks = {}, action) {
  if (action.type === ADD_CARD_SUCCESS) {
    let card = action.payload.card;

    if (decks[card.deck]) {
      let updatedCardList = [...decks[card.deck].cards, card];
      let updatedDeck = Object.assign({}, decks[card.deck], {cards: updatedCardList});
      return Object.assign({}, decks, {[card.deck]: updatedDeck});
    } else {
      // Initialize a new deck with an array of 1 card
      let newDeck = {
        cards: [card],
        currentCardIndex: 0
      };
      return Object.assign({}, decks, {[card.deck]: newDeck});
    }
  }

  if (action.type === UPDATE_CARD_SUCCESS) {
    let card = action.payload.card;
    let updatedCards = decks[card.deck].cards.map((existingCard) => {
      if (existingCard.id === card.id) {
        return Object.assign({}, existingCard, card);
      } else {
        return existingCard;
      }
    });
    let updatedDeck = Object.assign({}, decks[card.deck], {cards: updatedCards});
    return Object.assign({}, decks, {[action.payload.card.deck]: updatedDeck});
  }


  if (action.type === GOTO_NEXT_CARD_INDEX) {
    let deckId = action.payload.deckId;
    let currentCardIndex = decks[deckId].currentCardIndex;
    let wrongOrUnansweredCards = decks[deckId].cards.filter((card) => {
      // TODO: Here is where we could search for all the wrong or unanswered
      // cards so that the next card we go to is not just one that has already
      // been answered correctly. If ALL cards have been answered correctly then
      // this should just go back to the very first card in the list and start
      // all over again. See (possibly)
      // http://rackt.org/redux/docs/recipes/ComputingDerivedData.html
    });

    let nextIndex = (decks[deckId].currentCardIndex + 1) % decks[deckId].cards.length;
    let updatedDeck = Object.assign({}, decks[deckId], {currentCardIndex: nextIndex});
    return Object.assign({}, decks, {[deckId]: updatedDeck});
  }

  if (action.type === GOTO_CARD_INDEX) {
    let deckId = action.payload.deckId;
    // In case cardIndex is out of range, take the mod of the number of cards
    let nextIndex = action.payload.cardIndex % decks[deckId].cards.length;
    let updatedDeck = Object.assign({}, decks[deckId], {currentCardIndex: nextIndex});
    return Object.assign({}, decks, {[deckId]: updatedDeck});
  }

  // Assert: nothing to do
  return decks;
}

function selectedDeckReducer(selectedDeck = null, action) {
  if (action.type === UPDATE_SELECTED_DECK) {
    return action.payload;
  }
  return selectedDeck;
}

const defaultMathJax = {
    "hasStartedProcessing": false,
    "hasFinishedProcessing": false,
};

function mathJaxReducer(mathJax = defaultMathJax, action) {
    if (action.type === MATHJAX_PROCESS_BEGIN) {
        // Kind of a hack; we know whenever MathJax has started it can't have finished
        const result = Object.assign({}, mathJax, {
            hasStartedProcessing: true,
            hasFinishedProcessing: false,
        });
        return result;
    }

    if (action.type === MATHJAX_PROCESS_END) {
        const result = Object.assign({}, mathJax, {
            hasStartedProcessing: true,
            hasFinishedProcessing: true,
        });
        return result;
    }

    if (action.type === GOTO_CARD_INDEX || action.type === GOTO_NEXT_CARD_INDEX) {
        return defaultMathJax;
    }
    if (action.type === UPDATE_SELECTED_DECK) {
        return defaultMathJax;
    }
    
    return mathJax;
}

const rootReducer = combineReducers({
  decks: decksReducer,
  selectedDeck: selectedDeckReducer,
  mathJax: mathJaxReducer,
});

export default rootReducer;
