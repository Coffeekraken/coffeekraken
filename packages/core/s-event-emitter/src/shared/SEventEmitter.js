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
            // this.on('answer', (value) => {
            //   console.log('ANSEER', value);
            // });
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
            settings = Object.assign({ callNumber: undefined, filter: undefined, processor: undefined }, settings);
            // if (this._isDestroyed) {
            //   throw new Error(
            //     `Sorry but you can't call the "${stack}" method on this SEventEmitter cause it has been destroyed...`
            //   );
            // }
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
                    // call the callback function
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
                processor: undefined
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
                    processor: set.processor
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
         * @param       {String}        event        The event name to unsubscribe to
         * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
         * @return      {SEventEmitter}                The SEventEmitter instance to maintain chainability
         *
         * @since     2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        off(event, callback) {
            if (!callback) {
                delete this._eventsStacks[event];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSwwREFBb0M7SUFDcEMsb0VBQXdEO0lBQ3hELDRGQUFzRTtJQUN0RSxzRkFBZ0U7SUFDaEUsNEZBQXNFO0lBQ3RFLDRGQUF3RTtJQW1IeEUsTUFBTSxhQUFjLFNBQVEsaUJBQU07UUEwTWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBbUJHO1FBQ0gsWUFBWSxXQUE4QyxFQUFFO1lBQzFELEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLFlBQVksRUFBRTtvQkFDWixVQUFVLEVBQUUsS0FBSztvQkFDakIsZUFBZSxFQUFFLEVBQUU7b0JBQ25CLGFBQWEsRUFBRSxJQUFJO29CQUNuQixjQUFjLEVBQUUsRUFBRTtvQkFDbEIsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7b0JBQ3JDLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRSxTQUFTO2lCQUNoQjthQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7WUExRko7Ozs7Ozs7OztlQVNHO1lBQ0ssa0JBQWEsR0FBRyxLQUFLLENBQUM7WUFFOUI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQU8sR0FBK0IsRUFBRSxDQUFDO1lBRXpDOzs7Ozs7Ozs7ZUFTRztZQUNILGtCQUFhLEdBQVEsRUFBRSxDQUFDO1lBeUR0QixpQ0FBaUM7WUFDakMsa0NBQWtDO1lBQ2xDLE1BQU07UUFDUixDQUFDO1FBaFBEOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JHO1FBQ0gsTUFBTSxDQUFPLElBQUksQ0FDZixtQkFBbUMsRUFDbkMsaUJBQWlDLEVBQ2pDLFFBQXFDOztnQkFFckMsV0FBVztnQkFDWCxNQUFNLEdBQUcsbUJBQ1AsTUFBTSxFQUFFLEdBQUcsRUFDWCxXQUFXLEVBQUUsS0FBSyxF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