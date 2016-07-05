import Types from './types';

export const startup = (config) => ({ type: Types.STARTUP, config: config });

export const changeState = (editorState) => ({
  type: Types.EDITOR_CHANGE_STATE,
  editorState
});

export const transformState = (json) => ({
  type: Types.EDITOR_TRANSFORM_TO_RAW_STATE,
  json
});