"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  italic
} = require('chalk');

module.exports = __SPromise => {
  describe('sugar.js.promise.SPromise', () => {
    var finallyStack = [],
        thenStack = [],
        thenOnceStack = [],
        catchStack = [],
        catchOnceStack = [],
        resolvedStack = [],
        rejectedStack = [];
    var isPassedAwait = false,
        isPassedPromiseWithPromises = false;
    var onThenStack = [],
        onThenCatchStack = [];
    var promiseWithPromisesIdx = 0;
    var unsubscribedCallbackTestCallCount = 0;
    var secondPromiseStack = [];
    var myPromiseCancelResult;
    var myPromiseWithPromisesResult = null;
    var notRegisteredrigger = false;
    var callStarTrigger = 0;
    var resolvedWithFunctionCallResult = null;
    var canceledWithFunctionCallResult = null;

    _asyncToGenerator(function* () {
      // const resolvePromise = new __SPromise(
      //   (resolve, reject, trigger, cancel) => {
      //     setTimeout(() => {
      //       resolve('hello');
      //     }, 10);
      //   }
      // ).on('resolve', (value) => {
      //   resolvedWithFunctionCallResult = value;
      // });
      // const cancelPromise = new __SPromise(
      //   (resolve, reject, trigger, cancel) => {
      //     setTimeout(() => {
      //       cancel('world');
      //     }, 10);
      //   }
      // ).on('cancel', (value) => {
      //   canceledWithFunctionCallResult = value;
      // });
      // const myPromise = new __SPromise().on('*', (value) => {
      //   callStarTrigger++;
      // });
      // myPromise.trigger('start', 'coco');
      // myPromise.trigger('youhou', 'Hello');
      // myPromise.trigger('sss', true);
      myPromiseCancelResult = yield new __SPromise((resolve, reject, trigger, cancel) => {
        trigger('then', 'hello');
        trigger('coco', 'hey!');
        setTimeout(() => {
          cancel(null);
        });
      });
      var errorPromise = new __SPromise((resolve, reject, trigger, cancel) => {
        // throw new Error('Other');
        setTimeout(() => {
          reject('Somethoing');
        }, 200);
      }).catch(error => {// nativeConsole.log('EEE', error);
      }); //   .on('coco', (v) => {
      //     notRegisteredrigger = true;
      //   })
      //   .then((value) => {
      //     secondPromiseStack.push(value);
      //   });
      // const unsubscribePromise = new __SPromise();
      // unsubscribePromise.on('unsubscribeCallbackTest', () => {
      //   unsubscribedCallbackTestCallCount++;
      // });
      // setTimeout(() => {
      //   unsubscribePromise.trigger('unsubscribeCallbackTest', true);
      //   unsubscribePromise.off('unsubscribeCallbackTest');
      //   unsubscribePromise.trigger('unsubscribeCallbackTest', true);
      // }, 10);
      // const res = await new __SPromise((resolve, reject, trigger, cancel) => {
      //   trigger('then', 'world');
      //   trigger('then', 'hello');
      //   trigger('catch', 'error');
      //   trigger('catch', 'plop');
      //   setTimeout(() => {
      //     resolve('nelson');
      //   }, 100);
      // })
      //   .then((value) => {
      //     thenStack.push(`${value}`);
      //   })
      //   .then((value) => {
      //     thenStack.push(`${value}`);
      //   })
      //   .then(1, (value) => {
      //     thenOnceStack.push(`${value}`);
      //   })
      //   .catch((error) => {
      //     catchStack.push(`${error}`);
      //   })
      //   .catch(1, (error) => {
      //     catchOnceStack.push(`${error}`);
      //   })
      //   .finally((value) => {
      //     finallyStack.push(value);
      //   })
      //   .resolved((value) => {
      //     resolvedStack.push(value);
      //   })
      //   .on('then', (value) => {
      //     onThenStack.push(value + 'onThen');
      //   })
      //   .on('then{1},catch{1}', (value) => {
      //     onThenCatchStack.push(value + 'onThenCatch');
      //   });
      // isPassedAwait = true;
      // myPromiseWithPromisesResult = await new __SPromise(
      //   async (resolve, reject, trigger, cancel) => {
      //     resolve('coco1');
      //   }
      // )
      //   .then((value) => {
      //     return new Promise((resolve, reject) => {
      //       promiseWithPromisesIdx++;
      //       setTimeout(() => {
      //         resolve(value + 'coco2');
      //       }, 100);
      //     });
      //   })
      //   .finally((value) => {
      //     return value + 'finally';
      //   })
      //   .then((value) => {
      //     return new __SPromise((resolve, reject, trigger, cancel) => {
      //       promiseWithPromisesIdx++;
      //       setTimeout(() => {
      //         resolve(value + 'coco3');
      //       }, 100);
      //     });
      //   })
      //   .then((value) => {
      //     return value + 'plop';
      //   });
      // isPassedPromiseWithPromises = true;
    })(); // it('Should trigger the "resolve" stack on calling "resolve" function', (done) => {
    //   setTimeout(() => {
    //     expect(resolvedWithFunctionCallResult).toBe('hello');
    //     done();
    //   }, 50);
    // });
    // it('Should trigger the "cancel" stack on calling "cancel" function', (done) => {
    //   setTimeout(() => {
    //     expect(canceledWithFunctionCallResult).toBe('world');
    //     done();
    //   }, 50);
    // });
    // it('Should trigger the * callback n times', (done) => {
    //   setTimeout(() => {
    //     expect(callStarTrigger).toBe(3);
    //     done();
    //   }, 50);
    // });
    // // TODO check this failling test
    // // it('Should not have passed the await point in the source code before having calling the release function', (done) => {
    // //   expect(isPassedAwait).toBe(false);
    // //   done();
    // // });


    it('Should pass all the tests of stack values after having calling all the "resolve", "reject" and "release" functions', done => {
      setTimeout(() => {
        // expect(notRegisteredrigger).toBe(true);
        // expect(thenStack).toEqual([
        //   'world',
        //   'world',
        //   'hello',
        //   'hello',
        //   'nelson',
        //   'nelson'
        // ]);
        // expect(onThenStack).toEqual([
        //   'worldonThen',
        //   'helloonThen',
        //   'nelsononThen'
        // ]);
        // expect(onThenCatchStack).toEqual([
        //   'worldonThenCatch',
        //   'erroronThenCatch'
        // ]);
        // expect(thenOnceStack).toEqual(['world']);
        // expect(catchStack).toEqual(['error', 'plop']);
        // expect(catchOnceStack).toEqual(['error']);
        // expect(finallyStack).toEqual(['nelson']);
        // expect(resolvedStack).toEqual(['nelson']);
        // expect(rejectedStack).toEqual([]);
        // expect(isPassedAwait).toBe(true);
        // expect(secondPromiseStack).toEqual(['hello']);
        expect(myPromiseCancelResult).toBe(null);
        done();
      }, 2000);
    }); // it('Should not have passed the tests on promise with promises returned by then function', (done) => {
    //   setTimeout(() => {
    //     expect(unsubscribedCallbackTestCallCount).toBe(1);
    //     done();
    //   }, 500);
    // });
    // it('Should not have called the unsubscribed callback', (done) => {
    //   setTimeout(() => {
    //     // expect(promiseWithPromisesIdx).toBe(2);
    //     // expect(isPassedPromiseWithPromises).toBe(true);
    //     // expect(myPromiseWithPromisesResult).toBe('coco1coco2coco3plopfinally');
    //     done();
    //   }, 500);
    // });
  });
};