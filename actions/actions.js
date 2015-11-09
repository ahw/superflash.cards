import Request from 'superagent'

// export const UPDATE_LAST_SEEN_TIMESTAMP = 'UPDATE_LAST_SEEN_TIMESTAMP'
export const ADD_CARD = 'ADD_CARD'
export const FETCH_CARDS         = 'FETCH_CARDS'
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS'
export const FETCH_CARDS_FAIL    = 'FETCH_CARDS_FAIL'
export const FETCH_CARDS_DONE    = 'FETCH_CARDS_DONE'
export const UPDATE_SELECTED_DECK = 'UPDATE_SELECTED_DECK'

export function generateId(card) {
  return (card.question + card.answer).replace(/[^a-zA-Z]/g, "_")
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

      response.body.feed.entry.forEach(entry => {
        let card = {
          question: entry.gsx$question.$t,
          answer: entry.gsx$answer.$t,
          deck: entry.gsx$tag.$t.toLowerCase()
        }

        let id = generateId(card)
        try {
          Object.assign(card, JSON.parse(window.localStorage.getItem(id)))
          console.log('Successfully got card from local storage')
        } catch(e) {}

        dispatch(addCard(card))
      })
      dispatch(fetchCardsSuccess(googleSheetId))
      dispatch(fetchCardsDone(googleSheetId))
    })
  }
}
