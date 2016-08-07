import 'babel-polyfill';
import expect from 'expect';
import { myPackage } from '.';
import jsdom from 'mocha-jsdom';

jsdom();

describe('(index_test.js) -- Test Basic Setup', ()=>{
  describe('Test environment is up', ()=> {
    it('jsDom defined with correct document', () => {
      var div = document.createElement('div');
      expect(div.nodeName).toBe('DIV');
    });
    it('myPackage component is imported correctly', () => {
      expect(myPackage).toExist();
    });
  });
});


