import Types from './types';
import expect from 'expect';
describe('(actions/types_test.js) - action types test', ()=>{
  const expectedTypes = [
    'CONFIGURE_EDITOR',
    'CONFIGURE_EDITOR_API',
    'GLOBAL_API_CONFIG',
    'CONFIGURATION_ERROR',
    'MOUNT_EDITOR',
    'EDITOR_CHANGE_STATE',
    'EDITOR_TRANSFORM_TO_RAW_STATE',
    'CONFIGURE_TOOLBAR',
    'UPDATE_WORD_COUNT',
    'UPDATE_CHAR_COUNT'
  ];
  it('all Types are defined', ()=>{
    expect(Object.keys(Types).filter(key => expectedTypes.includes(key)).length).toBe(expectedTypes.length);
  });
});