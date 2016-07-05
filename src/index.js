import React from 'react';
import { Provider } from 'react-redux';
import appStore from './appStore';
import StewieEditor from './components/StewieEditor/';
import { isDev } from './config/debugSettings';
import { redBoxComponent } from './utils/errorHandling';
import { startup } from './actions/creators';

function getEditor(props){
  const Editor = <Provider store ={ appStore }>
                    <StewieEditor { ...props }/>
                  </Provider>;
  return isDev ? redBoxComponent(Editor) : Editor;
}

class EditorPublic extends React.Component {

  componentDidMount(){
    appStore.dispatch(startup(this.props));
  }
  render(){
    return getEditor();
  }
}

export default EditorPublic;