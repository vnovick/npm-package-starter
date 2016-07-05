// process EDITOR actions
import { take, put, select } from 'redux-saga/effects';
import Types from '../actions/types';
import { transformState } from '../actions/creators';
import { convertToRaw } from 'draft-js';

export function * watchEditorChange() {
  while (true){
    let action = yield take(Types.EDITOR_CHANGE_STATE);
    yield put(transformState(convertToRaw(action.editorState.getCurrentContent())))
  }
}