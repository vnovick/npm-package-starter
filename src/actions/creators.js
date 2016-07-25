import Types from './types';

export const startup = (config, id, plugins) => ({
  type: Types.CONFIGURE_EDITOR,
  config,
  id,
  plugins
});

export const changeState = (id, editorState, subscribers) => ({
  type: Types.EDITOR_CHANGE_STATE,
  editorState,
  id
});

export const transformState = (id, json) => ({
  type: Types.EDITOR_TRANSFORM_TO_RAW_STATE,
  json,
  id
});

export const configureToolbar = (id, buttonsConfig) => ({
  type: Types.CONFIGURE_TOOLBAR,
  buttonsConfig,
  id
});

export const linkAccordionToggle = (id, linkAccordion) => ({
  type: Types.LINK_ACCORDION_TOGGLE,
  linkAccordion,
  id
});

export const configureEditorApi = (id, subscribers) => ({
  type: Types.CONFIGURE_EDITOR_API,
  id,
  subscribers
});

export const init = (id) => ({
  type: Types.MOUNT_EDITOR,
  id
});

export const updateWordCount = (id, wordCount) => ({
  type: Types.UPDATE_WORD_COUNT,
  wordCount,
  id
});

export const updateCharCount = (id, charCount) => ({
  type: Types.UPDATE_CHAR_COUNT,
  charCount,
  id
});

export const throwConfigurationError = (id, message) => ({
  type: Types.CONFIGURATION_ERROR,
  message,
  id
});

export const globalApiConfig = (id, apiConfig) => ({
  type: Types.GLOBAL_API_CONFIG,
  apiConfig,
  id
});

