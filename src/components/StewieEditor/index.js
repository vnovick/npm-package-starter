import React, { Component } from 'react';
import styles from './StewieEditor.scss';
import Editor from 'draft-js-plugins-editor-wysiwyg';
import { EditorState, RichUtils } from 'draft-js';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { changeState } from '../../actions/creators';
export const editorClassName = styles.container;

export class StewieEditor extends Component {

  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  changeState(editorState){
    this.setState({ editorState });
  }

  handleKeyCommand(command){
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.changeState(newState);
      return true;
    }
    return false;
  }


  render(){
    return (
      <div className={ editorClassName }>
        <Editor editorState={ this.state.editorState } className={ styles['container--test'] }
          onChange={ this.changeState.bind(this) }
          handleKeyCommand={ this.handleKeyCommand }
        />
      </div>
    );
  }
}

export default connect(({ editor })=>({ editor }), { changeState })(StewieEditor)


