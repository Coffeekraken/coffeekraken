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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/clone", "../console/parseHtml", "../error/SError", "../is/class", "../object/deepMerge", "@coffeekraken/s-promise", "../string/toString", "../string/trimLines", "../time/convert", "../time/wait", "./SActionsStreamAction", "@coffeekraken/s-cache", "../crypt/sha256"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbnNTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQWN0aW9uc1N0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsNERBQXNDO0lBQ3RDLHFFQUErQztJQUMvQyw2REFBdUM7SUFDdkMsd0RBQW9DO0lBQ3BDLG9FQUE4QztJQUM5Qyx3RUFBaUQ7SUFDakQsa0VBQTRDO0lBQzVDLG9FQUE4QztJQUU5Qyw4REFBd0M7SUFDeEMsd0RBQWtDO0lBQ2xDLGtGQUE0RDtJQUM1RCxvRUFBNkM7SUFDN0MsNkRBQXVDO0lBSXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNILE1BQXFCLGFBQWMsU0FBUSxtQkFBVTtRQStCbkQ7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUNoQyxnQkFBZ0I7WUFDaEIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7Z0JBQ0UsRUFBRSxFQUFFLGdCQUFnQjtnQkFDcEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsRUFBRTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLElBQUk7b0JBQ1gsT0FBTyxFQUFFLElBQUk7b0JBQ2IsS0FBSyxFQUFFLElBQUk7b0JBQ1gsT0FBTyxFQUFFLEVBQUU7aUJBQ1o7YUFDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7WUE5REo7Ozs7Ozs7O2VBUUc7WUFDSCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztZQUVwQjs7Ozs7Ozs7Ozs7Ozs7OztlQWdCRztZQUNILG1CQUFjLEdB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