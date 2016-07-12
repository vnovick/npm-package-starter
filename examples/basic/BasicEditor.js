import React from 'react';
import Editor from '../../src/';

const mockInitialState = JSON.parse('{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"asd"}}},"blocks":[{"key":"4fa56","text":"asda sd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":5,"length":2,"key":0}]},{"key":"a26m5","text":"sadasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[]},{"key":"5f17p","text":" as da sdas das d","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":4,"style":"BOLD"}],"entityRanges":[]},{"key":"6isna","text":"asdasdas","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"eq8nt","text":"asdasdasdasd","type":"alignment--center","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"289pq","text":"asdasdasd","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"fe5vp","text":"asdasds","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9l0jq","text":"asdasdasd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5j1nr","text":"","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}');

function getEditor(showMockedInitialState){
  return showMockedInitialState ? <Editor initialState={ mockInitialState }/> : <Editor/>;
}
export default () => (
  <div class="basic-editor">
    <h1>Basic Editor</h1>
    { getEditor(true) }
  </div>
);