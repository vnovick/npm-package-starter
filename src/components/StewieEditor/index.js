import React, { Component } from 'react';
import 'core-js';
import styles from './StewieEditor.scss';
import Editor from 'draft-js-plugins-editor-wysiwyg';
import { RichUtils, DefaultDraftBlockRenderMap, Entity, Modifier, SelectionState, EditorState, contentBlock } from 'draft-js';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { changeState, configureToolbar } from '../../actions/creators';
import Toolbar from '../Toolbar';
import { LinkAccordion, linkPlugin } from '../Link';

export const stewieClassNames = styles;


export function customBlockRender(block, { getEditorState, setEditorState }) {
  const type = block.getType();
  if (type === 'hr') {
    return {
      component: ()=>(<hr/>),
      editable: true
    };
  }
  return null;
}

export const blockStyleFn = block =>{
  const type = block.getType();
  const entityKey = block.getEntityAt(0);
  const { alignment: direction } = entityKey ? Entity.get(entityKey).data : {};
  const blockTypeClassName = stewieClassNames[`block__${type}`];
  const alignmentClassName = stewieClassNames[`block__alignment--${direction}`];
  return `${blockTypeClassName} ${alignmentClassName}`;
};

export const blockRenderMap = DefaultDraftBlockRenderMap.merge({
  hr: {}
});

export const plugins = [
  linkPlugin()
];

export class StewieEditor extends Component {

  constructor(props){
    super(props);
    this.state = {
      showLinkAccordion: false,
      urlValue: '',
      // alignment: 'left'
    };
    autoBind(this);
  }


  changeState(editorState){
    this.props.changeState(editorState);
  }

  // toggleAlignment(alignment){
  //   this.setState({
  //     alignment
  //   });
  // }

  // changeStateWithAlignment(editorState){
  //   const contentState = editorState.getCurrentContent();
  //   const { alignment } = this.state;
  //   const selectionState = editorState.getSelection();
  //   let newEditorState = editorState;
  //   if (selectionState.isCollapsed()){
  //     const block = contentState.getBlockForKey(selectionState.getAnchorKey());
  //     const entityKey = Entity.create('ALIGNMENT', 'MUTABLE', { alignment });
  //     const fullblock = new SelectionState({
  //       anchorKey: block.getKey(),
  //       anchorOffset: 0,
  //       focusKey: block.getKey(),
  //       focusOffset: selectionState.getEndOffset()
  //     });
  //     newEditorState = EditorState.forceSelection(EditorState.push(editorState, Modifier.applyEntity(contentState, fullblock, entityKey)), selectionState);
  //   }
  //   this.changeState(newEditorState);
  // }


  handleKeyCommand(command){
    const newState = RichUtils.handleKeyCommand(this.props.editor.editorState, command);
    if (newState) {
      this.changeState(newState, this.state.alignment);
      return true;
    }
    return false;
  }

  toggleToolbarButton(editorState){
    this.changeState(editorState);
  }

  renderLinkIfisInToolbar(editorState){
    const { showLinkAccordion, urlValue } = this.state;
    if (showLinkAccordion) {
      return <LinkAccordion key="LinkAccordion" editorFocus={ () => { this.refs.editor.focus(); } } editorState={ editorState } urlValue={ urlValue } changeState={ this.linkChangeState }
        onConfirm={ this.toggleToolbarButton }/>;
    }
    return false;
  }

  linkChangeState(linkState){
    this.setState(linkState);
  }

  render(){
    const { editor: { buttonsConfig, editorState }, app: { init } } = this.props;
    return (
      <div className={ stewieClassNames.container }>
        { init ? [
          <Toolbar key="toolbar" linkToggle={ this.linkChangeState } onToggle={ this.toggleToolbarButton }
            configureToolbar={ this.props.configureToolbar }
            buttonsConfig={ buttonsConfig } editorState={ editorState }
          />,
          this.renderLinkIfisInToolbar(editorState),
          <div key="StewieEditor" className={ stewieClassNames.editor }>
               <Editor editorState={ editorState }
                 blockStyleFn={ blockStyleFn }
                 blockRendererFn={ customBlockRender }
                 blockRenderMap={ blockRenderMap }
                 onChange={ this.changeState }
                 handleKeyCommand={ this.handleKeyCommand }
                 ref="editor"
                 plugins={ plugins }
               />
           </div> ]
           : false
        }
      </div>
    );
  }
}

export default connect(({ editor, app })=>({ editor, app }), { changeState, configureToolbar })(StewieEditor);


