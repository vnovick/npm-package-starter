import { createStore, compose, applyMiddleware, } from 'redux';
import reducers from './reducers/';
import createLogger from 'redux-logger';

export const createComposedStore = compose(
    applyMiddleware(createLogger({
        collapsed: true,
        duration: true,
        timestamp: true
    }))
)(createStore);


export default createComposedStore(reducers, {});

