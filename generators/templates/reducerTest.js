import expect from 'expect';
import {{camelCase name}}Reducer, { handlers } from './{{camelCase name}}Reducer';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

describe('(reducers/{{camelCase name}}Reducer_test.js) - {{camelCase name}}Reducer test', ()=>{
  describe('Setup', ()=>{
    it('should be a function', ()=>{
      expect({{camelCase name}}Reducer).toNotBeAn('Function');
    });
    it('should return immutable state', ()=>{
      expect({{camelCase name}}Reducer()).toIncludeKey('__immutable_invariants_hold');
    });
    it('all handler types are defined', ()=> {
      expect(Object.keys(handlers).includes('undefined')).toNotExist("there are undefined handler types");
    });
  });

  describe('"{{actionType}}"" action', ()=> {
    let INITIAL_STATE;
    beforeEach(()=>{
      INITIAL_STATE = immutable({});
    });
    it('@@@Modify to check corrseponding state', () => {
      const newState = {
        ["@@changeTOCorrectStateKey"]: true
      };
      expect({{camelCase name}}Reducer(INITIAL_STATE, { type: Types.{{actionType}}, ...newState })).toEqual({ ["@@changeTOCorrectStateKey"]: false });
    });
  });
});