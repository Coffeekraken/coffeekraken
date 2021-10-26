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
import __SLog from '@coffeekraken/s-log';
import __isClass from '@coffeekraken/sugar/shared/is/class';
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
                forceObject: ['log'],
                defaults: {},
                castByEvent: {
                    log: __SLog,
                },
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
        if (!sourceSEventEmitter ||
            !sourceSEventEmitter.on ||
            typeof sourceSEventEmitter.on !== 'function')
            return sourceSEventEmitter;
        // listen for all on the source promise
        sourceSEventEmitter.on(set.events || '*', (value, metas) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
                // emit on the destination promise
                const emitMetas = Object.assign(Object.assign({}, metas), { level: ((_a = metas === null || metas === void 0 ? void 0 : metas.level) !== null && _a !== void 0 ? _a : 0) + 1 });
                if (destSEventEmitter instanceof SEventEmitter) {
                    if (set.overrideEmitter === 'bind' &&
                        destSEventEmitter.eventEmitterSettings.bind) {
                        emitMetas.emitter =
                            destSEventEmitter.eventEmitterSettings.bind;
                    }
                    else if (set.overrideEmitter === true) {
                        emitMetas.emitter = destSEventEmitter;
                    }
                }
                if (destSEventEmitter === process &&
                    __isChildProcess() &&
                    process.send) {
                    if (value.value && value.value instanceof Error) {
                        value.value = __toString(value.value);
                    }
                    // @todo            check why need this and from where comes from the "metas" property in the value...
                    if ((_b = value.metas) === null || _b === void 0 ? void 0 : _b.event)
                        delete value.metas;
                    process.send({
                        value: value,
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
            // defaults
            if (__isPlainObject(value)) {
                // get the default object to extends
                Object.keys(this.eventEmitterSettings.defaults).forEach((key) => {
                    var _a;
                    const parts = key.split(',').map((l) => l.trim());
                    if (parts.indexOf(event) === -1 &&
                        parts.indexOf('*') === -1)
                        return;
                    value = __deepMerge(value, (_a = this.eventEmitterSettings.defaults) === null || _a === void 0 ? void 0 : _a[key]);
                });
            }
            const CastClass = this.eventEmitterSettings.castByEvent[event];
            if (CastClass &&
                __isClass(CastClass) &&
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
                // @ts-ignore
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
                eventStackArray = [
                    ...eventStackArray,
                    ...eventStackObj.callStack,
                ];
            }
            // check if the stack is a glob pattern
            Object.keys(this._eventsStacks).forEach((stackName) => {
                if (stackName === event)
                    return currentCallbackReturnedValue;
                if (__minimatch(event, stackName) &&
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sTUFBZ0MsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBRXhFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBZ0k1RCxNQUFNLGFBQWMsU0FBUSxNQUFNO0lBb1E5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQVksV0FBOEMsRUFBRTtRQUN4RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixVQUFVLEVBQUUsS0FBSztnQkFDakIsZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixjQUFjLEVBQUUsRUFBRTtnQkFDbEIsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUNwQixRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUU7b0JBQ1QsR0FBRyxFQUFFLE1BQU07aUJBQ2Q7Z0JBQ0QsSUFBSSxFQUFFLFNBQVM7YUFDbEI7U0FDSixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTFHTjs7Ozs7Ozs7O1dBU0c7UUFDSyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUU5Qjs7Ozs7Ozs7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