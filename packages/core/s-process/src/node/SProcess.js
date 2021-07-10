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
// process.on('uncaughtException', function (err) {
//   console.log('CAUGHT__', err);
// });
// process.on('unhandledRejection', function (err) {
//   console.log('CAUGHT', err);
// });
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
            process: {}
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
        // ready if not an asyncStart process
        if (this.processSettings.asyncStart === false) {
            setTimeout(() => {
                this.ready();
            });
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
            const potentialPath = __path.resolve(what);
            let requireValue;
            try {
                requireValue = require(potentialPath).default; // eslint-disable-line
            }
            catch (e) { } // eslint-disable-line
            if (requireValue) {
                // pass this value back to the from method
                return this.from(requireValue, __deepMerge({
                    process: {
                        processPath: potentialPath
                    }
                }, settings));
            }
            else {
                const __SCommandProcess = require('./SCommandProcess').default; // eslint-disable-line
                // considere the passed string as a command
                const commandProcess = new __SCommandProcess({
                    command: what
                }, settings);
                return commandProcess;
            }
        }
        throw new Error([
            `<red>[SProcess.from]</red> Sorry but the passed "<magenta>what</magenta>" argument must be either:`,
            `- A <green>command string</green> like "<cyan>ls -la</cyan>"`,
            `- A valid <green>file path</green> that exports <green>one of these accepted types</green>`,
            `- A <yellow>function</yellow> that return a valid <green>Promise</green> instance or a valid <green>SPromise</green> instance`,
            `- A <green>Promise</green> or <green>SPromise</green> instance`,
            `- An <green>SProcess</green> based class`
        ].join('\n'));
    }
    /**
     * @name					fromCommand
     * @type 					Function
     * @static
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
        const __SCommandProcess = require('./SCommandProcess').default; // eslint-disable-line
        return new __SCommandProcess(initialParams, settings);
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const processSettings = (__deepMerge(this.processSettings, settings));
            if (this.currentExecutionObj !== undefined) {
                if (processSettings.throw === true) {
                    throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name || this.metas.id || this.constructor.name}</yellow>" SProcess instance...`);
                }
                return;
            }
            if (!__isChildProcess() && processSettings.stdio && !this.stdio) {
                this.stdio = yield __SStdio.new(this, processSettings.stdio, {});
            }
            this._duration = new __SDuration();
            // init the currentExecution object
            // @ts-ignore
            this.currentExecutionObj = {
                state: 'idle',
                stdout: [],
                stderr: [],
                settings: Object.assign({}, settings)
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
                    baseObj: (_a = this.initialParams) !== null && _a !== void 0 ? _a : {}
                });
            }
            // check if asking for the help
            if (paramsObj.help === true && this.paramsInterface !== undefined) {
                const helpString = this.paramsInterface.render();
                this.emit('log', {
                    group: `s-process-${this.metas.id}`,
                    value: helpString
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
            if (processSettings.runAsChild && !__isChildProcess()) {
                // build the command to run depending on the passed command in the constructor and the params
                const commandToRun = __buildCommandLine(`node ${__path.resolve(__dirname(), 'runAsChild.cli.js')} [arguments]`, Object.assign(Object.assign({}, this._params), { _settings: processSettings }));
                // run child process
                this._processPromise = __spawn(commandToRun, [], Object.assign({}, (processSettings.spawnSettings || {})));
            }
            else {
                // run the actual process using the "process" method
                this._processPromise = this.process(this._params, processSettings);
                if (__isChildProcess() &&
                    this._processPromise &&
                    this._processPromise.on &&
                    typeof this._processPromise.on === 'function' &&
                    process.send &&
                    typeof process.send === 'function') {
                    this._processPromise &&
                        this._processPromise.on('*', (value, metas) => {
                            if (value.value && value.value instanceof Error) {
                                value.value = __toString(value.value);
                            }
                            process.send !== undefined &&
                                process.send({
                                    value,
                                    metas
                                });
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
                        if (!this.processSettings.killOnError && metas.event === 'error')
                            return;
                        // this.kill(data);
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
                    'close.killed:1'
                ].join(','), (data, metas) => {
                    if (metas.event === 'resolve' || metas.event === 'close.success')
                        this.state('success');
                    else if (metas.event === 'reject' ||
                        metas.event === 'error' ||
                        metas.event === 'close.error')
                        this.state('error');
                    else if (metas.event === 'cancel' || metas.event === 'close.killed')
                        this.state('killed');
                    else
                        this.state('idle');
                });
                this._processPromise &&
                    this._processPromise.on('finally', () => {
                        // @ts-ignore
                        if (this.processSettings.exitAtEnd === true) {
                            process.exit();
                        }
                    });
                // register some proxies
                (_b = this._processPromise) === null || _b === void 0 ? void 0 : _b.registerProxy('resolve,reject', (value) => {
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
                        this.state('success');
                        resolve(Object.assign(Object.assign({}, this.executionsStack[this.executionsStack.length - 1]), { value }));
                    })
                        .catch((error) => {
                        this.state('error');
                        resolve(Object.assign(Object.assign({}, this.executionsStack[this.executionsStack.length - 1]), { error }));
                    });
                });
            }
            // returned process function value MUST be either an SPromise instance or a simple Promise one
            throw new Error(`<red>[${this.constructor.name}.run]</red> Sorry but the returned value of the "<yellow>process</yellow>" method MUST be either an <yellow>SPromise</yellow> instance or a simple <yellow>Promise</yellow> instance`);
        });
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
                'success'
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
        class: __SProcessSettingsInterface
    }
};
export default SProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGVBQW1DLE1BQU0sK0JBQStCLENBQUM7QUFFaEYsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxnQkFBZ0IsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLE9BQU8sTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RCxPQUFPLGNBQWMsTUFBTSx3REFBd0QsQ0FBQztBQUNwRixPQUFPLGtCQUFrQixNQUFNLGlEQUFpRCxDQUFDO0FBQ2pGLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFlBQVksTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQU1oRixPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RCxtREFBbUQ7QUFDbkQsa0NBQWtDO0FBQ2xDLE1BQU07QUFDTixvREFBb0Q7QUFDcEQsZ0NBQWdDO0FBQ2hDLE1BQU07QUFFTjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sUUFBUyxTQUFRLGVBQWU7SUF3UXBDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBd0MsRUFDeEMsUUFBZ0M7O1FBRWhDLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxPQUFPLEVBQUUsRUFBRTtTQUNaLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXRRSjs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxTQUFTLENBQUM7UUFFbEI7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQUcsTUFBTSxDQUFDO1FBRWhCOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQTBCLEVBQUUsQ0FBQztRQXdPMUMsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxhQUFiLGFBQWEsY0FBYixhQUFhLEdBQUksRUFBRSxDQUFDLENBQUM7UUFFNUQsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxDQUFDLGVBQWU7Z0JBQ2xCLE1BQU0sSUFBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLG1DQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEU7UUFFRCxzQkFBc0I7UUFDdEIsZUFBZSxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFO1lBQ3JDLEtBQUssTUFBTSxRQUFRLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtvQkFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMxRCxNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUNiLDBMQUEwTCxDQUMzTCxDQUFDO1NBQ0g7UUFFRCxxQ0FBcUM7UUFDckMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDN0MsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQS9TRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQW1GRCxJQUFJLGVBQWU7UUFDakIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FDVCxJQUE4RCxFQUM5RCxRQUF5QztRQUV6QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkQsYUFBYTtZQUNiLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxJQUFJLFlBQVksUUFBUSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLElBQUksWUFBWSxPQUFPLEVBQUU7WUFDM0IsTUFBTSxlQUFnQixTQUFRLFFBQVE7Z0JBQ3BDO29CQUNFLEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQ0QsT0FBTztvQkFDTCxhQUFhO29CQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO29CQUM3QyxPQUFxQixJQUFJLENBQUM7Z0JBQzVCLENBQUM7YUFDRjtZQUNELE9BQU8sSUFBSSxlQUFlLEVBQUUsQ0FBQztTQUM5QjtRQUNELElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQzlCLE1BQU0sZ0JBQWlCLFNBQVEsUUFBUTtnQkFDckM7b0JBQ0UsS0FBSyxDQUNILEVBQUUsb0JBRUcsUUFBUSxFQUVkLENBQUM7Z0JBQ0osQ0FBQztnQkFDRCxPQUFPLENBQ0wsTUFBZ0MsRUFDaEMsUUFBb0M7b0JBRXBDLGFBQWE7b0JBQ2IsT0FBcUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsQ0FBQzthQUNGO1lBQ0QsT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLElBQUksWUFBWSxDQUFDO1lBRWpCLElBQUk7Z0JBQ0YsWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxzQkFBc0I7YUFDdEU7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFLENBQUMsc0JBQXNCO1lBRXJDLElBQUksWUFBWSxFQUFFO2dCQUNoQiwwQ0FBMEM7Z0JBQzFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FDZCxZQUFZLEVBQ1osV0FBVyxDQUNUO29CQUNFLE9BQU8sRUFBRTt3QkFDUCxXQUFXLEVBQUUsYUFBYTtxQkFDM0I7aUJBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxzQkFBc0I7Z0JBQ3RGLDJDQUEyQztnQkFDM0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBaUIsQ0FDMUM7b0JBQ0UsT0FBTyxFQUFFLElBQUk7aUJBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FBQztnQkFDRixPQUFPLGNBQWMsQ0FBQzthQUN2QjtTQUNGO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FDYjtZQUNFLG9HQUFvRztZQUNwRyw4REFBOEQ7WUFDOUQsNEZBQTRGO1lBQzVGLCtIQUErSDtZQUMvSCxnRUFBZ0U7WUFDaEUsMENBQTBDO1NBQzNDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUNoQixnQkFBaUQsRUFBRSxFQUNuRCxRQUFnRDtRQUVoRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjtRQUN0RixPQUFPLElBQUksaUJBQWlCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBTyxHQUFHLENBQ2QscUJBQXdELEVBQUUsRUFDMUQsV0FBdUMsRUFBRTs7WUFFekMsTUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQThERDs7Ozs7Ozs7T0FRRztJQUNILElBQUksZ0JBQWdCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU07WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE9BQTRCLENBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQ3RELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBRUg7Ozs7Ozs7OztPQVNHO0lBQ0gsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLE9BQU87WUFBRSxPQUFPO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQW1CSyxHQUFHLENBQ1AscUJBQXdELEVBQUUsRUFDMUQsV0FBdUMsRUFBRTs7O1lBRXpDLE1BQU0sZUFBZSxHQUFzQixDQUN6QyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FDNUMsQ0FBQztZQUVGLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtnQkFDMUMsSUFBSSxlQUFlLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDYixrRUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQ3ZELGlDQUFpQyxDQUNsQyxDQUFDO2lCQUNIO2dCQUNELE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLGVBQWUsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMvRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsRTtZQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUVuQyxtQ0FBbUM7WUFDbkMsYUFBYTtZQUNiLElBQUksQ0FBQyxtQkFBbUIsR0FBRztnQkFDekIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQzthQUN0QyxDQUFDO1lBQ0YsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUI7d0JBQUUsT0FBTyxFQUFFLENBQUM7b0JBQ3pDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU07eUJBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNaLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO29CQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQjt3QkFBRSxPQUFPLEVBQUUsQ0FBQztvQkFDekMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTTt5QkFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ1osT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFCLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQzthQUNIO1lBRUQsYUFBYTtZQUNiLElBQUksU0FBUyxHQUE2QixlQUFlLENBQ3ZELGtCQUFrQixDQUNuQjtnQkFDQyxDQUFDLENBQUMsa0JBQWtCO2dCQUNwQixDQUFDLENBQUMsRUFBRSxDQUFDO1lBRVAsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN4QixTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7b0JBQ3pELE9BQU8sRUFBRSxNQUFBLElBQUksQ0FBQyxhQUFhLG1DQUFJLEVBQUU7aUJBQ2xDLENBQUMsQ0FBQzthQUNKO1lBRUQsK0JBQStCO1lBQy9CLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7Z0JBQ2pFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNmLEtBQUssRUFBRSxhQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO29CQUNuQyxLQUFLLEVBQUUsVUFBVTtpQkFDbEIsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDUjtZQUVELDhCQUE4QjtZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRTVDLDZDQUE2QztZQUM3QyxhQUFhO1lBQ2IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUUvRCxlQUFlO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV0QixJQUFJLGVBQWUsQ0FBQyxVQUFVLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUNyRCw2RkFBNkY7Z0JBQzdGLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUNyQyxRQUFRLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsbUJBQW1CLENBQUMsY0FBYyxrQ0FFakUsSUFBSSxDQUFDLE9BQU8sS0FDZixTQUFTLEVBQUUsZUFBZSxJQUU3QixDQUFDO2dCQUVGLG9CQUFvQjtnQkFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsb0JBQzFDLENBQUMsZUFBZSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsRUFDeEMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLG9EQUFvRDtnQkFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBUyxJQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBRTFFLElBQ0UsZ0JBQWdCLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxlQUFlO29CQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7b0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssVUFBVTtvQkFDN0MsT0FBTyxDQUFDLElBQUk7b0JBQ1osT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFDbEM7b0JBQ0EsSUFBSSxDQUFDLGVBQWU7d0JBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTs0QkFDNUMsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLFlBQVksS0FBSyxFQUFFO2dDQUMvQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQ3ZDOzRCQUNELE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUztnQ0FDeEIsT0FBTyxDQUFDLElBQUksQ0FBQztvQ0FDWCxLQUFLO29DQUNMLEtBQUs7aUNBQ04sQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0Y7WUFFRCxrQ0FBa0M7WUFDbEMsSUFBSSxJQUFJLENBQUMsZUFBZSxZQUFZLFVBQVUsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBMkIsSUFBSSxDQUFDLGVBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRS9ELHFDQUFxQztnQkFDckMsSUFBSSxDQUFDLGVBQWU7b0JBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDN0MsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7NEJBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUM1QztvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDTCxvQkFBb0I7Z0JBQ3BCLElBQUksQ0FBQyxlQUFlO29CQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQ3RELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFOzRCQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDNUM7d0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTzs0QkFDOUQsT0FBTzt3QkFDVCxtQkFBbUI7b0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUVMLDZCQUE2QjtnQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQ3JCO29CQUNFLFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixVQUFVO29CQUNWLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsZ0JBQWdCO2lCQUNqQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDWCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDZCxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssZUFBZTt3QkFDOUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDbkIsSUFDSCxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVE7d0JBQ3hCLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTzt3QkFDdkIsS0FBSyxDQUFDLEtBQUssS0FBSyxhQUFhO3dCQUU3QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNqQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssY0FBYzt3QkFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs7d0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLENBQUMsQ0FDRixDQUFDO2dCQUVGLElBQUksQ0FBQyxlQUFlO29CQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO3dCQUN0QyxhQUFhO3dCQUNiLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFOzRCQUMzQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7eUJBQ2hCO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUVMLHdCQUF3QjtnQkFDeEIsTUFBQSxJQUFJLENBQUMsZUFBZSwwQ0FBRSxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDOUQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTO3dCQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUM1RCxPQUFPLGdDQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQ3hELEtBQUssR0FDTixDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUVILHFCQUFxQjtnQkFDckIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQzdCO1lBRUQsa0NBQWtDO1lBQ2xDLGFBQWE7WUFDYixJQUFJLElBQUksQ0FBQyxlQUFlLFlBQVksT0FBTyxFQUFFO2dCQUMzQyxhQUFhO2dCQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtnQkFDN0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtvQkFDcEMsYUFBYTtvQkFDYixJQUFJLENBQUMsZUFBZTt5QkFDakIsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdEIsT0FBTyxDQUFDLGdDQUNILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQ3hELEtBQUssR0FDTixDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3BCLE9BQU8sQ0FBQyxnQ0FDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUN4RCxLQUFLLEdBQ04sQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCw4RkFBOEY7WUFDOUYsTUFBTSxJQUFJLEtBQUssQ0FDYixTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxzTEFBc0wsQ0FDck4sQ0FBQzs7S0FDSDtJQUVELEtBQUssQ0FBQyxLQUFjO1FBQ2xCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLElBQ0UsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FDaEUsS0FBSyxDQUNOLEtBQUssQ0FBQyxDQUFDLEVBQ1I7WUFDQSxNQUFNLElBQUksS0FBSyxDQUNiLHVFQUF1RSxVQUFVLENBQy9FLEtBQUssQ0FDTiw4QkFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQ25CLHdEQUF3RDtnQkFDdEQsTUFBTTtnQkFDTixTQUFTO2dCQUNULFFBQVE7Z0JBQ1IsT0FBTztnQkFDUCxTQUFTO2FBQ1Y7aUJBQ0UsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDaEIsQ0FBQztTQUNIO1FBRUQsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxDQUFDLElBQUk7UUFDUCx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLElBQUk7UUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCw0QkFBNEI7UUFDNUIsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ1I7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsY0FBYyxDQUFDLEtBQUs7UUFDbEIscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CO1lBQUUsT0FBTztRQUV0QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUV2QyxxQ0FBcUM7UUFDckMsSUFBSSxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxPQUFPLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNsRSxJQUFJLENBQUMsbUJBQW1CLG1DQUNuQixJQUFJLENBQUMsbUJBQW1CLEdBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQ3hCLENBQUM7U0FDSDtRQUVELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDbEUsd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDdkUsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxTQUFTLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssTUFBTSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssT0FBTyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsR0FBRyxDQUFDLEdBQUcsSUFBWTtRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDbkU7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLLENBQUMsR0FBRyxNQUFjO1FBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUN2RTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUExMEJNLG1CQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixLQUFLLEVBQUUsMkJBQTJCO0tBQ25DO0NBQ0YsQ0FBQztBQXcwQkosZUFBZSxRQUFRLENBQUMifQ==