import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import StewieEditorComponent, { StewieEditor, stewieClassNames, blockRenderMap, blockStyleFn } from '.';
import Editor from 'draft-js-plugins-editor-wysiwyg';
import { OrderedSet } from 'immutable';
import appStore from '../../appStore';
import { EditorState } from 'draft-js';
import Toolbar from '../Toolbar';
import { LinkAccordion } from '../Link';

const expectedValues = {
  rendering: {
    stewieClassNames
  }
};

const reduxConnectionMock = {
  editor: {
    editorState: EditorState.createEmpty(),
  },
  app: {
    init: true
  }
};

const testConfig = {
  actions: {
    changeState: expect.createSpy(),
    configureToolbar: expect.createSpy()
  },
  stateKey: 'editor',
  get shallowComponent() {
    return shallow(<StewieEditor { ...this.actions } { ...reduxConnectionMock }/>);
  },
  get realComponent(){
    return mount(<StewieEditor { ...this.actions } { ...reduxConnectionMock }/>);
  },
  get connectedComponent(){
    return shallow(<StewieEditorComponent store={ appStore }/>).find(StewieEditor);
  },
  get realConnectedComponent(){
    return mount(<StewieEditorComponent { ...this.actions } store={ appStore }/>).find(StewieEditor);
  }
};

describe('(components/StewieEditor/StewieEditor_test.js) - StewieEditor test', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = testConfig.shallowComponent;
  });

  describe('Basic Rendering', ()=>{
    const { stewieClassNames: { container: containerClassName, editor: editorClassName } } = expectedValues.rendering;
    it('should have correct container className', ()=>{
      expect(containerClassName).toExist();
      expect(wrapper.props().className).toEqual(containerClassName);
    });

    it('should have correct editor className wrapper', ()=>{
      expect(editorClassName).toExist();
      expect(wrapper.find(`.${editorClassName}`).length).toEqual(1, `${editorClassName} wrapper is not surrounding draft-js editor`);
    });

    it('should have toolbar', ()=>{
      expect(wrapper.find(Toolbar).length).toEqual(1, "Toolbar component is not inside StewieEditor");
    });

    it('should have LinkAccordion component', ()=>{
      const { realComponent } = testConfig;
      realComponent.instance().linkChangeState({ showLinkAccordion: true });
      expect(realComponent.find(LinkAccordion).length).toEqual(1, "Link accordion is not inside StewieEditor");
    });

    it(`should have ${testConfig.stateKey} prop`, ()=>{
      const { realComponent, stateKey } = testConfig;
      expect(realComponent.props()[stateKey]).toExist();
    });

    it('should have correct editorState from draft-js', ()=>{
      expect(wrapper.find(Editor).props().editorState).toExist();
      expect(wrapper.find(Editor).props().editorState).toBeA(EditorState);
    });

    it('should have correct blockRendererFn Function prop', ()=>{
      expect(wrapper.find(Editor).props().blockRendererFn).toExist();
      expect(wrapper.find(Editor).props().blockRendererFn).toBeA(Function);
    });

    it('should have correct blockRenderMap prop', ()=>{
      expect(wrapper.find(Editor).props().blockRenderMap).toExist();
      expect(wrapper.find(Editor).props().blockRenderMap).toEqual(blockRenderMap);
    });

    it('should have correct blockStyleFn prop', ()=>{
      expect(wrapper.find(Editor).props().blockStyleFn).toExist();
      expect(wrapper.find(Editor).props().blockStyleFn).toEqual(blockStyleFn);
    });


    it('blockRenderMap should support hr custom block', ()=>{
      expect(blockRenderMap.get('hr')).toExist();
    });

    it('should contain draft-js-plugins-editor-wysiwyg Editor component', ()=> {
      expect(wrapper.find(Editor).length).toBe(1, "Editor component should be rendered inside StewieEditor");
    });

    it('should have plugins prop on draft-js editor with correct length', ()=>{
      expect(wrapper.find(Editor).props().plugins).toExist();
      expect(wrapper.find(Editor).props().plugins.length).toBe(1);
    });

    describe('Check react-redux bindings', ()=>{
      it('check container wrapper for relevant actions and statekey', ()=>{
        const { stateKey, actions, connectedComponent } = testConfig;
        const componentProps = connectedComponent.props();
        const propsToCheck = {
          stateKey: connectedComponent.props()[stateKey],
          actions: Object.keys(actions).filter((action)=>{
            return typeof componentProps[action] === 'function';
          })
        };
        expect(propsToCheck.stateKey).toExist();
        expect(propsToCheck.actions.length).toEqual(Object.keys(actions).length);
      });
      it('should call "changeState" action on state change', ()=>{
        const changeStateAction = expect.createSpy();
        const stewieWrapper = shallow(<StewieEditor changeState={ changeStateAction } { ...reduxConnectionMock }/>);
        stewieWrapper.find(Editor).simulate('change', 'test text');
        expect(testConfig.actions.changeState).toHaveBeenCalled();
      });
    });
  });

  describe('prop-method required couples on <Editor/> and <StewieEditor/> wrapper', ()=>{
    describe('onChange prop - changeState method', ()=>{
      it('should have onChange prop on inner editor', ()=>{
        const { realComponent: realEditor } = testConfig;
        expect(realEditor.find(Editor).props().onChange).toExist();
      });
      it('should have changeState method', ()=>{
        expect(wrapper.instance().changeState).toExist();
      });
      it('should trigger StewieEditor change state action when typing in inner <Editor/>', ()=>{
        const changeStateAction = expect.createSpy();
        const stewieWrapper = shallow(<StewieEditor changeState={ changeStateAction } { ...reduxConnectionMock }/>);
        stewieWrapper.find(Editor).simulate('change', 'test text');
        expect(changeStateAction).toHaveBeenCalled();
      });
    });

    describe('handleKeyCommand prop - method', ()=>{
      it('should have handleKeyCommand prop', ()=>{
        const { realComponent: realEditor } = testConfig;
        expect(realEditor.find(Editor).props().handleKeyCommand).toExist();
      });
      it('should have handleKeyCommand method', ()=>{
        expect(wrapper.instance().changeState).toExist();
      });
      it('handleKeyCommand method should call changeState action three times and should get correct state from RichUtils', ()=>{
        let calledStateResults = [];
        const changeStateAction = (editorState) => {
          calledStateResults.push(editorState._immutable.inlineStyleOverride);
        };
        const stewieWrapper = shallow(<StewieEditor changeState={ changeStateAction } { ...reduxConnectionMock }/>);
        const commands = [
          'bold', 'italic', 'underline'
        ];
        commands.map(command => {
          stewieWrapper.instance().handleKeyCommand(command);
        });

        const expectedInlineStyleOverride = commands.map(command => OrderedSet.fromKeys({ [command.toUpperCase()]: command.toUpperCase() }));
        expect(calledStateResults).toEqual(expectedInlineStyleOverride);
      });
    });
  });
});