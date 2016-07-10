import React from 'react';
import Editor from '../../src/';

const mockInitialState = JSON.parse('{"entityMap":{},"blocks":[{"key":"f8p5m","text":"initial mocked state","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}');

function getEditor(showMockedInitialState){
  return showMockedInitialState ? <Editor initialState={ mockInitialState }/> : <Editor/>
}
export default () => (
  <div class="basic-editor">
    <h1>Basic Editor</h1>
    { getEditor(false) }
  </div>
);