// process CONFIGURE_EDITOR actions
import { take, put } from 'redux-saga/effects';
import Types from '../actions/types';
import { changeState, configureEditorApi, init, throwConfigurationError, configureToolbar, globalApiConfig } from '../actions/creators';
import { EditorState, convertFromRaw } from 'draft-js';
import appStore from '../appStore';
export let covertedState = {};

function validateSubscribers(subscribers) {
  const invalidSubscribers = Object.keys(subscribers).filter(key => typeof subscribers[key] !== 'function');
  return {
    error: invalidSubscribers.length > 0,
    message: `subscribers must be functions, the following subscribers type is incorrect: ${invalidSubscribers}`,
  };
}

export function * watchStartup() {
  const action = yield take(Types.CONFIGURE_EDITOR);
  if (action.config) {
    const { initialState, subscribers } = action.config;
    if (initialState) {
      yield put(
        changeState(EditorState.createWithContent(
          convertFromRaw(action.config.initialState)
        ))
      );
    }
    if (subscribers) {
      const { error, message } = validateSubscribers(subscribers);
      const actionCreator = !error ? configureEditorApi.part(subscribers) : throwConfigurationError.part(message);
      yield put(actionCreator());
    }
  }
  yield put(init(true));
  yield put(globalApiConfig({
    get rawState() {
      return appStore.getState().editor.editorState;
    },
    get editorState() {
      return appStore.getState().editor.json;
    },
    get wordCount() {
      return appStore.getState().editor.wordCount;
    },
    get charCount() {
      return appStore.getState().editor.charCount;
    }
  }));
}