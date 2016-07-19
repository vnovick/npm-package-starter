import 'babel-polyfill';
import expect from 'expect';
import 'colors';
import { EditorState } from 'draft-js';
import Types from '../actions/types';
import testSaga from 'redux-saga-test-plan';
import { watchToolbarConfig } from './toolbarSaga';
import { configureToolbar, throwConfigurationError } from '../actions/creators';
import { defaultButtonsConfig } from '../components/Toolbar/config';
import { validateButtonsConfig } from '../components/Toolbar/utils/configUtils';


describe('(sagas/toolbarSaga_test.js) - test toolbar saga', ()=>{
  describe('Saga structure', ()=>{
    let saga;
    let id;
    beforeEach(()=>{
      saga = testSaga(watchToolbarConfig);
      id = 1;
    });
    let generator;
    let GeneratorFunction;
    beforeEach(()=>{
      GeneratorFunction = function*(){}.constructor;
      generator = watchToolbarConfig();
    });


    it('watchToolbarConfig is generator function', ()=>{
      expect(watchToolbarConfig).toBeA(GeneratorFunction);
    });

    it('watchToolbarConfig triggers CONFIGURE_EDITOR action when buttonsConf passed correctly', ()=>{
      saga
        .next()
        .take(Types.CONFIGURE_EDITOR)
        .next({ config: { buttonsConfig: defaultButtonsConfig }, id })
        .put({
          type: Types.CONFIGURE_TOOLBAR,
          id,
          buttonsConfig: { ...defaultButtonsConfig, configured: true }
        });
    });
    it('watchToolbarConfig triggers CONFIGURE_EDITOR action with defaults when buttonsConf not passed', ()=>{
      saga
        .next()
        .take(Types.CONFIGURE_EDITOR)
        .next({ config: { }, id })
        .put({
          type: Types.CONFIGURE_TOOLBAR,
          id,
          buttonsConfig: { ...defaultButtonsConfig, configured: true }
        });
    });

    it('watchToolbarConfig triggers CONFIGURATION_ERROR action when buttonsConf passed incorrectly', ()=>{
      saga
        .next()
        .take(Types.CONFIGURE_EDITOR)
        .next({ config: { buttonsConfig: {
          buttonsList: ['B', 'A']
        } }, id })
        .put({
          type: Types.CONFIGURATION_ERROR,
          message: {
            message: [ 'A is not defined in buttonsConf' ]
          },
          id
        });
    });
  });
});