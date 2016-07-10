import 'babel-polyfill';
import expect from 'expect';
import { defaultButtonsConfig, ALLOWED_CONTROL_TYPES, ALLOWED_BLOCK_TYPES } from '../config';
import { validateButtonsConfig, assertButtonsConfig, } from './configUtils';

describe('(components/Toolbar/configUtils_test.js) - Toolbar configUtils test', ()=>{
  describe('validateButtonsConfig test', ()=>{
    it('should be in correct format', ()=>{
      expect(validateButtonsConfig).toBeA(Function);
    });
    it('should return error message array when incorrect config is passed', ()=>{
      const configurationMock = {
        buttonsList: ['B'],
        buttonsConf: {
          B: {
            controlType: 'incorrectControlType',
            blockType: 'incorrectBlockType'
          }
        }
      };
      expect(validateButtonsConfig(configurationMock.buttonsConf).length).toEqual(2);
    });
    it('all configuration should be provided for buttonsList', ()=>{
      const { buttonsConf, buttonsList } = defaultButtonsConfig;
      expect(Object.keys(buttonsConf)).toEqual(buttonsList);
    });
  });
  describe('assertButtonsConfig test', ()=>{
    it('should be in correct format', ()=>{
      expect(validateButtonsConfig).toBeA(Function);
    });
    it('should return error for missing block type', ()=>{
      const incorrectBlockTypes = ALLOWED_BLOCK_TYPES.filter(type => type !== 'add' && type !== 'remove');
      const errors = assertButtonsConfig([], defaultButtonsConfig.buttonsConf, 'blockType', incorrectBlockTypes);
      expect(errors.length).toEqual(2, `${errors.join(',')}`);
    });
  });
});