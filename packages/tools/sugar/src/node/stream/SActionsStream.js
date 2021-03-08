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
Object.defineProperty(exports, "__esModule", { value: true });
const clone_1 = __importDefault(require("../object/clone"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const SError_1 = __importDefault(require("../error/SError"));
const class_1 = __importDefault(require("../is/class"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const toString_1 = __importDefault(require("../string/toString"));
const trimLines_1 = __importDefault(require("../string/trimLines"));
const convert_1 = __importDefault(require("../time/convert"));
const wait_1 = __importDefault(require("../time/wait"));
const SActionsStreamAction_1 = __importDefault(require("./SActionsStreamAction"));
const s_cache_1 = __importDefault(require("@coffeekraken/s-cache"));
const sha256_1 = __importDefault(require("../crypt/sha256"));
/**
 * @name          SActionStream
 * @namespace           sugar.js.stream
 * @type          Class
 * @extends       SPromise
 * @status              beta
 *
 * This class represent the base of a actions stream.
 * An action stream if simply some functions that are called one after the other
 * and that pass to each other some value(s) on which to work.
 * Here's all the "events" that you can subscribe on the SActionStream instance, or on the returned SPromise when calling the "start" method:
 * - start: emited when the overall actions stream starts
 * - {actionName}.start: emited when the specified action starts
 * - {actionName}.reject: emited when the specified action has been rejected
 * - {actionName}.complete: emited when the specified action has been completed
 * - complete: emited when the overall actions stream has been completed
 * - resolve: Trigerred when the overall actions stream has been completed
 * - log: emited when a log message has been set
 * - cancel: emited when the stream has been canceled using the "cancel" method of the returned SPromise when calling the "start" method
 *
 * @param       {Object}        actions         An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```
 * @param       {Object}        [settings={}]   A settings object to configure your instance:
 * - name (null) {String}: A simple name for your stream that will be used in the logs
 * - order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
 * - actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SActionStream extends s_promise_1.default {
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
            this._sCache = new s_cache_1.default(settings.id, settings.cache === true ? {} : settings.cache);
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
                            s_promise_1.default.pipe(fnResult, this._currentStream.promise);
                            s_promise_1.default.pipe(fnResult, this);
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
        this._currentStream.promise = new s_promise_1.default(({ resolve, reject, emit, cancel }) => __awaiter(this, void 0, void 0, function* () {
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
}
exports.default = SActionStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbnNTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQWN0aW9uc1N0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0FBRVYsNERBQXNDO0FBQ3RDLHFFQUErQztBQUMvQyw2REFBdUM7QUFDdkMsd0RBQW9DO0FBQ3BDLG9FQUE4QztBQUM5Qyx3RUFBaUQ7QUFDakQsa0VBQTRDO0FBQzVDLG9FQUE4QztBQUU5Qyw4REFBd0M7QUFDeEMsd0RBQWtDO0FBQ2xDLGtGQUE0RDtBQUM1RCxvRUFBNkM7QUFDN0MsNkRBQXVDO0FBSXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQXFCLGFBQWMsU0FBUSxtQkFBVTtJQStCbkQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNoQyxnQkFBZ0I7UUFDaEIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsZ0JBQWdCO1lBQ3BCLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxFQUFFO1lBQ1YsS0FBSyxFQUFFLEVBQUU7WUFDVCxhQUFhLEVBQUUsRUFBRTtZQUNqQixZQUFZLEVBQUUsRUFBRTtZQUNoQixPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVBQUUsSUFBSTtnQkFDYixLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVBQUUsRUFBRTthQUNaO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBOURKOzs7Ozs7OztXQVFHO1FBQ0gsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFFcEI7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDSCxtQkFBYyxHQUFHLElBQUksQ0FBQztRQW9DcEIs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