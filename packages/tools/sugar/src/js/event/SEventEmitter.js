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
        define(["require", "exports", "../class/SClass", "minimatch", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SClass_1 = __importDefault(require("../class/SClass"));
    var minimatch_1 = __importDefault(require("minimatch"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var cls = /** @class */ (function (_super) {
        __extends(SEventEmitter, _super);
        /**
         * @name                  constructor
         * @type                  Function
         *
         * Constructor
         *
         * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
         * @param         {Object}            [settings={}]     An object of settings for this particular SEventEmitter instance. Here's the available settings:
         *
         * @example       js
         * const promise = new SEventEmitter((resolve, reject, emit, cancel, promise) => {
         *    // do something...
         * }).then(value => {
         *    // do something...
         * }).finally(value => {
         *    // do something...
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        function SEventEmitter(settings) {
            if (settings === void 0) { settings = {}; }
            var _this = _super.call(this, deepMerge_1.default({
                eventEmitter: {
                    defaultCallTime: {},
                    bufferTimeout: 1000,
                    bufferedEvents: []
                }
            }, settings)) || this;
            /**
             * @name          _buffer
             * @type          Array
             * @private
             *
             * Store all the emited data that does not have any registered listener
             * and that match with the ```settings.bufferedEvents``` stack
             *
             * @since       2.0.0
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            _this._buffer = [];
            /**
             * @name          _eventsStacks
             * @type          Array
             * @private
             *
             * Store all the registered stacks with their callStack, callback, etc...
             *
             * @since       2.0.0
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            _this._eventsStacks = {};
            Object.defineProperty(_this, '_eventsStacks', {
                writable: true,
                configurable: true,
                enumerable: false,
                value: {}
            });
            return _this;
        }
        /**
         * @name                  pipe
         * @type                  Function
         * @static
         *
         * This static function allows you to redirect some SEventEmitter "events" to another SEventEmitter instance
         * with the ability to process the linked value before emiting it on the destination SEventEmitter.
         *
         * @param         {SEventEmitter}      sourceSEventEmitter        The source SEventEmitter instance on which to listen for "events"
         * @param         {SEventEmitter}      destSEventEmitter          The destination SEventEmitter instance on which to emit the listened "events"
         * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
         * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
         * - processor (null) {Function}: Specify a function to apply on the emited value before emiting it on the dest SEventEmitter. Take as arguments the value itself and the stack name. Need to return a new value
         * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the emited value and the metas object. You must return true or false depending if you want to pipe the particular event or not
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.pipe = function (sourceSEventEmitter, destSEventEmitter, settings) {
            // settings
            var set = __assign({ events: '*', prefixEvent: false, processor: undefined, exclude: ['finally', 'resolve', 'reject', 'cancel'], filter: undefined }, (settings || {}));
            // listen for all on the source promise
            sourceSEventEmitter.on(set.events, function (value, metas) {
                // check excluded stacks
                if (set.exclude && set.exclude.indexOf(metas.event) !== -1)
                    return;
                // check if we have a filter setted
                if (set.filter && !set.filter(value, metas))
                    return;
                // check if need to process the value
                if (set.processor) {
                    var res = set.processor(value, metas);
                    if (Array.isArray(res) && res.length === 2) {
                        value = res[0];
                        metas = res[1];
                    }
                    else {
                        value = res;
                    }
                }
                if (metas && metas.event) {
                    // append the source promise id to the stack
                    var emitStack = metas.event;
                    // source
                    if (!metas.source) {
                        metas.source = sourceSEventEmitter.id;
                    }
                    // path
                    if (!metas.path) {
                        metas.path = sourceSEventEmitter.id + "." + destSEventEmitter.id;
                    }
                    else {
                        metas.path = metas.path + "." + sourceSEventEmitter.id;
                    }
                    if (set.prefixEvent) {
                        if (typeof set.prefixEvent === 'string') {
                            emitStack = set.prefixEvent + "." + metas.event;
                        }
                        else {
                            emitStack = metas.path + "." + metas.name;
                        }
                        metas.event = emitStack;
                    }
                    // emit on the destination promise
                    destSEventEmitter.emit(metas.event, value, __assign(__assign({}, metas), { level: metas && metas.level ? metas.level + 1 : 1 }));
                }
            });
        };
        /**
         * @name          pipe
         * @type          Function
         *
         * This method take an SEventEmitter instance as parameter on which to pipe the
         * specified stacks using the settings.stacks property.
         * It is exactly the same as the static ```pipe``` method but for this
         * particular instance.
         *
         * @param       {SEventEmitter}      input      The input promise on which to pipe the events in this one
         * @param       {Object}      [settings={}]    An object ob settings to configure the pipe process:
         * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
         * - processor (null) {Function}: Specify a function to apply on the emited value before emiting it on the dest SEventEmitter. Take as arguments the value itself and the stack name. Need to return a new value
         * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the emited value and the metas object. You must return true or false depending if you want to pipe the particular event or not
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype.pipe = function (input, settings) {
            SEventEmitter.pipe(input, this, settings);
            return this;
        };
        /**
         * @name          emit
         * @type          Function
         *
         * This is the method that allows you to emit the callbacks like "catch", "finally", etc... without actually resolving the Promise itself
         *
         * @param         {String|Array}        event            The event that you want to emit. You can emit multiple events by passing an Array like ['catch','finally'], or a string like "catch,finally"
         * @param         {Mixed}         value         The value you want to pass to the callback
         * @return        {ISEventEmitter}                       The SEventEmitter instance to maintain chainability
         *
         * @example         js
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype.emit = function (event, value, metas) {
            // triger the passed event
            this._emitEvents(event, value, metas);
            return this;
        };
        /**
         * @name            _registerNewEventsStacks
         * @type            Function
         * @private
         *
         * This methods allows you to register new stacks.
         * A new stack can be called then using the "on('stackName', ...)" method,
         * or directly on the SEventEmitter instance like so "myPromise.stackName(...)".
         *
         * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
         * @return      {SEventEmitter}                        The SEventEmitter instance
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype._registerNewEventsStacks = function (events) {
            var _this = this;
            // split the events order
            if (typeof events === 'string')
                events = events.split(',').map(function (s) { return s.trim(); });
            events.forEach(function (event) {
                if (!_this._eventsStacks[event]) {
                    _this._eventsStacks[event] = {
                        buffer: [],
                        callStack: []
                    };
                }
            });
        };
        /**
         * @name            _registerCallbackInEventStack
         * @type            Function
         *
         * This function take as argument a stack array and register into it the passed callback function
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype._registerCallbackInEventStack = function (event, callback, settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
            settings = __assign({ callNumber: undefined }, settings);
            // if (this._isDestroyed) {
            //   throw new Error(
            //     `Sorry but you can't call the "${stack}" method on this SEventEmitter cause it has been destroyed...`
            //   );
            // }
            // make sure the stack exist
            if (!this._eventsStacks[event]) {
                this._registerNewEventsStacks(event);
            }
            var eventStackObj = this._eventsStacks[event];
            var callNumber = settings.callNumber;
            // process the args
            if (callNumber === undefined &&
                this._settings.eventEmitter.defaultCallTime[event] !== undefined) {
                callNumber = this._settings.eventEmitter.defaultCallTime[event];
            }
            else if (callNumber === undefined) {
                callNumber = -1;
            }
            // make sure this is a function and register it to the _catchStack
            if (typeof callback === 'function')
                eventStackObj.callStack.push({
                    callback: callback,
                    callNumber: callNumber,
                    called: 0
                });
            // check if a buffer exists for this particular stack
            if (this._buffer.length > 0) {
                setTimeout(function () {
                    _this._buffer = _this._buffer.filter(function (item) {
                        if (minimatch_1.default(item.event, event)) {
                            _this.emit(item.event, item.value);
                            return false;
                        }
                        return true;
                    });
                }, this._settings.eventEmitter.bufferTimeout);
            }
            // maintain chainability
            return this;
        };
        /**
         * @name            _emitEventStack
         * @type            Function
         * @private
         * @async
         *
         * This function take an Array Stack as parameter and execute it to return the result
         *
         * @param         {String}             event             The event to execute
         * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
         * @return        {Promise}                             A promise resolved with the stack result
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype._emitEventStack = function (event, initialValue, metas) {
            return __awaiter(this, void 0, void 0, function () {
                var currentCallbackReturnedValue, eventStackArray, eventStackObj, i, bufferedStack, metasObj, i, item, callbackResult;
                var _this = this;
                return __generator(this, function (_a) {
                    currentCallbackReturnedValue = initialValue;
                    if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
                        return [2 /*return*/, currentCallbackReturnedValue];
                    // make sure the event exist
                    if (!this._eventsStacks[event]) {
                        this._registerNewEventsStacks(event);
                    }
                    eventStackArray = [];
                    eventStackObj = this._eventsStacks[event];
                    if (eventStackObj && eventStackObj.callStack) {
                        eventStackArray = __spreadArrays(eventStackArray, eventStackObj.callStack);
                    }
                    // check if the stack is a glob pattern
                    Object.keys(this._eventsStacks).forEach(function (stackName) {
                        if (stackName === event)
                            return;
                        if (minimatch_1.default(event, stackName) &&
                            _this._eventsStacks[stackName] !== undefined) {
                            // the glob pattern match the emited stack so add it to the stack array
                            eventStackArray = __spreadArrays(eventStackArray, _this._eventsStacks[stackName].callStack);
                        }
                    });
                    // handle buffers
                    if (eventStackArray.length === 0) {
                        for (i = 0; i < this._settings.eventEmitter.bufferedEvents.length; i++) {
                            bufferedStack = this._settings.eventEmitter.bufferedEvents[i];
                            if (minimatch_1.default(event, bufferedStack)) {
                                this._buffer.push({
                                    event: event,
                                    value: initialValue
                                });
                            }
                        }
                        return [2 /*return*/, initialValue];
                    }
                    // filter the catchStack
                    eventStackArray.map(function (item) { return item.called++; });
                    eventStackArray = eventStackArray.filter(function (item) {
                        if (item.callNumber === -1)
                            return true;
                        if (item.called <= item.callNumber)
                            return true;
                        return false;
                    });
                    metasObj = deepMerge_1.default({
                        event: event,
                        name: event,
                        source: this.id,
                        path: undefined,
                        time: Date.now(),
                        level: 1
                    }, metas);
                    for (i = 0; i < eventStackArray.length; i++) {
                        item = eventStackArray[i];
                        // make sure the stack exist
                        if (!item.callback)
                            return [2 /*return*/, currentCallbackReturnedValue];
                        callbackResult = item.callback(currentCallbackReturnedValue, metasObj);
                        //   // check if the callback result is a promise
                        //   if (callbackResult && !callbackResult.restorePromiseBehavior) {
                        //     callbackResult = await callbackResult;
                        //   }
                        if (callbackResult !== undefined) {
                            // if the settings tells that we have to pass each returned value to the next callback
                            currentCallbackReturnedValue = callbackResult;
                        }
                    }
                    return [2 /*return*/, currentCallbackReturnedValue];
                });
            });
        };
        /**
         * @name          _emitEvents
         * @type          Function
         * @private
         * @async
         *
         * This function take as parameters a list of events to emit like an Array ['catch','finnaly'], or a string like so "catch,finally", and as second parameter,
         * the initial value to pass to the first callback of the joined stacks...
         *
         * @param         {Array|String}            stacks          The stacks to emit
         * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
         * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype._emitEvents = function (events, initialValue, metas) {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var currentStackResult, i, stackResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // await __wait(0);
                            if (!events)
                                return [2 /*return*/, this];
                            // check if the stacks is "*"
                            if (typeof events === 'string')
                                events = events.split(',').map(function (s) { return s.trim(); });
                            currentStackResult = initialValue;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < events.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._emitEventStack(events[i], currentStackResult, metas)];
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
         * This method allows the SEventEmitter user to register a function that will be called every time the "resolve" one is called in the executor
         * The context of the callback will be the SEventEmitter instance itself so you can call all the methods available like "resolve", "release", "on", etc using
         * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
         * your function. You can access to the SEventEmitter instance through the last parameter like so "(value, SEventEmitterInstance) => { ... }".
         *
         * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['catch','finally'], or a String like "catch,finally"
         * @param           {Function}        callback        The callback function to register
         * @return          {SEventEmitter}                  The SEventEmitter instance to maintain chainability
         *
         * @example         js
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype.on = function (events, callback) {
            // if (this._isDestroyed) {
            //   throw new Error(
            //     `Sorry but you can't call the "on" method on this SEventEmitter cause it has been destroyed...`
            //   );
            // }
            var _this = this;
            if (typeof events === 'string')
                events = events.split(',').map(function (s) { return s.trim(); });
            // loop on each events
            events.forEach(function (name) {
                // check if it has a callNumber specified using name:1
                var splitedName = name.split(':');
                var callNumber = -1;
                if (splitedName.length === 2) {
                    name = splitedName[0];
                    callNumber = parseInt(splitedName[1]);
                }
                // calling the registration method
                _this._registerCallbackInEventStack(name, callback, {
                    callNumber: callNumber
                });
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
         * @param       {String}        event        The event name to unsubscribe to
         * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
         * @return      {SEventEmitter}                The SEventEmitter instance to maintain chainability
         *
         * @since     2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype.off = function (event, callback) {
            if (!callback) {
                delete this._eventsStacks[event];
                return this;
            }
            // get the stack
            var eventStackObj = this._eventsStacks[event];
            if (!eventStackObj)
                return this;
            // loop on the stack registered callback to finc the one to delete
            eventStackObj.callStack = eventStackObj.callStack.filter(function (item) {
                if (item.callback === callback)
                    return false;
                return true;
            });
            // make sure we have saved the new stack
            this._eventsStacks[event] = eventStackObj;
            // maintain chainability
            return this;
        };
        /**
         * @name                      _destroy
         * @type                      Function
         *
         * Destroying the SEventEmitter instance by unregister all the callbacks, etc...
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SEventEmitter.prototype._destroy = function () {
            // destroying all the callbacks stacks registered
            this._eventsStacks = {};
            this._settings.eventEmitter = {};
            this._isDestroyed = true;
        };
        return SEventEmitter;
    }(SClass_1.default));
    return cls;
});
//# sourceMappingURL=SEventEmitter.js.map