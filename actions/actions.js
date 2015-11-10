import Request from 'superagent'
import crypto from 'crypto'

export const ADD_CARD                   = 'ADD_CARD'
export const UPDATE_CARD                = 'UPDATE_CARD'
export const UPDATE_CARD_ANSWERED_RIGHT = 'UPDATE_CARD_ANSWERED_RIGHT'
export const UPDATE_CARD_ANSWERED_WRONG = 'UPDATE_CARD_ANSWERED_WRONG'
export const UPDATE_CARD_MARK_AS_SEEN   = 'UPDATE_CARD_MARK_AS_SEEN'
export const UPDATE_NEXT_CARD_INDEX     = 'UPDATE_NEXT_CARD_INDEX'
export const FETCH_CARDS                = 'FETCH_CARDS'
export const FETCH_CARDS_SUCCESS        = 'FETCH_CARDS_SUCCESS'
export const FETCH_CARDS_FAIL           = 'FETCH_CARDS_FAIL'
export const FETCH_CARDS_DONE           = 'FETCH_CARDS_DONE'
export const UPDATE_SELECTED_DECK       = 'UPDATE_SELECTED_DECK'

export function generateId(card) {
  let shasum = crypto.createHash('sha1')
  shasum.update(card.question + card.answer)
  // return (card.question + card.answer).replace(/[^a-zA-Z]/g, "_")
  return shasum.digest('hex').substr(0, 16)
}

export function updateSelectedDeck(deckId) {
  return {
    type: UPDATE_SELECTED_DECK,
    payload: deckId
  }
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    payload: card
  }
}

export function updateCard(id, cardData) {
  return {
    type: UPDATE_CARD,
    payload: {
      id,
      cardData: Object.assign(cardData, {lastUpdated: Date.now()})
    }
  }
}

export function nextCard(deckId) {
  return {
    type: UPDATE_NEXT_CARD_INDEX,
    payload: {
      deckId
    }
  }
}

export function markAsSeen(id) {
  let timestamp = Date.now()
  return {
    type: UPDATE_CARD_MARK_AS_SEEN,
    payload: {
      id,
      timestamp
    }
  }
}

export function markAnsweredRight(id) {
  return {
    type: UPDATE_CARD_ANSWERED_RIGHT,
    payload: {
      id,
      lastUpdated: Date.now()
    }
  }
}

export function markAnsweredWrong(id) {
  return {
    type: UPDATE_CARD_ANSWERED_WRONG,
    payload: {
      id,
      lastUpdated: Date.now()
    }
  }
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
    .get(`https://spreadsheets.google.com/feeds/list/${googleSheetId}/od6/public/values?alt=json`)
    .end((error, response) => {
      if (error) {
        return dispatch(fetchCardsFail(error, googleSheetId))
      }

      let cardIds = []
      response.body.feed.entry.forEach(entry => {
        let card = {
          question: entry.gsx$question.$t,
          answer: entry.gsx$answer.$t,
          deck: entry.gsx$tag.$t.toLowerCase(),
          lastUpdated: Date.now()
        }

        let id = generateId(card)
        cardIds.push(id)
        try {
          // Augment with any data we've saved from localStorage
          Object.assign(card, JSON.parse(window.localStorage.getItem(id)))
          console.log('Successfully got card ' + id + ' from local storage')
        } catch(e) {}

        dispatch(addCard(card))
      })
      try {
        window.localStorage.setItem('CARD_IDS', JSON.stringify(cardIds))
        console.log('Set card ids list to localStorage', 'CARD_IDS')
        dispatch(fetchCardsSuccess(googleSheetId))
      } catch(e) {
        dispatch(fetchCardsFail(e, googleSheetId))
      }
      dispatch(fetchCardsDone(googleSheetId))
    })
  }
}
