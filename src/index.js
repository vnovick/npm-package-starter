import React from 'react';
import { Provider } from 'react-redux';
import appStore from './appStore';
import StewieEditor from './components/StewieEditor/';
import { isDev } from './config/debugSettings';
import { redBoxComponent } from './utils/errorHandling';
import { startup } from './actions/creators';
import ReactDOM from 'react-dom';
import uniqid from 'uniqid';

function getEditor(id, props){
  const composedProps = {
    ...props,
    id
  }
  const Editor = <Provider store ={ appStore }>
                    <StewieEditor { ...composedProps }/>
                  </Provider>;
  return isDev ? redBoxComponent(Editor) : Editor;
}

class EditorPublic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: uniqid()
    };
  }

  componentDidMount(){
    appStore.dispatch(startup(this.props, this.state.id));
  }
  render(){
    return getEditor(this.state.id, this.props);
  }
}

const EditorFactory = (selector, config) => ({
  mount: () => {
    const configArray = config.constructor === Array ? config : [ config ];
    document.querySelectorAll(selector).forEach((node, index) => {
      const EditorComponent = !configArray[index] ? <EditorPublic/> : <EditorPublic { ...configArray[index] }/>;
      ReactDOM.render(EditorComponent, node);
    });
  }
});


((globalObj, factory) => {
  if (typeof exports === "object") {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    globalObj.StewieEditor = factory();
  }
})(this, () => ({ EditorPublic, EditorFactory }));