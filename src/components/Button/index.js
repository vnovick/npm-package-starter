import React from 'react';
import 'core-js';
import styles from './button.scss';

export const buttonClassNames = styles;
const { menu, simple, ['simple--active']: simpleButtonActiveClassName, ['menu--active']: menuButtonActiveClassName } = buttonClassNames;


export const Button = ({ toggle, blockType, active, label, controlType, isMenuButton }) => {
  const bClassName = isMenuButton ? `${menu} ${menu}--${blockType}` : `${simple} ${simple}--${blockType}`;
  const buttonActiveClassName = isMenuButton ? menuButtonActiveClassName : simpleButtonActiveClassName;
  const className = active ? `${bClassName} ${buttonActiveClassName}` : bClassName;
  return (
    <button className={ className }
      onMouseDown={ (e) => {
        e.preventDefault();
        toggle(blockType);
      } }
    >
        { label }
    </button>
  );
};