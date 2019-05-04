import Request from 'superagent'
import crypto from 'crypto'

// export const ADD_CARD                   = 'ADD_CARD'
export const ADD_CARD_SUCCESS           = 'ADD_CARD_SUCCESS'
export const ADD_CARD_FAIL              = 'ADD_CARD_FAIL'
export const ADD_CARD_DONE              = 'ADD_CARD_DONE'

// export const UPDATE_CARD                = 'UPDATE_CARD'
export const UPDATE_CARD_SUCCESS        = 'UPDATE_CARD_SUCCESS'
export const UPDATE_CARD_FAIL           = 'UPDATE_CARD_FAIL'
export const UPDATE_CARD_DONE           = 'UPDATE_CARD_DONE'

export const GOTO_NEXT_CARD_INDEX       = 'GOTO_NEXT_CARD_INDEX'
export const GOTO_CARD_INDEX            = 'GOTO_CARD_INDEX'

// export const FETCH_CARDS                = 'FETCH_CARDS'
export const FETCH_CARDS_SUCCESS        = 'FETCH_CARDS_SUCCESS'
export const FETCH_CARDS_FAIL           = 'FETCH_CARDS_FAIL'
export const FETCH_CARDS_DONE           = 'FETCH_CARDS_DONE'

export const UPDATE_SELECTED_DECK       = 'UPDATE_SELECTED_DECK'

export const MATHJAX_PROCESS_BEGIN      = 'MATHJAX_PROCESS_BEGIN';
export const MATHJAX_PROCESS_END        = 'MATHJAX_PROCESS_END';
export const CARD_FLIP                  = 'CARD_FLIP';

export function generateId(card) {
  let shasum = crypto.createHash('sha1')
  shasum.update(card.question + card.answer)
  // return (card.question + card.answer).replace(/[^a-zA-Z]/g, "_")
  return shasum.digest('hex').substr(0, 16)
}

export function addLocalStorage(card, shouldWriteToLocalStorage=true) {
  // It's synchronous but whatever we'll write an Action as if it was async.
  return function(dispatch) {
    if (!card.id) {
      console.warn('addLocalStorage: card id should have been provided. Generating one automatically.')
      card.id = generateId(card)
    }

    try {
      card.lastUpdated = Date.now()
      if (shouldWriteToLocalStorage) {
        window.localStorage.setItem(card.id, JSON.stringify(card))
      }
      dispatch(addLocalStorageSuccess(card))
    } catch (e) {
      console.error('Error in addLocalStorage!')
      console.error(e)
      dispatch(addLocalStorageFail(card))
    }
    dispatch(addLocalStorageDone(card))
  }
}

export function addLocalStorageSuccess(card) {
  return {
    type: ADD_CARD_SUCCESS,
    payload: {card}
  }
}
export function addLocalStorageFail(card) { return { type: ADD_CARD_FAIL, payload: { card } } }
export function addLocalStorageDone(card) { return { type: ADD_CARD_DONE, payload: { card } } }

export function updateLocalStorage(id, cardData) {
  // It's synchronous but whatever we'll write an Action as if it was async.
  return function(dispatch) {
    try {
      let card = JSON.parse(window.localStorage.getItem(id))
      Object.assign(card, cardData, {lastUpdated: Date.now()})
      window.localStorage.setItem(id, JSON.stringify(card))
      dispatch(updateLocalStorageSuccess(id, card))
    } catch (e) {
      console.error(e.message, e.stack)
      dispatch(updateLocalStorageFail(id))
    }
    dispatch(updateLocalStorageDone(id))
  }
}

export function updateLocalStorageSuccess(id, card) {
  return {
    type: UPDATE_CARD_SUCCESS,
    payload: {card}
  }
}
export function updateLocalStorageFail(id) { return { type: UPDATE_CARD_FAIL, payload: { id } } }
export function updateLocalStorageDone(id) { return { type: UPDATE_CARD_DONE, payload: { id } } }

export function updateSelectedDeck(deckId) {
  return {
    type: UPDATE_SELECTED_DECK,
    payload: deckId
  }
}

export function gotoNextCard(deckId) {
  return {
    type: GOTO_NEXT_CARD_INDEX,
    payload: {deckId}
  }
}

// export function gotoCardIndex(deckId, cardIndex) {
//   return {
//     type: GOTO_CARD_INDEX,
//     payload: {
//       deckId,
//       cardIndex
//     }
//   }
// }

export function markAsSeen(id) {
  return updateLocalStorage(id, {lastSeen: Date.now()})
}

