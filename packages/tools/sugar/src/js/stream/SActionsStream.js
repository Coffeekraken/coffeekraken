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
        define(["require", "exports", "../object/clone", "../console/parseHtml", "../error/SError", "../is/class", "../object/deepMerge", "../promise/SPromise", "../string/toString", "../string/trimLines", "../time/convert", "../time/wait", "./SActionsStreamAction", "../cache/SCache", "../crypt/sha256"], factory);
    }
})(function (require, exports) {
    "use strict";
    var clone_1 = __importDefault(require("../object/clone"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var SError_1 = __importDefault(require("../error/SError"));
    var class_1 = __importDefault(require("../is/class"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var toString_1 = __importDefault(require("../string/toString"));
    var trimLines_1 = __importDefault(require("../string/trimLines"));
    var convert_1 = __importDefault(require("../time/convert"));
    var wait_1 = __importDefault(require("../time/wait"));
    var SActionsStreamAction_1 = __importDefault(require("./SActionsStreamAction"));
    var SCache_1 = __importDefault(require("../cache/SCache"));
    var sha256_1 = __importDefault(require("../crypt/sha256"));
    return /** @class */ (function (_super) {
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
                _this._sCache = new SCache_1.default(settings.id, settings.cache === true ? {} : settings.cache);
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
                                        SPromise_1.default.pipe(fnResult, _this._currentStream.promise);
                                        SPromise_1.default.pipe(fnResult, _this);
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
            this._currentStream.promise = new SPromise_1.default(function (_a) {
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
    }(SPromise_1.default));
});
//# sourceMappingURL=SActionsStream.js.map