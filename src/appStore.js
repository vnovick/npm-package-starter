import { createStore, compose, applyMiddleware, } from 'redux';
import rootReducer from './reducers/';
import createLogger from 'redux-logger';
import { loggerSettings } from './config/debugSettings';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import { queryString as qs } from './utils/queryString';

//window mock for test env
const w = global.window || { devToolsExtension: false };

// silence these saga-based messages
const LOGGING_BLACKLIST = qs.loggingBlacklist ? JSON.parse(qs.loggingBlacklist) : [];

// Configure logger
const { config, predicate } = loggerSettings;
const logger = createLogger({
  predicate: predicate(LOGGING_BLACKLIST),
  ...config
});


const storeEnhacers = [];

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];


const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(...middlewares),
      w.devToolsExtension ? w.devToolsExtension() : f => f
  ),
  ...storeEnhacers
);

sagaMiddleware.run(sagas);
export default store;
