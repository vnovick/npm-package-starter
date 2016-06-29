import { EditorState } from 'draft-js';
import { createReducer } from 'reduxsauce';
const INITIAL_STATE = {
  app: 'asd'
};


const editorState = EditorState.createEmpty();

const setState = (state, newState) => ({ ...state, ...newState });

const handlers = {
  ["Startup"]: setState
};

export default createReducer(INITIAL_STATE, handlers);
