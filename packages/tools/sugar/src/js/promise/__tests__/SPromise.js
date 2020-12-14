var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    module.exports = function (__SPromise) {
        describe('sugar.js.promise.SPromise', function () {
            var finallyStack = [], thenStack = [], thenOnceStack = [], catchStack = [], catchOnceStack = [], resolvedStack = [], rejectedStack = [];
            var isPassedAwait = false, isPassedPromiseWithPromises = false;
            var onThenStack = [], onThenCatchStack = [];
            var promiseWithPromisesIdx = 0;
            var catchedRejectedPromise = false;
            var unsubscribedCallbackTestCallCount = 0;
            var secondPromiseStack = [];
            var myPromiseCancelResult;
            var myPromiseWithPromisesResult = null;
            var notRegisteredrigger = false;
            var callStarTrigger = 0;
            var resolvedWithFunctionCallResult = null;
            var canceledWithFunctionCallResult = null;
            var noExecutorFunctionPromiseResult;
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var resolvePromise, cancelPromise, noExecutorFunctionPromise, myPromise, errorPromise, unsubscribePromise, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resolvePromise = new __SPromise(function (resolve, reject, trigger, cancel) {
                                setTimeout(function () {
                                    resolve('hello');
                                }, 10);
                            }).on('resolve', function (value) {
                                resolvedWithFunctionCallResult = value;
                            });
                            cancelPromise = new __SPromise(function (resolve, reject, trigger, cancel) {
                                setTimeout(function () {
                                    cancel('world');
                                }, 10);
                            }).on('cancel', function (value) {
                                canceledWithFunctionCallResult = value;
                            });
                            noExecutorFunctionPromise = new __SPromise({
                                id: 'noExecutorFunctionPromise'
                            });
                            noExecutorFunctionPromise.finally(function (v) {
                                noExecutorFunctionPromiseResult = v;
                            });
                            noExecutorFunctionPromise.resolve('plop');
                            myPromise = new __SPromise().on('*', function (value) {
                                callStarTrigger++;
                            });
                            myPromise.trigger('start', 'coco');
                            myPromise.trigger('youhou', 'Hello');
                            myPromise.trigger('sss', true);
                            return [4 /*yield*/, new __SPromise(function (resolve, reject, trigger, cancel) {
                                    trigger('then', 'hello');
                                    trigger('coco', 'hey!');
                                    setTimeout(function () {
                                        cancel(null);
                                    });
                                })];
                        case 1:
                            myPromiseCancelResult = _a.sent();
                            errorPromise = new __SPromise(function (resolve, reject, trigger, cancel) {
                                trigger('coco', true);
                                trigger('then', 'hello');
                                setTimeout(function () {
                                    reject('Somethoing');
                                }, 200);
                            })
                                .catch(function (error) {
                                catchedRejectedPromise = true;
                            })
                                .on('coco', function (v) {
                                notRegisteredrigger = true;
                            })
                                .then(function (value) {
                                secondPromiseStack.push(value);
                            })
                                .finally(function (value) { });
                            unsubscribePromise = new __SPromise();
                            unsubscribePromise.on('unsubscribeCallbackTest', function () {
                                unsubscribedCallbackTestCallCount++;
                            });
                            setTimeout(function () {
                                unsubscribePromise.trigger('unsubscribeCallbackTest', true);
                                unsubscribePromise.off('unsubscribeCallbackTest');
                                unsubscribePromise.trigger('unsubscribeCallbackTest', true);
                            }, 10);
                            return [4 /*yield*/, new __SPromise(function (resolve, reject, trigger, cancel) {
                                    trigger('then', 'world');
                                    trigger('then', 'hello');
                                    trigger('catch', 'error');
                                    trigger('catch', 'plop');
                                    setTimeout(function () {
                                        resolve('nelson');
                                    }, 100);
                                })
                                    .then(function (value) {
                                    thenStack.push("" + value);
                                })
                                    .then(function (value) {
                                    thenStack.push("" + value);
                                })
                                    .then(1, function (value) {
                                    thenOnceStack.push("" + value);
                                })
                                    .catch(function (error) {
                                    catchStack.push("" + error);
                                })
                                    .catch(1, function (error) {
                                    catchOnceStack.push("" + error);
                                })
                                    .finally(function (value) {
                                    finallyStack.push(value);
                                })
                                    .resolved(function (value) {
                                    resolvedStack.push(value);
                                })
                                    .on('then', function (value) {
                                    onThenStack.push(value + 'onThen');
                                })
                                    .on('then:1,catch:1', function (value) {
                                    onThenCatchStack.push(value + 'onThenCatch');
                                })];
                        case 2:
                            res = _a.sent();
                            isPassedAwait = true;
                            return [4 /*yield*/, new __SPromise(function (resolve, reject, trigger, cancel) {
                                    resolve('coco1');
                                })
                                    .then(function (value) {
                                    return new Promise(function (resolve, reject) {
                                        promiseWithPromisesIdx++;
                                        setTimeout(function () {
                                            resolve(value + 'coco2');
                                        }, 100);
                                    });
                                })
                                    .finally(function (value) {
                                    return value + 'finally';
                                })
                                    .then(function (value) {
                                    return new __SPromise(function (resolve, reject, trigger, cancel) {
                                        promiseWithPromisesIdx++;
                                        setTimeout(function () {
                                            resolve(value + 'coco3');
                                        }, 100);
                                    });
                                })
                                    .then(function (value) {
                                    return value + 'plop';
                                })];
                        case 3:
                            myPromiseWithPromisesResult = _a.sent();
                            isPassedPromiseWithPromises = true;
                            return [2 /*return*/];
                    }
                });
            }); })();
            it('Should have the good resolved value in a non executor function promise', function () {
                expect(noExecutorFunctionPromiseResult).toBe('plop');
            });
            it('Should trigger the "resolve" stack on calling "resolve" function', function (done) {
                setTimeout(function () {
                    expect(resolvedWithFunctionCallResult).toBe('hello');
                    done();
                }, 50);
            });
            it('Should trigger the "cancel" stack on calling "cancel" function', function (done) {
                setTimeout(function () {
                    expect(canceledWithFunctionCallResult).toBe('world');
                    done();
                }, 50);
            });
            it('Should trigger the * callback n times', function (done) {
                setTimeout(function () {
                    expect(callStarTrigger).toBe(3);
                    done();
                }, 50);
            });
            // // TODO check this failling test
            // // it('Should not have passed the await point in the source code before having calling the release function', (done) => {
            // //   expect(isPassedAwait).toBe(false);
            // //   done();
            // // });
            it('Should catch correctly a rejected promise', function (done) {
                setTimeout(function () {
                    expect(catchedRejectedPromise).toBe(true);
                    done();
                }, 300);
            });
            it('Should pass all the tests of stack values after having calling all the "resolve", "reject" and "release" functions', function (done) {
                setTimeout(function () {
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
            it('Should not have passed the tests on promise with promises returned by then function', function (done) {
                setTimeout(function () {
                    expect(unsubscribedCallbackTestCallCount).toBe(1);
                    done();
                }, 500);
            });
            it('Should not have called the unsubscribed callback', function (done) {
                setTimeout(function () {
                    expect(promiseWithPromisesIdx).toBe(2);
                    expect(isPassedPromiseWithPromises).toBe(true);
                    expect(myPromiseWithPromisesResult).toBe('coco1coco2coco3plopfinally');
                    done();
                }, 500);
            });
        });
    };
});
//# sourceMappingURL=module.js.map