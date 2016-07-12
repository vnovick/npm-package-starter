import 'babel-polyfill';
import expect from 'expect';
import { watchStartup } from './startupSaga';
import Types from '../actions/types';
import testSaga from 'redux-saga-test-plan';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'colors';

describe('(sagas/startupSaga_test.js) - test editor sagas', ()=>{
  describe('watchStartup saga test', ()=>{
    let saga;
    beforeEach(()=>{
      saga = testSaga(watchStartup);
    })
    it('watchStartup saga is not throwing exception', ()=>{
      let generator = watchStartup();
      let exception;
      generator.next();
      expect(function() {
        try {
          generator.next({ config: undefined });
        } catch(ex) {
          exception = ex;
          console.log(`
            ${exception}
          `.red)
          throw Error(ex);
        }
      }).toNotThrow();
    });
    it('watchStartup saga can deal with initialState passed in config to startup action', ()=>{
      let expectedState = JSON.parse('{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"asd"}}},"blocks":[{"key":"4fa56","text":"asda sd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":5,"length":2,"key":0}]},{"key":"a26m5","text":"sadasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[]},{"key":"5f17p","text":" as da sdas das d","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":4,"style":"BOLD"}],"entityRanges":[]},{"key":"6isna","text":"asdasdas","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"eq8nt","text":"asdasdasdasd","type":"alignment--center","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"289pq","text":"asdasdasd","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"fe5vp","text":"asdasds","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9l0jq","text":"asdasdasd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5j1nr","text":"","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}');
      let generator = watchStartup();
      generator.next(Types.STARTUP);
      const newEditorState = generator.next({ config: { initialState: expectedState } })
        .value
        .PUT
        .action
        .editorState;
      expect(newEditorState)
        .toBeA(EditorState);
      expect(convertToRaw(newEditorState.getCurrentContent())).toEqual(expectedState);
    });
    it('watchStartup saga throws INIT action', ()=>{
      saga.next({ type: Types.STARTUP }).take(Types.STARTUP).next({ config: null }).put({ type: Types.INIT, init: true });
    });
  });
});