// import { EditorState } from 'draft-js';
import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';
const INITIAL_STATE = immutable({});

const setState = (state, { editorState }) => {
  return state.merge({ editorState });
};

export const handlers = {
  [Types.EDITOR_CHANGE_STATE]: setState
};

export default createReducer(INITIAL_STATE, handlers);
