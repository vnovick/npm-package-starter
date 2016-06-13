import React from 'react';
import { Provider } from 'react-redux';
import appStore from './appStore';
import StewieEditor from './components/StewieEditor';

const EditorPublic = () => {
    return (
      <Provider store={ appStore }>
        <StewieEditor/>
      </Provider>
    )
}
export default EditorPublic