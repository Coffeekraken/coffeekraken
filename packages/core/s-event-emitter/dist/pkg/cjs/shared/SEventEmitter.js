"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const getColorFor_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/getColorFor"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
const string_1 = require("@coffeekraken/sugar/string");
const glob_to_regexp_1 = __importDefault(require("glob-to-regexp"));
class SEventEmitter extends s_class_1.default {
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
     * @param         {Object}            [settings={}]     An object of settings for this particular SEventEmitter instance. Here's the available settings:
     *
     * @example       js
     * const promise = new SEventEmitter(({ resolve, reject, emit }) => {
     *    // do something...
     * }).then(value => {
     *    // do something...
     * }).finally(value => {
     *    // do something...
     * });
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({
            asyncStart: false,
            bufferTimeout: 1000,
            defaults: {},
            castByEvent: {
                log: s_log_1.default,
            },
            bind: undefined,
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name          _asyncStarted
         * @type          Boolean
         * @private
         *
         * Store the async start status defined by the setting "async"
         *
         * @since         2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._asyncStarted = false;
        /**
         * @name          _buffer
         * @type          Array
         * @private
         *
         * Store all the emited data that does not have any registered listener
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._buffer = [];
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
        this._eventsStacks = {};
        /**
         * @name          _onStackById
         * @type          Array
         * @private
         *
         * Store all the registered "on" called with a specific "id" in the settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._onStackById = {};
    }
    static get global() {
        if (!SEventEmitter._globalInstance) {
            SEventEmitter._globalInstance = new SEventEmitter({
                metas: {
                    id: 'sugarEventSPromise',
                },
            });
        }
        return SEventEmitter._globalInstance;
    }
    /**
     * @name                  pipe
     * @type                  Function
     * @static
     *
     * This static function allows you to redirect some SEventEmitter "events" to another SEventEmitter instance
     * with the ability to process the linked value before emiting it on the destination SEventEmitter.
     *
     * @param         {SEventEmitter}      sourceSEventEmitter        The source SEventEmitter instance on which to listen for "events"
     * @param         {SEventEmitter}      destSEventEmitter          The destination SEventEmitter instance on which to emit the listened "events"
     * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
     * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
     * - processor (null) {Function}: Specify a function to apply on the emited value before emiting it on the dest SEventEmitter. Take as arguments the value itself and the stack name. Need to return a new value
     * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the emited value and the metas object. You must return true or false depending if you want to pipe the particular event or not
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static pipe(sourceSEventEmitter, destSEventEmitter, settings) {
        // settings
        const set = Object.assign({ events: '*', overrideEmitter: false, processor: undefined, exclude: ['finally', 'resolve', 'reject', 'cancel', 'catch'], filter: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        // make sure it's a valid emitter
        if (!sourceSEventEmitter ||
            !sourceSEventEmitter.on ||
            typeof sourceSEventEmitter.on !== 'function') {
            return sourceSEventEmitter;
        }
        // listen for all on the source promise
        sourceSEventEmitter.on(set.events || '*', (value, metas) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            // @TODO    check why this arrive...
            if (!metas || !value) {
                return;
            }
            // specify the id
            // @ts-ignore
            metas.id = (_c = (_a = metas.id) !== null && _a !== void 0 ? _a : (_b = metas.emitter.metas) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : (0, string_1.__uniqid)();
            // specify color
            // @ts-ignore
            metas.color =
                (_f = (_d = metas.color) !== null && _d !== void 0 ? _d : (_e = metas.emitter.metas) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : (0, getColorFor_1.default)(metas.id);
            // check excluded stacks
            if (set.exclude && set.exclude.indexOf(metas.event) !== -1)
                return;
            // check if we have a filter setted
            if (set.filter && !set.filter(value, metas))
                return;
            // check if need to process the value
            if (set.processor) {
                const res = set.processor(value, metas);
                if (Array.isArray(res) && res.length === 2) {
                    value = res[0];
                    metas = res[1];
                }
                else if (typeof res === 'object' &&
                    res.value !== undefined &&
                    res.metas !== undefined) {
                    value = res.value;
                    metas = res.metas;
                }
                else {
                    value = res;
                }
            }
            if (metas && metas.event) {
                // append the source promise id to the stack
                let emitStack = metas.event;
                // emitter
                if (!metas.emitter) {
                    metas.emitter = this;
                }
                // emit on the destination promise
                const emitMetas = Object.assign(Object.assign({}, metas), { level: ((_g = metas === null || metas === void 0 ? void 0 : metas.level) !== null && _g !== void 0 ? _g : 0) + 1 });
                if (destSEventEmitter instanceof SEventEmitter) {
                    if (!set.overrideEmitter &&
                        destSEventEmitter.settings.bind) {
                        emitMetas.emitter = destSEventEmitter.settings.bind;
                    }
                    else if (set.overrideEmitter === true) {
                        emitMetas.emitter = destSEventEmitter;
                    }
                }
                if ((0, is_1.__isNode)() &&
                    destSEventEmitter === process &&
                    (0, is_1.__isChildProcess)()
                // process.send
                ) {
                    if (value.value && value.value instanceof Error) {
                        value.value = (0, toString_1.default)(value.value);
                    }
                    if (!this._ipcInstance._pipedEventsUids) {
                        this._ipcInstance._pipedEventsUids = [];
                    }
                    // @ts-ignore
                    if (this._ipcInstance &&
                        !this._ipcInstance._pipedEventsUids.includes(emitMetas.uid)) {
                        this._ipcInstance._pipedEventsUids.push(emitMetas.uid);
                        // @ts-ignore
                        this._ipcInstance.of[`ipc-${process.ppid}`].emit('message', {
                            value,
                            metas: emitMetas,
                        });
                    }
                }
                else {
                    destSEventEmitter.emit(metas.event, value, emitMetas);
                }
            }
        }));
    }
    /**
     * @name          bind
     * @type      Function
     *
     * This method allows you to bind another object as the emitter.
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    bind(obj) {
        this.settings.bind = obj;
        return this;
    }
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
     * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    pipe(input, settings) {
        SEventEmitter.pipe(input, this, settings);
        return input;
    }
    /**
     * @name          pipeErrors
     * @type          Function
     *
     * This is the exact same as the original ```pipe``` method. It's just pipe only the errors.
     *
     * @param       {SEventEmitter}      input      The input promise on which to pipe the events in this one
     * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    pipeErrors(input, settings) {
        SEventEmitter.pipe(input, this, Object.assign(Object.assign({}, settings), { events: 'error' }));
        return input;
    }
    /**
     * @name      pipeFrom
     * @type      Function
     *
     * This is the exacte same as the original ```pipe``` method. It's just an aliasw.
     *
     * @since     2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    pipeFrom(input, settings) {
        return this.pipe(input, settings);
    }
    /**
     * @name          pipe
     * @type          Function
     *
     * This method is the same as the ```pipe```and ```pipeFrom``` one but it's just act as the inverse.
     * Here you specify whenre you want to pipe this instance events and not from which you want to pipe them here...
     *
     * @param       {SEventEmitter}      dest      The destination event emitter on which to pipe the events from this one
     * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    pipeTo(dest, settings) {
        SEventEmitter.pipe(this, dest, settings);
        return this;
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method has to be called when you want to start the event emissions.
     * This is usefull only if you set the setting ```asyncStart``` to true.
     * Untill you call this method, all the emitted events
     * are store in memory and emitted after.
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    start() {
        if (!this.settings.asyncStart)
            return;
        // update the asyncStarted status
        this._asyncStarted = true;
        // process the buffer
        this._processBuffer();
    }
    /**
     * @name          emit
     * @type          Function
     * @async
     *
     * This is the method that allows you to emit the callbacks like "catch", "finally", etc... without actually resolving the Promise itself
     *
     * @param         {String|Array}        event            The event that you want to emit. You can emit multiple events by passing an Array like ['catch','finally'], or a string like "catch,finally"
     * @param         {Mixed}         value         The value you want to pass to the callback
     * @return        {ISEventEmitter}                       The SEventEmitter instance to maintain chainability
     *
     * @example         js
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _createMetas(event, metas = {}) {
        var _a, _b, _c;
        return (0, object_1.__deepMerge)({
            event: event,
            name: event,
            emitter: (_b = (_a = this.settings.bind) !== null && _a !== void 0 ? _a : metas === null || metas === void 0 ? void 0 : metas.emitter) !== null && _b !== void 0 ? _b : this,
            originalEmitter: (_c = metas === null || metas === void 0 ? void 0 : metas.originalEmitter) !== null && _c !== void 0 ? _c : this,
            time: Date.now(),
            level: 0,
        }, metas !== null && metas !== void 0 ? metas : {});
    }
    emit(event, value, metas) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let metasObj = this._createMetas(event, metas);
            const isFirstLevel = !metasObj.level;
            // defaults
            if ((0, is_1.__isPlainObject)(value)) {
                // get the default object to extends
                Object.keys(this.settings.defaults).forEach((key) => {
                    var _a;
                    const parts = key.split(',').map((l) => l.trim());
                    if (parts.indexOf(event) === -1 &&
                        parts.indexOf('*') === -1)
                        return;
                    value = (0, object_1.__deepMerge)(value, (_a = this.settings.defaults) === null || _a === void 0 ? void 0 : _a[key]);
                });
            }
            const CastClass = this.settings.castByEvent[event];
            if (CastClass &&
                (0, is_1.__isClass)(CastClass) &&
                !(value instanceof CastClass) &&
                !value._sEventEmitterPreprocessed) {
                // @ts-ignore
                value = new CastClass(value);
                // Object.defineProperty(value, '_sEventEmitterPreprocessed', {
                //     value: true,
                //     enumerable: false,
                // });
            }
            if (event === 'ask') {
                if (isFirstLevel) {
                    metasObj.askId = (0, string_1.__uniqid)();
                }
            }
            // check async start
            if (!this._asyncStarted && this.settings.asyncStart) {
                this._buffer.push({
                    event,
                    value,
                    metas: metasObj,
                    resolve,
                    reject,
                });
                return;
            }
            // emit event directly
            this._emit({
                event,
                value,
                metas: metasObj,
                resolve,
                reject,
            });
        }));
    }
    _emit(logObj) {
        return __awaiter(this, void 0, void 0, function* () {
            // assign a unique id to the log
            logObj.metas.uid = (0, string_1.__uniqid)();
            // if is an ask event, set the askId in metas
            if (logObj.event === 'ask') {
                // @ts-ignore
                this.constructor.global.on(`answer.${logObj.metas.askId}`, (answer, metas) => {
                    logObj.resolve(answer);
                });
                this._emitEvents(logObj.event, logObj.value, Object.assign({}, logObj.metas));
            }
            else {
                const res = yield this._emitEvents(logObj.event, logObj.value, Object.assign({}, logObj.metas));
                logObj.resolve(res);
            }
        });
    }
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
     * @return      {SEventEmitter}                        The SEventEmitter instance
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _registerNewEventsStacks(events) {
        // split the events order
        if (typeof events === 'string')
            events = events.split(',').map((s) => s.trim());
        events.forEach((event) => {
            if (!this._eventsStacks[event]) {
                this._eventsStacks[event] = {
                    buffer: [],
                    callStack: [],
                };
            }
        });
    }
    /**
     * @name            _registerCallbackInEventStack
     * @type            Function
     *
     * This function take as argument a stack array and register into it the passed callback function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _registerCallbackInEventStack(event, callback, settings = {}) {
        settings = Object.assign({ callNumber: undefined, filter: undefined, processor: undefined, id: undefined }, settings);
        // if (this._isDestroyed) {
        //   throw new Error(
        //     `Sorry but you can't call the "${stack}" method on this SEventEmitter cause it has been destroyed...`
        //   );
        // }
        // save the passed "id" to be able to use it later to apply
        // some actions like "off", etc... directly on this event registration
        if (settings.id) {
            if (!this._onStackById[settings.id])
                this._onStackById[settings.id] = [];
            this._onStackById[settings.id].push({
                event,
                callback,
                settings,
            });
        }
        // make sure the stack exist
        if (!this._eventsStacks[event]) {
            this._registerNewEventsStacks(event);
        }
        const eventStackObj = this._eventsStacks[event];
        let callNumber = settings.callNumber;
        // process the args
        if (callNumber === undefined) {
            callNumber = -1;
        }
        // make sure this is a function and register it to the _catchStack
        if (typeof callback === 'function')
            eventStackObj.callStack.push({
                callback,
                callNumber,
                filter: settings.filter,
                processor: settings.processor,
                called: 0,
            });
        // process buffer
        this._processBuffer();
        // maintain chainability
        return this;
    }
    /**
     * @name          _processBuffer
     * @type          Function
     * @private
     *
     * This method simply take care of empty the buffer by emitting
     * all the buffered events
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _processBuffer() {
        // check if a buffer exists for this particular stack
        if (this._buffer.length > 0) {
            setTimeout(() => {
                this._buffer = this._buffer.filter((item) => {
                    this._emit(item);
                    return false;
                });
                // @ts-ignore
            }, this.settings.bufferTimeout);
        }
    }
    /**
     * @name            _emitEventStack
     * @type            Function
     * @private
     * @async
     *
     * This function take an Array Stack as parameter and execute it to return the result
     *
     * @param         {String}             event             The event to execute
     * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
     * @return        {Promise}                             A promise resolved with the stack result
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _emitEventStack(event, initialValue, metasObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentCallbackReturnedValue = initialValue;
            if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
                return currentCallbackReturnedValue;
            if (!this._eventsStacks[event]) {
                // make sure the event exist
                this._registerNewEventsStacks(event);
            }
            let eventStackArray = [];
            const eventStackObj = this._eventsStacks[event];
            if (eventStackObj && eventStackObj.callStack) {
                eventStackArray = [
                    ...eventStackArray,
                    ...eventStackObj.callStack,
                ];
            }
            // check if the stack is a glob pattern
            Object.keys(this._eventsStacks).forEach((stackName) => {
                if (stackName === event)
                    return currentCallbackReturnedValue;
                if ((0, glob_to_regexp_1.default)(stackName).test(event) &&
                    this._eventsStacks[stackName] !== undefined) {
                    // the glob pattern match the emited stack so add it to the stack array
                    eventStackArray = [
                        ...eventStackArray,
                        ...this._eventsStacks[stackName].callStack,
                    ];
                }
            });
            // filter the catchStack
            eventStackArray.map((item) => item.called++);
            eventStackArray = eventStackArray.filter((item) => {
                if (item.callNumber === -1)
                    return true;
                if (item.called <= item.callNumber)
                    return true;
                return false;
            });
            for (let i = 0; i < eventStackArray.length; i++) {
                // get the actual item in the array
                const item = eventStackArray[i];
                // make sure the stack exist
                if (!item.callback)
                    return currentCallbackReturnedValue;
                // check if we have a filter setted
                if (item.filter &&
                    !item.filter(currentCallbackReturnedValue, metasObj))
                    continue;
                // check if need to process the value
                if (item.processor) {
                    const res = item.processor(currentCallbackReturnedValue, metasObj);
                    if (Array.isArray(res) && res.length === 2) {
                        currentCallbackReturnedValue = res[0];
                        metasObj = res[1];
                    }
                    else if (typeof res === 'object' &&
                        res.value !== undefined &&
                        res.metas !== undefined) {
                        currentCallbackReturnedValue = res.value;
                        metasObj = res.metas;
                    }
                    else {
                        currentCallbackReturnedValue = res;
                    }
                }
                //  call the callback function
                const callbackResult = yield item.callback(currentCallbackReturnedValue, metasObj, (metasObj === null || metasObj === void 0 ? void 0 : metasObj.askId)
                    ? (answer) => {
                        // @ts-ignore
                        this.constructor.global.emit(`answer.${metasObj.askId}`, answer, metasObj);
                    }
                    : undefined);
                if (callbackResult !== undefined) {
                    // if the settings tells that we have to pass each returned value to the next callback
                    currentCallbackReturnedValue = callbackResult;
                }
            }
            return currentCallbackReturnedValue;
        });
    }
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
     * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _emitEvents(events, initialValue, metas) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // @TODO      check why need this...
            if (!events)
                return this;
            // check if the stacks is "*"
            if (typeof events === 'string')
                events = events.split(',').map((s) => s.trim());
            let currentStackResult = initialValue;
            for (let i = 0; i < events.length; i++) {
                // if (!metas) metas = this._createMetas(events[i]);
                const stackResult = yield this._emitEventStack(events[i], currentStackResult, metas);
                if (stackResult !== undefined) {
                    currentStackResult = stackResult;
                }
            }
            resolve(currentStackResult);
        }));
    }
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
     * @return          {SEventEmitter}                  The SEventEmitter instance to maintain chainability
     *
     * @example         js
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    on(events, callback, settings) {
        // if (this._isDestroyed) {
        //   throw new Error(
        //     `Sorry but you can't call the "on" method on this SEventEmitter cause it has been destroyed...`
        //   );
        // }
        const set = (0, object_1.__deepMerge)({
            filter: undefined,
            processor: undefined,
            id: undefined,
        }, settings);
        if (typeof events === 'string')
            events = events.split(',').map((s) => s.trim());
        // loop on each events
        events.forEach((name) => {
            // check if it has a callNumber specified using name:1
            const splitedName = name.split(':');
            let callNumber = -1;
            if (splitedName.length === 2) {
                name = splitedName[0];
                callNumber = parseInt(splitedName[1]);
            }
            // calling the registration method
            this._registerCallbackInEventStack(name, callback, {
                callNumber,
                filter: set.filter,
                processor: set.processor,
                id: set.id,
            });
        });
        // maintain chainability
        return this;
    }
    /**
     * @name            off
     * @type            Function
     *
     * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
     * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
     *
     * @param       {String}        event        The event name to unsubscribe to. It can be also an "on" method passed setting "id". In this case, it will unsubscribe all the created subscription(s) in this particular "on" call.
     * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
     * @return      {SEventEmitter}                The SEventEmitter instance to maintain chainability
     *
     * @since     2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    off(event, callback) {
        if (!callback) {
            if (this._eventsStacks[event]) {
                delete this._eventsStacks[event];
            }
            else if (this._onStackById[event]) {
                this._onStackById[event].forEach((onStackByIdObj) => {
                    this.off(onStackByIdObj.event, onStackByIdObj.callback);
                });
                delete this._onStackById[event];
            }
            return this;
        }
        // get the stack
        const eventStackObj = this._eventsStacks[event];
        if (!eventStackObj)
            return this;
        // loop on the stack registered callback to finc the one to delete
        eventStackObj.callStack = eventStackObj.callStack.filter((item) => {
            if (item.callback === callback)
                return false;
            return true;
        });
        // make sure we have saved the new stack
        this._eventsStacks[event] = eventStackObj;
        // maintain chainability
        return this;
    }
    /**
     * @name                      destroy
     * @type                      Function
     *
     * Destroying the SEventEmitter instance by unregister all the callbacks, etc...
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    destroy() {
        // destroying all the callbacks stacks registered
        this._eventsStacks = {};
    }
}
SEventEmitter.usableAsMixin = true;
exports.default = SEventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6QywrQ0FLZ0M7QUFDaEMsdURBQXlEO0FBQ3pELG1HQUE2RTtBQUM3RSwwRkFBb0U7QUFDcEUsdURBQXNEO0FBQ3RELG9FQUEyQztBQXNIM0MsTUFBTSxhQUFjLFNBQVEsaUJBQU07SUFxTzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsWUFBWSxRQUEwQztRQUNsRCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksVUFBVSxFQUFFLEtBQUs7WUFDakIsYUFBYSxFQUFFLElBQUk7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUU7Z0JBQ1QsR0FBRyxFQUFFLGVBQU07YUFDZDtZQUNELElBQUksRUFBRSxTQUFTO1NBQ2xCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFyRk47Ozs7Ozs7OztXQVNHO1FBQ0ssa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFOUI7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBTyxHQUE2QixFQUFFLENBQUM7UUFFdkM7Ozs7Ozs7OztXQVNHO1FBQ0gsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFFeEI7Ozs7Ozs7OztXQVNHO1FBQ0gsaUJBQVksR0FBUSxFQUFFLENBQUM7SUF3Q3ZCLENBQUM7SUF2UEQsTUFBTSxLQUFLLE1BQU07UUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRTtZQUNoQyxhQUFhLENBQUMsZUFBZSxHQUFHLElBQUksYUFBYSxDQUFDO2dCQUM5QyxLQUFLLEVBQUU7b0JBQ0gsRUFBRSxFQUFFLG9CQUFvQjtpQkFDM0I7YUFDSixDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sYUFBYSxDQUFDLGVBQWUsQ0FBQztJQUN6QyxDQUFD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