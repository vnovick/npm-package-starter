// A list of all actions in the system.
import { createTypes } from 'reduxsauce';

export default createTypes(`
  STARTUP
  INIT
  EDITOR_CHANGE_STATE
  EDITOR_TRANSFORM_TO_RAW_STATE
  CONFIGURE_TOOLBAR
`);

