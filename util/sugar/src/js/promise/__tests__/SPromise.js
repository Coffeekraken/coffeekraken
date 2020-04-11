module.exports = (__SPromise) => {

  describe('sugar.js.promise.SPromise', () => {

    const thenStack = [], thenOnceStack = [], catchStack = [], catchOnceStack = [], afterStack = [];
    let isPassedAwait = false;

    (async () => {
      await new __SPromise((resolve, reject, release) => {
        resolve('world');
        resolve('hello');
        reject('error');
        reject('plop');
        setTimeout(() => {
          release('release');
        }, 10);
      }).then(function (value, me) {
        thenStack.push(`${value}`);
      }).then(value => {
        thenStack.push(`${value}`);
      }).thenOnce(value => {
        thenOnceStack.push(`${value}`);
      }).catch(error => {
        catchStack.push(`${error}`);
      }).catchOnce(error => {
        catchOnceStack.push(`${error}`);
      }).after(value => {
        afterStack.push(`${value}`);
      }).start();

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
        expect(afterStack).toEqual(['release']);
        expect(isPassedAwait).toBe(true);
        done();
      }, 20);
    });

  });

}