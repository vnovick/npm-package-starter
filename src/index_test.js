import 'babel-polyfill';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import Editor from '.';
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import appStore from './appStore';
describe('(index_test.js) - Test environment is up', ()=> {
  jsdom()

  it('jsDom defined with correct document', () => {
    var div = document.createElement('div')
    expect(div.nodeName).toBe('DIV')
  })
  it('Public Editor component is imported correctly', () => {
    expect(Editor).toExist();
  })

})

describe('(index_test.js) - Basic Public Editor setup', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Editor/>);
  })
  it('Public Editor renders StewieEditor with proper className of "StewieEditor"', ()=>{
    expect(wrapper.find('.StewieEditor')).toExist();
  })
  it('Stewie Editor is exposed wrapped in Provider', ()=>{
    expect(wrapper.name()).toEqual('Provider')
  })
  it('Provider wrapper gets correct appStore',()=>{
    expect(wrapper.props().store).toEqual(appStore)
  })
})