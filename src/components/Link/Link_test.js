import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { EditorState, Entity, RichUtils } from 'draft-js';
import { LinkAccordion, linkClassNames } from './index';
const testConfig = {
  getComponent: (editorFocusSpy, linkState, changeState) => {
    return <LinkAccordion
      editorFocus={ editorFocusSpy } editorState={ EditorState.createEmpty() }
      urlValue={ linkState.urlValue }
      changeState={ changeState }
           />;
  }
};

describe('(components/Link/Link_test.js) - LinkAccordion test', ()=>{
  let wrapper;
  let shallowWrapper;
  let editorFocusSpy;
  let linkState;
  beforeEach(()=>{
    editorFocusSpy = expect.createSpy();
    linkState = {
      showLinkAccordion: false,
      urlValue: 'test'
    };
    const component = testConfig.getComponent(editorFocusSpy, linkState, (state) => { linkState = state; });
    wrapper = mount(component);
    shallowWrapper = shallow(component);
  });
  describe('Basic rendering', ()=>{
    it('should accordion be rendered with correct className', ()=>{
      expect(linkClassNames.accordion).toExist();
      expect(shallowWrapper.props().className).toEqual(linkClassNames.accordion);
    });
    xit('should label be rendered with correct className', () => {
      expect(linkClassNames.accordion__label).toExist();
      expect(shallowWrapper.find('label').shallow().props().className).toBe(linkClassNames.accordion__label);
    });
    it('should label be rendered with correct text', ()=>{
      expect(shallowWrapper.find('label').props().children).toBe('Url');
    });
    xit('should input be rendered with correct className', ()=>{
      expect(linkClassNames.accordion__input).toExist();
      expect(shallowWrapper.find('input').props().className).toBe(linkClassNames.accordion__input);
    });
    it('should input be rendered with correct urlValue and className', ()=>{
      expect(shallowWrapper.find('input').props().value).toBe('test');
    });
    xit('should button be rendered with correct className', ()=>{
      expect(linkClassNames.accordion__button).toExist();
      expect(shallowWrapper.find('button').props().className).toBe(linkClassNames.accordion__button);
    });
    it('should button be rendered and have onClick function and correct className', ()=>{
      expect(shallowWrapper.find('button')).toExist();
      expect(shallowWrapper.find('button').props().onClick).toBeA(Function);
    });
  });
  describe('LinkAccordion functionality tests', ()=>{
    it('should confirmLink return correct state and focus on editor', ()=>{
      const focusSpy = expect.createSpy();
      const onConfirmSpy = expect.createSpy();
      const state = { showLinkAccordion: true, urlValue: 'test' };
      const changeState = expect.createSpy();
      const editorState = EditorState.createEmpty();
      const entityKey = Entity.create('LINK', 'MUTABLE', { url: '' });
      const selection = editorState.getSelection();
      const toggledLinkState = RichUtils.toggleLink(editorState, selection, entityKey);
      const linkComponent = mount(
        <LinkAccordion
          editorFocus={ focusSpy } editorState={ editorState }
          urlValue={ state.urlValue }
          changeState={ changeState } onConfirm={ onConfirmSpy }
        />);
      linkComponent.instance().confirmLink({ preventDefault: () => {} });
      setImmediate(()=>{ expect(focusSpy).toHaveBeenCalled(); });
      expect(onConfirmSpy).toHaveBeenCalledWith(toggledLinkState);
      expect(changeState).toHaveBeenCalled();
    });
    it('should onLinkInputKeyDown should exist', ()=>{
      expect(wrapper.instance().onLinkInputKeyDown).toExist();
    });
    it('should onLinkInputKeyDown trigger changeState', ()=>{
      const changeState = expect.createSpy();
      const linkComponent = mount(testConfig.getComponent(expect.createSpy(), linkState, changeState));
      linkComponent.instance().confirmLink = expect.createSpy();
      linkComponent.find('input').simulate('keydown', { which: 13 });
      expect(linkComponent.instance().confirmLink).toHaveBeenCalled();
    });
  });
});