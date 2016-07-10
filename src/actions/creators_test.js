import 'babel-polyfill';
import expect from 'expect';
import { startup, changeState, transformState, configureToolbar } from './creators';
import Types from './types';
describe('(actions/creators_test.js) - action creators test', ()=>{
  describe('Startup Action Creator', ()=>{
    let action;
    let configObj = { initialState: "Some state to test" };
    beforeEach(() => {
      action = startup(configObj);
    });
    it('should be of correct type', ()=>{
      expect(action.type).toBe(Types.STARTUP);
    });
    it('should return configuration object if passed', ()=>{
      expect(action.config).toBe(configObj);
    });
  });
  describe('changeState Action Creator', ()=>{
    let action;
    let configObj = { editorState: "Some state to test" };
    beforeEach(() => {
      action = changeState(configObj);
    });
    it('should be of correct type', ()=>{
      expect(action.type).toBe(Types.EDITOR_CHANGE_STATE);
    });
    it('should return configuration object if passed', ()=>{
      expect(action.editorState).toBe(configObj);
    });
  });
  describe('configureToolbar Action Creator', ()=>{
    it('should exist', ()=>{
      expect(configureToolbar).toExist(" configureToolbar Action creator undefined ");
    });
    it('should be of correct type', ()=>{
      const action = configureToolbar();
      expect(action.type).toBe(Types.CONFIGURE_TOOLBAR);
    });
    it('should return configuration object if passed', ()=>{
      const passedConfig = { buttonsConfig: {}, buttonsList: [] };
      const action = configureToolbar(passedConfig);
      expect(action.buttonsConfig).toBe(passedConfig);
    });
  });
  describe('transformState Action Creator', ()=>{
    let action;
    let configObj = { json: {} };
    beforeEach(() => {
      action = transformState(configObj);
    });
    it('should be of correct type', ()=>{
      expect(action.type).toBe(Types.EDITOR_TRANSFORM_TO_RAW_STATE);
    });
    it('should return configuration object if passed', ()=>{
      expect(action.json).toBe(configObj);
    });
  });

});