import 'babel-polyfill';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import Editor from '.';
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import appStore from './appStore';
describe('Test environment is up', ()=> {
  jsdom()

  it('has document', () => {
    var div = document.createElement('div')
    expect(div.nodeName).toBe('DIV')
  })
  it('has Editor component', () => {
    expect(Editor).toExist();
  })

})

describe('Basic Editor setup', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Editor/>);
  })
  it('Editor has proper className of StewieEditor', ()=>{
    expect(wrapper.find('.StewieEditor')).toExist();
  })
  it('Editor is wrapped by Provider', ()=>{
    expect(wrapper.name()).toEqual('Provider')
  })
  it('Editor is passed correct appStore',()=>{
    expect(wrapper.props().store).toEqual(appStore)
  })
})