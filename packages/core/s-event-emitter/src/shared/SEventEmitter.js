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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "minimatch", "@coffeekraken/s-class", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/string/uniqid", "@coffeekraken/sugar/shared/string/stripAnsi", "@coffeekraken/sugar/shared/is/plainObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const minimatch_1 = __importDefault(require("minimatch"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
    const stripAnsi_1 = __importDefault(require("@coffeekraken/sugar/shared/string/stripAnsi"));
    const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
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
        constructor(settings = {}) {
            super(deepMerge_1.default({
                eventEmitter: {
                    emitter: undefined,
                    asyncStart: false,
                    defaultCallTime: {},
                    bufferTimeout: 1000,
                    bufferedEvents: [],
                    forceObject: ['log', 'warn', 'error'],
                    defaults: {},
                    bind: undefined
                }
            }, settings || {}));
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
             * and that match with the ```settings.bufferedEvents``` stack
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
            return __awaiter(this, void 0, void 0, function* () {
                // settings
                const set = Object.assign({ events: '*', prefixEvent: false, prefixValue: undefined, stripAnsi: false, trim: true, keepLineBreak: true, overrideEmitter: 'bind', processor: undefined, exclude: ['finally', 'resolve', 'reject', 'cancel', 'catch'], filter: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
                // listen for all on the source promise
                sourceSEventEmitter.on(set.events || '*', (value, metas) => __awaiter(this, void 0, void 0, function* () {
                    // avoid repeating the "answer...." events
                    if (metas.event.match(/^answer\..*/)) {
                        return;
                    }
                    // check excluded stacks
                    if (set.exclude && set.exclude.indexOf(metas.event) !== -1)
                        return;
                    // check if we have a filter setted
                    if (set.filter && !set.filter(value, metas))
                        return;
                    // strip ansi
                    if (set.stripAnsi) {
                        if (value && value.value && typeof value.value === 'string')
                            value.value = stripAnsi_1.default(value.value);
                        else if (typeof value === 'string')
                            value = stripAnsi_1.default(value);
                    }
                    // trim
                    if (set.trim) {
                        if (value && value.value && typeof value.value === 'string')
                            value.value = value.value.trim();
                        else if (typeof value === 'string')
                            value = value.trim();
                    }
                    // line breaks
                    if (set.keepLineBreak === false) {
                        if (value && value.value && typeof value.value === 'string')
                            value.value = value.value.replace(/\r?\n|\r/g, '');
                        else if (typeof value === 'string')
                            value = value.replace(/\r?\n|\r/g, '');
                    }
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
                    if (set.prefixValue) {
                        if (value && value.value && typeof value.value === 'string') {
                            value.value = `${set.prefixValue}${value.value}`;
                        }
                        else if (typeof value === 'string') {
                            value = `${set.prefixValue}${value}`;
                        }
                    }
                    if (metas && metas.event) {
                        // append the source promise id to the stack
                        let emitStack = metas.event;
                        // emitter
                        if (!metas.emitter) {
                            metas.emitter = this;
                        }
                        // path
                        // if (!metas.path) {
                        //   metas.path = `${(<any>sourceSEventEmitter).id}.${
                        //     (<any>destSEventEmitter).id
                        //   }`;
                        // } else {
                        //   metas.path = `${metas.path}.${(<any>sourceSEventEmitter).id}`;
                        // }
                        if (set.prefixEvent) {
                            if (typeof set.prefixEvent === 'string') {
                                emitStack = `${set.prefixEvent}.${metas.event}`;
                            }
                            else {
                                emitStack = `${metas.name}`;
                            }
                            metas.event = emitStack;
                        }
                        if (metas.askId) {
                            destSEventEmitter.on(`${metas.event}:1`, (value, onMetas) => {
                                sourceSEventEmitter.emit(`answer.${metas.askId}`, value);
                            });
                        }
                        // emit on the destination promise
                        const emitMetas = Object.assign(Object.assign({}, metas), { level: metas && metas.level ? metas.level + 1 : 1 });
                        if (set.overrideEmitter === 'bind' &&
                            destSEventEmitter.eventEmitterSettings.bind) {
                            emitMetas.emitter = destSEventEmitter.eventEmitterSettings.bind;
                        }
                        else if (set.overrideEmitter === true) {
                            emitMetas.emitter = destSEventEmitter;
                        }
                        destSEventEmitter.emit(metas.event, value, emitMetas);
                    }
                }));
            });
        }
        /**
         * @name            eventEmitterSettings
         * @type            ISEventEmitterSettings
         * @get
         *
         * Access the event emitter settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        get eventEmitterSettings() {
            return this._settings.eventEmitter;
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
         * Untill you call this method, all the emitted events (those specified in the settings.bufferedEvents stack)
         * are store in memory and emitted after.
         *
         * @since         2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        start() {
            if (!this.eventEmitterSettings.asyncStart)
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
        emit(event, value, metas) {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const finalMetas = Object.assign({}, (metas || {}));
                const isFirstLevel = !finalMetas.level;
                // check if need to force object
                if ((this.eventEmitterSettings.forceObject === true ||
                    (Array.isArray(this.eventEmitterSettings.forceObject) &&
                        this.eventEmitterSettings.forceObject.indexOf(event) !== -1)) &&
                    !plainObject_1.default(value)) {
                    value = {
                        value
                    };
                }
                // defaults
                if (plainObject_1.default(value)) {
                    // get the default object to extends
                    Object.keys(this.eventEmitterSettings.defaults).forEach((key) => {
                        var _a;
                        const parts = key.split(',').map((l) => l.trim());
                        if (parts.indexOf(event) === -1 && parts.indexOf('*') === -1)
                            return;
                        value = deepMerge_1.default(value, (_a = this.eventEmitterSettings.defaults) === null || _a === void 0 ? void 0 : _a[key]);
                    });
                }
                // check if is an asking
                if (!finalMetas.askId && isFirstLevel) {
                    if ((value && value.ask === true) || event === 'ask') {
                        finalMetas.askId = uniqid_1.default();
                        finalMetas.ask = true;
                    }
                }
                if (isFirstLevel && finalMetas.askId) {
                    this.on(`answer.${finalMetas.askId}:1`, (value) => {
                        resolve(value);
                    });
                    this._emitEvents(event, value, finalMetas);
                }
                else {
                    const res = yield this._emitEvents(event, value, finalMetas);
                    return resolve(res);
                }
            }));
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
                        callStack: []
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
                    settings
                });
            }
            // make sure the stack exist
            if (!this._eventsStacks[event]) {
                this._registerNewEventsStacks(event);
            }
            const eventStackObj = this._eventsStacks[event];
            let callNumber = settings.callNumber;
            // process the args
            if (callNumber === undefined &&
                // @ts-ignore
                this.eventEmitterSettings.defaultCallTime[event] !== undefined) {
                // @ts-ignore
                callNumber = this.eventEmitterSettings.defaultCallTime[event];
            }
            else if (callNumber === undefined) {
                callNumber = -1;
            }
            // make sure this is a function and register it to the _catchStack
            if (typeof callback === 'function')
                eventStackObj.callStack.push({
                    callback,
                    callNumber,
                    filter: settings.filter,
                    processor: settings.processor,
                    called: 0
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
                        // if (__minimatch(item.event, event)) {
                        //   return false;
                        // }
                        this.emit(item.event, item.value);
                        return false;
                    });
                    // @ts-ignore
                }, this.eventEmitterSettings.bufferTimeout);
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
        _emitEventStack(event, initialValue, metas) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                let currentCallbackReturnedValue = initialValue;
                if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
                    return currentCallbackReturnedValue;
                // check async start
                if (!this._asyncStarted && this.eventEmitterSettings.asyncStart) {
                    this._buffer.push({
                        event,
                        value: initialValue
                    });
                    return initialValue;
                }
                if (!this._eventsStacks[event]) {
                    // make sure the event exist
                    this._registerNewEventsStacks(event);
                }
                let eventStackArray = [];
                const eventStackObj = this._eventsStacks[event];
                if (eventStackObj && eventStackObj.callStack) {
                    eventStackArray = [...eventStackArray, ...eventStackObj.callStack];
                }
                // check if the stack is a glob pattern
                Object.keys(this._eventsStacks).forEach((stackName) => {
                    if (stackName === event)
                        return;
                    if (minimatch_1.default(event, stackName) &&
                        this._eventsStacks[stackName] !== undefined) {
                        // the glob pattern match the emited stack so add it to the stack array
                        eventStackArray = [
                            ...eventStackArray,
                            ...this._eventsStacks[stackName].callStack
                        ];
                    }
                });
                // handle buffers
                if (eventStackArray.length === 0) {
                    for (let i = 0; 
                    // @ts-ignore
                    i < this.eventEmitterSettings.bufferedEvents.length; i++) {
                        // @ts-ignore
                        const bufferedStack = this.eventEmitterSettings.bufferedEvents[i];
                        if (bufferedStack && minimatch_1.default(event, bufferedStack)) {
                            this._buffer.push({
                                event,
                                value: initialValue
                            });
                        }
                    }
                    return initialValue;
                }
                // filter the catchStack
                eventStackArray.map((item) => item.called++);
                eventStackArray = eventStackArray.filter((item) => {
                    if (item.callNumber === -1)
                        return true;
                    if (item.called <= item.callNumber)
                        return true;
                    return false;
                });
                let metasObj = deepMerge_1.default({
                    event: event,
                    name: event,
                    emitter: (_b = (_a = this.eventEmitterSettings.bind) !== null && _a !== void 0 ? _a : metas === null || metas === void 0 ? void 0 : metas.emitter) !== null && _b !== void 0 ? _b : this,
                    originalEmitter: (_c = metas === null || metas === void 0 ? void 0 : metas.originalEmitter) !== null && _c !== void 0 ? _c : this,
                    time: Date.now(),
                    level: 1,
                    id: uniqid_1.default()
                }, metas);
                for (let i = 0; i < eventStackArray.length; i++) {
                    // get the actual item in the array
                    const item = eventStackArray[i];
                    // make sure the stack exist
                    if (!item.callback)
                        return currentCallbackReturnedValue;
                    // check if we have a filter setted
                    if (item.filter && !item.filter(currentCallbackReturnedValue, metasObj))
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
                    const callbackResult = yield item.callback(currentCallbackReturnedValue, metasObj);
                    if (callbackResult !== undefined) {
                        // if the settings tells that we have to pass each returned value to the next callback
                        currentCallbackReturnedValue = callbackResult;
                    }
                }
                if (!eventStackArray.length && metasObj.askId) {
                    this.emit(`answer.${metasObj.askId}`, currentCallbackReturnedValue);
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
                // await __wait(0);
                if (!events)
                    return this;
                // check if the stacks is "*"
                if (typeof events === 'string')
                    events = events.split(',').map((s) => s.trim());
                let currentStackResult = initialValue;
                for (let i = 0; i < events.length; i++) {
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
            const set = deepMerge_1.default({
                filter: undefined,
                processor: undefined,
                id: undefined
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
                    id: set.id
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
         * @name                      _destroy
         * @type                      Function
         *
         * Destroying the SEventEmitter instance by unregister all the callbacks, etc...
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        _destroy() {
            // destroying all the callbacks stacks registered
            this._eventsStacks = {};
        }
    }
    SEventEmitter.usableAsMixin = true;
    const cls = SEventEmitter;
    exports.default = SEventEmitter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSwwREFBb0M7SUFDcEMsb0VBQXdEO0lBQ3hELDRGQUFzRTtJQUN0RSxzRkFBZ0U7SUFDaEUsNEZBQXNFO0lBQ3RFLDRGQUF3RTtJQXFIeEUsTUFBTSxhQUFjLFNBQVEsaUJBQU07UUFzTmhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBbUJHO1FBQ0gsWUFBWSxXQUE4QyxFQUFFO1lBQzFELEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLFlBQVksRUFBRTtvQkFDWixPQUFPLEVBQUUsU0FBUztvQkFDbEIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLGVBQWUsRUFBRSxFQUFFO29CQUNuQixhQUFhLEVBQUUsSUFBSTtvQkFDbkIsY0FBYyxFQUFFLEVBQUU7b0JBQ2xCLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO29CQUNyQyxRQUFRLEVBQUUsRUFBRTtvQkFDWixJQUFJLEVBQUUsU0FBUztpQkFDaEI7YUFDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1lBdkdKOzs7Ozs7Ozs7ZUFTRztZQUNLLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1lBRTlCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFPLEdBQStCLEVBQUUsQ0FBQztZQUV6Qzs7Ozs7Ozs7O2VBU0c7WUFDSCxrQkFBYSxHQUFRLEVBQUUsQ0FBQztZQUV4Qjs7Ozs7Ozs7O2VBU0c7WUFDSCxpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQXlEdkIsQ0FBQztRQXpQRDs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRztRQUNILE1BQU0sQ0FBTyxJQUFJLENBQ2YsbUJBQW1DLEVBQ25DLGlCQUFpQyxFQUNqQyxRQUFxQzs7Z0JBRXJDLFdBQVc7Z0JBQ1gsTUFBTSxHQUFHLG1CQUNQLE1BQU0s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