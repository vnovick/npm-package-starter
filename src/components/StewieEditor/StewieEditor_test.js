import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import StewieEditor, { editorClassName } from '.';


const expectedValues = {
  rendering: {
    editorClassName
  }
};
describe('(components/StewieEditor_test.js) - StewieEditor test', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<StewieEditor/>);
  });

  describe('Basic Rendering', ()=>{
    const { editorClassName: className } = expectedValues.rendering;
    it('should import correct className', ()=>{
      expect(className).toExist();
      expect(wrapper.props().className).toEqual(className);
    });
  });
});