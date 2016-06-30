import expect from 'expect';
import appReducer, { handlers } from './appReducer';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

describe('(reducers/appReducer_test.js) - appReducer test', ()=>{
  describe('Setup', ()=>{
    it('should be a function', ()=>{
      expect(appReducer).toNotBeAn('Function');
    });
    it('should return immutable state', ()=>{
      expect(appReducer()).toIncludeKey('__immutable_invariants_hold');
    });
    it('all handler types are defined', ()=> {
      expect(Object.keys(handlers).includes('undefined')).toNotExist("there are undefined handler types");
    });

    it('initial state has init: false', ()=> {
      expect(appReducer()).toEqual({ init: false });
    });
  });

  describe('"STARTUP" action', ()=> {
    let INITIAL_STATE;
    beforeEach(()=>{
      INITIAL_STATE = immutable({});
    });
    it('should return init: true state for Startup type', () => {
      const newState = {
        init: true
      };
      expect(appReducer(INITIAL_STATE, { type: Types.STARTUP, ...newState })).toEqual({ init: true });
    });
  });
});