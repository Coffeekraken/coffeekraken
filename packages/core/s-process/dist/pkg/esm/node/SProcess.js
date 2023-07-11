var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDuration from '@coffeekraken/s-duration';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SPromise from '@coffeekraken/s-promise';
import __SStdio from '@coffeekraken/s-stdio';
import { __getExtendsStack } from '@coffeekraken/sugar/class';
import { __buildCommandLine } from '@coffeekraken/sugar/cli';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __isChildProcess, __isClass, __isPlainObject, } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit, __spawn } from '@coffeekraken/sugar/process';
import { __toString } from '@coffeekraken/sugar/string';
import __fs from 'fs';
import __path from 'path';
import __stackTrace from 'stack-trace';
import __SProcessSettingsInterface from './interface/SProcessSettingsInterface.js';
/**
 * @name                SProcess
 * @namespace           node
 * @type                Class
 * @extends             SEventEmitter
 * @platform            node
 * @status              beta
 * @private
 *
 * This class represent an SProcess run iteration that store things like
 * the value, the startTime, endTime, duration, state, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SProcess extends __SEventEmitter {
    get params() {
        return this._params;
    }
    /**
     * @name					from
     * @type 					Function
     * @static
     * @async
     *
     * This static method allows you to pass arguments like:
     * - file path: Will require it, check what's returned from and instanciate an SProcess depending on that
     * - command string: Will instanciate a new SCommandProcess instance and returns it for you to run it
     * - function: Will execute the function and instanciate the proper Promise instance type depending on the returned value
     * - Promise instance: Will simply wrap the Promise  instance inside an SProcess one and returns you this new SProcess instance
     * - SProcess based class: This make not so much sens but at least you can rely on this method to instanciate event an SProcess based class
     * Once you get the proper instance back, you can use it the same as an SProcess based class instance and use the ```run``` method to
     * execute your process
     *
     * @param         {string|function|Promise|SProcess}       what      The value with which you want to get an SProcess based instance back
     * @param         {Partial<ISProcessSettings>}      [settings={}]     Some settings to configure your new SProcess based class instance
     * @return        {SProcess}              An SProcess based class instance that you can use to execute your process
     *
     * @since
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static from(what, settings) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (__isClass(what) && __getExtendsStack(what)['SProcess']) {
                // @ts-ignore
                return new what({}, settings);
            }
            if (what instanceof SProcess) {
                return what;
            }
            if (what instanceof Promise) {
                class SPromiseProcess extends SProcess {
                    constructor() {
                        super({}, settings);
                    }
                    process() {
                        // @ts-ignore
                        what.catch((e) => { }); // eslint-disable-line
                        return what;
                    }
                }
                return new SPromiseProcess();
            }
            if (typeof what === 'function') {
                class SFunctionProcess extends SProcess {
                    constructor() {
                        super({}, Object.assign({}, settings));
                    }
                    process(params, settings) {
                        // @ts-ignore
                        return what(params, settings !== null && settings !== void 0 ? settings : {});
                    }
                }
                return new SFunctionProcess();
            }
            if (typeof what === 'string') {
                let potentialPath = __path.resolve(what);
                if (!potentialPath.match(/\.js$/))
                    potentialPath += '.js';
                if (__fs.existsSync(potentialPath)) {
                    const requireValue = (_a = (yield import(potentialPath))) === null || _a === void 0 ? void 0 : _a.default;
                    if (requireValue) {
                        const pro = yield this.from(requireValue, __deepMerge(settings, {
                            processPath: potentialPath,
                        }));
                        return pro;
                    }
                }
                else {
                    // considere the passed string as a command
                    const __SCommandProcess = (_b = (yield import('./SCommandProcess'))) === null || _b === void 0 ? void 0 : _b.default;
                    const commandProcess = new __SCommandProcess({
                        command: what,
                    }, __deepMerge(settings, {
                        processPath: __path.resolve(__dirname(), './SCommandProcess.js'),
                    }));
                    return commandProcess;
                }
            }
            throw new Error([
                `<red>[SProcess.from]</red> Sorry but the passed "<magenta>what</magenta>" argument must be either:`,
                `- A <green>command string</green> like "<cyan>ls -la</cyan>"`,
                `- A valid <green>file path</green> that exports <green>one of these accepted types</green>`,
                `- A <yellow>function</yellow> that return a valid <green>Promise</green> instance or a valid <green>Promise</green> instance`,
                `- A <green>Promise</green> instance`,
                `- An <green>SProcess</green> based class`,
            ].join('\n'));
        });
    }
    /**
     * @name					fromCommand
     * @type 					Function
     * @static
     * @async
     *
     * Initialize an SCommandProcess instance on which you can call the standard "run" method
     * and execute a command by passing inside the params object the ```command``` prop.
     *
     * @param         {Partial<ISCommandProcessParams>}     [initialParams={}]    Some initial params for your command process instance
     * @param         {Partial<ISCommandProcessSettings>}     [settings={}]     Some settings to instanciate your command process as you want
     * @return       {SCommandProcess}               An instance of the SCommandProcess class
     *
     * @since 				2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static fromCommand(initialParams = {}, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const { default: __SCommandProcess } = yield import('./SCommandProcess'); // eslint-disable-line
            return new __SCommandProcess(initialParams, settings);
        });
    }
    /**
     * @name            run
     * @type            Function
     * @static
     * @async
     *
     * Static "run" function to use as a shortcut of the new, and run call
     *
     * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
     * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
     * @return    {Promise}                                                  An Promise instance through which you can listen for logs, and that will be resolved once the process is over
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static run(paramsOrStringArgs = {}, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new this({});
            return instance.run(paramsOrStringArgs, settings);
        });
    }
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(initialParams, settings) {
        super(__deepMerge(
        // @ts-ignore
        __SProcessSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name      stdio
         * @type      SProcessOutput
         *
         * Access the stdio class initiated if exists
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.stdio = undefined;
        /**
         * @name      state
         * @type      String
         *
         * Access the process state like 'idle', 'ready', 'running', 'killed', 'error', 'success'
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._state = 'idle';
        /**
         * @name      executionsStack
         * @type      ISProcessProcessObj[]
         *
         * This array store each executions informations in separated objects
         * that store the duration, startTime, endTime, state, etc...
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.executionsStack = [];
        // save initial params
        this.initialParams = Object.assign({}, initialParams !== null && initialParams !== void 0 ? initialParams : {});
        // get the definition from interface or settings
        // this.paramsInterface = this.settings.interface;
        // if (!this.paramsInterface) {
        //     this.paramsInterface =
        //         (<any>this).constructor.interface ??
        //         this.getInterface('params');
        // }
        // handle process exit
        __onProcessExit((state) => __awaiter(this, void 0, void 0, function* () {
            this.state(state);
        }));
        if (!this.settings.processPath) {
            for (const callSite of __stackTrace.get()) {
                if (callSite.getFunctionName() === this.constructor.name) {
                    this.settings.processPath = callSite.getFileName();
                    break;
                }
            }
        }
        if (!this.settings.processPath) {
            throw new Error(`An SProcess instance MUST have a "<yellow>processPath</yellow>" property either populated automatically if possible, or specified in the "<cyan>settings.processPath</cyan>" property...`);
        }
    }
    /**
     * @name        lastExecutionObj
     * @type        ISProcessProcessObj
     *
     * Get the last execution object
     *
     * @since       2.0.0
     *
     */
    get lastExecutionObj() {
        if (!this.executionsStack.length)
            return -1;
        return (this.executionsStack[this.executionsStack.length - 1]);
    }
    /**
     * @name        process
     * @type        Function
     * @abstract
     *
     * This is the method you have to implement in you SProcess class. It will be called
     * when you call the ```run``` method with the params, etc...
     * You have to return an Promise instance
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    /**
     * @name      ready
     * @type      Function
     *
     * This method allows you to set the process in the "ready" state.
     * This will make the stdio initialize, etc...
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    ready() {
        if (this.state() === 'ready')
            return;
        this.state('ready');
    }
    run(paramsOrStringArgs = {}, settings = {}) {
        var _a, _b, _c;
        const processSettings = (__deepMerge(this.settings, settings));
        if (this.currentExecutionObj !== undefined) {
            if (processSettings.throw === true) {
                throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name ||
                    this.metas.id ||
                    this.constructor.name}</yellow>" SProcess instance...`);
            }
            return;
        }
        if (process.env.NODE_ENV !== 'test' &&
            !__isChildProcess() &&
            processSettings.stdio &&
            !this.stdio) {
            this.stdio = __SStdio.existingOrNew('default', this, processSettings.stdio, {});
        }
        this._duration = new __SDuration();
        // init the currentExecution object
        // @ts-ignore
        this.currentExecutionObj = {
            state: 'idle',
            stdout: [],
            stderr: [],
            settings: Object.assign({}, settings),
        };
        if (this.currentExecutionObj) {
            this.currentExecutionObj.stdout.toString = () => {
                if (!this.currentExecutionObj)
                    return '';
                return this.currentExecutionObj.stdout
                    .map((item) => {
                    return __toString(item);
                })
                    .join('\n');
            };
            this.currentExecutionObj.stderr.toString = () => {
                if (!this.currentExecutionObj)
                    return '';
                return this.currentExecutionObj.stderr
                    .map((item) => {
                    return __toString(item);
                })
                    .join('\n');
            };
        }
        // @ts-ignore
        let paramsObj = __isPlainObject(paramsOrStringArgs)
            ? paramsOrStringArgs
            : {};
        // save current process params
        this._params = Object.assign({}, __deepMerge((_a = this.initialParams) !== null && _a !== void 0 ? _a : {}, paramsObj));
        // add params in the current execution object
        // @ts-ignore
        this.currentExecutionObj.params = Object.assign({}, this._params);
        // update state
        this.state('running');
        // before callback
        (_b = processSettings.before) === null || _b === void 0 ? void 0 : _b.call(processSettings, this);
        if (processSettings.runAsChild && !__isChildProcess()) {
            // build the command to run depending on the passed command in the constructor and the params
            const commandToRun = __buildCommandLine(`node --experimental-specifier-resolution=node ${__path.resolve(__dirname(), 'runAsChild.cli.js')} [arguments]`, Object.assign(Object.assign({}, this._params), { settings: processSettings }), {
                keepFalsy: true,
            });
            // run child process
            this._processPromise = __spawn(commandToRun, [], Object.assign({ silent: processSettings.silent }, (processSettings.spawnSettings || {})));
        }
        else {
            // run the actual process using the "process" method
            this._processPromise = this.process(this._params, processSettings);
            if (!processSettings.silent &&
                __isChildProcess() &&
                this._processPromise &&
                this._processPromise.pipeTo) {
                this._processPromise.pipeTo(process, {
                    exclude: [],
                });
            }
        }
        // handle SPromise based processes
        if (this._processPromise instanceof __SPromise) {
            // this._processPromise.on('*', (data, metas) => {
            //     console.log('D', data, metas);
            // });
            if (!processSettings.silent) {
                this.pipe(this._processPromise, {});
            }
            // listen for "data" and "log" events
            this._processPromise &&
                processSettings.collectStdout &&
                this._processPromise.on('log', (data, metas) => {
                    var _a;
                    if (this.currentExecutionObj) {
                        this.currentExecutionObj.stdout.push((_a = data.value) !== null && _a !== void 0 ? _a : data.toString());
                    }
                });
            // listen for errors
            this._processPromise &&
                processSettings.collectStderr &&
                this._processPromise.on('error,reject', (data, metas) => {
                    var _a;
                    if (this.currentExecutionObj) {
                        this.currentExecutionObj.stderr.push((_a = data.value) !== null && _a !== void 0 ? _a : data.toString());
                    }
                    if (!this.settings.killOnError && metas.event === 'error')
                        return;
                });
            // updating state when needed
            this._processPromise.on([
                'resolve:1',
                'reject:1',
                'cancel:1',
                'error:1',
                'success:1',
                'close.success:1',
                'close.error:1',
                'close.killed:1',
            ].join(','), (data, metas) => {
                if (metas.event === 'resolve' ||
                    metas.event === 'close.success')
                    this.state('success');
                else if (metas.event === 'reject' ||
                    metas.event === 'error' ||
                    metas.event === 'close.error')
                    this.state('error');
                else if (metas.event === 'cancel' ||
                    metas.event === 'close.killed')
                    this.state('killed');
                else
                    this.state('idle');
            });
            this._processPromise &&
                this._processPromise.on('finally', () => {
                    var _a;
                    // @ts-ignore
                    if (this.settings.exitAtEnd === true) {
                        process.exit();
                    }
                    // after callback
                    (_a = processSettings.after) === null || _a === void 0 ? void 0 : _a.call(processSettings, this);
                });
            // register some proxies
            (_c = this._processPromise) === null || _c === void 0 ? void 0 : _c.registerProxy('resolve,reject', (value) => {
                if (value && value.value !== undefined)
                    value = value.value;
                return Object.assign(Object.assign({}, this.executionsStack[this.executionsStack.length - 1]), { value });
            });
            // return the promise
            return this._processPromise;
        }
        // handle simple Promise processes
        // @ts-ignore
        if (this._processPromise instanceof Promise) {
            // @ts-ignore
            this._processPromise.catch((e) => { }); // eslint-disable-line
            return new __SPromise(({ resolve }) => {
                // @ts-ignore
                this._processPromise
                    .then((value) => {
                    var _a;
                    this.state('success');
                    resolve(Object.assign(Object.assign({}, this.executionsStack[this.executionsStack.length - 1]), { value }));
                    // after callback
                    (_a = processSettings.after) === null || _a === void 0 ? void 0 : _a.call(processSettings, this);
                })
                    .catch((error) => {
                    var _a;
                    this.state('error');
                    resolve(Object.assign(Object.assign({}, this.executionsStack[this.executionsStack.length - 1]), { error }));
                    // after callback
                    (_a = processSettings.after) === null || _a === void 0 ? void 0 : _a.call(processSettings, this);
                });
            });
        }
        // returned process function value MUST be either an SPromise instance or a simple Promise one
        throw new Error(`<red>[${this.constructor.name}.run]</red> Sorry but the returned value of the "<yellow>process</yellow>" method MUST be either an <yellow>SPromise</yellow> instance or a simple <yellow>Promise</yellow> instance`);
    }
    state(value) {
        if (!value)
            return this._state;
        if (['idle', 'ready', 'running', 'killed', 'error', 'success'].indexOf(value) === -1) {
            throw new Error(`Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(value)}</magenta>" of your "<cyan>${this.constructor.name}</cyan>" class can contain only one of these values: ${[
                'idle',
                'running',
                'killed',
                'error',
                'success',
            ]
                .map((i) => {
                return `"<green>${i}</green>"`;
            })
                .join(', ')}`);
        }
        // emit an event
        this.emit(`state.${value}`, undefined);
        this.emit('state', value);
        this._state = value;
        this._onStateChange(value);
        return this._state;
    }
    /**
     * @name      kill
     * @type      Function
     *
     * This method will simply kill the process and call the "cancel" method
     * on the SPromise super instance as well as on the passed "promise" instance
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    kill(data) {
        // call the cancel method on the parent SPromise instance
        this.cancel(data);
    }
    /**
     * @name        cancel
     * @type        Function
     *
     *
     * This method allows you to cancel the process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    cancel(data) {
        if (this.state() === 'running')
            this.state('killed');
        // cancel the passed promise
        if (this._processPromise && this._processPromise.cancel) {
            this._processPromise.cancel(data);
            setTimeout(() => {
                this.emit('error', data);
            }, 50);
        }
    }
    /**
     * @name        _onStateChange
     * @type        Function
     * @private
     *
     * This method is called each tie the state change to reflect
     * this in the console feed
     *
     * @param     {String}        state       The new state
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _onStateChange(state) {
        // update the current execution state
        if (!this.currentExecutionObj)
            return;
        this.currentExecutionObj.state = state;
        // check if is the end of the process
        if (state === 'killed' || state === 'error' || state === 'success') {
            this.currentExecutionObj = Object.assign(Object.assign({}, this.currentExecutionObj), this._duration.end());
        }
        if (state === 'success' || state === 'killed' || state === 'error') {
            // push the currentExecutionObj into the execution stack
            this.executionsStack.push(Object.assign({}, this.currentExecutionObj));
            // reset the currentExecutionObj
            this.currentExecutionObj = undefined;
        }
    }
    /**
     * @name          isRunning
     * @type          Function
     *
     * This method allows you to check if the process is currently running or not
     *
     * @return      {Boolean}         true if is running, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isRunning() {
        return this.state() === 'running';
    }
    /**
     * @name          isIdle
     * @type          Function
     *
     * This method allows you to check if the process is currently idle or not
     *
     * @return      {Boolean}         true if is idle, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isIdle() {
        return this.state() === 'idle';
    }
    /**
     * @name          isReady
     * @type          Function
     *
     * This method allows you to check if the process is currently ready or not
     *
     * @return      {Boolean}         true if is ready, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isReady() {
        return this.state() !== 'idle';
    }
    /**
     * @name          isKilled
     * @type          Function
     *
     * This method allows you to check if the process has been killed or not
     *
     * @return      {Boolean}         true if is killed, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isKilled() {
        return this.state() === 'killed';
    }
    /**
     * @name          isError
     * @type          Function
     *
     * This method allows you to check if the process is in error state or not
     *
     * @return      {Boolean}         true if is in error state, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isError() {
        return this.state() === 'error';
    }
    /**
     * @name          isSuccess
     * @type          Function
     *
     * This method allows you to check if the process is in success state or not
     *
     * @return      {Boolean}         true if is in success state, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isSuccess() {
        return this.state() === 'success';
    }
    /**
     * @name          log
     * @type          Function
     *
     * This method allows you to log a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to log
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    log(...logs) {
        logs.forEach((log) => {
            // @ts-ignore
            if (this.currentExecutionObj && this.settings.collectStdout) {
                this.currentExecutionObj.stdout.push(log.value || log.toString());
            }
            this.emit('log', log);
        });
    }
    /**
     * @name          error
     * @type          Function
     *
     * This method allows you to error a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to error
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    error(...errors) {
        errors.forEach((error) => {
            if (this.currentExecutionObj && this.settings.collectStderr) {
                this.currentExecutionObj.stderr.push(error.value || error.toString());
            }
            this.emit('error', error);
        });
    }
}
export default SProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sZUFBbUMsTUFBTSwrQkFBK0IsQ0FBQztBQUVoRixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUNILGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsZUFBZSxHQUNsQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sWUFBWSxNQUFNLGFBQWEsQ0FBQztBQVV2QyxPQUFPLDJCQUEyQixNQUFNLDBDQUEwQyxDQUFDO0FBRW5GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxNQUFNLFFBQVMsU0FBUSxlQUFlO0lBWWxDLElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBbUZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxNQUFNLENBQU8sSUFBSSxDQUNiLElBQWlELEVBQ2pELFFBQXFDOzs7WUFFckMsSUFB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