// import { EditorState } from 'draft-js';
import { createReducer } from 'reduxsauce';
import Types from '../actions/types';
import { EditorState } from 'draft-js';
import 'core-js';

const INITIAL_STATE = {};

const setState = (state, { editorState, id }) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      editorState
    }
  };
};

const configureSubscribers = (state, { subscribers, id }) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      subscribers
    }
  };
};

const setJsonState = (state, { json, id }) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      json
    }
  };
};

const setToolbarConfig = (state, { buttonsConfig, id }) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      buttonsConfig
    }
  };
};


const updateWordCount = (state, { wordCount, id }) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      wordCount
    }
  };
};

const updateCharCount = (state, { charCount, id }) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      charCount
    }
  };
};

const setEditor = (state, { id }) => {
  return {
    ...state,
    [id]: {
      editorState: EditorState.createEmpty(),
      linkAccordion: {
        showLinkAccordion: false,
        urlValue: ''
      }
    }
  };
};

const mountEditor = (state, { id }) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      init: true
    }
  };
};

export const handlers = {
  [Types.CONFIGURE_EDITOR]: setEditor,
  [Types.MOUNT_EDITOR]: mountEditor,
  [Types.EDITOR_CHANGE_STATE]: setState,
  [Types.CONFIGURE_EDITOR_API]: configureSubscribers,
  [Types.EDITOR_TRANSFORM_TO_RAW_STATE]: setJsonState,
  [Types.CONFIGURE_TOOLBAR]: setToolbarConfig,
  [Types.UPDATE_WORD_COUNT]: updateWordCount,
  [Types.UPDATE_CHAR_COUNT]: updateCharCount
};

export default createReducer(INITIAL_STATE, handlers);
