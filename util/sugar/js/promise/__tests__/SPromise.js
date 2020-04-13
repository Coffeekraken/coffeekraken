"use strict";

module.exports = __SPromise => {
  describe('sugar.js.promise.SPromise', () => {
    const triggerStack = [],
          thenStack = [],
          thenOnceStack = [],
          catchStack = [],
          catchOnceStack = [];
    let isPassedAwait = false;

    (async () => {
      const pro = new __SPromise((resolve, reject, trigger) => {// trigger('then', 'world');
        // trigger('then', 'hello');
        // trigger('catch', 'error');
        // trigger('catch', 'plop');
        // setTimeout(() => {
        //   release('release');
        // }, 10);
      }); // .then((value, me) => {
      //   thenStack.push(`${value}`);
      // })
      // .then(value => {
      //   thenStack.push(`${value}`);
      // })
      // .thenOnce(value => {
      //   thenOnceStack.push(`${value}`);
      // })
      // .catch(error => {
      //   catchStack.push(`${error}`);
      // })
      // .catchOnce(error => {
      //   catchOnceStack.push(`${error}`);
      // })

      console.log(typeof pro.start);
      console.log(pro);
      await pro;
      isPassedAwait = true;
    })();

    it('Should not have passed the await point in the source code before having calling the release function', done => {
      expect(isPassedAwait).toBe(false);
      done();
    });
    it('Should pass all the tests of stack values after having calling all the "resolve", "reject" and "release" functions', done => {
      setTimeout(() => {
        expect(thenStack).toEqual(['world', 'world', 'hello', 'hello']);
        expect(thenOnceStack).toEqual(['world']);
        expect(catchStack).toEqual(['error', 'plop']);
        expect(catchOnceStack).toEqual(['error']);
        expect(isPassedAwait).toBe(true);
        done();
      }, 20);
    });
  });
};