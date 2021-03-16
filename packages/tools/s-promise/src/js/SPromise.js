// @shared
// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/js/class/getMethods", "@coffeekraken/sugar/js/object/deepMerge", "./treatAsValue", "@coffeekraken/sugar/js/event/SEventEmitter", "@coffeekraken/sugar/js/class/SClass"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getMethods_1 = __importDefault(require("@coffeekraken/sugar/js/class/getMethods"));
    var deepMerge_1 = __importDefault(require("@coffeekraken/sugar/js/object/deepMerge"));
    var treatAsValue_1 = __importDefault(require("./treatAsValue"));
    var SEventEmitter_1 = __importDefault(require("@coffeekraken/sugar/js/event/SEventEmitter"));
    var SClass_1 = __importDefault(require("@coffeekraken/sugar/js/class/SClass"));
    var SPromise = /** @class */ (function (_super) {
        __extends(SPromise, _super);
        /**
         * @name                  constructor
         * @type                  Function
         *
         * Constructor
         *
         * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
         * @param         {Object}            [settings={}]     An object of settings for this particular SPromise instance. Here's the available settings:
         *
         * @example       js
         * const promise = new SPromise(({ resolve, reject, emit }) => {
         *    // do something...
         * }).then(value => {
         *    // do something...
         * }).finally(value => {
         *    // do something...
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        function SPromise(executorFnOrSettings, settings) {
            if (executorFnOrSettings === void 0) { executorFnOrSettings = {}; }
            if (settings === void 0) { settings = {}; }
            var _this_1 = this;
            // @ts-ignore
            var executorFn, _this, resolvers = {};
            _this_1 = _super.call(this, deepMerge_1.default({
                promise: {
                    treatCancelAs: 'resolve',
                    destroyTimeout: 5000,
                    proxies: {
                        resolve: [],
                        reject: []
                    }
                }
            }, typeof executorFnOrSettings === 'object' ? executorFnOrSettings : {}, settings), function (resolve, reject) {
                resolvers.resolve = resolve;
                new Promise(function (rejectPromiseResolve, rejectPromiseReject) {
                    resolvers.reject = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        rejectPromiseReject.apply(void 0, args);
                        reject.apply(void 0, args);
                    };
                }).catch(function (e) {
                    _this_1.emit('catch', e);
                });
            }) || this;
            _this_1._promiseState = 'pending';
            _this_1.expose(new SEventEmitter_1.default(__assign(__assign({ id: _this_1.id }, _this_1._settings), { eventEmitter: {
                // asyncStart: true
                } })), {
                as: 'eventEmitter',
                props: ['on', 'off', 'emit', 'pipe', 'pipeFrom', 'pipeTo']
            });
            _this_1._resolvers = resolvers;
            if (_this_1._settings.promise.destroyTimeout !==
                -1) {
                _this_1.on('finally', function (v, m) {
                    setTimeout(function () {
                        _this_1._destroy();
                    }, _this_1._settings.promise.destroyTimeout);
                });
            }
            // start the promise executor by passing it
            // an API correctly bound to this instance
            executorFn =
                typeof executorFnOrSettings === 'function' ? executorFnOrSettings : null;
            if (executorFn) {
                var api_1 = {};
                getMethods_1.default(_this_1).forEach(function (func) {
                    if (func.slice(0, 1) === '_')
                        return;
                    api_1[func] = _this_1[func].bind(_this_1);
                });
                setTimeout(function () {
                    executorFn(api_1);
                    // this.eventEmitter.start();
                });
            }
            return _this_1;
        }
        /**
         * @name        treatAsValue
         * @type        Function
         * @static
         *
         * This function allows you to wrap a promise in a ```resolve``` call to prevent
         * this promise to be treated as a "chaining" promise but to be treated as
         * normal value passed in the resolve call.
         *
         * @param           {Promise}          promise          The promise to treat as a simple value
         * @return          {ITreatAsValueProxy}                             A proxy of this promise that will act just like a normal promise once getted by the "await" statement
         *
         * @since      2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.treatAsValue = function (promise, settings) {
            if (settings === void 0) { settings = {}; }
            return treatAsValue_1.default(promise, settings);
        };
        Object.defineProperty(SPromise, Symbol.species, {
            // you can also use Symbol.species in order to
            // return a Promise for then/catch/finally
            get: function () {
                return Promise;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SPromise.prototype, Symbol.toStringTag, {
            // Promise overrides his Symbol.toStringTag
            get: function () {
                return 'SPromise';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SPromise.prototype, "promiseState", {
            /**
             * @name                    promiseState
             * @type                    String
             * @get
             *
             * Access the promise state. Can be one of these:
             * - pending: When the promise is waiting for resolution or rejection
             * - resolved: When the promise has been resolved
             * - rejected: When the promise has been rejected
             * - canceled: When the promise has been canceled
             * - destroyed: When the promise has been destroyed
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            get: function () {
                return this._promiseState;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @name                  treatAsValue
         * @type                  Function
         *
         * This method wrap the promise into a revocable proxy to allow
         * passing this Promise to methods like ```then```, etc... and make
         * this promise treated as a value and not as a chained promise.
         * Once you have done with this behavior, you just have to call
         * the ```restorePromiseBehavior``` on the returned proxy and
         * the default promise behavior will be restored
         *
         * @param         {ITreatAsValueSettings}       [settings={}]     Some settings to configure your custom behavior
         * @return        {ITreatAsValueProxy}                            A custom proxy that you can revoke using the ```restorePromiseBehavior```
         *
         * @since         2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.treatAsValue = function (settings) {
            if (settings === void 0) { settings = {}; }
            return treatAsValue_1.default(this, settings);
        };
        /**
         * @name             registerProxy
         * @type              Function
         *
         * ALlows you to register a proxy at a certain point of the promise lifecycle like:
         * - resolve: Allows you to edit the value that will be sent to the resolve point
         * - reject: Allows you to edit the value that will be sent to the reject point
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.registerProxy = function (point, proxy) {
            this._settings.promise.proxies[point].push(proxy);
        };
        /**
         * @name                  is
         * @type                  Function
         *
         * Check is the promise is on one of the passed status
         *
         * @param       {String}        status        A comma separated list of status to check
         * @return      {Boolean}                     Return true if the promise is in one of the passed status
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.is = function (status) {
            var statusArray = status.split(',').map(function (l) { return l.trim(); });
            if (statusArray.indexOf(this._promiseState) !== -1)
                return true;
            return false;
        };
        /**
         * @name                  isPending
         * @type                  Function
         *
         * Return back true or false depending on the promise status
         *
         * @return    {Boolean}         true or false depending on the promise status
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.isPending = function () {
            return this._promiseState === 'pending';
        };
        /**
         * @name                  isResolved
         * @type                  Function
         *
         * Return back true or false depending on the promise status
         *
         * @return    {Boolean}         true or false depending on the promise status
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.isResolved = function () {
            return this._promiseState === 'resolved';
        };
        /**
         * @name                  isRejected
         * @type                  Function
         *
         * Return back true or false depending on the promise status
         *
         * @return    {Boolean}         true or false depending on the promise status
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.isRejected = function () {
            return this._promiseState === 'rejected';
        };
        /**
         * @name                  isCanceled
         * @type                  Function
         *
         * Return back true or false depending on the promise status
         *
         * @return    {Boolean}         true or false depending on the promise status
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.isCanceled = function () {
            return this._promiseState === 'canceled';
        };
        /**
         * @name                  isDestroyed
         * @type                  Function
         *
         * Return back true or false depending on the promise status
         *
         * @return    {Boolean}         true or false depending on the promise status
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.isDestroyed = function () {
            return this._promiseState === 'destroyed';
        };
        /**
         * @name          resolve
         * @type          Function
         * @async
         *
         * This is the "resolve" method exposed on the promise itself for convinience
         *
         * @param         {Mixed}         arg       The value that you want to return back from the promise
         * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.resolve = function (arg, stacksOrder) {
            if (stacksOrder === void 0) { stacksOrder = 'resolve,finally'; }
            return this._resolve(arg, stacksOrder);
        };
        /**
         * @name          _resolve
         * @type          Function
         * @private
         * @async
         *
         * This is the method that will be called by the promise executor passed resolve function
         *
         * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
         * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._resolve = function (arg, stacksOrder) {
            var _this_1 = this;
            if (stacksOrder === void 0) { stacksOrder = 'resolve,finally'; }
            if (this._promiseState === 'destroyed')
                return;
            return new Promise(function (resolve, reject) { return __awaiter(_this_1, void 0, void 0, function () {
                var stacksResult, _i, _a, proxyFn;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // update the status
                            this._promiseState = 'resolved';
                            return [4 /*yield*/, this.eventEmitter._emitEvents(stacksOrder, arg)];
                        case 1:
                            stacksResult = _b.sent();
                            _i = 0, _a = this._settings.promise.proxies.resolve || [];
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            proxyFn = _a[_i];
                            return [4 /*yield*/, proxyFn(stacksResult)];
                        case 3:
                            stacksResult = _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            // resolve the master promise
                            this._resolvers.resolve(stacksResult);
                            // return the stack result
                            resolve(stacksResult);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * @name          reject
         * @type          Function
         * @async
         *
         * This is the "reject" method exposed on the promise itself for convinience
         *
         * @param         {Mixed}         arg       The value that you want to return back from the promise
         * @param       {Array|String}         [stacksOrder='catch,reject,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}      A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.reject = function (arg, stacksOrder) {
            if (stacksOrder === void 0) { stacksOrder = "catch,reject,finally"; }
            return this._reject(arg, stacksOrder);
        };
        /**
         * @name          _reject
         * @type          Function
         * @private
         * @async
         *
         * This is the method that will be called by the promise executor passed reject function
         *
         * @param         {Mixed}         arg       The value that you want to return back from the promise
         * @param       {Array|String}         [stacksOrder='catch,error,reject,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._reject = function (arg, stacksOrder) {
            var _this_1 = this;
            if (stacksOrder === void 0) { stacksOrder = "catch,reject,finally"; }
            if (this._promiseState === 'destroyed')
                return;
            return new Promise(function (resolve, reject) { return __awaiter(_this_1, void 0, void 0, function () {
                var stacksResult, _i, _a, proxyFn;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // update the status
                            this._promiseState = 'rejected';
                            return [4 /*yield*/, this.eventEmitter._emitEvents(stacksOrder, arg)];
                        case 1:
                            stacksResult = _b.sent();
                            _i = 0, _a = this._settings.promise.proxies.reject || [];
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            proxyFn = _a[_i];
                            return [4 /*yield*/, proxyFn(stacksResult)];
                        case 3:
                            stacksResult = _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            // resolve the master promise
                            this._resolvers.reject(stacksResult);
                            // return the stack result
                            resolve(stacksResult);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * @name          cancel
         * @type          Function
         * @async
         *
         * This is the "cancel" method exposed on the promise itself for convinience
         *
         * @param         {Mixed}         arg       The value that you want to return back from the promise
         * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.cancel = function (arg, stacksOrder) {
            if (stacksOrder === void 0) { stacksOrder = 'cancel,finally'; }
            return this._cancel(arg, stacksOrder);
        };
        /**
         * @name            _cancel
         * @type            Function
         * @private
         * @async
         *
         * Cancel the promise execution, destroy the Promise and resolve it with the passed value without calling any callbacks
         *
         * @param         {Mixed}           arg           The argument you want to pass to the cancel callbacks
         * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._cancel = function (arg, stacksOrder) {
            var _this_1 = this;
            if (stacksOrder === void 0) { stacksOrder = 'cancel,finally'; }
            if (this._promiseState === 'destroyed')
                return;
            return new Promise(function (resolve, reject) { return __awaiter(_this_1, void 0, void 0, function () {
                var stacksResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // update the status
                            this._promiseState = 'canceled';
                            return [4 /*yield*/, this.eventEmitter._emitEvents(stacksOrder, arg)];
                        case 1:
                            stacksResult = _a.sent();
                            // resolve the master promise
                            if (this._settings.promise.treatCancelAs === 'reject') {
                                this._resolvers.reject(stacksResult);
                            }
                            else {
                                this._resolvers.resolve(stacksResult);
                            }
                            // return the stack result
                            resolve(stacksResult);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * @name                catch
         * @type                Function
         *
         * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
         * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
         * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
         * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
         *
         * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
         * @param           {Function}        callback        The callback function to register
         * @return          {SPromise}                  The SPromise instance to maintain chainability
         *
         * @example         js
         * new SPromise(({ resolve, reject }) => {
         *    // do something...
         *    reject('hello world');
         * }).catch(value => {
         *    // do something with the value that is "hello world"
         * }).catch(1, value => {
         *    // do something that will be executed only once
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.catch = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.on.apply(this, __spreadArray(['catch'], args));
        };
        /**
         * @name                finally
         * @type                Function
         *
         * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
         * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
         * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
         * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
         *
         * @param           {Function}        callback        The callback function to register
         * @return          {SPromise}                  The SPromise instance to maintain chainability
         *
         * @example         js
         * new SPromise(({ resolve, reject, emit }) => {
         *    // do something...
         *    resolve('hello world');
         * }).finally(value => {
         *    // do something with the value that is "hello world"
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.finally = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.on.apply(this, __spreadArray(['finally'], args));
        };
        /**
         * @name                resolved
         * @type                Function
         *
         * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
         * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
         * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
         * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
         *
         * @param           {Function}        callback        The callback function to register
         * @return          {SPromise}                  The SPromise instance to maintain chainability
         *
         * @example         js
         * new SPromise(({ resolve, reject, emit }) => {
         *    // do something...
         *    resolve('hello world');
         * }).resolved(value => {
         *    // do something with the value that is "hello world"
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.resolved = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.on.apply(this, __spreadArray(['resolve'], args));
        };
        /**
         * @name                rejected
         * @type                Function
         *
         * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
         * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
         * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
         * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
         *
         * @param           {Function}        callback        The callback function to register
         * @return          {SPromise}                  The SPromise instance to maintain chainability
         *
         * @example         js
         * new SPromise(({ resolve, reject, emit }) => {
         *    // do something...
         *    resolve('hello world');
         * }).rejected(value => {
         *    // do something with the value that is "hello world"
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.rejected = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.on.apply(this, __spreadArray(['reject'], args));
        };
        /**
         * @name                canceled
         * @type                Function
         *
         * This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
         * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
         * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
         * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
         *
         * @param           {Function}        callback        The callback function to register
         * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
         *
         * @example         js
         * new SPromise(({ resolve, reject, emit, cancel }) => {
         *    // do something...
         *    cancel('hello world');
         * }).canceled(value => {
         *    // do something with the value that is "hello world"
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.canceled = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.on.apply(this, __spreadArray(['cancel'], args));
        };
        /**
         * @name                      _destroy
         * @type                      Function
         *
         * Destroying the SPromise instance by unregister all the callbacks, etc...
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._destroy = function () {
            // update the status
            this._promiseState = 'destroyed';
        };
        return SPromise;
    }(SClass_1.default.extends(Promise)));
    exports.default = SPromise;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHVGQUFtRTtJQUVuRSxzRkFBa0U7SUFLbEUsZ0VBSXdCO0lBQ3hCLDZGQUVvRDtJQUNwRCwrRUFBMkQ7SUEyRzNEO1FBQ1UsNEJBQXlCO1FBNkJqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW1CRztRQUNILGtCQUFZLG9CQUF5QixFQUFFLFFBQWE7WUFBeEMscUNBQUEsRUFBQSx5QkFBeUI7WUFBRSx5QkFBQSxFQUFBLGFBQWE7WUFBcEQsbUJBNEVDO1lBM0VDLGFBQWE7WUFDYixJQUFJLFVBQVUsRUFDWixLQUFLLEVBQ0wsU0FBUyxHQUFRLEVBQUUsQ0FBQztZQUV0QixVQUFBLGtCQUNFLG1CQUFXLENBQ1Q7Z0JBQ0UsT0FBTyxFQUFFO29CQUNQLGFBQWEsRUFBRSxTQUFTO29CQUN4QixjQUFjLEVBQUUsSUFBSTtvQkFDcEIsT0FBTyxFQUFFO3dCQUNQLE9BQU8sRUFBRSxFQUFFO3dCQUNYLE1BQU0sRUFBRSxFQUFFO3FCQUNYO2lCQUNGO2FBQ0YsRUFDRCxPQUFPLG9CQUFvQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDcEUsUUFBUSxDQUNULEVBQ0QsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDZCxTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDNUIsSUFBSSxPQUFPLENBQUMsVUFBQyxvQkFBb0IsRUFBRSxtQkFBbUI7b0JBQ3BELFNBQVMsQ0FBQyxNQUFNLEdBQUc7d0JBQUMsY0FBTzs2QkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPOzRCQUFQLHlCQUFPOzt3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