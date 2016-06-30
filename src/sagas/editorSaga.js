// process EDITOR actions
import { take, put, select } from 'redux-saga/effects';
import Types from '../actions/types';

export function * watchEditorChange() {
  while (true){
    yield take(Types.EDITOR_CHANGE_STATE);
    console.info("%c Editor Change State - override *watchEditorChange in editorSaga");
  }
}