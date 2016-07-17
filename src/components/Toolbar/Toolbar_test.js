import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import Toolbar, { toolbarClassNames } from '.';
import StewieEditorComponent, { StewieEditor } from '../StewieEditor';
import appStore from '../../appStore';
import { defaultButtonsConfig } from './config';
import { EditorState } from 'draft-js';
const expectedValues = {
  rendering: {
    toolbarClassNames
  }
};

const reduxConnectionMock = {
  editor: {
    editorState: EditorState.createEmpty(),
    buttonsConfig: {
      ...defaultButtonsConfig,
      configured: true
    }
  },
  app: {
    init: true
  }
};
//
const testConfig = {
  editorActions: {
    changeState: expect.createSpy()
  },
  get shallowContainer(){
    return shallow(<StewieEditor { ...this.editorActions } { ...reduxConnectionMock }/>);
  },
  get realConnectedToolbar(){
    return mount(<StewieEditorComponent { ...this.editorActions } store={ appStore }/>).find(Toolbar);
  }
};

describe('(components/Toolbar/Toolbar_test.js) - Toolbar test', ()=>{
  let wrapper;
  let toolbar;
  beforeEach(()=>{
    wrapper = testConfig.shallowContainer.find(Toolbar).shallow();
    toolbar = shallow(<Toolbar/>);
  });
  describe('Basic Rendering', ()=>{
    const { toolbarClassNames: { container: containerClassName } } = expectedValues.rendering;
    it('should have correct container className', ()=>{
      expect(containerClassName).toExist();
      expect(wrapper.props().className).toEqual(containerClassName);
    });
    it('should have alignmentToggle, linkToggle, blockToggle and inlineToggle functions', ()=>{
      expect(toolbar.instance()).toIncludeKeys(['alignmentToggle', 'inlineToggle', 'blockToggle']);
    });
  });

  describe('StewieEditor - Toolbar connection', ()=>{
    describe('Check callbacks are passed as props', ()=>{
      it('check toolbar onToggle action passed as prop', ()=>{
        const { shallowContainer } = testConfig;
        expect(shallowContainer.find(Toolbar).props().onToggle).toExist();
      });

      it('check toolbar editorState passed as prop', ()=>{
        const { shallowContainer } = testConfig;
        expect(shallowContainer.find(Toolbar).props().editorState).toExist();
      });

      it('check relevant functions exist on container instance', ()=>{
        const { shallowContainer } = testConfig;
        const componentProps = shallowContainer.instance();
        expect(componentProps.toggleToolbarButton).toExist();
      });

      describe('check changeState action is thrown when executing onToggle with Editor State', ()=>{
        it('should throw changeState action', () =>{
          const changeStateSpy = expect.createSpy();
          const container = shallow(
            <StewieEditor app={ { init: true } } changeState={ changeStateSpy }
              editor={ { editorState: EditorState.createEmpty() } }
            />);
          container.find(Toolbar).props().onToggle(EditorState.createEmpty());
          expect(changeStateSpy).toHaveBeenCalled();
        });
      });

      describe('Relevant toggleFunctions work properly', ()=>{
        let getToolbar;
        beforeEach(()=>{
          getToolbar = (toggleSpy) => { return shallow(<Toolbar onToggle={ toggleSpy } toggleAlignment={ ()=>{} } editorState={ EditorState.createEmpty() }/>); };
        });
        it('blockToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().blockToggle).toExist();
        });
        it('blockToggle should return EditorState', ()=>{
          let blockToggle = expect.createSpy();
          getToolbar(blockToggle).instance().blockToggle('unordered-list-item');
          expect(blockToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
        it('inlineToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().inlineToggle).toExist();
        });
        it('inlineToggle should return EditorState', ()=>{
          let inlineToggle = expect.createSpy();
          getToolbar(inlineToggle).instance().inlineToggle('BOLD');
          expect(inlineToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
        it('alignmentToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().alignmentToggle).toExist();
        });
        it('alignmentToggle should return EditorState', ()=>{
          let alignmentToggle = expect.createSpy();
          getToolbar(alignmentToggle).instance().alignmentToggle('unordered-list-item');
          expect(alignmentToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
        it('hrToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().customBlockToggle).toExist();
        });
        it('hrToggle should return EditorState', ()=>{
          let hrToggle = expect.createSpy();
          getToolbar(hrToggle).instance().customBlockToggle('hr');
          expect(hrToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
        it('isButtonActivePredicate function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().isButtonActivePredicate).toExist();
        });
        it('isButtonActivePredicate should return true when for BOLD inline', ()=>{
          let isButtonActivePredicate = expect.createSpy();
          let inlineToggle = expect.createSpy();
          getToolbar(inlineToggle).instance().inlineToggle('BOLD');
          let toolbarToggledBold = shallow(<Toolbar onToggle={ isButtonActivePredicate } editorState={ inlineToggle.calls[0].arguments[0] }/>);
          expect(toolbarToggledBold.instance().isButtonActivePredicate('inline', 'BOLD')).toBeTruthy();
        });
        it('isButtonActivePredicate should return true for unordered-list-item block', ()=>{
          let isButtonActivePredicate = expect.createSpy();
          let blockToggle = expect.createSpy();
          getToolbar(blockToggle).instance().blockToggle('unordered-list-item');
          let toolbarToggledUL = shallow(<Toolbar onToggle={ isButtonActivePredicate } editorState={ blockToggle.calls[0].arguments[0] }/>);
          expect(toolbarToggledUL.instance().isButtonActivePredicate('block', 'unordered-list-item')).toBeTruthy();
        });
      });
    });
  });
});