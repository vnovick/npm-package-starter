import 'babel-polyfill';
import expect from 'expect';
import { startup, changeState, transformState } from './creators';
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