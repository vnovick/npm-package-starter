const actionTypes = `
  CONFIGURE_EDITOR
  CONFIGURE_EDITOR_API
  GLOBAL_API_CONFIG
  CONFIGURATION_ERROR
  MOUNT_EDITOR
  EDITOR_CHANGE_STATE
  EDITOR_TRANSFORM_TO_RAW_STATE
  CONFIGURE_TOOLBAR
  UPDATE_WORD_COUNT
  UPDATE_CHAR_COUNT
`;


const createTypes = (types)=> types.split('\n').reduce((acc, actionType) => {
  const type = actionType.trim();
  return type.length ? { ...acc, [type]: type } : acc;
});


export default createTypes(actionTypes);

