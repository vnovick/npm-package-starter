import 'babel-polyfill';
import expect from 'expect';
import { watchEditorChange } from './editorSaga';
import { EditorState } from 'draft-js';
import 'colors';
describe('(sagas/editorSaga_test.js) - test editor sagas', ()=>{
  describe('watchEditorChange saga test', ()=>{
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
  });
});