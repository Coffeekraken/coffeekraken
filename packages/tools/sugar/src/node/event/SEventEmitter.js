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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0FBRVYsNkRBQWtEO0FBQ2xELDBEQUFvQztBQUNwQyxvRUFBOEM7QUE4RjlDLE1BQU0sYUFBYyxTQUFRLGdCQUFNO0lBOEdoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQVksV0FBOEMsRUFBRTtRQUMxRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFlBQVksRUFBRTtnQkFDWixlQUFlLEVBQUUsRUFBRTtnQkFDbkIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLGNBQWMsRUFBRSxFQUFFO2FBQ25CO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQTVESjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBTyxHQUErQixFQUFFLENBQUM7UUFFekM7Ozs7Ozs7OztXQVNHO1FBQ0gsa0JBQWEsR0FBUSxFQUFFLENBQUM7SUFzQ3hCLENBQUM7SUE1SUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUNULG1CQUFtQyxFQUNuQyxpQkFBaUMsRUFDakMsUUFBcUM7UUFFckMsV0FBVztRQUNYLE1BQU0sR0FBRyxtQkFDUCxNQUFNLEVBQUUsR0FBRyxFQUNYLFdBQVcsRUFBRSxLQUFLLEVBQ2xCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUNuRCxNQUFNLEVBQUUsU0FBUyxJQUNkLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO1FBQ0YsdUNBQXVDO1FBQ3ZDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFB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