var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __minimatch from 'minimatch';
import SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __toString from '@coffeekraken/sugar/shared/string/toString';
class SEventEmitter extends SClass {
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
        super(__deepMerge({
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
        // settings
        const set = Object.assign({ events: '*', prefixEvent: false, prefixValue: undefined, stripAnsi: false, trim: true, keepLineBreak: true, overrideEmitter: 'bind', processor: undefined, exclude: ['finally', 'resolve', 'reject', 'cancel', 'catch'], filter: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        // make sure it's a valid emitter
        if (!sourceSEventEmitter || !sourceSEventEmitter.on || typeof sourceSEventEmitter.on !== 'function')
            return sourceSEventEmitter;
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
                    value.value = __stripAnsi(value.value);
                else if (typeof value === 'string')
                    value = __stripAnsi(value);
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
                if (destSEventEmitter instanceof SEventEmitter) {
                    if (set.overrideEmitter === 'bind' &&
                        destSEventEmitter.eventEmitterSettings.bind) {
                        emitMetas.emitter = destSEventEmitter.eventEmitterSettings.bind;
                    }
                    else if (set.overrideEmitter === true) {
                        emitMetas.emitter = destSEventEmitter;
                    }
                }
                if (destSEventEmitter === process && __isChildProcess() && process.send) {
                    if (value.value && value.value instanceof Error) {
                        value.value = __toString(value.value);
                    }
                    process.send({
                        value,
                        metas: emitMetas
                    });
                }
                else {
                    destSEventEmitter.emit(metas.event, value, emitMetas);
                }
            }
        }));
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
     * @name          pipeError
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
    pipeError(input, settings) {
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
                !__isPlainObject(value)) {
                value = {
                    value
                };
            }
            // defaults
            if (__isPlainObject(value)) {
                // get the default object to extends
                Object.keys(this.eventEmitterSettings.defaults).forEach((key) => {
                    var _a;
                    const parts = key.split(',').map((l) => l.trim());
                    if (parts.indexOf(event) === -1 && parts.indexOf('*') === -1)
                        return;
                    value = __deepMerge(value, (_a = this.eventEmitterSettings.defaults) === null || _a === void 0 ? void 0 : _a[key]);
                });
            }
            // check if is an asking
            if (!finalMetas.askId && isFirstLevel) {
                if ((value && value.ask === true) || event === 'ask') {
                    finalMetas.askId = __uniqid();
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
                if (__minimatch(event, stackName) &&
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
                    if (bufferedStack && __minimatch(event, bufferedStack)) {
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
            let metasObj = __deepMerge({
                event: event,
                name: event,
                emitter: (_b = (_a = this.eventEmitterSettings.bind) !== null && _a !== void 0 ? _a : metas === null || metas === void 0 ? void 0 : metas.emitter) !== null && _b !== void 0 ? _b : this,
                originalEmitter: (_c = metas === null || metas === void 0 ? void 0 : metas.originalEmitter) !== null && _c !== void 0 ? _c : this,
                time: Date.now(),
                level: 1,
                id: __uniqid()
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
        const set = __deepMerge({
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
const cls = SEventEmitter;
export default SEventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sTUFBbUIsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBRXhFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBc0hwRSxNQUFNLGFBQWMsU0FBUSxNQUFNO0lBaU9oQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQVksV0FBOEMsRUFBRTtRQUMxRCxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsWUFBWSxFQUFFO2dCQUNaLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixVQUFVLEVBQUUsS0FBSztnQkFDakIsZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixjQUFjLEVBQUUsRUFBRTtnQkFDbEIsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQ3JDLFFBQVEsRUFBRSxFQUFFO2dCQUNaLElBQUksRUFBRSxTQUFTO2FBQ2hCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXZHSjs7Ozs7Ozs7O1dBU0c7UUFDSyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUU5Qjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBTyxHQUErQixFQUFFLENBQUM7UUFFekM7Ozs7Ozs7OztXQVNHO1FBQ0gsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFFeEI7Ozs7Ozs7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