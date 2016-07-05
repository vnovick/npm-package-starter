import 'babel-polyfill';
import expect from 'expect';
import { watchStartup } from './startupSaga';
import Types from '../actions/types';
import testSaga from 'redux-saga-test-plan';
import { EditorState, convertFromRaw } from 'draft-js';
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
      let expectedState = JSON.parse('{"entityMap":{},"blocks":[{"key":"f8p5m","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}');
      saga
        .next()
        .take(Types.STARTUP)
        .next({ config: { initialState: expectedState } })
        .put({
          type: Types.EDITOR_CHANGE_STATE,
          editorState: EditorState.createWithContent(convertFromRaw(expectedState))
        });
    });
  });
});