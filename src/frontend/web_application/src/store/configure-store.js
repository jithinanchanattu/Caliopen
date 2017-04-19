import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import axiosMiddleware from './middlewares/axios-middleware';
import contactMiddleware from './middlewares/contacts-middleware';
import deviceMiddleware from './middlewares/device-middleware';
import discussionMiddleware from './middlewares/discussions-middleware';
import draftMessageMiddleware from './middlewares/draft-messages-middleware';
import messageMiddleware from './middlewares/messages-middleware';
import promiseMiddleware from './middlewares/promise-middleware';
import reactRouterMiddleware from './middlewares/react-router-redux-middleware';
import tagsMiddleware from './middlewares/tags-middleware';
import thunkMiddleware from './middlewares/thunk-middleware';

const middlewares = [
  axiosMiddleware,
  contactMiddleware,
  deviceMiddleware,
  discussionMiddleware,
  draftMessageMiddleware,
  messageMiddleware,
  promiseMiddleware,
  reactRouterMiddleware,
  tagsMiddleware,
  thunkMiddleware,
];

if (CALIOPEN_ENV === 'development' || CALIOPEN_ENV === 'staging') {
  middlewares.push(require('./middlewares/crash-reporter-middleware').default); // eslint-disable-line
  middlewares.push(require('./middlewares/freeze').default); // eslint-disable-line
}

if (BUILD_TARGET === 'browser') {
  middlewares.push(require('./middlewares/openpgp-middleware').default); // eslint-disable-line
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

function configureStore(initialState, extension) {
  return createStoreWithMiddleware(rootReducer, initialState, extension);
}

export default configureStore;
