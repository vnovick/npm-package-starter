import { fork } from 'redux-saga/effects'
import { watchStartup } from './startupSaga'

export default function * root() {
  yield fork(watchStartup)
}