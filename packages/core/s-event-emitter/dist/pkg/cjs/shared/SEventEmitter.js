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
const dev_1 = require("@coffeekraken/sugar/dev");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const glob_to_regexp_1 = __importDefault(require("glob-to-regexp"));
class SEventEmitter extends s_class_1.default {
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
                (_f = (_d = metas.color) !== null && _d !== void 0 ? _d : (_e = metas.emitter.metas) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : (0, dev_1.__getColorFor)(metas.id);
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
                        value.value = (0, string_1.__toString)(value.value);
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
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @param         {Object}            [settings={}]     An object of settings for this particular SEventEmitter instance. Here's the available settings:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6QyxpREFBd0Q7QUFDeEQsK0NBS2dDO0FBQ2hDLHVEQUF5RDtBQUN6RCx1REFBa0U7QUFDbEUsb0VBQTJDO0FBNkgzQyxNQUFNLGFBQWMsU0FBUSxpQkFBTTtJQWlCOUIsTUFBTSxLQUFLLE1BQU07UUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRTtZQUNoQyxhQUFhLENBQUMsZUFBZSxHQUFHLElBQUksYUFBYSxDQUFDO2dCQUM5QyxLQUFLLEVBQUU7b0JBQ0gsRUFBRSxFQUFFLG9CQUFvQjtpQkFDM0I7YUFDSixDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sYUFBYSxDQUFDLGVBQWUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUNQLG1CQUFtQyxFQUNuQyxpQkFBdUMsRUFDdkMsUUFBcUM7UUFFckMsV0FBVztRQUNYLE1BQU0sR0FBRyxtQkFDTCxNQUFNLEVBQUUsR0FBRyxFQUNYLGVBQWUsRUFBRSxLQUFLLEVBQ3RCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFDNUQsTUFBTSxFQUFFLFNBQVMsSUFDZCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsaUNBQWlDO1FBQ2pDLElBQ0ksQ0FBQyxtQkFBbUI7WUFDcEIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sbUJBQW1CLENBQUMsRUFBRSxLQUFLLFVBQVUsRUFDOUM7WUFDRSxPQUFPLG1CQUFtQixDQUFDO1NBQzlCO1FBRUQsdUNB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