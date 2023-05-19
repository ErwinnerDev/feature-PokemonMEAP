import { createStore,applyMiddleware } from 'redux';
import {composeWithDevTools}from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export const store =createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)))


// export const store = createStore(
//   rootReducer, 
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );