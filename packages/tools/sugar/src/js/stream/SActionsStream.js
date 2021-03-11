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
        define(["require", "exports", "../object/clone", "../console/parseHtml", "../error/SError", "../is/class", "../object/deepMerge", "@coffeekraken/s-promise", "../string/toString", "../string/trimLines", "../time/convert", "../time/wait", "./SActionsStreamAction", "@coffeekraken/s-cache", "../crypt/sha256"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var clone_1 = __importDefault(require("../object/clone"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var SError_1 = __importDefault(require("../error/SError"));
    var class_1 = __importDefault(require("../is/class"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    var toString_1 = __importDefault(require("../string/toString"));
    var trimLines_1 = __importDefault(require("../string/trimLines"));
    var convert_1 = __importDefault(require("../time/convert"));
    var wait_1 = __importDefault(require("../time/wait"));
    var SActionsStreamAction_1 = __importDefault(require("./SActionsStreamAction"));
    var s_cache_1 = __importDefault(require("@coffeekraken/s-cache"));
    var sha256_1 = __importDefault(require("../crypt/sha256"));
    /**
     * @name          SActionStream
     * @namespace           sugar.js.stream
     * @type          Class
     * @extends       SPromise
     * @status              beta
     *
     * This class represent the base of a actions stream.
     * An action stream if simply some functions that are called one after the other
     * and that pass to each other some value(s) on which to work.
     * Here's all the "events" that you can subscribe on the SActionStream instance, or on the returned SPromise when calling the "start" method:
     * - start: emited when the overall actions stream starts
     * - {actionName}.start: emited when the specified action starts
     * - {actionName}.reject: emited when the specified action has been rejected
     * - {actionName}.complete: emited when the specified action has been completed
     * - complete: emited when the overall actions stream has been completed
     * - resolve: Trigerred when the overall actions stream has been completed
     * - log: emited when a log message has been set
     * - cancel: emited when the stream has been canceled using the "cancel" method of the returned SPromise when calling the "start" method
     *
     * @param       {Object}        actions         An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```
     * @param       {Object}        [settings={}]   A settings object to configure your instance:
     * - name (null) {String}: A simple name for your stream that will be used in the logs
     * - order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
     * - actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SActionStream = /** @class */ (function (_super) {
        __extends(SActionStream, _super);
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SActionStream(actions, settings) {
            if (settings === void 0) { settings = {}; }
            var _this = 
            // init SPromise
            _super.call(this, deepMerge_1.default({
                id: "SActionsStream",
                cache: false,
                name: null,
                order: null,
                before: [],
                after: [],
                beforeActions: {},
                afterActions: {},
                actions: {},
                logs: {
                    start: true,
                    success: true,
                    error: true,
                    exclude: []
                }
            }, settings)) || this;
            /**
             * @name            _actionsObj
             * @type            Object
             * @private
             *
             * Store the actions object
             *
             * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._actionsObject = {};
            /**
             * @name            _currentStream
             * @type            SPromise
             * @private
             *
             * Store the current running stream. Here's the object structure:
             * {
             *    promise: Store the SPromise instance for the stream
             *    currentActionObj: {
             *       name: Store the name of the current action executing in the stream
             *       promise: Store the promise returned from the ```run``` action instance method
             *    }
             * }
             *
             * @since         2.0.0
             * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._currentStream = null;
            // check the actions
            Object.keys(actions).forEach(function (actionName) {
                var actionInstance = actions[actionName];
                if (typeof actionInstance === 'function' ||
                    (class_1.default(actionInstance) &&
                        actionInstance.constructor.name === 'SActionsStreamAction') ||
                    actionInstance instanceof SActionsStreamAction_1.default) {
                }
                else {
                    throw new SError_1.default(parseHtml_1.default("The value passed for the \"<yellow>" + actionName + "</yellow>\" action has to be either a simple function or an \"<green>SActionsStreamAction</green>\" instance. You have passed a \"<red>" + typeof actionInstance + "</red>\"..."));
                }
            });
            // init a SCache instance if needed
            if (_this._settings.cache) {
                _this._sCache = new s_cache_1.default(settings.id, settings.cache === true ? {} : settings.cache);
            }
            // save the actions
            _this._actionsObject = actions;
            return _this;
        }
        /**
         * @name          hasCurrentStreamErrors
         * @type          Function
         *
         * This method return true or false depending if the current stream has some errors or not
         *
         * @return      {Boolean}           true if not errors, false if not
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SActionStream.prototype.hasCurrentStreamErrors = function () {
            return this._currentStream && this._currentStream.stats.stderr.length;
        };
        SActionStream.prototype._applyFnOnStreamObj = function (streamObjOrArray, processFn, settings) {
            if (settings === void 0) { settings = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var logActionStatus, processFnArray, isArray, streamObjArray, _a, _b, _i, streamObjArrayIdx, streamObj, actionHash, cachedStreamObj, processFnArgs, _c, _d, _e, processFnArrayIdx, processFn_1, processFnResult, e_1;
                var _this = this;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            settings = deepMerge_1.default({
                                processFnArgs: [],
                                type: 'main',
                                resultProcessor: null
                            }, settings);
                            logActionStatus = function () {
                                var logString = "Processing <cyan>" + (Array.isArray(_this._currentStream.streamObjArray)
                                    ? _this._currentStream.streamObjArray.length
                                    : 1) + "</cyan> source" + (Array.isArray(_this._currentStream.streamObjArray)
                                    ? _this._currentStream.streamObjArray.length > 1
                                        ? 's'
                                        : ''
                                    : '') + " | Processed <green>" + _this._currentStream.currentActionObj.processed + "</green>";
                                if (_this._settings.cache) {
                                    logString += " | From cache: <yellow>" + _this._currentStream.currentActionObj.fromCache + "</yellow>";
                                }
                                if (_this._settings.logs.exclude.indexOf(_this._currentStream.currentActionObj.id) === -1) {
                                    _this.log({
                                        temp: true,
                                        group: _this._currentStream.currentActionObj.name,
                                        value: logString
                                    });
                                }
                            };
                            processFnArray = !Array.isArray(processFn) ? [processFn] : processFn;
                            isArray = Array.isArray(streamObjOrArray);
                            streamObjArray = streamObjOrArray;
                            if (!isArray)
                                streamObjArray = [streamObjArray];
                            _a = [];
                            for (_b in streamObjArray)
                                _a.push(_b);
                            _i = 0;
                            _f.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 14];
                            streamObjArrayIdx = _a[_i];
                            streamObj = streamObjArray[streamObjArrayIdx];
                            // if (streamObj.$fromCache) return;
                            // set the current action in the streamObj
                            streamObj.$action = settings.type;
                            actionHash = sha256_1.default.encrypt(toString_1.default(__assign(__assign({}, clone_1.default(streamObj)), { settings: this._settings })));
                            if (!((this._currentStream.currentActionObj.instance &&
                                this._currentStream.currentActionObj.instance.settings.cache &&
                                this._sCache) ||
                                (this._sCache && !this._currentStream.currentActionObj.instance))) return [3 /*break*/, 3];
                            return [4 /*yield*/, this._sCache.get(actionHash)];
                        case 2:
                            cachedStreamObj = _f.sent();
                            if (cachedStreamObj) {
                                streamObj = cachedStreamObj;
                                streamObj.$fromCache = true;
                                streamObjArray[streamObjArrayIdx] = streamObj;
                                this._currentStream.currentActionObj.fromCache++;
                                logActionStatus();
                                return [2 /*return*/];
                            }
                            _f.label = 3;
                        case 3:
                            processFnArgs = __spreadArrays([streamObj], settings.processFnArgs);
                            _c = [];
                            for (_d in processFnArray)
                                _c.push(_d);
                            _e = 0;
                            _f.label = 4;
                        case 4:
                            if (!(_e < _c.length)) return [3 /*break*/, 11];
                            processFnArrayIdx = _c[_e];
                            processFn_1 = processFnArray[processFnArrayIdx];
                            _f.label = 5;
                        case 5:
                            _f.trys.push([5, 9, , 10]);
                            processFnResult = processFn_1.apply(void 0, processFnArgs);
                            if (settings.resultProcessor)
                                processFnResult = settings.resultProcessor.bind(this)(processFnResult);
                            if (!(processFnResult instanceof Promise)) return [3 /*break*/, 7];
                            return [4 /*yield*/, processFnResult];
                        case 6:
                            // processFnResult.catch((e) => {
                            //   throw 'PLCPLC';
                            // });
                            streamObj = _f.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            streamObj = processFnResult;
                            _f.label = 8;
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            e_1 = _f.sent();
                            return [3 /*break*/, 10];
                        case 10:
                            _e++;
                            return [3 /*break*/, 4];
                        case 11:
                            streamObjArray[streamObjArrayIdx] = streamObj;
                            if (settings.type.match(/.*\.main$/)) {
                                this._currentStream.currentActionObj.processed++;
                                logActionStatus();
                            }
                            if (!this._settings.cache) return [3 /*break*/, 13];
                            return [4 /*yield*/, this._saveInCache(actionHash, streamObj)];
                        case 12:
                            _f.sent();
                            _f.label = 13;
                        case 13:
                            _i++;
                            return [3 /*break*/, 1];
                        case 14:
                            if (isArray)
                                return [2 /*return*/, streamObjArray];
                            return [2 /*return*/, streamObjArray[0]];
                    }
                });
            });
        };
        SActionStream.prototype._handleStreamObjArray = function () {
            return __awaiter(this, void 0, void 0, function () {
                var stack, j, currentStreamObj;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stack = this._currentStream.streamObjArray;
                            j = 0;
                            _a.label = 1;
                        case 1:
                            if (!(j < stack.length)) return [3 /*break*/, 8];
                            currentStreamObj = stack[j];
                            if (currentStreamObj.$fromCache) {
                                logActionStatus();
                                return [3 /*break*/, 7];
                            }
                            if (!(this._currentStream.settings.beforeActions &&
                                this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name])) return [3 /*break*/, 3];
                            return [4 /*yield*/, this._applyFnOnStreamObj(currentStreamObj, this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name], {
                                    type: this._currentStream.currentActionObj.name + ".before"
                                })];
                        case 2:
                            currentStreamObj = _a.sent();
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this._applyFnOnStreamObj(currentStreamObj, function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                    var res;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, (_a = this._currentStream.currentActionObj.instance).run.apply(_a, args)];
                                            case 1:
                                                res = _b.sent();
                                                return [2 /*return*/, resolve(res)];
                                        }
                                    });
                                }); });
                            }, {
                                type: this._currentStream.currentActionObj.name + ".main",
                                processFnArgs: [
                                    this._currentStream.currentActionObj.instance.settings
                                ],
                                resultProcessor: function (fnResult) {
                                    if (fnResult instanceof Promise) {
                                        s_promise_1.default.pipe(fnResult, _this._currentStream.promise);
                                        s_promise_1.default.pipe(fnResult, _this);
                                        _this._currentStream.currentActionObj.promise = fnResult;
                                    }
                                    return fnResult;
                                }
                            })];
                        case 4:
                            // call the action and pass it the current stream object
                            currentStreamObj = _a.sent();
                            if (this._currentStream.currentActionObj.instance &&
                                this._currentStream.currentActionObj.instance._skipNextActions) {
                                this._currentStream.stats.skipNextActions = this._currentStream.currentActionObj.instance._skipNextActions;
                            }
                            // check if an "afterCallback" callback has been passed in the streamObj
                            if (this._currentStream.currentActionObj.instance &&
                                this._currentStream.currentActionObj.instance._registeredCallbacks &&
                                this._currentStream.currentActionObj.instance._registeredCallbacks
                                    .length) {
                                this._currentStream.currentActionObj.instance._registeredCallbacks.forEach(function (callbackObj) {
                                    if (!callbackObj.action) {
                                        if (callbackObj.when === 'after') {
                                            _this._currentStream.settings.after = __spreadArrays(_this._currentStream.settings.after, [
                                                callbackObj.callback
                                            ]);
                                        }
                                        else {
                                            _this._currentStream.settings.before = __spreadArrays(_this._currentStream.settings.before, [
                                                callbackObj.callback
                                            ]);
                                        }
                                    }
                                    else {
                                        if (callbackObj.when === 'before') {
                                            if (!_this._currentStream.settings.beforeActions[callbackObj.action])
                                                _this._currentStream.settings.beforeActions[callbackObj.action] = [];
                                            else if (!Array.isArray(_this._currentStream.settings.beforeActions[callbackObj.action]))
                                                _this._currentStream.settings.beforeActions[callbackObj.action] = [
                                                    _this._currentStream.settings.beforeActions[callbackObj.action]
                                                ];
                                            _this._currentStream.settings.beforeActions[callbackObj.action].push(callbackObj.callback);
                                        }
                                        else {
                                            if (!_this._currentStream.settings.afterActions[callbackObj.action])
                                                _this._currentStream.settings.afterActions[callbackObj.action] = [];
                                            else if (!Array.isArray(_this._currentStream.settings.afterActions[callbackObj.action]))
                                                _this._currentStream.settings.afterActions[callbackObj.action] = [
                                                    _this._currentStream.settings.afterActions[callbackObj.action]
                                                ];
                                            _this._currentStream.settings.afterActions[callbackObj.action].push(callbackObj.callback);
                                        }
                                    }
                                });
                            }
                            if (!(this._currentStream.settings.afterActions &&
                                this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name])) return [3 /*break*/, 6];
                            return [4 /*yield*/, this._applyFnOnStreamObj(currentStreamObj, this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name], {
                                    type: this._currentStream.currentActionObj.name + ".after"
                                })];
                        case 5:
                            currentStreamObj = _a.sent();
                            _a.label = 6;
                        case 6:
                            // replace the streamObj with the new one in the stack
                            stack[j] = currentStreamObj;
                            if (this._currentStream.stats.canceled || this.hasCurrentStreamErrors()) {
                                this._currentStream.streamObjArray = stack;
                                return [2 /*return*/, this._currentStream.streamObjArray];
                            }
                            _a.label = 7;
                        case 7:
                            j++;
                            return [3 /*break*/, 1];
                        case 8:
                            // flatten the stack
                            stack = stack.flat(1);
                            // filter the streamObjects that comes from the cache
                            stack = stack.filter(function (streamObj) {
                                return streamObj.$fromCache === undefined;
                            });
                            this._currentStream.streamObjArray = stack;
                            return [2 /*return*/, this._currentStream.streamObjArray];
                    }
                });
            });
        };
        /**
         * @name            _saveInCache
         * @type            Function
         * @private
         *
         * This method simmply take the stream object and save it into the cache
         *
         * @param       {Object}        streamObj         The stream object to save into cache
         * @return      {Promise}                         A promise resolved when the streamObj has been saved
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SActionStream.prototype._saveInCache = function (hash, streamObj) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!((this._currentStream.currentActionObj.instance &&
                                this._currentStream.currentActionObj.instance.settings.cache &&
                                this._sCache) ||
                                (this._sCache && !this._currentStream.currentActionObj.instance))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._sCache.set(hash, streamObj)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @name          start
         * @type          Function
         * @async
         *
         * This method launch the action stream and return an SPromise instance for this particular stream "process"
         *
         * @param       {Object}          [streamObj={}]           An object that will be passed along all the actions and that can be updated at every steps. Make sure that your current action return what the next one need to work correctly...
         * @param       {Object}          [settings={}]           An object of settings to override the instance level one if wanted
         * @return      {SPromise}                                An SPromise instance for this particular stream "process" on which you can subscribe to the same "events" that on the SActionsStrean instance.
         *
         * @example         js
         * const streamPromise = myStream.start();
         * streamPromise.on('step', (streamObj) => {
         *    // do something
         * }).on('resolve', (resultObj) => {
         *    // do something
         * });
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SActionStream.prototype.start = function (streamObj, settings) {
            var _this = this;
            if (streamObj === void 0) { streamObj = {}; }
            if (settings === void 0) { settings = {}; }
            settings = deepMerge_1.default(Object.assign({}, this._settings), settings);
            var currentStreamObj = streamObj;
            this._currentStream = {
                promise: null,
                streamObjArray: Array.isArray(currentStreamObj)
                    ? currentStreamObj
                    : [currentStreamObj],
                currentActionObj: {
                    name: null,
                    promise: null,
                    instance: null,
                    sourcesCount: 0,
                    fromCache: 0,
                    processed: 0,
                    stats: {
                        stderr: [],
                        stdout: []
                    }
                },
                settings: settings,
                stats: {
                    startTime: Date.now(),
                    endTime: null,
                    stderr: [],
                    stdout: [],
                    skipNextActions: false,
                    canceled: false,
                    actions: {}
                }
            };
            // make sure the before, after, beforeAction and afterAction stacks are Arrays
            if (settings.before && !Array.isArray(settings.before))
                settings.before = [settings.before];
            if (settings.after && !Array.isArray(settings.after))
                settings.after = [settings.after];
            this._currentStream.promise = new s_promise_1.default(function (_a) {
                var resolve = _a.resolve, reject = _a.reject, emit = _a.emit, cancel = _a.cancel;
                return __awaiter(_this, void 0, void 0, function () {
                    var startString, actionsOrderedNames, i, actionName, actionInstance, actionSettings, skipMessage, skipAction, startString, issuesString, errorString, successString, issuesString, errorString, completeString, e_2;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, wait_1.default(100)];
                            case 1:
                                _b.sent(); // ugly hack to check when have time...
                                _b.label = 2;
                            case 2:
                                _b.trys.push([2, 9, , 10]);
                                // starting log
                                if (this._settings.logs.exclude.indexOf(this._currentStream.currentActionObj.id) === -1 &&
                                    this._settings.logs.start) {
                                    startString = "#start Starting the stream \"<cyan>" + (settings.name || 'unnamed') + "</cyan>\"";
                                    this.log({
                                        value: startString
                                    });
                                }
                                emit('start', {});
                                return [4 /*yield*/, this._applyFnOnStreamObj(currentStreamObj, this._settings.before, {
                                        type: 'before'
                                    })];
                            case 3:
                                currentStreamObj = _b.sent();
                                if (!!this.hasCurrentStreamErrors()) return [3 /*break*/, 7];
                                actionsOrderedNames = Array.isArray(settings.order)
                                    ? settings.order
                                    : Object.keys(this._actionsObject);
                                // check the order
                                actionsOrderedNames.forEach(function (actionName) {
                                    if (!_this._actionsObject[actionName]) {
                                        _this._currentStream.stats.stderr.push(parseHtml_1.default("You have specified the action \"<yellow>" + actionName + "</yellow>\" in your SActionsStream instance but it is not available. Here's the available actions: <green>" + Object.keys(_this._actionsObject).join(',') + "</green>"));
                                    }
                                });
                                i = 0;
                                _b.label = 4;
                            case 4:
                                if (!(i < actionsOrderedNames.length)) return [3 /*break*/, 7];
                                if (this._currentStream.canceled ||
                                    this.hasCurrentStreamErrors()) {
                                    // this.log('stop');
                                    return [3 /*break*/, 7];
                                }
                                actionName = actionsOrderedNames[i];
                                actionInstance = void 0;
                                actionSettings = settings.actions
                                    ? settings.actions[actionName] || {}
                                    : {};
                                // make sure we have a "name" property in the actionSettings object
                                if (!actionSettings.name) {
                                    actionSettings.name = actionName;
                                }
                                skipMessage = null, skipAction = 'break';
                                if (this._currentStream.stats.skipNextActions === true) {
                                    skipMessage = "#warning Skipping all the next actions after the \"<cyan>" + actionsOrderedNames[i - 1] + "</cyan>\" one...";
                                    skipAction = 'break';
                                }
                                else if (Array.isArray(this._currentStream.stats.skipNextActions) &&
                                    this._currentStream.stats.skipNextActions.indexOf(actionName) !== -1) {
                                    skipMessage = "#warning Skipping the \"<yellow>" + actionName + "</yellow>\" action...";
                                    skipAction = 'continue';
                                }
                                else if (typeof this._currentStream.stats.skipNextActions === 'number' &&
                                    this._currentStream.stats.skipNextActions > 0) {
                                    this._currentStream.stats.skipNextActions--;
                                    skipMessage = "#warning Skipping the \"<yellow>" + actionName + "</yellow>\" action. Reamaining action(s) to skip: <cyan>" + this._currentStream.stats.skipNextActions + "</cyan>...";
                                    skipAction = 'continue';
                                }
                                if (skipMessage) {
                                    this.log({
                                        value: skipMessage
                                    });
                                    if (skipAction === 'continue')
                                        return [3 /*break*/, 6];
                                    else
                                        return [3 /*break*/, 7];
                                }
                                // handle passed action that can be either a simple function, a extended SActionsStreamAction class or an instance of the SActionsStreamAction class
                                if (class_1.default(this._actionsObject[actionName]) &&
                                    this._actionsObject[actionName].prototype instanceof
                                        SActionsStreamAction_1.default) {
                                    actionInstance = new this._actionsObject[actionName](actionSettings);
                                }
                                else {
                                    this._currentStream.stats.stderr.push("Your action \"<yellow>" + actionName + "</yellow>\" has to be a class extending the <cyan>SActionsStreamAction</cyan> one...");
                                    return [3 /*break*/, 7];
                                }
                                this._currentStream.currentActionObj = {
                                    name: actionName,
                                    sourcesCount: this._currentStream.streamObjArray.length,
                                    processed: 0,
                                    fromCache: 0,
                                    instance: actionInstance,
                                    stats: {
                                        action: actionName,
                                        startTime: Date.now(),
                                        stderr: [],
                                        stdout: []
                                    }
                                };
                                if (this._currentStream.currentActionObj.instance) {
                                    this._currentStream.currentActionObj.instance.on('reject', function (value) {
                                        emit(_this._currentStream.currentActionObj.name + ".error", {
                                            value: value
                                        });
                                        cancel(value);
                                    });
                                    actionSettings = deepMerge_1.default(this._currentStream.currentActionObj.instance._settings, actionSettings);
                                }
                                // emit some "start" events
                                emit(this._currentStream.currentActionObj.name + ".start", Object.assign({}, this._currentStream.currentActionObj));
                                if (this._settings.logs.exclude.indexOf(this._currentStream.currentActionObj.id) === -1) {
                                    startString = "#start Starting the action \"<yellow>" + this._currentStream.currentActionObj.name + "</yellow>\" on <magenta>" + this._currentStream.currentActionObj.sourcesCount + "</magenta> sources";
                                    this.log({
                                        group: this._currentStream.currentActionObj.name,
                                        value: startString
                                    });
                                }
                                return [4 /*yield*/, this._handleStreamObjArray()];
                            case 5:
                                _b.sent();
                                if (this.hasCurrentStreamErrors()) {
                                    return [3 /*break*/, 7];
                                }
                                if (this.constructor.interface) {
                                    issuesString = this.constructor.interface.apply(this._currentStream.streamObjArray[0], { return: 'string', throw: false });
                                    if (issuesString !== true) {
                                        this._currentStream.stats.stderr.push(issuesString);
                                        this._currentStream.currentActionObj.stats.stderr.push(issuesString);
                                    }
                                }
                                // complete the actionObj
                                this._currentStream.currentActionObj.stats = __assign(__assign({}, this._currentStream.currentActionObj.stats), { endTime: Date.now(), duration: Date.now() -
                                        this._currentStream.currentActionObj.stats.startTime });
                                // save the result into the overall actions stats object
                                this._currentStream.stats.actions[this._currentStream.currentActionObj.name] = Object.assign({}, this._currentStream.currentActionObj);
                                // emit an "event"
                                emit(this._currentStream.currentActionObj.name + ".complete", Object.assign({}, this._currentStream.currentActionObj));
                                if (this._currentStream.currentActionObj.stats.stderr.length) {
                                    errorString = "#error <red>Something went wrong during the </red>\"<yellow>" + this._currentStream.currentActionObj.name + "</yellow>\"<red> action...</red>";
                                    this._currentStream.currentActionObj.stats.stderr.push(errorString);
                                    this._currentStream.stats.stderr.push(errorString);
                                    return [3 /*break*/, 7];
                                }
                                else {
                                    successString = "#success The action \"<yellow>" + this._currentStream.currentActionObj.name + "</yellow>\" has finished <green>successfully</green> on <magenta>" + this._currentStream.currentActionObj.sourcesCount + "</magenta> sources in <yellow>" + convert_1.default(this._currentStream.currentActionObj.stats.duration, 's') + "s</yellow>";
                                    this._currentStream.currentActionObj.stats.stdout.push(successString);
                                    if (this._settings.logs.exclude.indexOf(this._currentStream.currentActionObj.id) === -1) {
                                        this.log({
                                            group: this._currentStream.currentActionObj.name,
                                            value: successString
                                        });
                                    }
                                }
                                _b.label = 6;
                            case 6:
                                i++;
                                return [3 /*break*/, 4];
                            case 7: return [4 /*yield*/, this._applyFnOnStreamObj(currentStreamObj, this._settings.after, {
                                    type: 'after'
                                })];
                            case 8:
                                currentStreamObj = _b.sent();
                                if (this.constructor.interface) {
                                    issuesString = this.constructor.interface.apply(this._currentStream.streamObjArray[0], { return: 'string', throw: false });
                                    if (issuesString !== true) {
                                        this._currentStream.stats.stderr.push(issuesString);
                                    }
                                }
                                // complete the overall stats
                                this._currentStream.stats = __assign(__assign({}, this._currentStream.stats), { streamObj: this._currentStream.streamObjArray, endTime: Date.now(), duration: Date.now() - this._currentStream.stats.startTime });
                                if (this.hasCurrentStreamErrors() ||
                                    this._currentStream.stats.canceled) {
                                    if (this._settings.logs.error) {
                                        errorString = "The stream \"<cyan>" + (settings.name || 'unnamed') + "</cyan>\" has had some issues...";
                                        this._currentStream.stats.stdout.push(errorString);
                                        this.log({
                                            error: true,
                                            value: errorString
                                        });
                                        this.log({
                                            error: true,
                                            value: trimLines_1.default(this._currentStream.stats.stderr.join('\n'))
                                        });
                                    }
                                    emit('reject', this._currentStream.stats);
                                }
                                else {
                                    if (this._settings.logs.success) {
                                        completeString = "#success The stream \"<cyan>" + (this._currentStream.settings.name || 'unnamed') + "</cyan>\" has finished <green>successfully</green> in <yellow>" + convert_1.default(this._currentStream.stats.duration, 's') + "s</yellow>";
                                        this._currentStream.stats.stdout.push(completeString);
                                        this.log({
                                            value: completeString
                                        });
                                    }
                                    // resolve this stream process
                                    emit('success', {});
                                    resolve(this._currentStream.stats);
                                }
                                return [3 /*break*/, 10];
                            case 9:
                                e_2 = _b.sent();
                                if (this._settings.logs.error) {
                                    this.log({
                                        value: e_2.toString()
                                    });
                                }
                                return [3 /*break*/, 10];
                            case 10: return [2 /*return*/];
                        }
                    });
                });
            }, {
                id: this._settings.id
            });
            // this._currentStream.promise.catch((e) => {
            // });
            // } catch (e) {
            // if (typeof e === 'object') {
            //   this._currentStream.currentActionObj.stats.stderr.push(__toString(e));
            //   this._currentStream.stats.stderr.push(__toString(e));
            // } else if (typeof e === 'string') {
            //   this._currentStream.currentActionObj.stats.stderr.push(e);
            //   this._currentStream.stats.stderr.push(e);
            // }
            // }
            // __SPromise.pipe(this._currentStream, this);
            return this._currentStream.promise;
        };
        /**
         * @name                  log
         * @type                  Function
         *
         * THis method allows you to log something that will be passed upward through the SPromise events "stdout".
         *
         * @param       {String}          ...args             The messages to log
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SActionStream.prototype.log = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args.forEach(function (arg) {
                if (_this._currentStream && _this._currentStream.promise) {
                    _this._currentStream.promise.emit('log', arg);
                }
            });
        };
        return SActionStream;
    }(s_promise_1.default));
    exports.default = SActionStream;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbnNTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQWN0aW9uc1N0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDBEQUFzQztJQUN0QyxtRUFBK0M7SUFDL0MsMkRBQXVDO0lBQ3ZDLHNEQUFvQztJQUNwQyxrRUFBOEM7SUFDOUMsc0VBQWlEO0lBQ2pELGdFQUE0QztJQUM1QyxrRUFBOEM7SUFFOUMsNERBQXdDO0lBQ3hDLHNEQUFrQztJQUNsQyxnRkFBNEQ7SUFDNUQsa0VBQTZDO0lBQzdDLDJEQUF1QztJQUl2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQ0c7SUFDSDtRQUEyQyxpQ0FBVTtRQStCbkQ7Ozs7Ozs7O1dBUUc7UUFDSCx1QkFBWSxPQUFPLEVBQUUsUUFBYTtZQUFiLHlCQUFBLEVBQUEsYUFBYTtZQUFsQztZQUNFLGdCQUFnQjtZQUNoQixrQkFDRSxtQkFBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSxnQkFBZ0I7Z0JBQ3BCLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxJQUFJO2dCQUNYLE1BQU0sRUFBRSxFQUFFO2dCQUNWLEtBQUssRUFBRSxFQUFFO2dCQUNULGFBQWEsRUFBRSxFQUFFO2dCQUNqQixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxJQUFJO29CQUNYLE9BQU8sRUFBRSxJQUFJO29CQUNiLEtBQUssRUFBRSxJQUFJO29CQUNYLE9BQU8sRUFBRSxFQUFFO2lCQUNaO2FBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixTQThCRjtZQTVGRDs7Ozs7Ozs7ZUFRRztZQUNI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