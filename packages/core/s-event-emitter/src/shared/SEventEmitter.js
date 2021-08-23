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
                bind: undefined,
            },
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
    static get global() {
        if (!this._globalInstance) {
            this._globalInstance = new SEventEmitter({
                metas: {
                    id: 'sugarEventSPromise',
                },
            });
        }
        return this._globalInstance;
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
            // @TODO    check why this arrive...
            if (!metas) {
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
                else if (typeof res === 'object' && res.value !== undefined && res.metas !== undefined) {
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
                // emit on the destination promise
                const emitMetas = Object.assign(Object.assign({}, metas), { level: metas.level + 1 });
                if (destSEventEmitter instanceof SEventEmitter) {
                    if (set.overrideEmitter === 'bind' && destSEventEmitter.eventEmitterSettings.bind) {
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
                        metas: emitMetas,
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
    _createMetas(event, metas = {}) {
        var _a, _b, _c;
        return __deepMerge({
            event: event,
            name: event,
            emitter: (_b = (_a = this.eventEmitterSettings.bind) !== null && _a !== void 0 ? _a : metas === null || metas === void 0 ? void 0 : metas.emitter) !== null && _b !== void 0 ? _b : this,
            originalEmitter: (_c = metas === null || metas === void 0 ? void 0 : metas.originalEmitter) !== null && _c !== void 0 ? _c : this,
            time: Date.now(),
            level: 0,
            id: __uniqid(),
        }, metas !== null && metas !== void 0 ? metas : {});
    }
    emit(event, value, metas) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let metasObj = this._createMetas(event, metas);
            const isFirstLevel = !metasObj.level;
            // check if need to force object
            if ((this.eventEmitterSettings.forceObject === true ||
                (Array.isArray(this.eventEmitterSettings.forceObject) &&
                    this.eventEmitterSettings.forceObject.indexOf(event) !== -1)) &&
                !__isPlainObject(value)) {
                value = {
                    value,
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
            if (event === 'ask') {
                if (isFirstLevel) {
                    metasObj.askId = __uniqid();
                }
            }
            // check async start
            if (!this._asyncStarted && this.eventEmitterSettings.asyncStart) {
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
            // if is an ask event, set the askId in metas
            if (logObj.event === 'ask') {
                this.constructor.global.on(`answer.${logObj.metas.askId}:1`, (answer, metas) => {
                    logObj.resolve(answer);
                });
                this._emitEvents(logObj.event, logObj.value, logObj.metas);
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
                eventStackArray = [...eventStackArray, ...eventStackObj.callStack];
            }
            // check if the stack is a glob pattern
            Object.keys(this._eventsStacks).forEach((stackName) => {
                if (stackName === event)
                    return;
                if (__minimatch(event, stackName) && this._eventsStacks[stackName] !== undefined) {
                    // the glob pattern match the emited stack so add it to the stack array
                    eventStackArray = [...eventStackArray, ...this._eventsStacks[stackName].callStack];
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
                if (item.filter && !item.filter(currentCallbackReturnedValue, metasObj))
                    continue;
                // check if need to process the value
                if (item.processor) {
                    const res = item.processor(currentCallbackReturnedValue, metasObj);
                    if (Array.isArray(res) && res.length === 2) {
                        currentCallbackReturnedValue = res[0];
                        metasObj = res[1];
                    }
                    else if (typeof res === 'object' && res.value !== undefined && res.metas !== undefined) {
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
        const set = __deepMerge({
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
export default SEventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sTUFBbUIsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBRXhFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBd0hwRSxNQUFNLGFBQWMsU0FBUSxNQUFNO0lBME85Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQVksV0FBOEMsRUFBRTtRQUN4RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixVQUFVLEVBQUUsS0FBSztnQkFDakIsZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixjQUFjLEVBQUUsRUFBRTtnQkFDbEIsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQ3JDLFFBQVEsRUFBRSxFQUFFO2dCQUNaLElBQUksRUFBRSxTQUFTO2FBQ2xCO1NBQ0osRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF2R047Ozs7Ozs7OztXQVNHO1FBQ0ssa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFOUI7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQU8sR0FBNkIsRUFBRSxDQUFDO1FBRXZDOzs7Ozs7Ozs7V0FTRztRQUNILGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBRXhCOzs7Ozs7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