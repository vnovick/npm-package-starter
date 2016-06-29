import React from 'react';
import { Provider } from 'react-redux';
import appStore from './appStore';
import StewieEditor from './components/StewieEditor/';
import { isDev } from './config/debugSettings';
import { redBoxComponent } from './utils/errorHandling';

function getEditor(){
  const Editor = <Provider store ={ appStore }>
                    <StewieEditor/>
                  </Provider>;
  return isDev ? redBoxComponent(Editor) : Editor;
}

const EditorPublic = () => getEditor();
export default EditorPublic;