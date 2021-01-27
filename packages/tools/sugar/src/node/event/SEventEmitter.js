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
                defaultCallTime: {},
                bufferTimeout: 1000,
                bufferedEvents: []
            }
        }, settings || {}));
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
        // settings
        const set = Object.assign({ events: '*', prefixEvent: false, processor: undefined, exclude: ['finally', 'resolve', 'reject', 'cancel'], filter: undefined }, (settings || {}));
        // listen for all on the source promise
        sourceSEventEmitter.on(set.events || '*', (value, metas) => {
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
                // emit on the destination promise
                destSEventEmitter.emit(metas.event, value, Object.assign(Object.assign({}, metas), { level: metas && metas.level ? metas.level + 1 : 1 }));
            }
        });
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
        return this;
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
    emit(event, value, metas) {
        // triger the passed event
        this._emitEvents(event, value, metas);
        return this;
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
        settings = Object.assign({ callNumber: undefined }, settings);
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
            this._settings.eventEmitter.defaultCallTime[event] !== undefined) {
            // @ts-ignore
            callNumber = this._settings.eventEmitter.defaultCallTime[event];
        }
        else if (callNumber === undefined) {
            callNumber = -1;
        }
        // make sure this is a function and register it to the _catchStack
        if (typeof callback === 'function')
            eventStackObj.callStack.push({
                callback,
                callNumber,
                called: 0
            });
        // check if a buffer exists for this particular stack
        if (this._buffer.length > 0) {
            setTimeout(() => {
                this._buffer = this._buffer.filter((item) => {
                    if (minimatch_1.default(item.event, event)) {
                        this.emit(item.event, item.value);
                        return false;
                    }
                    return true;
                });
                // @ts-ignore
            }, this._settings.eventEmitter.bufferTimeout);
        }
        // maintain chainability
        return this;
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
            // make sure the event exist
            if (!this._eventsStacks[event]) {
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
                i < this._settings.eventEmitter.bufferedEvents.length; i++) {
                    // @ts-ignore
                    const bufferedStack = this._settings.eventEmitter.bufferedEvents[i];
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
            const metasObj = deepMerge_1.default({
                event: event,
                name: event,
                source: this.id,
                path: undefined,
                time: Date.now(),
                level: 1
            }, metas);
            for (let i = 0; i < eventStackArray.length; i++) {
                // get the actual item in the array
                const item = eventStackArray[i];
                // make sure the stack exist
                if (!item.callback)
                    return currentCallbackReturnedValue;
                // call the callback function
                let callbackResult = item.callback(currentCallbackReturnedValue, metasObj);
                //   // check if the callback result is a promise
                //   if (callbackResult && !callbackResult.restorePromiseBehavior) {
                //     callbackResult = await callbackResult;
                //   }
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
    on(events, callback) {
        // if (this._isDestroyed) {
        //   throw new Error(
        //     `Sorry but you can't call the "on" method on this SEventEmitter cause it has been destroyed...`
        //   );
        // }
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
                callNumber
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0FBRVYsNkRBQWtEO0FBQ2xELDBEQUFvQztBQUNwQyxvRUFBOEM7QUE4RjlDLE1BQU0sYUFBYyxTQUFRLGdCQUFNO0lBcUhoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQVksV0FBOEMsRUFBRTtRQUMxRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFlBQVksRUFBRTtnQkFDWixlQUFlLEVBQUUsRUFBRTtnQkFDbkIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLGNBQWMsRUFBRSxFQUFFO2FBQ25CO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQTVESjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBTyxHQUErQixFQUFFLENBQUM7UUFFekM7Ozs7Ozs7OztXQVNHO1FBQ0gsa0JBQWEsR0FBUSxFQUFFLENBQUM7SUFzQ3hCLENBQUM7SUFuSkQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUNULG1CQUFtQyxFQUNuQyxpQkFBaUMsRUFDakMsUUFBcUM7UUFFckMsV0FBVztRQUNYLE1BQU0sR0FBRyxtQkFDUCxNQUFNLEVBQUUsR0FBRyxFQUNYLFdBQVcsRUFBRSxLQUFLLEVBQ2xCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUNuRCxNQUFNLEVBQUUsU0FBUyxJQUNkLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO1FBQ0YsdUNBQXVDO1FBQ3ZDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFB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