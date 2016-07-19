import expect from 'expect';
import editorReducer, { handlers } from './editorReducer';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

describe('(reducers/editorReducer_test.js) - editorReducer test', ()=>{
  describe('Setup', ()=>{
    it('should be a function', ()=>{
      expect(editorReducer).toNotBeAn('Function');
    });
    it('all handler types are defined', ()=> {
      expect(Object.keys(handlers).includes('undefined')).toNotExist("there are undefined handler types");
    });
  });

  describe('"EDITOR_CHANGE_STATE" action', ()=> {
    let INITIAL_STATE;
    beforeEach(()=>{
      INITIAL_STATE = immutable({});
    });

    it('should update editor "editorState" key', () => {
      const newState = {
        editorState: immutable({
          test: true
        }),
        id: 1
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.EDITOR_CHANGE_STATE, ...newState })).toEqual({ 1: { editorState: { test: true } } });
    });
  });
  describe('"EDITOR_TRANSFORM_TO_RAW_STATE" action', ()=> {
    let INITIAL_STATE;
    beforeEach(()=>{
      INITIAL_STATE = immutable({});
    });

    it('should update editor "json" key', () => {
      const newState = {
        json: {
          test: true
        },
        id: 1
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.EDITOR_TRANSFORM_TO_RAW_STATE, ...newState })).toEqual({ 1: { json: { test: true } } });
    });
  });
  describe('"CONFIGURE_TOOLBAR" action', ()=> {
    let INITIAL_STATE;
    beforeEach(()=>{
      INITIAL_STATE = immutable({});
    });

    it('should update editor "json" key', () => {
      const newState = {
        buttonsConfig: {
          buttonsList: ['LINK']
        },
        id: 1
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.CONFIGURE_TOOLBAR, ...newState })).toEqual({ 1: { buttonsConfig: { buttonsList: ['LINK'] } } });
    });
  });

  describe('"CONFIGURE_EDITOR_API" action', ()=> {
    let INITIAL_STATE;
    beforeEach(()=>{
      INITIAL_STATE = immutable({});
    });

    it('should update editor "subscribers" key', () => {
      const newState = {
        subscribers: {
          api: () => {}
        },
        id: 1
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.CONFIGURE_EDITOR_API, ...newState })).toEqual({ 1: { subscribers: { api: ()=>{} } } });
    });
  });

  describe('"UPDATE_WORD_COUNT" action', ()=> {
    let INITIAL_STATE;
    beforeEach(()=>{
      INITIAL_STATE = immutable({});
    });

    it('should update editor "wordCount" key', () => {
      const newState = {
        wordCount: 20,
        id: 1
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.UPDATE_WORD_COUNT, ...newState })).toEqual({ 1: { wordCount: 20 } });
    });
  });

  describe('"UPDATE_CHAR_COUNT" action', ()=> {
    let INITIAL_STATE;
    beforeEach(()=>{
      INITIAL_STATE = immutable({});
    });

    it('should update editor "json" key', () => {
      const newState = {
        charCount: 20,
        id: 1
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.UPDATE_CHAR_COUNT, ...newState })).toEqual({ 1: { charCount: 20 } });
    });
  });
});