import 'babel-polyfill';
import expect from 'expect';
import 'colors';
import { watchEditorChange } from './editorSaga';
import { EditorState, convertToRaw } from 'draft-js';
import Types from '../actions/types';
import testSaga from 'redux-saga-test-plan';

describe('(sagas/editorSaga_test.js) - test editor sagas', ()=>{
  describe('watchEditorChange saga test', ()=>{
    let saga;
    let id;
    beforeEach(()=>{
      saga = testSaga(watchEditorChange);
      id = 1;
    });
    it('watchEditorChange saga is not throwing exception', ()=>{
      let generator = watchEditorChange();
      let exception;
      generator.next();
      expect(function() {
        try {
          generator.next({
            editorState: EditorState.createEmpty()
          });
        } catch(ex) {
          exception = ex;
          console.log(`
            ${exception}
          `.red)
          throw Error(ex);
        }
      }).toNotThrow();
    });
    it('watchEditorChange saga should transformState', () => {
      const editorState = EditorState.createEmpty();
      const jsonState = convertToRaw(editorState.getCurrentContent());
      saga
        .next()
        .take(Types.EDITOR_CHANGE_STATE)
        .next({ editorState, id: 1 })
        .put({
          type: Types.EDITOR_TRANSFORM_TO_RAW_STATE,
          json: jsonState,
          id: 1
        });
    });
    it('watchEditorChange saga should updateWordCount', () => {
      const editorState = EditorState.createEmpty();
      saga
        .next()
        .next({ editorState, id })
        .next({ editorState, id })
        .put({
          type: Types.UPDATE_WORD_COUNT,
          wordCount: 0,
          id: 1
        });
    });
    it('watchEditorChange saga should updateCharCount', () => {
      const editorState = EditorState.createEmpty();
      saga
        .next()
        .next({ editorState, id })
        .next({ editorState, id })
        .next({ editorState, id })
        .put({
          type: Types.UPDATE_CHAR_COUNT,
          charCount: 0,
          id
        });
    });
  });
});