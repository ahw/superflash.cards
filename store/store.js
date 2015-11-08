console.log('this is store.js');
import { createStore } from 'redux';
import flashCardsReducer from '../reducers';
import * as actions from '../actions';

let store = createStore(flashCardsReducer);

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch some actions
store.dispatch(actions.addCard({question: 'Capital of New York?', answer: 'Albany', deck: 'capitals'}));
store.dispatch(actions.addCard({question: 'Capital of Washington?', answer: 'Olympia', deck: 'capitals'}));

store.dispatch(actions.updateLastSeenTimestamp(1, 123));
store.dispatch(actions.updateLastSeenTimestamp(1, 234));
store.dispatch(actions.updateLastSeenTimestamp(1, 345));

store.dispatch(actions.updateLastSeenTimestamp(2, 777));

// Stop listening to state updates
// unsubscribe()
