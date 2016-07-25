import React from 'react';
import { Provider } from 'react-redux';
import appStore from './appStore';
import StewieEditor from './components/StewieEditor/';
import { startup } from './actions/creators';
import ReactDOM from 'react-dom';
import uniqid from 'uniqid';
import { linkPlugin } from './components/Link';

function getEditor(id, props){
  const composedProps = {
    ...props,
    id
  };
  const Editor = <Provider store ={ appStore }>
                    <StewieEditor { ...composedProps }/>
                  </Provider>;
  return Editor;
}

export class EditorPublic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: uniqid(),
      plugins: [
        linkPlugin()
      ]
    };
  }

  componentDidMount(){
    appStore.dispatch(
      startup(
        this.props,
        this.state.id,
        this.state.plugins
      )
    );
  }
  render(){
    return getEditor(this.state.id, this.props);
  }
}

export const EditorFactory = (selector, config) => ({
  mount: () => {
    const configArray = config.constructor === Array ? config : [ config ];
    document.querySelectorAll(selector).forEach((node, index) => {
      const EditorComponent = !configArray[index] ? <EditorPublic/> : <EditorPublic { ...configArray[index] }/>;
      ReactDOM.render(EditorComponent, node);
    });
  }
});