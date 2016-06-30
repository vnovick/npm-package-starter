import expect from 'expect';
import rootReducer from '.';

describe('(reducers/index_test.js) - root Reducer test', ()=>{
  describe('Setup', ()=>{
    it('should be a function', ()=>{
      expect(rootReducer).toNotBeAn('Function');
    });
    it('should include all relevant reducer state keys', ()=>{
      expect(rootReducer()).toIncludeKeys([
        'app',
        'editor'
      ]);
    });
  });
});