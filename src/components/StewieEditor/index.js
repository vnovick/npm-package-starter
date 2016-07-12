import React, { Component } from 'react';
import styles from './StewieEditor.scss';
import Editor from 'draft-js-plugins-editor-wysiwyg';
import { RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { changeState, configureToolbar } from '../../actions/creators';
import Toolbar from '../Toolbar';
import { LinkAccordion, linkPlugin } from '../Link';

export const stewieClassNames = styles;

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

export const blockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  return stewieClassNames[`blockType__${type}`];
};

export const blockRenderMap = DefaultDraftBlockRenderMap.merge({
  hr: {},
  'alignment--left': {
    element: 'div'
  },
  'alignment--center': {
    element: 'div'
  },
  'alignment--right': {
    element: 'div'
  }
});

export const plugins = [
  linkPlugin()
];

export class StewieEditor extends Component {

  constructor(props){
    super(props);
    this.state = {
      showLinkAccordion: false,
      urlValue: ''
    };
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

  toggleToolbarButton(editorState){
    this.changeState(editorState);
  }

  renderLinkIfisInToolbar(editorState){
    const { showLinkAccordion, urlValue } = this.state;
    if (showLinkAccordion) {
      return <LinkAccordion editorFocus={ () => { this.refs.editor.focus(); } } editorState={ editorState } urlValue={ urlValue } changeState={ this.linkChangeState }
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
        <Toolbar linkToggle={ this.linkChangeState } onToggle={ this.toggleToolbarButton }
          configureToolbar={ this.props.configureToolbar }
          buttonsConfig={ buttonsConfig } editorState={ editorState }
        />
      { this.renderLinkIfisInToolbar(editorState) }
      <div className={ stewieClassNames.editor }>
         { init ?
           <Editor editorState={ editorState }
             blockStyleFn={ blockStyleFn }
             blockRendererFn={ customBlockRender }
             blockRenderMap={ blockRenderMap }
             onChange={ this.changeState }
             handleKeyCommand={ this.handleKeyCommand }
             ref="editor"
             plugins={ plugins }
           />
           : false }
        </div>
      </div>
    );
  }
}

export default connect(({ editor, app })=>({ editor, app }), { changeState, configureToolbar })(StewieEditor);


