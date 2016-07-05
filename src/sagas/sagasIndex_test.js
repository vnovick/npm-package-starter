import 'babel-polyfill';
import expect from 'expect';
import rootSaga from '.';

describe('(sagas/sagasIndex_test.js) - sagas index test', ()=>{
  describe('All sagas are exported', ()=>{
    let generator;
    let GeneratorFunction;
    beforeEach(()=>{
      GeneratorFunction = function*(){}.constructor;
      generator = rootSaga();
    });

    it('root is generator function', ()=>{
      expect(rootSaga).toBeA(GeneratorFunction);
    });
    it('length of rootSaga should be 2', ()=>{
      let i = 0;
      while(!generator.next().done){
        i++;
      }
      expect(i).toBe(2);
    });
    it('sagas are exported using FORK with truthy @@redux-saga/IO and all sagas are generators', ()=>{
      let generatorsYields = [];
      let generatorRun = generator.next();
      while(!generatorRun.done){
        generatorsYields.push(generatorRun.value);
        generatorRun = generator.next();
      }
      generatorsYields.forEach(gyield => {
        expect(gyield['@@redux-saga/IO']).toBeTruthy();
        expect(gyield.FORK).toExist();
        expect(gyield.FORK.fn).toExist();
        expect(gyield.FORK.fn).toBeA(GeneratorFunction);
      });
    });
    it('there should be correct sagas list', ()=>{
      let expectedSagas = [
        'watchStartup',
        'watchEditorChange'
      ];
      let generatorsYields = [];
      let generatorRun = generator.next();
      while(!generatorRun.done){
        generatorsYields.push(generatorRun.value);
        generatorRun = generator.next();
      }
      expect(generatorsYields.map(saga => saga.FORK.fn.name)).toEqual(expectedSagas);
    });
  });
});