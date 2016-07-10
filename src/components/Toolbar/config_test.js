import 'babel-polyfill';
import expect from 'expect';
import { defaultButtonsConfig, ALLOWED_CONTROL_TYPES, ALLOWED_BLOCK_TYPES } from './config';
import { validateButtonsConfig } from './utils/configUtils';

describe('(components/Toolbar/config_test.js) - Toolbar config test', ()=>{
  describe('defaultButtonsConfig test', ()=>{
    it('should be in correct format', ()=>{
      expect(defaultButtonsConfig).toBeA(Object);
    });
    it('should have buttonsList and buttonsConf props', ()=>{
      expect(defaultButtonsConfig).toIncludeKeys(['buttonsConf', 'buttonsList']);
    });
    it('all configuration should be provided for buttonsList', ()=>{
      const { buttonsConf, buttonsList } = defaultButtonsConfig;
      expect(Object.keys(buttonsConf)).toEqual(buttonsList);
    });
    it(`all controlTypes are on of the following types: ${ALLOWED_CONTROL_TYPES.join(',')} and blockTypes are of ${ALLOWED_BLOCK_TYPES}`, ()=>{
      const { buttonsConf } = defaultButtonsConfig;
      let errorArray = validateButtonsConfig(buttonsConf);
      expect(errorArray).toEqual([]);
    });
  });
});