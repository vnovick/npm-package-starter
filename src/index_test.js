import 'babel-polyfill';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import Editor from '.';
import appStore from './appStore';
import { shallow } from 'enzyme';
import React from 'react';

jsdom();
describe('(index_test.js) -- Test Basic Setup', ()=>{
  describe('Test environment is up', ()=> {
    it('jsDom defined with correct document', () => {
      var div = document.createElement('div');
      expect(div.nodeName).toBe('DIV');
    });
    it('Public Editor component is imported correctly', () => {
      expect(Editor).toExist();
    });
  });
  describe('Basic Public Editor setup', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = shallow(<Editor/>);
    });
    it('Stewie Editor is exposed and wrapped in Provider', ()=>{
      expect(wrapper.name()).toEqual('Provider');
    });
    it('Provider wrapper gets correct appStore', ()=>{
      expect(wrapper.props().store).toEqual(appStore);
    });
  });
});


