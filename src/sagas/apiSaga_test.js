import 'babel-polyfill';
import expect from 'expect';
import 'colors';
import { globalApiObservers, stateObserver, wordCountObserver, charCountObserver, apiConfigObserver } from './apiSaga';
import { EditorState } from 'draft-js';
import Types from '../actions/types';
import testSaga from 'redux-saga-test-plan';

describe('(sagas/apiSaga_test.js) - test api saga', ()=>{
  describe('Saga structure', ()=>{
    let saga;
    beforeEach(()=>{
      saga = testSaga(globalApiObservers);
    });
    let generator;
    let GeneratorFunction;
    beforeEach(()=>{
      GeneratorFunction = function*(){}.constructor;
      generator = globalApiObservers();
    });


    it('apiSaga is generator function', ()=>{
      expect(globalApiObservers).toBeA(GeneratorFunction);
    });

    it('apiSaga is triggered on MOUNT_EDITOR action', ()=>{
      saga.next().take(Types.MOUNT_EDITOR);
    });
  });
  describe('stateObserver saga test', ()=>{
    let saga;
    let observer;
    beforeEach(()=>{
      observer = expect.createSpy();
      saga = testSaga(stateObserver(observer));
    });
    it('observer is called', ()=>{
      const editorState = EditorState.createEmpty();
      saga
        .next()
        .take(Types.EDITOR_CHANGE_STATE)
        .next({ editorState })
        .take(Types.EDITOR_TRANSFORM_TO_RAW_STATE)
        .next({ json: '' });
      expect(observer).toHaveBeenCalledWith({
        state: '',
        innerState: editorState
      });
    });
  });
  describe('wordCountObserver saga test', ()=>{
    let saga;
    let observer;
    beforeEach(()=>{
      observer = expect.createSpy();
      saga = testSaga(wordCountObserver(observer));
    });
    it('observer is called', ()=>{
      const wordCount = 20;
      saga
        .next()
        .take(Types.UPDATE_WORD_COUNT)
        .next({ wordCount });
      expect(observer).toHaveBeenCalledWith(wordCount);
    });
  });
  describe('charCountObserver saga test', ()=>{
    let saga;
    let observer;
    beforeEach(()=>{
      observer = expect.createSpy();
      saga = testSaga(charCountObserver(observer));
    });
    it('observer is called', ()=>{
      const charCount = 17;
      saga
        .next()
        .take(Types.UPDATE_CHAR_COUNT)
        .next({ charCount });
      expect(observer).toHaveBeenCalledWith(charCount);
    });
  });
  describe('apiConfigObserver saga test', ()=>{
    let saga;
    let observer;
    beforeEach(()=>{
      observer = expect.createSpy();
      saga = testSaga(apiConfigObserver(observer));
    });
    it('observer is called', ()=>{
      const apiConfig = {
        test: {}
      };
      saga
        .next()
        .take(Types.GLOBAL_API_CONFIG)
        .next({ apiConfig, id: 1 });
      expect(observer).toHaveBeenCalledWith(apiConfig, 1);
    });
  });
});