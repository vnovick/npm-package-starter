// import { EditorState } from 'draft-js';
import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';
const INITIAL_STATE = immutable({
  init: false
});


// const editorState = EditorState.createEmpty();

const setState = (state, action) => {
  return state.merge({ init: action.init });
};

export const handlers = {
  [Types.INIT]: setState
};

export default createReducer(INITIAL_STATE, handlers);
