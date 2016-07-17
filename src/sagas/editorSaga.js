// process EDITOR actions
import { take, put, } from 'redux-saga/effects';
import Types from '../actions/types';
import { transformState, updateWordCount, updateCharCount } from '../actions/creators';
import { convertToRaw } from 'draft-js';
import { getWordCount, getCharCount } from '../services/counter';

export function * watchEditorChange() {
  while (true){
    let { editorState } = yield take(Types.EDITOR_CHANGE_STATE);
    const jsonState = convertToRaw(editorState.getCurrentContent());
    yield put(transformState(jsonState));
    yield put(updateWordCount(getWordCount(editorState)));
    yield put(updateCharCount(getCharCount(editorState)));
  }
}