export function markAnswered(id, isRight) {
  try {
    let card = JSON.parse(window.localStorage.getItem(id))
    let numRightAnswers = card.numRightAnswers || 0
    let numWrongAnswers = card.numWrongAnswers || 0
    Object.assign(card, {
      lastAnsweredRight: isRight,
      [isRight ? 'numRightAnswers' : 'numWrongAnswers']: (isRight ? numRightAnswers : numWrongAnswers) + 1,
      [isRight ? 'lastRightAnswerTimestamp' : 'lastWrongAnswerTimestamp']: Date.now()
    })
    return updateLocalStorage(id, card)
  } catch(e) {
    console.error(e)
    return null // TODO: What to return in error?
  }
}

export function markAnsweredWrong(id) {
  return markAnswered(id, false)
}

export function markAnsweredRight(id) {
  return markAnswered(id, true)
}

export function fetchCardsFail(error, googleSheetId) {
  return {
    type: FETCH_CARDS_FAIL,
    payload: error,
    error: true
  }
}

export function fetchCardsSuccess(googleSheetId, cards) {
  return { type: FETCH_CARDS_SUCCESS }
}

export function fetchCardsDone(googleSheetId) {
  return { type: FETCH_CARDS_DONE }
}

export function fetchCards(googleSheetId) {
  return function(dispatch) {
    Request
    .get(`https://spreadsheets.google.com/feeds/cells/${googleSheetId}/od6/public/basic?alt=json`)
    .end((error, response) => {
      let cardIds = []

      if (error) {
        // Assert: network error. Try to use card ids saved in localStorage.
        let cardIdsJson = window.localStorage.getItem(googleSheetId + ':card_ids')
        if (cardIdsJson) {
          console.log('Yay. Recovered from network error and using card ids from local storage')
          let cardIds = JSON.parse(cardIdsJson)
          cardIds.forEach((id, index) => {
            try {
              let card = JSON.parse(window.localStorage.getItem(id))
              // Pass false to bypass actually writing to localStorage (since we
              // just fetched it, let's not bother re-writing it).
              dispatch(addLocalStorage(card, false))
            } catch (e) {}
          })
          return dispatch(fetchCardsSuccess('localStorage'))
        } else {
          return dispatch(fetchCardsFail(error, googleSheetId))
        }
      } else {
        // We got a response. Parse it out and augment each card with any data
        // previously stored in localStorage, with the exception of the "deck"
        // property. Use the latest fetched deck.
        let cardIds = []

        const cardsByRow = {};
        const columnToKey = { A: 'deck', B: 'question', C: 'answer' };
        response.body.feed.entry.forEach(entry => {
          // entry.title.$t is the cell name: e.g., "A1", "C32".
          const row = parseInt(entry.title.$t.match(/\d+/)[0], 10);
          const col = entry.title.$t.match(/[A-Z]+/)[0];

          if (typeof cardsByRow[row] === 'undefined') {
            cardsByRow[row] = {};
          }

          cardsByRow[row][columnToKey[col]] = entry.content.$t;
        });

        // Now iterate through all cards
        Object.keys(cardsByRow).forEach(row => {
          const deck = cardsByRow[row].deck || 'unknown';
          const card = Object.assign({
            question: '',
            answer: '',
            deck,
            lastUpdated: Date.now()
          }, cardsByRow[row]);

          // The == is intentional; row is a string
          if (row == 1 && /question/i.test(card.question) && /answer/i.test(card.answer)) {
            console.log('Ignoring card', card);
            return;
          }

          const id = generateId(card);
          card.id = id;

          try {
            // Augment with any data we've saved from localStorage, but prefer
            // the latest fetched deck
            Object.assign(card, JSON.parse(window.localStorage.getItem(id)), { deck });
            // console.log('Successfully got card ' + id + ' from local storage')
          } catch(e) {
            console.error('Error in fetchCards!')
            console.error(e)
          }

          dispatch(addLocalStorage(card))
          cardIds.push(id)
        });

        try {
          window.localStorage.setItem(googleSheetId + ':card_ids', JSON.stringify(cardIds))
          console.log('Set card ids list to localStorage', googleSheetId + ':card_ids')
          dispatch(fetchCardsSuccess(googleSheetId))
        } catch(e) {
          console.error('Error writing card ids to local storage', e)
        }

      }

      dispatch(fetchCardsDone(googleSheetId))
    })
  }
}

export function mathJaxProcessBegin() {
    return { type: MATHJAX_PROCESS_BEGIN };
}

export function mathJaxProcessEnd() {
    return { type: MATHJAX_PROCESS_END };
}

export function cardFlip(cardId) {
  return { type: CARD_FLIP, payload: { cardId } };
}
