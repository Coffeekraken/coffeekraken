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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbnNTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQWN0aW9uc1N0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7QUFFViw0REFBc0M7QUFDdEMscUVBQStDO0FBQy9DLDZEQUF1QztBQUN2Qyx3REFBb0M7QUFDcEMsb0VBQThDO0FBQzlDLG1FQUE2QztBQUM3QyxrRUFBNEM7QUFDNUMsb0VBQThDO0FBRTlDLDhEQUF3QztBQUN4Qyx3REFBa0M7QUFDbEMsa0ZBQTREO0FBQzVELDZEQUF1QztBQUN2Qyw2REFBdUM7QUFxQ3ZDLGlCQUFTLE1BQU0sYUFBYyxTQUFRLGtCQUFVO0lBK0I3Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2hDLGdCQUFnQjtRQUNoQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtZQUNULGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxJQUFJO2dCQUNYLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxJQUFJO2dCQUNYLE9BQU8sRUFBRSxFQUFFO2FBQ1o7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUE5REo7Ozs7Ozs7O1dBUUc7UUFDSCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQjs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRztRQUNILG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBb0NwQixvQkFBb0I7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFP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