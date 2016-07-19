// import { EditorState } from 'draft-js';
import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';
const INITIAL_STATE = immutable({
  init: false
});

export const setState = (state, action) => {
  return state.merge({ init: action.init });
};

export const handlers = {
  [Types.MOUNT_EDITOR]: setState
};

export default createReducer(INITIAL_STATE, handlers);
