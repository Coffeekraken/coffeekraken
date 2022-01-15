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
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __nodeIpc from 'node-ipc';
const _ipcInstance = new __nodeIpc.IPC();
_ipcInstance.config.id = `ipc-${process.pid}`;
_ipcInstance.config.retry = 1500;
_ipcInstance.config.silent = true;
if (__isChildProcess()) {
    _ipcInstance.connectTo(`ipc-${process.ppid}`, () => {
        _ipcInstance.of[`ipc-${process.ppid}`].on('connect', () => {
        });
        _ipcInstance.of[`ipc-${process.ppid}`].on('answer', (data) => {
            _ipcInstance.log(data);
            SEventEmitter.global.emit(`answer.${data.metas.askId}`, data.value, data.metas);
        });
        // _ipcInstance.of[`ipc-${process.ppid}`].on(
        //     'message',  //any event or message type your server listens for
        //     function(data){
        //         _ipcInstance.log('got a message from world : ', data);
        //     }
        // );
    });
}
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
                forceObject: ['log', 'ask'],
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
    static ipcServer(ipcSettings, eventEmitterSettings) {
        return new Promise((resolve, reject) => {
            var _a;
            const eventEmitter = new this({
                eventEmitter: eventEmitterSettings !== null && eventEmitterSettings !== void 0 ? eventEmitterSettings : {}
            });
            const ipcInstance = new __nodeIpc.IPC();
            ipcInstance.config = __deepMerge((_a = ipcInstance.config) !== null && _a !== void 0 ? _a : {}, {
                id: `ipc-${process.pid}`,
                retry: 1500,
                silent: true
            }, ipcSettings !== null && ipcSettings !== void 0 ? ipcSettings : {});
            ipcInstance.serve(() => {
                ipcInstance.server.on('message', (data, socket) => __awaiter(this, void 0, void 0, function* () {
                    if (data.metas.event === 'ask', data.metas) {
                        const res = yield eventEmitter.emit(data.metas.event, data.value, data.metas);
                        ipcInstance.server.emit(socket, `answer`, {
                            value: res,
                            metas: data.metas
                        });
                    }
                    else {
                        eventEmitter.emit(data.metas.event, data.value, data.metas);
                    }
                }));
                resolve(eventEmitter);
            });
            ipcInstance.server.start();
        });
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
            var _a, _b, _c, _d, _e, _f, _g;
            // @TODO    check why this arrive...
            if (!metas) {
                return;
            }
            // specify the id
            // @ts-ignore
            metas.id = (_c = (_a = metas.id) !== null && _a !== void 0 ? _a : (_b = metas.emitter.metas) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : __uniqid();
            // specify color
            // @ts-ignore
            metas.color =
                (_f = (_d = metas.color) !== null && _d !== void 0 ? _d : (_e = metas.emitter.metas) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : __getColorFor(metas.id);
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
                const emitMetas = Object.assign(Object.assign({}, metas), { level: ((_g = metas === null || metas === void 0 ? void 0 : metas.level) !== null && _g !== void 0 ? _g : 0) + 1 });
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
                    __isChildProcess()
                // process.send
                ) {
                    if (value.value && value.value instanceof Error) {
                        value.value = __toString(value.value);
                    }
                    _ipcInstance.of[`ipc-${process.ppid}`].emit('message', {
                        value,
                        metas: emitMetas
                    });
                    // process.send({
                    //     value: value,
                    //     metas: emitMetas,
                    // });
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
     * @name          pipeErrors
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
    pipeErrors(input, settings) {
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
                this._emitEvents(logObj.event, logObj.value, Object.assign({}, logObj.metas));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sTUFBZ0MsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBRXhFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLGtEQUFrRCxDQUFDO0FBQzdFLE9BQU8sU0FBUyxNQUFNLFVBQVUsQ0FBQztBQUVqQyxNQUFNLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN6QyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM5QyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBRWxDLElBQUksZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUMvQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFH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