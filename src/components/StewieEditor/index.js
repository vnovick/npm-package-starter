import React, { Component } from 'react';
import styles from './StewieEditor.scss';
import Editor from 'draft-js-plugins-editor-wysiwyg';
import { RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { changeState, configureToolbar } from '../../actions/creators';
import Toolbar from '../Toolbar';
import createFocusPlugin from 'draft-js-focus-plugin';
export const stewieClassNames = styles;
export const plugins = [
  createFocusPlugin({})
];


export function customBlockRender(contentBlock, { getEditorState, setEditorState }) {
  const type = contentBlock.getType();
  if (type === 'hr') {
    return {
      component: ()=>(<hr/>),
      editable: true
    };
  }
  return null;
}

export const blockRenderMap = DefaultDraftBlockRenderMap.merge({
  hr: {},
});

export class StewieEditor extends Component {

  constructor(props){
    super(props);
    autoBind(this);
  }

  changeState(editorState){
    this.props.changeState(editorState);
    this.setState({
      editorState
    });
  }

  handleKeyCommand(command){
    const newState = RichUtils.handleKeyCommand(this.props.editor.editorState, command);
    if (newState) {
      this.changeState(newState);
      return true;
    }
    return false;
  }

  toggleToolbarButton(editorState){
    this.changeState(editorState);
  }


  render(){
    const { editor: { buttonsConfig }, editor: { editorState } } = this.props;
    return (
      <div className={ stewieClassNames.container }>
        <Toolbar onToggle={ this.toggleToolbarButton } configureToolbar={ this.props.configureToolbar }
          buttonsConfig={ buttonsConfig } editorState={ editorState }
        />
      <div className={ stewieClassNames.editor }>
          <Editor editorState={ editorState }
            blockRendererFn={ customBlockRender }
            blockRenderMap={ blockRenderMap }
            onChange={ this.changeState }
            handleKeyCommand={ this.handleKeyCommand }
            ref="editor"
            plugins={ plugins }
          />
        </div>
      </div>
    );
  }
}

export default connect(({ editor })=>({ editor }), { changeState, configureToolbar })(StewieEditor);


