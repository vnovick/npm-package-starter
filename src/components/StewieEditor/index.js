import React, { Component } from 'react';
import styles from './StewieEditor.scss';

export const editorClassName = styles.container;

export default class Editor extends Component {

  render(){
    return (<div className={ editorClassName }>
      <div className={ styles['container--test'] }/>
    </div>);
  }
}