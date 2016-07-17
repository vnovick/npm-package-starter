import { fork } from 'redux-saga/effects';
import { watchStartup } from './startupSaga';
import { watchEditorChange } from './editorSaga';
import { watchToolbarConfig } from './toolbarSaga';
import { globalApiObservers } from './apiSaga';
export default function * rootSaga() {
  yield fork(watchStartup);
  yield fork(watchEditorChange);
  yield fork(watchToolbarConfig);
  yield fork(globalApiObservers);
}
