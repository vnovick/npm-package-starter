import { combineReducers } from 'redux';
import app from './appReducer';
import editor from './editorReducer';

const rootReducer = combineReducers({
  app,
  editor
});
export default rootReducer;
