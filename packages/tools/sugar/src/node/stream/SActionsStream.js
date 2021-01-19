"use strict";
// @ts-nocheck
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
const clone_1 = __importDefault(require("../object/clone"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const SError_1 = __importDefault(require("../error/SError"));
const class_1 = __importDefault(require("../is/class"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const toString_1 = __importDefault(require("../string/toString"));
const trimLines_1 = __importDefault(require("../string/trimLines"));
const convert_1 = __importDefault(require("../time/convert"));
const wait_1 = __importDefault(require("../time/wait"));
const SActionsStreamAction_1 = __importDefault(require("./SActionsStreamAction"));
const SCache_1 = __importDefault(require("../cache/SCache"));
const sha256_1 = __importDefault(require("../crypt/sha256"));
module.exports = class SActionStream extends SPromise_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(actions, settings = {}) {
        // init SPromise
        super(deepMerge_1.default({
            id: `SActionsStream`,
            cache: false,
            name: null,
            order: null,
            before: [],
            after: [],
            beforeActions: {},
            afterActions: {},
            actions: {},
            logs: {
                start: true,
                success: true,
                error: true,
                exclude: []
            }
        }, settings));
        /**
         * @name            _actionsObj
         * @type            Object
         * @private
         *
         * Store the actions object
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._actionsObject = {};
        /**
         * @name            _currentStream
         * @type            SPromise
         * @private
         *
         * Store the current running stream. Here's the object structure:
         * {
         *    promise: Store the SPromise instance for the stream
         *    currentActionObj: {
         *       name: Store the name of the current action executing in the stream
         *       promise: Store the promise returned from the ```run``` action instance method
         *    }
         * }
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentStream = null;
        // check the actions
        Object.keys(actions).forEach((actionName) => {
            const actionInstance = actions[actionName];
            if (typeof actionInstance === 'function' ||
                (class_1.default(actionInstance) &&
                    actionInstance.constructor.name === 'SActionsStreamAction') ||
                actionInstance instanceof SActionsStreamAction_1.default) {
            }
            else {
                throw new SError_1.default(parseHtml_1.default(`The value passed for the "<yellow>${actionName}</yellow>" action has to be either a simple function or an "<green>SActionsStreamAction</green>" instance. You have passed a "<red>${typeof actionInstance}</red>"...`));
            }
        });
        // init a SCache instance if needed
        if (this._settings.cache) {
            this._sCache = new SCache_1.default(settings.id, settings.cache === true ? {} : settings.cache);
        }
        // save the actions
        this._actionsObject = actions;
    }
    /**
     * @name          hasCurrentStreamErrors
     * @type          Function
     *
     * This method return true or false depending if the current stream has some errors or not
     *
     * @return      {Boolean}           true if not errors, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    hasCurrentStreamErrors() {
        return this._currentStream && this._currentStream.stats.stderr.length;
    }
    _applyFnOnStreamObj(streamObjOrArray, processFn, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default({
                processFnArgs: [],
                type: 'main',
                resultProcessor: null
            }, settings);
            const logActionStatus = () => {
                let logString = `Processing <cyan>${Array.isArray(this._currentStream.streamObjArray)
                    ? this._currentStream.streamObjArray.length
                    : 1}</cyan> source${Array.isArray(this._currentStream.streamObjArray)
                    ? this._currentStream.streamObjArray.length > 1
                        ? 's'
                        : ''
                    : ''} | Processed <green>${this._currentStream.currentActionObj.processed}</green>`;
                if (this._settings.cache) {
                    logString += ` | From cache: <yellow>${this._currentStream.currentActionObj.fromCache}</yellow>`;
                }
                if (this._settings.logs.exclude.indexOf(this._currentStream.currentActionObj.id) === -1) {
                    this.log({
                        temp: true,
                        group: this._currentStream.currentActionObj.name,
                        value: logString
                    });
                }
            };
            const processFnArray = !Array.isArray(processFn) ? [processFn] : processFn;
            const isArray = Array.isArray(streamObjOrArray);
            let streamObjArray = streamObjOrArray;
            if (!isArray)
                streamObjArray = [streamObjArray];
            for (const streamObjArrayIdx in streamObjArray) {
                let streamObj = streamObjArray[streamObjArrayIdx];
                // if (streamObj.$fromCache) return;
                // set the current action in the streamObj
                streamObj.$action = settings.type;
                // calculate the hash of this particular action
                const actionHash = sha256_1.default.encrypt(toString_1.default(Object.assign(Object.assign({}, clone_1.default(streamObj)), { settings: this._settings })));
                // get the value from the cache if available
                if ((this._currentStream.currentActionObj.instance &&
                    this._currentStream.currentActionObj.instance.settings.cache &&
                    this._sCache) ||
                    (this._sCache && !this._currentStream.currentActionObj.instance)) {
                    const cachedStreamObj = yield this._sCache.get(actionHash);
                    if (cachedStreamObj) {
                        streamObj = cachedStreamObj;
                        streamObj.$fromCache = true;
                        streamObjArray[streamObjArrayIdx] = streamObj;
                        this._currentStream.currentActionObj.fromCache++;
                        logActionStatus();
                        return;
                    }
                }
                const processFnArgs = [streamObj, ...settings.processFnArgs];
                for (const processFnArrayIdx in processFnArray) {
                    const processFn = processFnArray[processFnArrayIdx];
                    try {
                        let processFnResult = processFn(...processFnArgs);
                        if (settings.resultProcessor)
                            processFnResult = settings.resultProcessor.bind(this)(processFnResult);
                        if (processFnResult instanceof Promise) {
                            // processFnResult.catch((e) => {
                            //   throw 'PLCPLC';
                            // });
                            streamObj = yield processFnResult;
                        }
                        else {
                            streamObj = processFnResult;
                        }
                    }
                    catch (e) { }
                }
                streamObjArray[streamObjArrayIdx] = streamObj;
                if (settings.type.match(/.*\.main$/)) {
                    this._currentStream.currentActionObj.processed++;
                    logActionStatus();
                }
                // save in cache
                if (this._settings.cache)
                    yield this._saveInCache(actionHash, streamObj);
            }
            if (isArray)
                return streamObjArray;
            return streamObjArray[0];
        });
    }
    _handleStreamObjArray() {
        return __awaiter(this, void 0, void 0, function* () {
            let stack = this._currentStream.streamObjArray;
            for (let j = 0; j < stack.length; j++) {
                let currentStreamObj = stack[j];
                if (currentStreamObj.$fromCache) {
                    logActionStatus();
                    continue;
                }
                if (this._currentStream.settings.beforeActions &&
                    this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name]) {
                    currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name], {
                        type: `${this._currentStream.currentActionObj.name}.before`
                    });
                }
                // call the action and pass it the current stream object
                currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, (...args) => {
                    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield this._currentStream.currentActionObj.instance.run(...args);
                        return resolve(res);
                    }));
                }, {
                    type: `${this._currentStream.currentActionObj.name}.main`,
                    processFnArgs: [
                        this._currentStream.currentActionObj.instance.settings
                    ],
                    resultProcessor: (fnResult) => {
                        if (fnResult instanceof Promise) {
                            SPromise_1.default.pipe(fnResult, this._currentStream.promise);
                            SPromise_1.default.pipe(fnResult, this);
                            this._currentStream.currentActionObj.promise = fnResult;
                        }
                        return fnResult;
                    }
                });
                if (this._currentStream.currentActionObj.instance &&
                    this._currentStream.currentActionObj.instance._skipNextActions) {
                    this._currentStream.stats.skipNextActions = this._currentStream.currentActionObj.instance._skipNextActions;
                }
                // check if an "afterCallback" callback has been passed in the streamObj
                if (this._currentStream.currentActionObj.instance &&
                    this._currentStream.currentActionObj.instance._registeredCallbacks &&
                    this._currentStream.currentActionObj.instance._registeredCallbacks
                        .length) {
                    this._currentStream.currentActionObj.instance._registeredCallbacks.forEach((callbackObj) => {
                        if (!callbackObj.action) {
                            if (callbackObj.when === 'after') {
                                this._currentStream.settings.after = [
                                    ...this._currentStream.settings.after,
                                    callbackObj.callback
                                ];
                            }
                            else {
                                this._currentStream.settings.before = [
                                    ...this._currentStream.settings.before,
                                    callbackObj.callback
                                ];
                            }
                        }
                        else {
                            if (callbackObj.when === 'before') {
                                if (!this._currentStream.settings.beforeActions[callbackObj.action])
                                    this._currentStream.settings.beforeActions[callbackObj.action] = [];
                                else if (!Array.isArray(this._currentStream.settings.beforeActions[callbackObj.action]))
                                    this._currentStream.settings.beforeActions[callbackObj.action] = [
                                        this._currentStream.settings.beforeActions[callbackObj.action]
                                    ];
                                this._currentStream.settings.beforeActions[callbackObj.action].push(callbackObj.callback);
                            }
                            else {
                                if (!this._currentStream.settings.afterActions[callbackObj.action])
                                    this._currentStream.settings.afterActions[callbackObj.action] = [];
                                else if (!Array.isArray(this._currentStream.settings.afterActions[callbackObj.action]))
                                    this._currentStream.settings.afterActions[callbackObj.action] = [
                                        this._currentStream.settings.afterActions[callbackObj.action]
                                    ];
                                this._currentStream.settings.afterActions[callbackObj.action].push(callbackObj.callback);
                            }
                        }
                    });
                }
                if (this._currentStream.settings.afterActions &&
                    this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name]) {
                    currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name], {
                        type: `${this._currentStream.currentActionObj.name}.after`
                    });
                }
                // replace the streamObj with the new one in the stack
                stack[j] = currentStreamObj;
                if (this._currentStream.stats.canceled || this.hasCurrentStreamErrors()) {
                    this._currentStream.streamObjArray = stack;
                    return this._currentStream.streamObjArray;
                }
            }
            // flatten the stack
            stack = stack.flat(1);
            // filter the streamObjects that comes from the cache
            stack = stack.filter((streamObj) => {
                return streamObj.$fromCache === undefined;
            });
            this._currentStream.streamObjArray = stack;
            return this._currentStream.streamObjArray;
        });
    }
    /**
     * @name            _saveInCache
     * @type            Function
     * @private
     *
     * This method simmply take the stream object and save it into the cache
     *
     * @param       {Object}        streamObj         The stream object to save into cache
     * @return      {Promise}                         A promise resolved when the streamObj has been saved
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _saveInCache(hash, streamObj) {
        return __awaiter(this, void 0, void 0, function* () {
            // save in cache
            if ((this._currentStream.currentActionObj.instance &&
                this._currentStream.currentActionObj.instance.settings.cache &&
                this._sCache) ||
                (this._sCache && !this._currentStream.currentActionObj.instance)) {
                yield this._sCache.set(hash, streamObj);
            }
            return true;
        });
    }
    /**
     * @name          start
     * @type          Function
     * @async
     *
     * This method launch the action stream and return an SPromise instance for this particular stream "process"
     *
     * @param       {Object}          [streamObj={}]           An object that will be passed along all the actions and that can be updated at every steps. Make sure that your current action return what the next one need to work correctly...
     * @param       {Object}          [settings={}]           An object of settings to override the instance level one if wanted
     * @return      {SPromise}                                An SPromise instance for this particular stream "process" on which you can subscribe to the same "events" that on the SActionsStrean instance.
     *
     * @example         js
     * const streamPromise = myStream.start();
     * streamPromise.on('step', (streamObj) => {
     *    // do something
     * }).on('resolve', (resultObj) => {
     *    // do something
     * });
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(streamObj = {}, settings = {}) {
        settings = deepMerge_1.default(Object.assign({}, this._settings), settings);
        let currentStreamObj = streamObj;
        this._currentStream = {
            promise: null,
            streamObjArray: Array.isArray(currentStreamObj)
                ? currentStreamObj
                : [currentStreamObj],
            currentActionObj: {
                name: null,
                promise: null,
                instance: null,
                sourcesCount: 0,
                fromCache: 0,
                processed: 0,
                stats: {
                    stderr: [],
                    stdout: []
                }
            },
            settings,
            stats: {
                startTime: Date.now(),
                endTime: null,
                stderr: [],
                stdout: [],
                skipNextActions: false,
                canceled: false,
                actions: {}
            }
        };
        // make sure the before, after, beforeAction and afterAction stacks are Arrays
        if (settings.before && !Array.isArray(settings.before))
            settings.before = [settings.before];
        if (settings.after && !Array.isArray(settings.after))
            settings.after = [settings.after];
        this._currentStream.promise = new SPromise_1.default(({ resolve, reject, emit, cancel }) => __awaiter(this, void 0, void 0, function* () {
            yield wait_1.default(100); // ugly hack to check when have time...
            try {
                // starting log
                if (this._settings.logs.exclude.indexOf(this._currentStream.currentActionObj.id) === -1 &&
                    this._settings.logs.start) {
                    const startString = `#start Starting the stream "<cyan>${settings.name || 'unnamed'}</cyan>"`;
                    this.log({
                        value: startString
                    });
                }
                emit('start', {});
                currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, this._settings.before, {
                    type: 'before'
                });
                if (!this.hasCurrentStreamErrors()) {
                    // take the actions order array
                    const actionsOrderedNames = Array.isArray(settings.order)
                        ? settings.order
                        : Object.keys(this._actionsObject);
                    // check the order
                    actionsOrderedNames.forEach((actionName) => {
                        if (!this._actionsObject[actionName]) {
                            this._currentStream.stats.stderr.push(parseHtml_1.default(`You have specified the action "<yellow>${actionName}</yellow>" in your SActionsStream instance but it is not available. Here's the available actions: <green>${Object.keys(this._actionsObject).join(',')}</green>`));
                        }
                    });
                    for (let i = 0; i < actionsOrderedNames.length; i++) {
                        if (this._currentStream.canceled ||
                            this.hasCurrentStreamErrors()) {
                            // this.log('stop');
                            break;
                        }
                        const actionName = actionsOrderedNames[i];
                        let actionInstance;
                        let actionSettings = settings.actions
                            ? settings.actions[actionName] || {}
                            : {};
                        // make sure we have a "name" property in the actionSettings object
                        if (!actionSettings.name) {
                            actionSettings.name = actionName;
                        }
                        let skipMessage = null, skipAction = 'break';
                        if (this._currentStream.stats.skipNextActions === true) {
                            skipMessage = `#warning Skipping all the next actions after the "<cyan>${actionsOrderedNames[i - 1]}</cyan>" one...`;
                            skipAction = 'break';
                        }
                        else if (Array.isArray(this._currentStream.stats.skipNextActions) &&
                            this._currentStream.stats.skipNextActions.indexOf(actionName) !== -1) {
                            skipMessage = `#warning Skipping the "<yellow>${actionName}</yellow>" action...`;
                            skipAction = 'continue';
                        }
                        else if (typeof this._currentStream.stats.skipNextActions === 'number' &&
                            this._currentStream.stats.skipNextActions > 0) {
                            this._currentStream.stats.skipNextActions--;
                            skipMessage = `#warning Skipping the "<yellow>${actionName}</yellow>" action. Reamaining action(s) to skip: <cyan>${this._currentStream.stats.skipNextActions}</cyan>...`;
                            skipAction = 'continue';
                        }
                        if (skipMessage) {
                            this.log({
                                value: skipMessage
                            });
                            if (skipAction === 'continue')
                                continue;
                            else
                                break;
                        }
                        // handle passed action that can be either a simple function, a extended SActionsStreamAction class or an instance of the SActionsStreamAction class
                        if (class_1.default(this._actionsObject[actionName]) &&
                            this._actionsObject[actionName].prototype instanceof
                                SActionsStreamAction_1.default) {
                            actionInstance = new this._actionsObject[actionName](actionSettings);
                        }
                        else {
                            this._currentStream.stats.stderr.push(`Your action "<yellow>${actionName}</yellow>" has to be a class extending the <cyan>SActionsStreamAction</cyan> one...`);
                            break;
                        }
                        this._currentStream.currentActionObj = {
                            name: actionName,
                            sourcesCount: this._currentStream.streamObjArray.length,
                            processed: 0,
                            fromCache: 0,
                            instance: actionInstance,
                            stats: {
                                action: actionName,
                                startTime: Date.now(),
                                stderr: [],
                                stdout: []
                            }
                        };
                        if (this._currentStream.currentActionObj.instance) {
                            this._currentStream.currentActionObj.instance.on('reject', (value) => {
                                emit(`${this._currentStream.currentActionObj.name}.error`, {
                                    value
                                });
                                cancel(value);
                            });
                            actionSettings = deepMerge_1.default(this._currentStream.currentActionObj.instance._settings, actionSettings);
                        }
                        // emit some "start" events
                        emit(`${this._currentStream.currentActionObj.name}.start`, Object.assign({}, this._currentStream.currentActionObj));
                        if (this._settings.logs.exclude.indexOf(this._currentStream.currentActionObj.id) === -1) {
                            const startString = `#start Starting the action "<yellow>${this._currentStream.currentActionObj.name}</yellow>" on <magenta>${this._currentStream.currentActionObj.sourcesCount}</magenta> sources`;
                            this.log({
                                group: this._currentStream.currentActionObj.name,
                                value: startString
                            });
                        }
                        yield this._handleStreamObjArray();
                        if (this.hasCurrentStreamErrors()) {
                            break;
                        }
                        if (this.constructor.interface) {
                            const issuesString = this.constructor.interface.apply(this._currentStream.streamObjArray[0], { return: 'string', throw: false });
                            if (issuesString !== true) {
                                this._currentStream.stats.stderr.push(issuesString);
                                this._currentStream.currentActionObj.stats.stderr.push(issuesString);
                            }
                        }
                        // complete the actionObj
                        this._currentStream.currentActionObj.stats = Object.assign(Object.assign({}, this._currentStream.currentActionObj.stats), { endTime: Date.now(), duration: Date.now() -
                                this._currentStream.currentActionObj.stats.startTime });
                        // save the result into the overall actions stats object
                        this._currentStream.stats.actions[this._currentStream.currentActionObj.name] = Object.assign({}, this._currentStream.currentActionObj);
                        // emit an "event"
                        emit(`${this._currentStream.currentActionObj.name}.complete`, Object.assign({}, this._currentStream.currentActionObj));
                        if (this._currentStream.currentActionObj.stats.stderr.length) {
                            const errorString = `#error <red>Something went wrong during the </red>"<yellow>${this._currentStream.currentActionObj.name}</yellow>"<red> action...</red>`;
                            this._currentStream.currentActionObj.stats.stderr.push(errorString);
                            this._currentStream.stats.stderr.push(errorString);
                            break;
                        }
                        else {
                            const successString = `#success The action "<yellow>${this._currentStream.currentActionObj.name}</yellow>" has finished <green>successfully</green> on <magenta>${this._currentStream.currentActionObj.sourcesCount}</magenta> sources in <yellow>${convert_1.default(this._currentStream.currentActionObj.stats.duration, 's')}s</yellow>`;
                            this._currentStream.currentActionObj.stats.stdout.push(successString);
                            if (this._settings.logs.exclude.indexOf(this._currentStream.currentActionObj.id) === -1) {
                                this.log({
                                    group: this._currentStream.currentActionObj.name,
                                    value: successString
                                });
                            }
                        }
                    }
                }
                currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, this._settings.after, {
                    type: 'after'
                });
                if (this.constructor.interface) {
                    const issuesString = this.constructor.interface.apply(this._currentStream.streamObjArray[0], { return: 'string', throw: false });
                    if (issuesString !== true) {
                        this._currentStream.stats.stderr.push(issuesString);
                    }
                }
                // complete the overall stats
                this._currentStream.stats = Object.assign(Object.assign({}, this._currentStream.stats), { streamObj: this._currentStream.streamObjArray, endTime: Date.now(), duration: Date.now() - this._currentStream.stats.startTime });
                if (this.hasCurrentStreamErrors() ||
                    this._currentStream.stats.canceled) {
                    if (this._settings.logs.error) {
                        const errorString = `The stream "<cyan>${settings.name || 'unnamed'}</cyan>" has had some issues...`;
                        this._currentStream.stats.stdout.push(errorString);
                        this.log({
                            error: true,
                            value: errorString
                        });
                        this.log({
                            error: true,
                            value: trimLines_1.default(this._currentStream.stats.stderr.join('\n'))
                        });
                    }
                    emit('reject', this._currentStream.stats);
                }
                else {
                    if (this._settings.logs.success) {
                        const completeString = `#success The stream "<cyan>${this._currentStream.settings.name || 'unnamed'}</cyan>" has finished <green>successfully</green> in <yellow>${convert_1.default(this._currentStream.stats.duration, 's')}s</yellow>`;
                        this._currentStream.stats.stdout.push(completeString);
                        this.log({
                            value: completeString
                        });
                    }
                    // resolve this stream process
                    emit('success', {});
                    resolve(this._currentStream.stats);
                }
            }
            catch (e) {
                if (this._settings.logs.error) {
                    this.log({
                        value: e.toString()
                    });
                }
            }
        }), {
            id: this._settings.id
        });
        // this._currentStream.promise.catch((e) => {
        // });
        // } catch (e) {
        // if (typeof e === 'object') {
        //   this._currentStream.currentActionObj.stats.stderr.push(__toString(e));
        //   this._currentStream.stats.stderr.push(__toString(e));
        // } else if (typeof e === 'string') {
        //   this._currentStream.currentActionObj.stats.stderr.push(e);
        //   this._currentStream.stats.stderr.push(e);
        // }
        // }
        // __SPromise.pipe(this._currentStream, this);
        return this._currentStream.promise;
    }
    /**
     * @name                  log
     * @type                  Function
     *
     * THis method allows you to log something that will be passed upward through the SPromise events "stdout".
     *
     * @param       {String}          ...args             The messages to log
     *
     * @since         2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(...args) {
        args.forEach((arg) => {
            if (this._currentStream && this._currentStream.promise) {
                this._currentStream.promise.emit('log', arg);
            }
        });
    }
};
//# sourceMappingURL=SActionsStream.js.map