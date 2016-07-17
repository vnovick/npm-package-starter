import { createStore, compose, applyMiddleware, } from 'redux';
import rootReducer from './reducers/';
import createLogger from 'redux-logger';
import { loggerSettings, isDev } from './config/debugSettings';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

//window mock for test env
const w = global.window || { devToolsExtension: false };

// silence these saga-based messages
const SAGA_LOGGING_BLACKLIST = ['UPDATE_WORD_COUNT', 'UPDATE_CHAR_COUNT', 'EDITOR_CHANGE_STATE'];

// Configure logger
const { config, predicate } = loggerSettings;
const logger = createLogger({
  predicate: predicate(SAGA_LOGGING_BLACKLIST),
  ...config
});


const storeEnhacers = [];

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

//Don't ship this
if (isDev) {
  middlewares.push(logger);
}

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
