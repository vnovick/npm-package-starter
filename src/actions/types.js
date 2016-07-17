// A list of all actions in the system.
import { createTypes } from 'reduxsauce';

export default createTypes(`
  CONFIGURE_EDITOR
  MOUNT_EDITOR
  EDITOR_CHANGE_STATE
  EDITOR_TRANSFORM_TO_RAW_STATE
  CONFIGURE_TOOLBAR
  UPDATE_WORD_COUNT
  UPDATE_CHAR_COUNT
`);

