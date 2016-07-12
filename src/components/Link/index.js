import React from 'react';
import autoBind from 'react-autobind';
import { Entity, RichUtils } from 'draft-js';
import linkStyles from './link.scss';

export const linkClassNames = linkStyles;

export class LinkAccordion extends React.Component {
  constructor(props){
    super(props);
    autoBind(this);
  }

  onUrlChange(e){
    this.props.changeState({
      showLinkAccordion: true,
      urlValue: e.target.value
    });
  }

  componentDidMount(){
    this.refs.url.focus();
  }

  onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  }

  confirmLink(e){
    e.preventDefault();
    const { editorState, urlValue, onConfirm, changeState, editorFocus } = this.props;
    const selection = editorState.getSelection();
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
    changeState({
      showLinkAccordion: false,
      urlValue: ''
    });
    onConfirm(RichUtils.toggleLink(editorState, selection, entityKey));
    setImmediate(() => editorFocus());
  }

  render(){
    const {
      accordion: accordionClassName,
      accordion__label: accordionLabelClassName,
      accordion__input: accordionInputClassName,
      accordion__button: accordionButtonClassName
     } = linkClassNames;
    return (
      <div className={ accordionClassName }>
        <label className={ accordionLabelClassName }>Url</label>
        <input onChange={ this.onUrlChange }
          ref="url"
          type="text"
          value={ this.props.urlValue }
          className= { accordionInputClassName }
          onKeyDown={ this.onLinkInputKeyDown }
        />
        <button onClick={ this.confirmLink } className={ accordionButtonClassName }>
          Confirm
        </button>
      </div>
    );
  }
}


export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export const Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={ url } className={ linkClassNames.decorator }>
      { props.children }
    </a>
  );
};

export const linkPlugin = (config = {}) => {
  return {
    decorators: [{
      strategy: findLinkEntities,
      component: Link
    }]
  };
};
