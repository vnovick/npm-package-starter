import React from 'react';
import styles from './toolbar.scss';
import addBlock from 'draft-js-dnd-plugin/lib/modifiers/addBlock.js';
import { defaultButtonsConfig } from './config';
import { validateButtonsConfig } from './utils/configUtils';
import 'core-js';
import { RichUtils } from 'draft-js';
import autoBind from 'react-autobind';
import { Button } from '../Button';
export const toolbarClassNames = styles;
function populateToolbarButtons(config, toggleControls, isActive, isMenuButton){
  const { buttonsList, buttonsConf } = config;
  return buttonsList.map((button) => {
    const bConf = buttonsConf[button];
    const active = isActive(bConf.controlType, bConf.blockType);
    const buttonProps = { ...bConf, active, toggle: toggleControls[`${bConf.controlType}Toggle`], isMenuButton };
    return bConf.controlType !== 'menu' ? <Button key={ button } { ...buttonProps }>{ button }</Button> :
      <div key={ button } className={ toolbarClassNames.menu }>
        <label className={ toolbarClassNames.menuLabel }>{ bConf.label }</label>
        <div className={ toolbarClassNames.menu__container }>
          { populateToolbarButtons({ buttonsConf: bConf.buttons, buttonsList: Object.keys(bConf.buttons) }, toggleControls, isActive, true) }
        </div>
      </div>;
  });
}

function validateAndPopulateButtons(config, toggleControls, isButtonActive){
  if (config) {
    const { buttonsConf } = config;
    const errors = validateButtonsConfig(buttonsConf);
    if (errors.length === 0) {
      return populateToolbarButtons(config, toggleControls, isButtonActive);
    }
    throw Error(errors);
  }
  return false;
}

class Toolbar extends React.Component {

  constructor(props){
    super(props);
    autoBind(this);
  }

  componentDidMount(){
    const { configureToolbar, buttonsConfig } = this.props;
    configureToolbar(buttonsConfig || defaultButtonsConfig);
  }

  alignmentToggle(blockType){
    console.log('alignment', blockType)
  }
  linkToggle(blockType){
    console.log('link', blockType)
  }

  customBlockToggle(blockType){
    const { editorState, onToggle } = this.props;
    const selection = editorState.getSelection();
    onToggle(addBlock(editorState, selection, blockType));
  }

  blockToggle(blockType, e){
    const { onToggle, editorState } = this.props;
    onToggle(RichUtils.toggleBlockType(editorState, blockType));
  }
  inlineToggle(blockType, e){
    const { onToggle, editorState } = this.props;
    onToggle(RichUtils.toggleInlineStyle(editorState, blockType));
  }

  isButtonActivePredicate(controlType, blockType) {
    const { editorState } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const currentBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    switch (controlType) {
      case 'inline':
        return currentStyle.has(blockType);
      case 'block':
        return currentBlockType === blockType;
      default:
        return false;
    }
  }

  render(){
    const { container: containerClassName } = toolbarClassNames;
    const { buttonsConfig } = this.props;
    const { inlineToggle, alignmentToggle, blockToggle, linkToggle, isButtonActivePredicate, customBlockToggle } = this;
    return (
      <div className={ containerClassName }>
        { validateAndPopulateButtons(buttonsConfig, { inlineToggle, alignmentToggle, blockToggle, linkToggle, customBlockToggle }, isButtonActivePredicate) }
      </div>
    );
  }
}

export default Toolbar
