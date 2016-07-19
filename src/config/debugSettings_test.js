import expect from 'expect';
import { loggerSettings, isDev } from './debugSettings';

describe('(config/debugSettings_test.js) - debugSettings test', ()=>{
  it('loggerSettings should be an object', ()=>{
    expect(loggerSettings).toBeA(Object);
  });
  it('loggerSettings should have enable, predicate and config keys', ()=>{
    expect(loggerSettings).toIncludeKeys(['enable', 'predicate', 'config']);
  });
  it('predicate should be a function', ()=>{
    expect(loggerSettings.predicate).toBeA(Function);
  });
  it('enable should be a boolean', ()=>{
    expect(loggerSettings.enable).toEqual(true);
  });
  it('config should be an object', ()=>{
    expect(loggerSettings.config).toBeA(Object);
  });
  it('isDev exists and equal to false', ()=>{
    expect(isDev).toBe(false);
  });
});
