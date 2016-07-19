import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import Toolbar, { toolbarClassNames, populateToolbarButtons as toolbarButtonsPopulator } from '.';
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
  id: 'id',
  editor: {
    editorState: EditorState.createEmpty(),
    buttonsConfig: {
      ...defaultButtonsConfig,
      configured: true
    },
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
  }
};

const getToolbar = (toggleSpy) => shallow(
  <Toolbar
    onToggle={ toggleSpy }
    toggleAlignment={ ()=>{} }
    editorState={ EditorState.createEmpty() }
  />);

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
    });

    describe('check changeState action is thrown when executing onToggle with Editor State', ()=>{
      it('should throw changeState action', () =>{
        const changeStateSpy = expect.createSpy();
        const container = shallow(
          <StewieEditor id="id" changeState={ changeStateSpy }
            editor={ { editorState: EditorState.createEmpty(), init: true } }
          />);
        container.find(Toolbar).props().onToggle(EditorState.createEmpty());
        expect(changeStateSpy).toHaveBeenCalled();
      });
    });

    describe('Toolbar auxilary methods', ()=>{
      describe('isButtonActivePredicate', ()=>{
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
      describe('populateToolbarButtons', ()=>{
        it('should return correct toolbars for defaultButtonsConfig', ()=>{
          const noop = ()=>{};
          const populateToolbarButtons = toolbarButtonsPopulator;
          expect(
            JSON
            .stringify(
              populateToolbarButtons(
                defaultButtonsConfig, {
                  inlineToggle: noop,
                  alignmentToggle: noop,
                  blockToggle: noop,
                  linkToggle: noop,
                  customBlockToggle: noop
                }, () => true
              )
            )
          ).toEqual('[{"key":"B","ref":null,"props":{"blockType":"BOLD","controlType":"inline","label":"B","active":true,"children":"B"},"_owner":null},{"key":"I","ref":null,"props":{"blockType":"ITALIC","controlType":"inline","label":"I","active":true,"children":"I"},"_owner":null},{"key":"U","ref":null,"props":{"blockType":"UNDERLINE","controlType":"inline","label":"U","active":true,"children":"U"},"_owner":null},{"key":"UL","ref":null,"props":{"blockType":"unordered-list-item","controlType":"block","label":"UL","active":true,"children":"UL"},"_owner":null},{"key":"OL","ref":null,"props":{"blockType":"ordered-list-item","controlType":"block","label":"OL","active":true,"children":"OL"},"_owner":null},{"type":"div","key":"TEXT","ref":null,"props":{"className":"toolbar__menu","children":[{"type":"label","key":null,"ref":null,"props":{"className":"toolbar__menuLabel","children":"Text menu"},"_owner":null},{"type":"div","key":null,"ref":null,"props":{"className":"toolbar__menu__container","children":[{"key":"NT","ref":null,"props":{"controlType":"block","label":"Normal Text","blockType":"unstyled","active":true,"isMenuButton":true,"children":"NT"},"_owner":null},{"key":"Q","ref":null,"props":{"controlType":"block","label":"Quote","blockType":"blockquote","active":true,"isMenuButton":true,"children":"Q"},"_owner":null},{"key":"H1","ref":null,"props":{"controlType":"block","label":"Header 1","blockType":"header-one","active":true,"isMenuButton":true,"children":"H1"},"_owner":null},{"key":"H2","ref":null,"props":{"controlType":"block","label":"Header 2","blockType":"header-two","active":true,"isMenuButton":true,"children":"H2"},"_owner":null},{"key":"H3","ref":null,"props":{"controlType":"block","label":"Header 3","blockType":"header-three","active":true,"isMenuButton":true,"children":"H3"},"_owner":null},{"key":"H4","ref":null,"props":{"controlType":"block","label":"Header 4","blockType":"header-four","active":true,"isMenuButton":true,"children":"H4"},"_owner":null},{"key":"H5","ref":null,"props":{"controlType":"block","label":"Header 5","blockType":"header-five","active":true,"isMenuButton":true,"children":"H5"},"_owner":null},{"key":"H6","ref":null,"props":{"controlType":"block","label":"Header 6","blockType":"header-six","active":true,"isMenuButton":true,"children":"H6"},"_owner":null}]},"_owner":null}]},"_owner":null},{"type":"div","key":"ALIGNMENT","ref":null,"props":{"className":"toolbar__menu","children":[{"type":"label","key":null,"ref":null,"props":{"className":"toolbar__menuLabel","children":"alignment"},"_owner":null},{"type":"div","key":null,"ref":null,"props":{"className":"toolbar__menu__container","children":[{"key":"AL","ref":null,"props":{"controlType":"alignment","label":"Align Left","blockType":"left","active":true,"isMenuButton":true,"children":"AL"},"_owner":null},{"key":"AC","ref":null,"props":{"controlType":"alignment","label":"Align Center","blockType":"center","active":true,"isMenuButton":true,"children":"AC"},"_owner":null},{"key":"AR","ref":null,"props":{"controlType":"alignment","label":"Align Right","blockType":"right","active":true,"isMenuButton":true,"children":"AR"},"_owner":null}]},"_owner":null}]},"_owner":null},{"type":"div","key":"LINK","ref":null,"props":{"className":"toolbar__menu","children":[{"type":"label","key":null,"ref":null,"props":{"className":"toolbar__menuLabel","children":"Link"},"_owner":null},{"type":"div","key":null,"ref":null,"props":{"className":"toolbar__menu__container","children":[{"key":"LINK","ref":null,"props":{"controlType":"link","label":"Add Link","blockType":"add","active":true,"isMenuButton":true,"children":"LINK"},"_owner":null},{"key":"UNLINK","ref":null,"props":{"controlType":"link","label":"Remove Link","blockType":"remove","active":true,"isMenuButton":true,"children":"UNLINK"},"_owner":null}]},"_owner":null}]},"_owner":null},{"key":"HR","ref":null,"props":{"controlType":"customBlock","label":"---","blockType":"hr","active":true,"children":"HR"},"_owner":null}]');
        })
      });
    });
    describe('Relevant toggleFunctions work properly', ()=>{
      describe('blockToggle tests', ()=>{
        it('blockToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().blockToggle).toExist();
        });
        it('blockToggle should return EditorState', ()=>{
          let blockToggle = expect.createSpy();
          getToolbar(blockToggle).instance().blockToggle('unordered-list-item');
          expect(blockToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
      });
      describe('inlineToggle tests', ()=>{
        it('inlineToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().inlineToggle).toExist();
        });
        it('inlineToggle should return EditorState', ()=>{
          let inlineToggle = expect.createSpy();
          getToolbar(inlineToggle).instance().inlineToggle('BOLD');
          expect(inlineToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
      });
      describe('alignmentToggle tests', ()=>{
        it('alignmentToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().alignmentToggle).toExist();
        });
        it('alignmentToggle should return EditorState', ()=>{
          let alignmentToggle = expect.createSpy();
          getToolbar(alignmentToggle).instance().alignmentToggle('unordered-list-item');
          expect(alignmentToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
      });
      describe('linkToggle tests', ()=>{
        it('linkToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().linkToggle).toExist();
        });
        it('linkToggle should execute linkToggle function (open accordion) when added', ()=>{
          let linkToggle = expect.createSpy();
          const mockedToolbar = shallow(
            <Toolbar onToggle={ () => {} } toggleAlignment={ ()=>{} }
              linkToggle={ linkToggle } editorState={ EditorState.createEmpty() }
            />
          );
          mockedToolbar.instance().linkToggle('add');
          expect(linkToggle).toHaveBeenCalled();
        });
        it('linkToggle should return EditorState when removed', ()=>{
          let onToggle = expect.createSpy();
          getToolbar(onToggle).instance().alignmentToggle('unordered-list-item');
          expect(onToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
      });
      describe('hrToggle tests', ()=>{
        it('hrToggle function should exist', ()=>{
          expect(getToolbar(expect.createSpy()).instance().customBlockToggle).toExist();
        });
        it('hrToggle should return EditorState', ()=>{
          let hrToggle = expect.createSpy();
          getToolbar(hrToggle).instance().customBlockToggle('hr');
          expect(hrToggle.calls[0].arguments[0].constructor).toBe(EditorState);
        });
      });
    });
  });
});