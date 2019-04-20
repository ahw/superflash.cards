import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import rootReducer from '../reducers';
// import * as actions from '../actions';
// import sprintf from 'sprintf';


// const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  // loggerMiddleware // neat middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(rootReducer);
export default store;
