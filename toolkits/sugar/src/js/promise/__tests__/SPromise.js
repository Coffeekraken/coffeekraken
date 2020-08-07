const { italic } = require('chalk');

module.exports = (__SPromise) => {
  describe('sugar.js.promise.SPromise', () => {
    const finallyStack = [],
      thenStack = [],
      thenOnceStack = [],
      catchStack = [],
      catchOnceStack = [],
      resolvedStack = [],
      rejectedStack = [];
    let isPassedAwait = false,
      isPassedPromiseWithPromises = false;
    const onThenStack = [],
      onThenCatchStack = [];
    let promiseWithPromisesIdx = 0;

    let unsubscribedCallbackTestCallCount = 0;

    const secondPromiseStack = [];
    let myPromiseCancelResult;

    let myPromiseWithPromisesResult = null;

    let notRegisteredrigger = false;

    let callStarTrigger = 0;

    (async () => {
      const myPromise = new __SPromise((resolve, reject, trigger, cancel) => {
        setTimeout(() => {
          trigger('start', 'coco');
          trigger('youhou', 'Hello');
        }, 10);
      }).on('*', (value) => {
        callStarTrigger++;
      });
      myPromise.trigger('sss', true);

      myPromiseCancelResult = await new __SPromise(
        (resolve, reject, trigger, cancel) => {
          trigger('then', 'hello');
          trigger('coco', 'hey!');
          setTimeout(() => {
            cancel();
          });
        }
      )

        .on('coco', (v) => {
          notRegisteredrigger = true;
        })
        .then((value) => {
          secondPromiseStack.push(value);
        })
        .start();

      const unsubscribePromise = new __SPromise(() => {}).start();
      unsubscribePromise.on('unsubscribeCallbackTest', () => {
        unsubscribedCallbackTestCallCount++;
      });

      setTimeout(() => {
        unsubscribePromise.trigger('unsubscribeCallbackTest', true);
        unsubscribePromise.off('unsubscribeCallbackTest');
        unsubscribePromise.trigger('unsubscribeCallbackTest', true);
      }, 10);

      const res = await new __SPromise((resolve, reject, trigger, cancel) => {
        trigger('then', 'world');
        trigger('then', 'hello');
        trigger('catch', 'error');
        trigger('catch', 'plop');
        setTimeout(() => {
          resolve('nelson');
        }, 100);
      })
        .then((value) => {
          thenStack.push(`${value}`);
        })
        .then((value) => {
          thenStack.push(`${value}`);
        })
        .then(1, (value) => {
          thenOnceStack.push(`${value}`);
        })
        .catch((error) => {
          catchStack.push(`${error}`);
        })
        .catch(1, (error) => {
          catchOnceStack.push(`${error}`);
        })
        .finally((value) => {
          finallyStack.push(value);
        })
        .resolved((value) => {
          resolvedStack.push(value);
        })
        .on('then', (value) => {
          onThenStack.push(value + 'onThen');
        })
        .on('then{1},catch{1}', (value) => {
          onThenCatchStack.push(value + 'onThenCatch');
        })
        .start();

      isPassedAwait = true;

      myPromiseWithPromisesResult = await new __SPromise(
        async (resolve, reject, trigger, cancel) => {
          resolve('coco1');
        }
      )
        .then((value) => {
          return new Promise((resolve, reject) => {
            promiseWithPromisesIdx++;
            setTimeout(() => {
              resolve(value + 'coco2');
            }, 100);
          });
        })
        .finally((value) => {
          return value + 'finally';
        })
        .then((value) => {
          return new __SPromise((resolve, reject, trigger, cancel) => {
            promiseWithPromisesIdx++;
            setTimeout(() => {
              resolve(value + 'coco3');
            }, 100);
          });
        })
        .then((value) => {
          return value + 'plop';
        })
        .start();

      isPassedPromiseWithPromises = true;
    })();

    it('Should trigger the * callback n times', (done) => {
      setTimeout(() => {
        expect(callStarTrigger).toBe(3);
        done();
      }, 50);
    });

    it('Should not have passed the await point in the source code before having calling the release function', (done) => {
      expect(isPassedAwait).toBe(false);
      done();
    });

    it('Should pass all the tests of stack values after having calling all the "resolve", "reject" and "release" functions', (done) => {
      setTimeout(() => {
        expect(notRegisteredrigger).toBe(true);
        expect(thenStack).toEqual([
          'world',
          'world',
          'hello',
          'hello',
          'nelson',
          'nelson'
        ]);
        expect(onThenStack).toEqual([
          'worldonThen',
          'helloonThen',
          'nelsononThen'
        ]);
        expect(onThenCatchStack).toEqual([
          'worldonThenCatch',
          'erroronThenCatch'
        ]);
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
      }, 2000);
    });

    it('Should not have passed the tests on promise with promises returned by then function', (done) => {
      setTimeout(() => {
        expect(unsubscribedCallbackTestCallCount).toBe(1);
        done();
      }, 500);
    });

    it('Should not have called the unsubscribed callback', (done) => {
      setTimeout(() => {
        // expect(promiseWithPromisesIdx).toBe(2);
        // expect(isPassedPromiseWithPromises).toBe(true);
        // expect(myPromiseWithPromisesResult).toBe('coco1coco2coco3plopfinally');
        done();
      }, 500);
    });
  });
};
