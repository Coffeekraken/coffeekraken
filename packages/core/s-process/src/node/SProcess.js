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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
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
        const processSettings = (__deepMerge(this.processSettings, settings));
        if (this.currentExecutionObj !== undefined) {
            if (processSettings.throw === true) {
                throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name ||
                    this.metas.id ||
                    this.constructor.name}</yellow>" SProcess instance...`);
            }
            return;
        }
        if (process.env.NODE_ENV !== 'test' && !__isChildProcess() && processSettings.stdio && !this.stdio) {
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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