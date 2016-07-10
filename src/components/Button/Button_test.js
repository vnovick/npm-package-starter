import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Button, buttonClassNames } from '.';
import { defaultButtonsConfig } from '../Toolbar/config';
const expectedValues = {
  rendering: {
    buttonClassNames
  }
};

describe('(components/Button/Button_test.js) - Button test', ()=>{
  describe('Basic Rendering', ()=>{
    const { buttonClassNames: { simple: buttonClassName } } = expectedValues.rendering;
    it('should have correct container className', ()=>{
      const toggle = expect.createSpy();
      const simpleButton = shallow(<Button { ...{
        ...defaultButtonsConfig.buttonsConf.B,
        toggle
      } }/>);
      expect(buttonClassName).toExist();
      expect(simpleButton.props().className).toEqual(`${buttonClassName} ${buttonClassName}--BOLD`);
    });
    it('should toggle simpleButton with correct payload on click', ()=>{
      const toggle = expect.createSpy();
      const simpleButton = shallow(<Button { ...{
        ...defaultButtonsConfig.buttonsConf.B,
        toggle
      } }/>);
      simpleButton.simulate('mouseDown', { preventDefault: ()=>{} });
      expect(toggle).toHaveBeenCalledWith('BOLD');
    });
  });
});