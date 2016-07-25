import 'babel-polyfill';
import expect from 'expect';
import { watchStartup } from './startupSaga';
import Types from '../actions/types';
import testSaga from 'redux-saga-test-plan';
import { EditorState, convertToRaw } from 'draft-js';
import { linkPlugin } from '../components/Link';
import 'colors';

describe('(sagas/startupSaga_test.js) - test editor sagas', ()=>{
  describe('watchStartup saga test', ()=>{
    let saga;
    beforeEach(()=>{
      saga = testSaga(watchStartup);
    });
    it('watchStartup saga is not throwing exception', ()=>{
      let generator = watchStartup();
      let exception;
      generator.next();
      expect(function() {
        try {
          generator.next({ config: undefined });
        } catch(ex) {
          exception = ex;
          console.log(`
            ${exception}
          `.red)
          throw Error(ex);
        }
      }).toNotThrow();
    });
    it('watchStartup saga can deal with initialState passed in config to startup action', ()=>{
      let expectedState = JSON.parse('{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"asd"}}},"blocks":[{"key":"4fa56","text":"asda sd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":5,"length":2,"key":0}]},{"key":"a26m5","text":"sadasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[]},{"key":"5f17p","text":" as da sdas das d","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":4,"style":"BOLD"}],"entityRanges":[]},{"key":"6isna","text":"asdasdas","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"eq8nt","text":"asdasdasdasd","type":"alignment--center","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"289pq","text":"asdasdasd","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"fe5vp","text":"asdasds","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9l0jq","text":"asdasdasd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5j1nr","text":"","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}');
      let generator = watchStartup();
      generator.next(Types.CONFIGURE_EDITOR);
      const newEditorState = generator.next({ id: 1, config: { initialState: expectedState }, plugins: [linkPlugin()] })
        .value
        .PUT
        .action
        .editorState;
      expect(newEditorState)
        .toBeA(EditorState);
      expect(convertToRaw(newEditorState.getCurrentContent())).toEqual(expectedState);
    });
    it('watchStartup saga can deal with subscribers passed in config to startup action', ()=>{
      let subscribers = {
        api: () => {},
        charCount: () => {},
        state: () => {},
        wordCount: () => {}
      };
      saga
        .next({ type: Types.CONFIGURE_EDITOR, id: 1 })
        .take(Types.CONFIGURE_EDITOR)
        .next({ config: { subscribers }, id: 1 })
        .put({ type: Types.CONFIGURE_EDITOR_API, id: 1, subscribers });
    });
    it('watchStartup saga throws error if subscribers passed as object and not function', ()=>{
      let subscribers = {
        api: {}
      };
      saga
        .next({ type: Types.CONFIGURE_EDITOR })
        .take(Types.CONFIGURE_EDITOR)
        .next({ id: 1, config: { subscribers } })
        .put({ type: Types.CONFIGURATION_ERROR, id: 1, message: "subscribers must be functions, the following subscribers type is incorrect: api" });
    });
    it('watchStartup saga throws MOUNT_EDITOR action', ()=>{
      saga.next({ type: Types.CONFIGURE_EDITOR }).take(Types.CONFIGURE_EDITOR).next({ config: null, id: 1 }).put({ type: Types.MOUNT_EDITOR, id: 1 });
    });
    it('watchStartup saga throws GLOBAL_API_CONFIG action', ()=>{
      const apiConfig = {};
      saga
      .next({ type: Types.CONFIGURE_EDITOR, id: 1 })
      .take(Types.CONFIGURE_EDITOR)
      .next({ config: null, id: 1 })
      .put({ type: Types.MOUNT_EDITOR, id: 1 })
      .next({ id: 1, apiConfig })
      .put({ type: Types.GLOBAL_API_CONFIG, apiConfig, id: 1 });
    });
  });
});