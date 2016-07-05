// process STARTUP actions
import { take, put, select } from 'redux-saga/effects';
import Types from '../actions/types';
import { changeState } from '../actions/creators';
import { EditorState, convertFromRaw } from 'draft-js';

export function * watchStartup() {
  const action = yield take(Types.STARTUP);
  if (action.config && action.config.initialState) {
    yield put(
      changeState(
        EditorState.createWithContent(
          convertFromRaw(action.config.initialState)
        )
      )
    );
  }
}