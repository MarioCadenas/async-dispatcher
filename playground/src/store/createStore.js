import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { configureDispatcher } from '@mariocadenas/async-dispatcher';
import todos from '../reducers/todos';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ todos });

export default () => {
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  configureDispatcher(store);
  return store;
};
