import 'core-js';
import React from 'react';
import styles from './toolbar.scss';
import addBlock from 'draft-js-dnd-plugin/lib/modifiers/addBlock.js';
import { RichUtils, EditorState, Entity, SelectionState } from 'draft-js';
import autoBind from 'react-autobind';
import { Button } from '../Button';

export const toolbarClassNames = styles;

export function populateToolbarButtons(config, toggleControls, isActive, isMenuButton){
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

class Toolbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showLinkAccordion: false,
    };
    autoBind(this);
  }


  alignmentToggle(direction){
    const { editorState, onToggle, toggleAlignment } = this.props;
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const starBlock = contentState.getBlockForKey(selectionState.getAnchorKey());
    const endBlock = contentState.getBlockForKey(selectionState.getFocusKey());
    const entityKey = Entity.create('ALIGNMENT', 'MUTABLE', { alignment: direction });
    const fullblock = new SelectionState({
      anchorKey: starBlock.getKey(),
      anchorOffset: 0,
      focusKey: endBlock.getKey(),
      focusOffset: selectionState.getEndOffset()
    });
    let newEditorState = RichUtils.toggleLink(editorState, fullblock, entityKey);
    onToggle(EditorState.forceSelection(newEditorState, selectionState));
    // toggleAlignment(direction);
  }

  linkToggle(blockType){
    const { linkToggle, editorState, onToggle } = this.props;
    if (blockType === 'remove') {
      const selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        onToggle(RichUtils.toggleLink(editorState, selection, null));
      }
    }
    if (blockType === 'add') {
      linkToggle({ showLinkAccordion: true });
    }
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
      buttonsConfig && buttonsConfig.configured ?
        <div className={ containerClassName }>
          { populateToolbarButtons(buttonsConfig, { inlineToggle, alignmentToggle, blockToggle, linkToggle, customBlockToggle }, isButtonActivePredicate) }
        </div>
        : false
    );
  }
}

export default Toolbar;
