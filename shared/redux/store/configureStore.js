import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from '../middleware/api';
import errorNotification from '../middleware/error-notification';

/* eslint-disable no-underscore-dangle */
const configureStore = (reducers, preloadedState = {}, additionalMiddleware = []) => {
  let middleware = additionalMiddleware;
  if (!Array.isArray(additionalMiddleware)) {
    middleware = [additionalMiddleware];
  }
  const store = createStore(
    reducers,
    preloadedState,
    compose(applyMiddleware(
      thunk,
      api,
      errorNotification,
      createLogger({ collapsed: true }),
      ...middleware,
    ),
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ),
  );

  return store;
};
/* eslint-enable */

export default configureStore;
