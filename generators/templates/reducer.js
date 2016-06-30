// import { EditorState } from 'draft-js';
import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';
const INITIAL_STATE = immutable({});

const setState = (state, action) => {
  return state.merge({ ["@@changeTOCorrectStateKey"]: action["@@changeTOCorrectStateKey"] });
};

export const handlers = {
  [Types.{{actionType}}]: setState
};

export default createReducer(INITIAL_STATE, handlers);
