import { fork } from 'redux-saga/effects'
import { watchStartup } from './startupSaga'
import { watchEditorChange } from './editorSaga'

export default function * rootSaga() {
  yield fork(watchStartup);
  yield fork(watchEditorChange);
}