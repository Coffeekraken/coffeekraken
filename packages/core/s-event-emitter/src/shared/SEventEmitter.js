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