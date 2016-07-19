import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { EditorState, Entity, RichUtils, convertFromRaw } from 'draft-js';
import { LinkAccordion, linkPlugin, Link, findLinkEntities, linkClassNames } from './index';
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
    it('should label be rendered with correct text', ()=>{
      expect(shallowWrapper.find('label').props().children).toBe('Url');
    });
    it('should input be rendered with correct urlValue and className', ()=>{
      expect(shallowWrapper.find('input').props().value).toBe('test');
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
    it('should onUrlChange trigger changeState', () => {
      const changeState = expect.createSpy();
      const linkComponent = mount(testConfig.getComponent(expect.createSpy(), linkState, changeState));
      linkComponent.instance().onUrlChange({ target: { value: 'test' } });
      expect(changeState).toHaveBeenCalled();
    });
    it('should input change trigger change State', () => {
      const changeState = expect.createSpy();
      const linkComponent = mount(testConfig.getComponent(expect.createSpy(), linkState, changeState));
      linkComponent.find('input').simulate('change', 'test');
      expect(changeState).toHaveBeenCalled();
    });
  });
  describe('Link Plugin functionality tests', ()=>{
    let plugin;
    beforeEach(()=>{
      plugin = linkPlugin();
    });
    describe('Plugin structure tests', ()=>{
      it('plugin should exist and be a function', ()=>{
        expect(linkPlugin).toExist();
        expect(linkPlugin).toBeA(Function);
      });
      it('plugin should export and object with decorators key', ()=>{
        expect(plugin).toBeA(Object);
        expect(linkPlugin().decorators).toExist();
      });
    });
    describe('findLinkEntities strategy Test', ()=>{
      it('strategy should be defined and it should be a function', ()=>{
        const linkStrategy = plugin.decorators[0].strategy;
        expect(linkStrategy).toExist();
        expect(linkStrategy).toBeA(Function);
      });
      it('can find link entity and execute callback', () => {
        const callback = expect.createSpy();
        const mockInitialState = JSON.parse('{"entityMap":{"0":{"type":"ALIGNMENT","mutability":"MUTABLE","data":{"alignment":"center"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"asdsa"}},"2":{"type":"hr","mutability":"IMMUTABLE","data":{}}},"blocks":[{"key":"bhqu9","text":"asdasd as","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4b835","text":"da sd as","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c9haq","text":"d as das da","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dgspm","text":"asd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2g3sq","text":"asdasd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":2,"key":0},{"offset":2,"length":1,"key":1},{"offset":3,"length":3,"key":0}]},{"key":"56lth","text":"asdsad","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"932b6","text":"asdasd","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"vig8","text":"asdsad","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"70tgo","text":"asd","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"chqmb","text":" ","type":"hr","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":2}]},{"key":"95jld","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"fgi7e","text":"asdasdasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":2,"style":"ITALIC"},{"offset":7,"length":2,"style":"UNDERLINE"},{"offset":7,"length":2,"style":"BOLD"}],"entityRanges":[]}]}');
        const editorState = EditorState.createWithContent(
          convertFromRaw(mockInitialState)
        );
        findLinkEntities(editorState.getCurrentContent().getBlockForKey("2g3sq"), callback);
        expect(callback).toHaveBeenCalled();
      });
    });
    describe('Link decorator tests', ()=>{
      const entityKey = Entity.create('LINK', 'MUTABLE', { url: 'test' });
      let linkComponent;
      beforeEach(()=>{
        linkComponent = shallow(<Link entityKey={ entityKey }/>);
      });
      it('decorator should render <a> element', () => {
        expect(linkComponent.type()).toBe('a');
      });
      it('decorator should render correct href', () => {
        expect(linkComponent.props().href).toExist();
        expect(linkComponent.props().href).toBe("test");
      });
      it('decorator should render correct className', () => {
        expect(linkComponent.props().className).toExist();
        expect(linkComponent.props().className).toBe(linkClassNames.decorator);
      });
    });
  });
});