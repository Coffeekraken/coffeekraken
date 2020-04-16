module.exports = (__SPromise) => {

  describe('sugar.js.promise.SPromise', () => {

    const finallyStack = [], thenStack = [], thenOnceStack = [], catchStack = [], catchOnceStack = [], resolvedStack = [], rejectedStack = [];
    let isPassedAwait = false, isPassedPromiseWithPromises = false;
    const onThenStack = [], onThenCatchStack = [];
    let promiseWithPromisesIdx = 0;

    const secondPromiseStack = [];
    let myPromiseCancelResult;

    let myPromiseWithPromisesResult = null;

    (async () => {
      await new __SPromise((resolve, reject, trigger, cancel) => {
        trigger('then', 'world');
        trigger('then', 'hello');
        trigger('catch', 'error');
        trigger('catch', 'plop');
        setTimeout(() => {
          resolve('nelson');
        }, 10);
      })
        .then((value) => {
          thenStack.push(`${value}`);
        })
        .then(value => {
          thenStack.push(`${value}`);
        })
        .then(1, value => {
          thenOnceStack.push(`${value}`);
        })
        .catch(error => {
          catchStack.push(`${error}`);
        })
        .catch(1, error => {
          catchOnceStack.push(`${error}`);
        }).finally(value => {
          finallyStack.push(value);
        }).resolved(value => {
          resolvedStack.push(value);
        }).on('then', value => {
          onThenStack.push(value + 'onThen');
        }).on('then:1,catch:1', value => {
          onThenCatchStack.push(value + 'onThenCatch');
        })
        .start();

      isPassedAwait = true;

      myPromiseCancelResult = await new __SPromise((resolve, reject, trigger, cancel) => {
        trigger('then', 'hello');
        setTimeout(() => {
          cancel();
        }, 20);
      }).then(value => {
        secondPromiseStack.push(value);
      }).start();

      myPromiseWithPromisesResult = await new __SPromise(async (resolve, reject, trigger, cancel) => {

        resolve('coco1');
      }).then(value => {
        return new Promise((resolve, reject) => {
          promiseWithPromisesIdx++;
          setTimeout(() => {
            resolve(value + 'coco2');
          }, 100);
        });
      }).finally(value => {
        return value + 'finally';
      }).then(value => {
        return new __SPromise((resolve, reject, trigger, cancel) => {
          promiseWithPromisesIdx++;
          setTimeout(() => {
            resolve(value + 'coco3');
          }, 100);
        });
      }).then(value => {
        return value + 'plop';
      });

      isPassedPromiseWithPromises = true;

    })();

    it('Should not have passed the await point in the source code before having calling the release function', done => {
      expect(isPassedAwait).toBe(false);
      done();
    });

    it('Should pass all the tests of stack values after having calling all the "resolve", "reject" and "release" functions', done => {
      setTimeout(() => {
        expect(thenStack).toEqual(['world', 'world', 'hello', 'hello', 'nelson', 'nelson']);
        expect(onThenStack).toEqual(['worldonThen', 'helloonThen', 'nelsononThen']);
        expect(onThenCatchStack).toEqual(['worldonThenCatch', 'erroronThenCatch']);
        expect(thenOnceStack).toEqual(['world']);
        expect(catchStack).toEqual(['error', 'plop']);
        expect(catchOnceStack).toEqual(['error']);
        expect(finallyStack).toEqual(['nelson']);
        expect(resolvedStack).toEqual(['nelson']);
        expect(rejectedStack).toEqual([]);
        expect(isPassedAwait).toBe(true);

        expect(secondPromiseStack).toEqual(['hello']);
        expect(myPromiseCancelResult).toBe(null);

        done();
      }, 500);
    });

    it('Should not have passed the tests on promise with promises returned by then function', done => {
      setTimeout(() => {
        expect(promiseWithPromisesIdx).toBe(2);
        expect(isPassedPromiseWithPromises).toBe(true);
        expect(myPromiseWithPromisesResult).toBe('coco1coco2coco3plopfinally');
        done();
      }, 500);
    });

  });

}