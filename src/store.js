import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import throttle from 'lodash.throttle';
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";
import { composeWithDevTools } from 'redux-devtools-extension';

import ReduxPromise from "redux-promise";


// const initialState = {};
const middleware = [thunk];
const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth
  });
}, 1000));
export default store;