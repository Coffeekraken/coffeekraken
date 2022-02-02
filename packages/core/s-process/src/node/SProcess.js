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
import __fs from 'fs';
import __SPromise from '@coffeekraken/s-promise';
import __SStdio from '@coffeekraken/s-stdio';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __extendsStack from '@coffeekraken/sugar/shared/class/utils/getExtendsStack';
import __buildCommandLine from '@coffeekraken/sugar/shared/cli/buildCommandLine';
import __isClass from '@coffeekraken/sugar/shared/is/class';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __path from 'path';
import __stackTrace from 'stack-trace';
import __SProcessSettingsInterface from './interface/SProcessSettingsInterface';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
/**
 * @name                SProcess
 * @namespace           sugar.node.process
 * @type                Class
 * @extends             SEventEmitter
 * @status              wip
 *
 * This class represent an SProcess run iteration that store things like
 * the value, the startTime, endTime, duration, state, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcess extends __SEventEmitter {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        var _a;
        super(__deepMerge({
            process: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name      stdio
         * @type      SProcessOutput
         *
         * Access the stdio class initiated if exists
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.stdio = undefined;
        /**
         * @name      state
         * @type      String
         *
         * Access the process state like 'idle', 'ready', 'running', 'killed', 'error', 'success'
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.executionsStack = [];
        // save initial params
        this.initialParams = Object.assign({}, initialParams !== null && initialParams !== void 0 ? initialParams : {});
        // get the definition from interface or settings
        this.paramsInterface = this.processSettings.interface;
        if (!this.paramsInterface) {
            this.paramsInterface =
                (_a = this.constructor.interface) !== null && _a !== void 0 ? _a : this.getInterface('params');
        }
        // handle process exit
        __onProcessExit((state) => __awaiter(this, void 0, void 0, function* () {
            this.state(state);
        }));
        if (!this.processSettings.processPath) {
            for (const callSite of __stackTrace.get()) {
                if (callSite.getFunctionName() === this.constructor.name) {
                    this.processSettings.processPath = callSite.getFileName();
                    break;
                }
            }
        }
        if (!this.processSettings.processPath) {
            throw new Error(`An SProcess instance MUST have a "<yellow>processPath</yellow>" property either populated automatically if possible, or specified in the "<cyan>settings.processPath</cyan>" property...`);
        }
    }
    get params() {
        return this._params;
    }
    get processSettings() {
        return this._settings.process;
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
     * - function: Will execute the function and instanciate the proper SPromise instance type depending on the returned value
     * - SPromise instance: Will simply wrap the SPromise  instance inside an SProcess one and returns you this new SProcess instance
     * - SProcess based class: This make not so much sens but at least you can rely on this method to instanciate event an SProcess based class
     * Once you get the proper instance back, you can use it the same as an SProcess based class instance and use the ```run``` method to
     * execute your process
     *
     * @param         {string|function|SPromise|SProcess}       what      The value with which you want to get an SProcess based instance back
     * @param         {Partial<ISProcessCtorSettings>}      [settings={}]     Some settings to configure your new SProcess based class instance
     * @return        {SProcess}              An SProcess based class instance that you can use to execute your process
     *
     * @since
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static from(what, settings) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (__isClass(what) && __extendsStack(what)['SProcess']) {
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
                            process: {
                                processPath: potentialPath,
                            },
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
                        process: {
                            processPath: __path.resolve('./SCommandProcess.js'),
                        },
                    }));
                    return commandProcess;
                }
            }
            throw new Error([
                `<red>[SProcess.from]</red> Sorry but the passed "<magenta>what</magenta>" argument must be either:`,
                `- A <green>command string</green> like "<cyan>ls -la</cyan>"`,
                `- A valid <green>file path</green> that exports <green>one of these accepted types</green>`,
                `- A <yellow>function</yellow> that return a valid <green>Promise</green> instance or a valid <green>SPromise</green> instance`,
                `- A <green>Promise</green> or <green>SPromise</green> instance`,
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
     * @param         {Partial<ISCommandProcessCtorSettings>}     [settings={}]     Some settings to instanciate your command process as you want
     * @return       {SCommandProcess}               An instance of the SCommandProcess class
     *
     * @since 				2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static run(paramsOrStringArgs = {}, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new this({});
            return instance.run(paramsOrStringArgs, settings);
        });
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
     * You have to return an SPromise instance in order that the SProcess class is able to keep
     * track of your process state, logs, etc...
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    /**
     * @name      ready
     * @type      Function
     *
     * This method allows you to set the process in the "ready" state.
     * This will make the stdio initialize, etc...
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    ready() {
        if (this.state() === 'ready')
            return;
        this.state('ready');
    }
    run(paramsOrStringArgs = {}, settings = {}) {
        var _a, _b, _c;
        const processSettings = (__deepMerge(this.processSettings, settings));
        if (this.currentExecutionObj !== undefined) {
            if (processSettings.throw === true) {
                throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name ||
                    this.metas.id ||
                    this.constructor.name}</yellow>" SProcess instance...`);
            }
            return;
        }
        if (!__isChildProcess() && processSettings.stdio && !this.stdio) {
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
        if (this.paramsInterface) {
            paramsObj = this.paramsInterface.apply(paramsOrStringArgs, {
                baseObj: (_a = this.initialParams) !== null && _a !== void 0 ? _a : {},
            });
        }
        // check if asking for the help
        if (paramsObj.help === true && this.paramsInterface !== undefined) {
            const helpString = this.paramsInterface.render();
            this.emit('log', {
                group: `s-process-${this.metas.id}`,
                value: helpString,
            });
            return;
        }
        // save current process params
        this._params = Object.assign({}, paramsObj);
        // add params in the current execution object
        // @ts-ignore
        this.currentExecutionObj.params = Object.assign({}, paramsObj);
        // update state
        this.state('running');
        // before callback
        (_b = processSettings.before) === null || _b === void 0 ? void 0 : _b.call(processSettings, this);
        if (processSettings.runAsChild && !__isChildProcess()) {
            // build the command to run depending on the passed command in the constructor and the params
            const commandToRun = __buildCommandLine(`node --experimental-specifier-resolution=node ${__path.resolve(__dirname(), 'runAsChild.cli.js')} [arguments]`, Object.assign(Object.assign({}, this._params), { _settings: processSettings }), {
                keepFalsy: true,
            });
            // run child process
            this._processPromise = __spawn(commandToRun, [], Object.assign({}, (processSettings.spawnSettings || {})));
        }
        else {
            // run the actual process using the "process" method
            this._processPromise = this.process(this._params, processSettings);
            if (__isChildProcess() &&
                this._processPromise &&
                this._processPromise.pipeTo) {
                this._processPromise.pipeTo(process, {
                    exclude: [],
                });
            }
        }
        // handle SPromise based processes
        if (this._processPromise instanceof __SPromise) {
            this.pipe(this._processPromise, {});
            // listen for "data" and "log" events
            this._processPromise &&
                this._processPromise.on('log', (data, metas) => {
                    if (this.currentExecutionObj) {
                        this.currentExecutionObj.stdout.push(data);
                    }
                });
            // listen for errors
            this._processPromise &&
                this._processPromise.on('error,reject', (data, metas) => {
                    if (this.currentExecutionObj) {
                        this.currentExecutionObj.stderr.push(data);
                    }
                    if (!this.processSettings.killOnError &&
                        metas.event === 'error')
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
                    if (this.processSettings.exitAtEnd === true) {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(...logs) {
        logs.forEach((log) => {
            if (this.currentExecutionObj) {
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    error(...errors) {
        errors.forEach((error) => {
            if (this.currentExecutionObj) {
                this.currentExecutionObj.stderr.push(error.value || error.toString());
            }
            this.emit('error', error);
        });
    }
}
SProcess.interfaces = {
    settings: {
        on: '_settings.process',
        class: __SProcessSettingsInterface,
    },
};
export default SProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGVBR04sTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxnQkFBZ0IsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLE9BQU8sTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RCxPQUFPLGNBQWMsTUFBTSx3REFBd0QsQ0FBQztBQUNwRixPQUFPLGtCQUFrQixNQUFNLGlEQUFpRCxDQUFDO0FBQ2pGLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFlBQVksTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQVloRixPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUc1RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sUUFBUyxTQUFRLGVBQWU7SUE4UWxDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksYUFBd0MsRUFDeEMsUUFBZ0M7O1FBRWhDLEtBQUssQ0FDa0MsV0FBVyxDQUMxQztZQUNJLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pC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