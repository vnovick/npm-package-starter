// import { EditorState } from 'draft-js';
import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';
import { EditorState } from 'draft-js';

const INITIAL_STATE = {
  editorState: EditorState.createEmpty()
};

const setState = (state, { editorState }) => {
  return {
    ...state,
    editorState
  }
};

const setJsonState = (state, { json }) => {
  return {
    ...state,
    json
  }
};

export const handlers = {
  [Types.EDITOR_CHANGE_STATE]: setState,
  [Types.EDITOR_TRANSFORM_TO_RAW_STATE]: setJsonState
};

export default createReducer(INITIAL_STATE, handlers);
