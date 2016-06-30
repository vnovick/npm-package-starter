import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import StewieEditorComponent, { StewieEditor, editorClassName } from '.';
import Editor from 'draft-js-plugins-editor-wysiwyg';
import { OrderedSet } from 'immutable';
import appStore from '../../appStore';
const expectedValues = {
  rendering: {
    editorClassName
  }
};

const testConfig = {
  actions: {
    changeState: expect.createSpy()
  },
  stateKey: 'editor',
  get shallowComponent() {
    return shallow(<StewieEditor { ...this.actions }/>);
  },
  get realComponent(){
    return mount(<StewieEditor { ...this.actions }/>);
  },
  get connectedComponent(){
    return shallow(<StewieEditorComponent store={ appStore }/>).find(StewieEditor);
  }
};

describe('(components/StewieEditor_test.js) - StewieEditor test', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = testConfig.shallowComponent;
  });

  describe('Basic Rendering', ()=>{
    const { editorClassName: className } = expectedValues.rendering;
    it('should import correct className', ()=>{
      expect(className).toExist();
      expect(wrapper.props().className).toEqual(className);
    });

    it('should have correct editorState from draft-js', ()=>{
      expect(wrapper.state()).toExist();
      expect(wrapper.state()).toIncludeKey('editorState');
    });

    it('should contain draft-js-plugins-editor-wysiwyg Editor component', ()=> {
      expect(wrapper.find(Editor).length).toBe(1, "Editor component should be rendered inside StewieEditor");
    });

    describe('Check react-redux bindings',()=>{
      it('check container wrapper for relevant actions and statekey',()=>{
        const { stateKey, actions, connectedComponent } = testConfig;
        const componentProps = connectedComponent.props();
        const propsToCheck = {
          stateKey: connectedComponent.props()[stateKey],
          actions: Object.keys(actions).filter((action)=>{
            return typeof componentProps[action] === 'function'
          })
        }
        expect(propsToCheck.stateKey).toExist();
        expect(propsToCheck.actions.length).toEqual(Object.keys(actions).length);
      });
    });
  });

  describe('prop-method required couples on <Editor/> and <StewieEditor/> wrapper', ()=>{
    describe('onChange prop - changeState method', ()=>{
      it('should have onChange prop on inner editor', ()=>{
        const { realComponent: realEditor } = testConfig
        expect(realEditor.find(Editor).props().onChange).toExist();
      });
      it('should have changeState method', ()=>{
        expect(wrapper.instance().changeState).toExist();
      });
      it('should change StewieEditor state when typing in inner <Editor/>', ()=>{
        wrapper.find(Editor).simulate('change', 'test text');
        expect(wrapper.state().editorState).toBe('test text');
      })
    });

    describe('handleKeyCommand prop - method', ()=>{
      it('should have handleKeyCommand prop', ()=>{
        const { realComponent: realEditor } = testConfig
        expect(realEditor.find(Editor).props().handleKeyCommand).toExist();
      });
      it('should have handleKeyCommand method', ()=>{
        expect(wrapper.instance().changeState).toExist();
      });
      it('handleKeyCommand method should change editor state correctly',()=>{
        const commands = [
          'bold', 'italic', 'underline'
        ]
        const hasAnyErrorOnCommandInvocation = commands.map(command =>
          wrapper.instance().handleKeyCommand(command)
        )

        const expectedInlineStyleOverride = OrderedSet.fromKeys(commands.reduce((acc, value)=>{
          return {
            ...acc,
            [value.toUpperCase()]: value.toUpperCase()
          }
        }, {}))
        expect(wrapper.state().editorState._immutable.inlineStyleOverride).toEqual(expectedInlineStyleOverride);
      })
    });
  });

});