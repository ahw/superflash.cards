import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import * as actions from '../actions'
import sprintf from 'sprintf'


const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore)

const store = createStoreWithMiddleware(rootReducer)
export default store

// Every time the state changes, log it
// let unsubscribe = store.subscribe(() => {
//   let state = store.getState()
//   console.log(state)
//   // console.log('Deck Entities')
//   // Object.keys(state.entities.decks).map(entity => {
//   //   console.log('- ' + entity)
//   // })

//   // console.log('Card Entities')
//   // Object.keys(state.entities.cards).map(entity => {
//   //   console.log('- ' + entity)
//   // })

//   // console.log('Decks')
//   // Object.keys(state.decks).map(deck => {
//   //   console.log('- ' + deck)
//   // })
// })

// Dispatch some actions
// store.dispatch(actions.addCard({question: 'Capital of New York?', answer: 'Albany', deck: 'capitals'}))
// store.dispatch(actions.addCard({question: 'Capital of Washington?', answer: 'Olympia', deck: 'capitals'}))

// store.dispatch(actions.updateLastSeenTimestamp(123))
// store.dispatch(actions.updateLastSeenTimestamp(234))
// store.dispatch(actions.updateLastSeenTimestamp(345))
// store.dispatch(actions.updateLastSeenTimestamp(777))

// Stop listening to state updates
// unsubscribe()
