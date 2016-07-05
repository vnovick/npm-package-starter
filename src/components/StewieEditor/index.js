import React, { Component } from 'react';
import styles from './StewieEditor.scss';
import Editor from 'draft-js-plugins-editor-wysiwyg';
import { RichUtils, convertFromRaw } from 'draft-js';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { changeState } from '../../actions/creators';

export const stewieClassNames = styles;

export class StewieEditor extends Component {

  constructor(props){
    super(props);
    autoBind(this);
  }

  changeState(editorState){
    this.props.changeState(editorState);
  }

  handleKeyCommand(command){
    const newState = RichUtils.handleKeyCommand(this.props.editor.editorState, command);
    if (newState) {
      this.changeState(newState);
      return true;
    }
    return false;
  }


  render(){
    return (
      <div className={ stewieClassNames.container }>
        <div className={ stewieClassNames.editor }>
          <Editor editorState={ this.props.editor.editorState }
            onChange={ this.changeState.bind(this) }
            handleKeyCommand={ this.handleKeyCommand.bind(this) } className={ stewieClassNames.editor }
          />
        </div>
      </div>
    );
  }
}

export default connect(({ editor })=>({ editor }), { changeState })(StewieEditor);


