import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'
require("font-awesome-webpack");
import AppContainer from './src/containers'
import reducer from './src/redux/reducer/reducer'

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

let store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(
      logger,
      thunkMiddleware,
    ),
  )
);

render(
  <Provider store={store}>
    <AppContainer />
    </Provider>,
  document.getElementById('app')
)