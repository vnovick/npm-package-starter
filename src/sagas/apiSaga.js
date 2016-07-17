// process EDITOR actions
import { take, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import Types from '../actions/types';
import appStore from '../appStore';

const stateObserver = (observer) => function * (action) {
  while (true){
    let { editorState } = yield take(Types.EDITOR_CHANGE_STATE);
    let { json } = yield take(Types.EDITOR_TRANSFORM_TO_RAW_STATE);
    observer({
      state: json,
      innerState: editorState
    });
  }
};

const wordCountObserver = (observer) => function * () {
  while (true){
    if (observer){
      const { wordCount } = yield take(Types.UPDATE_WORD_COUNT);
      observer(wordCount);
    }
  }
};

const charCountObserver = (observer) => function * (){
  while (true){
    const { charCount } = yield take(Types.UPDATE_CHAR_COUNT);
    observer(charCount);
  }
};

const apiConfigObserver = (observer) => function * (){
  while (true){
    const { apiConfig } = yield take(Types.GLOBAL_API_CONFIG);
    observer(apiConfig);
  }
};

export function * globalApiObservers() {
  yield take(Types.MOUNT_EDITOR);
  const { subscribers } = appStore.getState().editor;
  if (subscribers) {
    const { state, wordCount, charCount, api } = subscribers;
    if (state) {
      yield fork(stateObserver(state));
    }
    if (wordCount){
      yield fork(wordCountObserver(wordCount));
    }
    if (charCount) {
      yield fork(charCountObserver(charCount));
    }
    if (api){
      yield fork(apiConfigObserver(api));
    }
  }
}