import Types from './types';

export const startup = (config) => ({ type: Types.CONFIGURE_EDITOR, config: config });

export const changeState = (editorState, subscribers) => ({
  type: Types.EDITOR_CHANGE_STATE,
  editorState
});

export const transformState = (json) => ({
  type: Types.EDITOR_TRANSFORM_TO_RAW_STATE,
  json
});

export const configureToolbar = (buttonsConfig, showLink) => ({
  type: Types.CONFIGURE_TOOLBAR,
  buttonsConfig
});


export const configureEditorApi = (subscribers) => ({
  type: Types.CONFIGURE_EDITOR_API,
  subscribers
});

export const init = (predicate) => ({
  type: Types.MOUNT_EDITOR,
  init: predicate
});

export const updateWordCount = (wordCount) => ({
  type: Types.UPDATE_WORD_COUNT,
  wordCount
});

export const updateCharCount = (charCount) => ({
  type: Types.UPDATE_CHAR_COUNT,
  charCount
});

export const throwConfigurationError = (message) => ({
  type: Types.CONFIGURATION_ERROR,
  message
});

export const globalApiConfig = (apiConfig) => ({
  type: Types.GLOBAL_API_CONFIG,
  apiConfig
});

