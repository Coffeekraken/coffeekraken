// @ts-nocheck
// @shared
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
        define(["require", "exports", "minimatch", "../object/deepMerge", "../string/uniqid"], factory);
    }
})(function (require, exports) {
    "use strict";
    var minimatch_1 = __importDefault(require("minimatch"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var uniqid_1 = __importDefault(require("../string/uniqid"));
    return /** @class */ (function (_super) {
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
         * const promise = new SPromise((resolve, reject, trigger, cancel) => {
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
            var _this = this;
            var _masterPromiseRejectFn, _masterPromiseResolveFn;
            var _resolve = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                setTimeout(function () {
                    _this.resolve.apply(_this, args);
                });
            };
            var _reject = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                setTimeout(function () {
                    _this.reject.apply(_this, args);
                });
            };
            var _trigger = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                setTimeout(function () {
                    _this.trigger.apply(_this, args);
                });
            };
            var _cancel = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                setTimeout(function () {
                    _this.cancel.apply(_this, args);
                });
            };
            _this = _super.call(this, function (resolve) {
                _masterPromiseResolveFn = resolve;
                new Promise(function (rejectPromiseResolve, rejectPromiseReject) {
                    _masterPromiseRejectFn = rejectPromiseReject;
                }).catch(function (e) {
                    _this.trigger('catch', e);
                });
                var executor = typeof executorFnOrSettings === 'function'
                    ? executorFnOrSettings
                    : null;
                if (executor) {
                    return executor(_resolve, _reject, _trigger, _cancel);
                }
            }) || this;
            /**
             * @name                  _settings
             * @type                  Object
             * @private
             *
             * Store the settings of this SPromise instance. Here's the available settings:
             * - stacks (null) {Array|String}: An array or comma separated string of additional stacks you want for this instance
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            _this._settings = {};
            /**
             * @name                  _promiseState
             * @type                  String
             * @private
             *
             * Store the promise status. Can be:
             * - pending: When the promise is waiting for resolution or rejection
             * - resolved: When the promise has been resolved
             * - rejected: When the promise has been rejected
             * - canceled: When the promise has been canceled
             * - destroyed: When the promise has been destroyed
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            _this._promiseState = 'pending';
            Object.defineProperty(_this, '_masterPromiseResolveFn', {
                writable: true,
                configurable: true,
                enumerable: false,
                value: _masterPromiseResolveFn
            });
            Object.defineProperty(_this, '_masterPromiseRejectFn', {
                writable: true,
                configurable: true,
                enumerable: false,
                value: _masterPromiseRejectFn
            });
            Object.defineProperty(_this, '_promiseState', {
                writable: true,
                configurable: true,
                enumerable: false,
                value: 'pending'
            });
            Object.defineProperty(_this, '_stacks', {
                writable: true,
                configurable: true,
                enumerable: false,
                value: {
                    catch: [],
                    resolve: [],
                    reject: [],
                    finally: [],
                    cancel: []
                }
            });
            // extend settings
            _this._settings = deepMerge_1.default({
                destroyTimeout: 5000,
                id: uniqid_1.default()
            }, typeof executorFnOrSettings === 'object' ? executorFnOrSettings : {}, settings);
            if (_this._settings.destroyTimeout !== -1) {
                _this.on('finally', function () {
                    setTimeout(function () {
                        _this._destroy();
                    }, _this._settings.destroyTimeout);
                });
            }
            return _this;
        }
        /**
         * @name                  map
         * @type                  Function
         * @static
         *
         * This static function allows you to redirect some SPromise "events" to another SPromise instance
         * with the ability to process the linked value before triggering it on the destination SPromise.
         *
         * @param         {SPromise}      sourceSPromise        The source SPromise instance on which to listen for "events"
         * @param         {SPromise}      destSPromise          The destination SPromise instance on which to trigger the listened "events"
         * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
         * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
         * - processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value
         * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the triggered value and the metas object. You must return true or false depending if you want to pipe the particular event or not
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.map = function (sourceSPromise, destSPromise, settings) {
            if (settings === void 0) { settings = {}; }
            // settings
            settings = deepMerge_1.default({
                // stacks: 'then,catch,resolve,reject,finally,cancel',
                stacks: 'catch,resolve,reject,finally,cancel',
                processor: null,
                filter: null
            }, settings);
            if (!(sourceSPromise instanceof SPromise) ||
                !(destSPromise instanceof SPromise))
                return;
            // listen for all on the source promise
            sourceSPromise.on(settings.stacks, function (value, metas) {
                // check if we have a filter setted
                if (settings.filter && !settings.filter(value, metas))
                    return;
                // check if need to process the value
                if (settings.processor) {
                    var res = settings.processor(value, metas);
                    if (Array.isArray(res) && res.length === 2) {
                        value = res[0];
                        metas = res[1];
                    }
                    else {
                        value = res;
                    }
                }
                if (destSPromise[metas.stack] &&
                    typeof destSPromise[metas.stack] === 'function') {
                    destSPromise[metas.stack](value);
                }
                else {
                    destSPromise.trigger(metas.stack, value);
                }
            });
        };
        /**
         * @name                  pipe
         * @type                  Function
         * @static
         *
         * This static function allows you to redirect some SPromise "events" to another SPromise instance
         * with the ability to process the linked value before triggering it on the destination SPromise.
         *
         * @param         {SPromise}      sourceSPromise        The source SPromise instance on which to listen for "events"
         * @param         {SPromise}      destSPromise          The destination SPromise instance on which to trigger the listened "events"
         * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
         * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
         * - processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value
         * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the triggered value and the metas object. You must return true or false depending if you want to pipe the particular event or not
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.pipe = function (sourceSPromise, destSPromise, settings) {
            if (settings === void 0) { settings = {}; }
            // settings
            settings = deepMerge_1.default({
                stacks: '*',
                prefixStack: true,
                processor: null,
                // exclude: ['then', 'catch', 'resolve', 'reject', 'finally', 'cancel'],
                exclude: [],
                filter: null
            }, settings);
            if (!(sourceSPromise instanceof SPromise) ||
                !(destSPromise instanceof SPromise))
                return;
            // listen for all on the source promise
            sourceSPromise.on(settings.stacks, function (value, metas) {
                // check excluded stacks
                if (settings.exclude.indexOf(metas.stack) !== -1)
                    return;
                // check if we have a filter setted
                if (settings.filter && !settings.filter(value, metas))
                    return;
                // check if need to process the value
                if (settings.processor) {
                    var res = settings.processor(value, metas);
                    if (Array.isArray(res) && res.length === 2) {
                        value = res[0];
                        metas = res[1];
                    }
                    else {
                        value = res;
                    }
                }
                // append the source promise id to the stack
                var triggerStack = metas.stack;
                if (settings.prefixStack) {
                    triggerStack = sourceSPromise.id + "." + metas.stack;
                    metas.stack = triggerStack;
                }
                // trigger on the destination promise
                destSPromise.trigger(metas.stack, value, __assign(__assign({}, metas), { level: metas.level + 1 }));
            });
        };
        Object.defineProperty(SPromise.prototype, "id", {
            /**
             * @name                    id
             * @type                    String
             * @get
             *
             * Access the promise id
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            get: function () {
                return this._settings.id;
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
         * @name          pipe
         * @type          Function
         *
         * This method take an SPromise instance as parameter on which to pipe the
         * specified stacks using the settings.stacks property.
         * It is exactly the same as the static ```pipe``` method but for this
         * particular instance.
         *
         * @param       {SPromise}      dest      The destination promise on which to pipe the events of this one
         * @param       {Object}      [settings={}]    An object ob settings to configure the pipe process:
         * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
         * - processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value
         * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the triggered value and the metas object. You must return true or false depending if you want to pipe the particular event or not
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.pipe = function (dest, settings) {
            if (settings === void 0) { settings = {}; }
            SPromise.pipe(this, dest, settings);
            return this;
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
            var _this = this;
            if (stacksOrder === void 0) { stacksOrder = 'resolve,finally'; }
            if (this._isDestroyed)
                return;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var stacksResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // update the status
                            this._promiseState = 'resolved';
                            return [4 /*yield*/, this._triggerStacks(stacksOrder, arg)];
                        case 1:
                            stacksResult = _a.sent();
                            // resolve the master promise
                            this._masterPromiseResolveFn(stacksResult);
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
         * @param       {Array|String}         [stacksOrder='catch,reject,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._reject = function (arg, stacksOrder) {
            var _this = this;
            if (stacksOrder === void 0) { stacksOrder = "catch,reject,finally"; }
            if (this._isDestroyed)
                return;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var stacksResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // update the status
                            this._promiseState = 'rejected';
                            return [4 /*yield*/, this._triggerStacks(stacksOrder, arg)];
                        case 1:
                            stacksResult = _a.sent();
                            // resolve the master promise
                            this._masterPromiseRejectFn(arg);
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
            var _this = this;
            if (stacksOrder === void 0) { stacksOrder = 'cancel,finally'; }
            if (this._isDestroyed)
                return;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var stacksResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // update the status
                            this._promiseState = 'canceled';
                            return [4 /*yield*/, this._triggerStacks(stacksOrder, arg)];
                        case 1:
                            stacksResult = _a.sent();
                            // resolve the master promise
                            this._masterPromiseResolveFn(stacksResult);
                            // return the stack result
                            resolve(stacksResult);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * @name          trigger
         * @type          Function
         * @async
         *
         * This is the method that allows you to trigger the callbacks like "catch", "finally", etc... without actually resolving the Promise itself
         *
         * @param         {String|Array}        what            The callbacks that you want to trigger. Can be catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['catch','finally'], or a string like "catch,finally"
         * @param         {Mixed}         arg         The argument you want to pass to the callback
         * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
         *
         * @example         js
         * new SPromise((resolve, reject, trigger, cancel) => {
         *    setTimeout(() => {
         *      resolve('something');
         *    }, 2000);
         * }).then(value => {
         *    // do something with one time "something"
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.trigger = function (what, arg, metas) {
            if (metas === void 0) { metas = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this._isDestroyed)
                        return [2 /*return*/];
                    // if (what === 'error') console.log('SSS', arg);
                    // triger the passed stacks
                    return [2 /*return*/, this._triggerStacks(what, arg, metas)];
                });
            });
        };
        /**
         * @name            _registerNewStacks
         * @type            Function
         * @private
         *
         * This methods allows you to register new stacks.
         * A new stack can be called then using the "on('stackName', ...)" method,
         * or directly on the SPromise instance like so "myPromise.stackName(...)".
         *
         * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
         * @return      {SPromise}                        The SPromise instance
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._registerNewStacks = function (stacks) {
            var _this = this;
            // split the stacks order
            if (typeof stacks === 'string')
                stacks = stacks.split(',').map(function (s) { return s.trim(); });
            stacks.forEach(function (stack) {
                if (!_this._stacks[stack]) {
                    _this._stacks[stack] = [];
                }
            });
        };
        /**
         * @name            _registerCallbackInStack
         * @type            Function
         *
         * This function take as argument a stack array and register into it the passed callback function
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._registerCallbackInStack = function (stack) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this._isDestroyed) {
                throw new Error("Sorry but you can't call the \"" + stack + "\" method on this SPromise cause it has been destroyed...");
            }
            // make sure the stack exist
            if (!this._stacks[stack]) {
                this._registerNewStacks(stack);
            }
            if (typeof stack === 'string')
                stack = this._stacks[stack];
            // process the args
            var callback = args[0];
            var callNumber = -1;
            if (args.length === 2 && typeof args[0] === 'number') {
                callback = args[1];
                callNumber = args[0];
            }
            // make sure this is a function and register it to the _catchStack
            if (typeof callback === 'function' && stack.indexOf(callback) === -1)
                stack.push({
                    callback: callback,
                    callNumber: callNumber,
                    called: 0
                });
            // maintain chainability
            return this;
        };
        /**
         * @name            _triggerStack
         * @type            Function
         * @private
         * @async
         *
         * This function take an Array Stack as parameter and execute it to return the result
         *
         * @param         {Array|String}             stack             The stack to execute. Can be the stack array directly, or just the stack name like "catch", etc.stack.stack.
         * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
         * @return        {Promise}                             A promise resolved with the stack result
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._triggerStack = function (stack, initialValue, metas) {
            if (metas === void 0) { metas = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var currentCallbackReturnedValue, stackArray, metasObj, i, item, callbackResult;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentCallbackReturnedValue = initialValue;
                            if (!this._stacks || Object.keys(this._stacks).length === 0)
                                return [2 /*return*/, currentCallbackReturnedValue];
                            stackArray = [];
                            if (typeof stack === 'string') {
                                if (this._stacks[stack]) {
                                    stackArray = __spreadArrays(stackArray, this._stacks[stack]);
                                }
                                // check if the stack is a glob pattern
                                Object.keys(this._stacks).forEach(function (stackName) {
                                    if (stackName === stack)
                                        return;
                                    // const toAvoid = [
                                    //   'catch',
                                    //   'resolve',
                                    //   'reject',
                                    //   'finally',
                                    //   'cancel'
                                    // ];
                                    // if (toAvoid.indexOf(stack) !== -1 || toAvoid.indexOf(stackName) !== -1)
                                    //   return;
                                    if (minimatch_1.default(stack, stackName)) {
                                        // the glob pattern match the triggered stack so add it to the stack array
                                        stackArray = __spreadArrays(stackArray, _this._stacks[stackName]);
                                    }
                                });
                            }
                            // filter the catchStack
                            stackArray.map(function (item) { return item.called++; });
                            stackArray = stackArray.filter(function (item) {
                                if (item.callNumber === -1)
                                    return true;
                                if (item.called <= item.callNumber)
                                    return true;
                                return false;
                            });
                            metasObj = deepMerge_1.default({
                                stack: stack,
                                originalStack: stack,
                                id: this._settings.id,
                                state: this._promiseState,
                                time: Date.now(),
                                level: 1
                            }, metas);
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < stackArray.length)) return [3 /*break*/, 4];
                            item = stackArray[i];
                            // make sure the stack exist
                            if (!item.callback)
                                return [2 /*return*/, currentCallbackReturnedValue];
                            callbackResult = item.callback(currentCallbackReturnedValue, metasObj);
                            return [4 /*yield*/, callbackResult];
                        case 2:
                            // check if the callback result is a promise
                            callbackResult = _a.sent();
                            // if the settings tells that we have to pass each returned value to the next callback
                            if (callbackResult !== undefined) {
                                currentCallbackReturnedValue = callbackResult;
                            }
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: 
                        // return the result
                        return [2 /*return*/, currentCallbackReturnedValue];
                    }
                });
            });
        };
        /**
         * @name          _triggerStacks
         * @type          Function
         * @private
         * @async
         *
         * This function take as parameters a list of stacks to trigger like an Array ['catch','finnaly'], or a string like so "catch,finally", and as second parameter,
         * the initial value to pass to the first callback of the joined stacks...
         *
         * @param         {Array|String}            stacks          The stacks to trigger
         * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
         * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype._triggerStacks = function (stacks, initialValue, metas) {
            var _this = this;
            if (metas === void 0) { metas = {}; }
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var currentStackResult, i, stackResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // await __wait(0);
                            if (!stacks)
                                return [2 /*return*/, this];
                            // check if the stacks is "*"
                            if (typeof stacks === 'string')
                                stacks = stacks.split(',').map(function (s) { return s.trim(); });
                            currentStackResult = initialValue;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < stacks.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._triggerStack(stacks[i], currentStackResult, metas)];
                        case 2:
                            stackResult = _a.sent();
                            if (stackResult !== undefined) {
                                currentStackResult = stackResult;
                            }
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            resolve(currentStackResult);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * @name                on
         * @type                Function
         *
         * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
         * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "on", etc using
         * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
         * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
         *
         * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['catch','finally'], or a String like "catch,finally"
         * @param           {Function}        callback        The callback function to register
         * @return          {SPromise}                  The SPromise instance to maintain chainability
         *
         * @example         js
         * new SPromise((resolve, reject, trigger, cancel) => {
         *    // do something...
         *    resolve('hello world');
         * }).on('resolve', value => {
         *    // do something with the value that is "hello world"
         * }).on('catch:1', error => {
         *    // do something that will be called only once
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.on = function (stacks, callback) {
            var _this = this;
            if (this._isDestroyed) {
                throw new Error("Sorry but you can't call the \"on\" method on this SPromise cause it has been destroyed...");
            }
            if (typeof stacks === 'string')
                stacks = stacks.split(',').map(function (s) { return s.trim(); });
            // loop on each stacks
            stacks.forEach(function (name) {
                // check if it has a callNumber specified using name:1
                var splitedName = name.split(':');
                var callNumber = -1;
                if (splitedName.length === 2) {
                    name = splitedName[0];
                    callNumber = parseInt(splitedName[1]);
                }
                // calling the registration method
                _this._registerCallbackInStack(name, callNumber, callback);
            });
            // maintain chainability
            return this;
        };
        /**
         * @name            off
         * @type            Function
         *
         * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
         * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
         *
         * @param       {String}        name        The event name to unsubscribe to
         * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
         * @return      {SPromise}                The SPromise instance to maintain chainability
         *
         * @since     2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SPromise.prototype.off = function (name, callback) {
            if (callback === void 0) { callback = null; }
            if (!callback) {
                delete this._stacks[name];
                return this;
            }
            // get the stack
            var stack = this._stacks[name];
            if (!stack)
                return this;
            // loop on the stack registered callback to finc the one to delete
            stack = stack.filter(function (item) {
                if (item.callback === callback)
                    return false;
                return true;
            });
            // make sure we have saved the new stack
            this._stacks[name] = stack;
            // maintain chainability
            return this;
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
         * new SPromise((resolve, reject, trigger, cancel) => {
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
        SPromise.prototype.then = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.prototype.then.apply(this, args);
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
         * new SPromise((resolve, reject, trigger, cancel) => {
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
            // super.finally(...args);
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
         * new SPromise((resolve, reject, trigger, cancel) => {
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
         * new SPromise((resolve, reject, trigger, cancel) => {
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
         * new SPromise((resolve, reject, trigger, cancel) => {
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
            delete this._stacks;
            delete this._masterPromiseResolveFn;
            delete this._masterPromiseRejectFn;
            delete this._settings;
            this._isDestroyed = true;
        };
        return SPromise;
    }(Promise));
});
