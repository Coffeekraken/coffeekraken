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
import __clone from '../object/clone';
import __parseHtml from '../console/parseHtml';
import __SError from '../error/SError';
import __isClass from '../is/class';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __toString from '../string/toString';
import __trimLines from '../string/trimLines';
import __convert from '../time/convert';
import __wait from '../time/wait';
import __SActionsStreamAction from './SActionsStreamAction';
import __SCache from '../cache/SCache';
import __sha256 from '../crypt/sha256';
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
export default class SActionStream extends __SPromise {
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
        super(__deepMerge({
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
                (__isClass(actionInstance) &&
                    actionInstance.constructor.name === 'SActionsStreamAction') ||
                actionInstance instanceof __SActionsStreamAction) {
            }
            else {
                throw new __SError(__parseHtml(`The value passed for the "<yellow>${actionName}</yellow>" action has to be either a simple function or an "<green>SActionsStreamAction</green>" instance. You have passed a "<red>${typeof actionInstance}</red>"...`));
            }
        });
        // init a SCache instance if needed
        if (this._settings.cache) {
            this._sCache = new __SCache(settings.id, settings.cache === true ? {} : settings.cache);
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
            settings = __deepMerge({
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
                const actionHash = __sha256.encrypt(__toString(Object.assign(Object.assign({}, __clone(streamObj)), { settings: this._settings })));
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
                            __SPromise.pipe(fnResult, this._currentStream.promise);
                            __SPromise.pipe(fnResult, this);
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
        settings = __deepMerge(Object.assign({}, this._settings), settings);
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
        this._currentStream.promise = new __SPromise(({ resolve, reject, emit, cancel }) => __awaiter(this, void 0, void 0, function* () {
            yield __wait(100); // ugly hack to check when have time...
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
                            this._currentStream.stats.stderr.push(__parseHtml(`You have specified the action "<yellow>${actionName}</yellow>" in your SActionsStream instance but it is not available. Here's the available actions: <green>${Object.keys(this._actionsObject).join(',')}</green>`));
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
                        if (__isClass(this._actionsObject[actionName]) &&
                            this._actionsObject[actionName].prototype instanceof
                                __SActionsStreamAction) {
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
                            actionSettings = __deepMerge(this._currentStream.currentActionObj.instance._settings, actionSettings);
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
                            const successString = `#success The action "<yellow>${this._currentStream.currentActionObj.name}</yellow>" has finished <green>successfully</green> on <magenta>${this._currentStream.currentActionObj.sourcesCount}</magenta> sources in <yellow>${__convert(this._currentStream.currentActionObj.stats.duration, 's')}s</yellow>`;
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
                            value: __trimLines(this._currentStream.stats.stderr.join('\n'))
                        });
                    }
                    emit('reject', this._currentStream.stats);
                }
                else {
                    if (this._settings.logs.success) {
                        const completeString = `#success The stream "<cyan>${this._currentStream.settings.name || 'unnamed'}</cyan>" has finished <green>successfully</green> in <yellow>${__convert(this._currentStream.stats.duration, 's')}s</yellow>`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbnNTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQWN0aW9uc1N0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7OztBQUVWLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sU0FBUyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLFVBQVUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLE1BQU0sTUFBTSxjQUFjLENBQUM7QUFDbEMsT0FBTyxzQkFBc0IsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUl2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxVQUFVO0lBK0JuRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2hDLGdCQUFnQjtRQUNoQixLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxFQUFFO1lBQ1QsYUFBYSxFQUFFLEVBQUU7WUFDakIsWUFBWSxFQUFF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