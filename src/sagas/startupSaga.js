// process STARTUP actions
import { take, put, select } from 'redux-saga/effects';
import Types from '../actions/types';

export function * watchStartup() {
  yield take(Types.STARTUP);
  console.info("%c Startup - override *watchStartup in startupSaga if you need some custom startup logic", 'color: green');
}