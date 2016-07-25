// process CONFIGURE_EDITOR actions
import { take, put } from 'redux-saga/effects';
import Types from '../actions/types';
import { changeState, configureEditorApi, init, throwConfigurationError, globalApiConfig } from '../actions/creators';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
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
  while(true){
    const action = yield take(Types.CONFIGURE_EDITOR);
    const { id, config, plugins } = action;
    if (config) {
      const { initialState, subscribers } = config;
      if (initialState) {
        yield put(
          changeState(id, EditorState.createWithContent(
            convertFromRaw(initialState),
            new CompositeDecorator(plugins)
          ))
        );
      }
      if (subscribers) {
        const { error, message } = validateSubscribers(subscribers);
        const actionCreator = !error ? configureEditorApi.bind(null, id, subscribers) : throwConfigurationError.bind(null, id, message);
        yield put(actionCreator());
      }
    }
    yield put(init(id));
    const apiConfig = appStore.getState().editor[id] ? {
      get rawState() {
        return appStore.getState().editor[id].editorState;
      },
      get editorState() {
        return appStore.getState().editor[id].json;
      },
      get wordCount() {
        return appStore.getState().editor[id].wordCount;
      },
      get charCount() {
        return appStore.getState().editor[id].charCount;
      }
    } : {};
    yield put(globalApiConfig(id, apiConfig));
  }
}