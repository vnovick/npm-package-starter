// import { EditorState } from 'draft-js';
import { createReducer } from 'reduxsauce';
import Types from '../actions/types';
import { EditorState } from 'draft-js';
import 'core-js';

const INITIAL_STATE = {
  editorState: EditorState.createEmpty(),
};

const setState = (state, { editorState }) => {
  return {
    ...state,
    editorState
  };
};

const setJsonState = (state, { json }) => {
  return {
    ...state,
    json
  };
};

const setToolbarConfig = (state, { buttonsConfig }) => {
  return {
    ...state,
    buttonsConfig
  };
};

const updateWordCount = (state, { wordCount }) => {
  return {
    ...state,
    wordCount
  }
}

const updateCharCount = (state, { charCount }) => {
  return {
    ...state,
    charCount
  };
};


export const handlers = {
  [Types.EDITOR_CHANGE_STATE]: setState,
  [Types.EDITOR_TRANSFORM_TO_RAW_STATE]: setJsonState,
  [Types.CONFIGURE_TOOLBAR]: setToolbarConfig,
  [Types.UPDATE_WORD_COUNT]: updateWordCount,
  [Types.UPDATE_CHAR_COUNT]: updateCharCount
};

export default createReducer(INITIAL_STATE, handlers);
