// process CONFIGURE_EDITOR actions
import { take, put } from 'redux-saga/effects';
import Types from '../actions/types';
import { changeState, init } from '../actions/creators';
import { EditorState, convertFromRaw } from 'draft-js';

export let covertedState = {};

export function * watchStartup() {
  const action = yield take(Types.CONFIGURE_EDITOR);
  if (action.config && action.config.initialState) {
    yield put(
      changeState(EditorState.createWithContent(
        convertFromRaw(action.config.initialState)
      ))
    );
  }
  yield put(init(true));
}