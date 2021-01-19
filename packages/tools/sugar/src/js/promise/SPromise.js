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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
        define(["require", "exports", "../object/deepMerge", "../time/wait", "./treatAsValue", "../event/SEventEmitter", "../class/SClass"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var wait_1 = __importDefault(require("../time/wait"));
    var treatAsValue_1 = __importDefault(require("./treatAsValue"));
    var SEventEmitter_1 = __importDefault(require("../event/SEventEmitter"));
    var SClass_1 = __importDefault(require("../class/SClass"));
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
                    destroyTimeout: 5000
                }
            }, typeof executorFnOrSettings === 'object' ? executorFnOrSettings : {}, settings), function (resolve, reject) {
                resolvers.resolve = resolve;
                new Promise(function (rejectPromiseResolve, rejectPromiseReject) {
                    resolvers.reject = rejectPromiseReject;
                }).catch(function (e) {
                    _this_1.emit('catch', e);
                });
                var _api = new Proxy({}, {
                    get: function (target, prop) {
                        var _this_1 = this;
                        if (_this !== undefined) {
                            return _this[prop];
                        }
                        else {
                            return function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return __awaiter(_this_1, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, wait_1.default(0)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, _this[prop].apply(_this, args)];
                                        }
                                    });
                                });
                            };
                        }
                    }
                });
                executorFn =
                    typeof executorFnOrSettings === 'function'
                        ? executorFnOrSettings
                        : null;
                if (executorFn) {
                    return executorFn(_api);
                }
            }) || this;
            _this_1._promiseState = 'pending';
            _this = _this_1;
            _this_1.expose(new SEventEmitter_1.default(__assign({ id: _this_1.id }, _this_1._settings)), {
                as: 'eventEmitter',
                props: ['on', 'off', 'emit']
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
                var stacksResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // update the status
                            this._promiseState = 'resolved';
                            return [4 /*yield*/, this.eventEmitter._emitEvents(stacksOrder, arg)];
                        case 1:
                            stacksResult = _a.sent();
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
                var stacksResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // update the status
                            this._promiseState = 'rejected';
                            return [4 /*yield*/, this.eventEmitter._emitEvents(stacksOrder, arg)];
                        case 1:
                            stacksResult = _a.sent();
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
            return this.on.apply(this, __spreadArrays(['catch'], args));
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
            return this.on.apply(this, __spreadArrays(['finally'], args));
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
            return this.on.apply(this, __spreadArrays(['resolve'], args));
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
            return this.on.apply(this, __spreadArrays(['reject'], args));
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
            return this.on.apply(this, __spreadArrays(['cancel'], args));
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
            // destroying all the callbacks stacks registered
            this._settings.promise = undefined;
        };
        return SPromise;
    }(SClass_1.default.extends(Promise)));
    exports.default = SPromise;
});
//# sourceMappingURL=SPromise.js.map