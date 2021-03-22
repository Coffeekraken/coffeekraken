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
const minimatch_1 = __importDefault(require("minimatch"));
const SClass_1 = __importDefault(require("../class/SClass"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const uniqid_1 = __importDefault(require("../string/uniqid"));
const stripAnsi_1 = __importDefault(require("../string/stripAnsi"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
class SEventEmitter extends SClass_1.default {
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
     * @param         {SEventEmitter}      sourceSEventEmitter        The source SEventEmitter instance on which to listen for "events"
     * @param         {SEventEmitter}      destSEventEmitter          The destination SEventEmitter instance on which to emit the listened "events"
     * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
     * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
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
     * @param         {String|Array}        event            The event that you want to emit. You can emit multiple events by passing an Array like ['catch','finally'], or a string like "catch,finally"
     * @param         {Mixed}         value         The value you want to pass to the callback
     * @return        {ISEventEmitter}                       The SEventEmitter instance to maintain chainability
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
     * @return      {SEventEmitter}                        The SEventEmitter instance
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
     * @param         {String}             event             The event to execute
     * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
     * @return        {Promise}                             A promise resolved with the stack result
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
     * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
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
     * @return          {SEventEmitter}                  The SEventEmitter instance to maintain chainability
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBb0M7QUFDcEMsNkRBQWtEO0FBQ2xELG9FQUE4QztBQUM5Qyw4REFBd0M7QUFDeEMsb0VBQThDO0FBQzlDLG9FQUFnRDtBQW1IaEQsTUFBTSxhQUFjLFNBQVEsZ0JBQU07SUEwTWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsWUFBWSxXQUE4QyxFQUFFO1FBQzFELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsWUFBWSxFQUFFO2dCQUNaLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixlQUFlLEVBQUUsRUFBRTtnQkFDbkIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLGNBQWMsRUFBRSxFQUFFO2dCQUNsQixXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztnQkFDckMsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBMUZKOzs7Ozs7Ozs7V0FTRztRQUNLLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTlCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFPLEdBQStCLEVBQUUsQ0FBQztRQUV6Qzs7Ozs7Ozs7O1dBU0c7UUFDSCxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQXlEdEIsaUNBQWlDO1FBQ2pDLGtDQUFrQztRQUNsQyxNQUFNO0lBQ1IsQ0FBQztJQWhQRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILE1BQU0sQ0FBTyxJQUFJLENBQ2YsbUJBQW1DLEVBQ25DLGlCQUFpQyxFQUNqQyxRQUFxQzs7WUFFckMsV0FBVztZQUNYLE1BQU0sR0FBRyxtQkFDUCxNQUFNLEVBQUUsR0FBRyxFQUNYLFdBQVcsRUFBRSxLQUFLLEVBQ2xCLFdBQVcsRUFB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