import expect from 'expect';
import editorReducer, { handlers } from './editorReducer';
import immutable from 'seamless-immutable';
import Types from '../actions/types';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor-wysiwyg';

describe('(reducers/editorReducer_test.js) - editorReducer test', ()=>{
  describe('Setup', ()=>{
    it('should be a function', ()=>{
      expect(editorReducer).toNotBeAn('Function');
    });
    it('should return draft-js EditorState for editorState prop', ()=>{
      expect(editorReducer()).toIncludeKey('editorState');
      expect(editorReducer().editorState.constructor).toBe(EditorState)
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
        })
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.EDITOR_CHANGE_STATE, ...newState })).toEqual({ editorState: { test: true } });
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
        }
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.EDITOR_TRANSFORM_TO_RAW_STATE, ...newState })).toEqual({ json: { test: true } });
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
          test: true
        }
      };
      expect(editorReducer(INITIAL_STATE, { type: Types.CONFIGURE_TOOLBAR, ...newState })).toEqual({ buttonsConfig: { test: true } });
    });
  });
});