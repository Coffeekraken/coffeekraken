"use strict";
// @shared
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
const SClass_1 = __importDefault(require("../class/SClass"));
const minimatch_1 = __importDefault(require("minimatch"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const uniqid_1 = __importDefault(require("../string/uniqid"));
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
                bufferedEvents: []
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
            const set = Object.assign({ events: '*', prefixEvent: false, processor: undefined, exclude: ['finally', 'resolve', 'reject', 'cancel', 'catch'], filter: undefined }, (settings || {}));
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
                    // source
                    if (!metas.source) {
                        metas.source = sourceSEventEmitter.id;
                    }
                    // path
                    if (!metas.path) {
                        metas.path = `${sourceSEventEmitter.id}.${destSEventEmitter.id}`;
                    }
                    else {
                        metas.path = `${metas.path}.${sourceSEventEmitter.id}`;
                    }
                    if (set.prefixEvent) {
                        if (typeof set.prefixEvent === 'string') {
                            emitStack = `${set.prefixEvent}.${metas.event}`;
                        }
                        else {
                            emitStack = `${metas.path}.${metas.name}`;
                        }
                        metas.event = emitStack;
                    }
                    if (metas.askId) {
                        destSEventEmitter.on(`${metas.event}:1`, (value, onMetas) => {
                            sourceSEventEmitter.emit(`answer.${metas.askId}`, value);
                        });
                    }
                    // emit on the destination promise
                    destSEventEmitter.emit(metas.event, value, Object.assign(Object.assign({}, metas), { level: metas && metas.level ? metas.level + 1 : 1 }));
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
            let isFirstLevel = !finalMetas.level;
            // check if is an asking
            if (!finalMetas.askId && isFirstLevel) {
                if ((value && value.ask === true) || event === 'ask') {
                    finalMetas.askId = uniqid_1.default();
                    finalMetas.ask = true;
                }
            }
            if (isFirstLevel && finalMetas.askId) {
                this.on(`answer.${finalMetas.askId}:1`, (value, finalMetas) => {
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
        let eventStackObj = this._eventsStacks[event];
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
            let eventStackObj = this._eventsStacks[event];
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
                source: this.id,
                path: undefined,
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
                let callbackResult = yield item.callback(currentCallbackReturnedValue, metasObj);
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
                let stackResult = yield this._emitEventStack(events[i], currentStackResult, metas);
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
        let eventStackObj = this._eventsStacks[event];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0FBRVYsNkRBQWtEO0FBQ2xELDBEQUFvQztBQUNwQyxvRUFBOEM7QUFDOUMsOERBQXdDO0FBd0d4QyxNQUFNLGFBQWMsU0FBUSxnQkFBTTtJQTRKaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxZQUFZLFdBQThDLEVBQUU7UUFDMUQsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsY0FBYyxFQUFFLEVBQUU7YUFDbkI7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBdkZKOzs7Ozs7Ozs7V0FTRztRQUNLLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTlCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFPLEdBQStCLEVBQUUsQ0FBQztRQUV6Qzs7Ozs7Ozs7O1dBU0c7UUFDSCxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQXNEdEIsaUNBQWlDO1FBQ2pDLGtDQUFrQztRQUNsQyxNQUFNO0lBQ1IsQ0FBQztJQS9MRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILE1BQU0sQ0FBTyxJQUFJLENBQ2YsbUJBQW1DLEVBQ25DLGlCQUFpQyxFQUNqQyxRQUFxQzs7WUFFckMsV0FBVztZQUNYLE1BQU0sR0FBRyxtQkFDUCxNQUFNLEVBQUUsR0FBRyxFQUNYLFdBQVcsRUFBRSxLQUFLLEVBQ2xCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFDNUQsTUFBTSxFQUFFLFNBQVMsSUFDZCxDQUFDLFFB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