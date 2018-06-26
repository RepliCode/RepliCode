import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import recorder from './recorder';

const reducer = combineReducers({ user, recorder });
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true,
    })
  )
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
