var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __path from 'path';
import __stackTrace from 'stack-trace';
import __buildCommandLine from '@coffeekraken/sugar/shared/cli/buildCommandLine';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SDuration from '@coffeekraken/s-duration';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __SStdio from '@coffeekraken/s-stdio';
import __SProcessSettingsInterface from './interface/SProcessSettingsInterface';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __isClass from '@coffeekraken/sugar/shared/is/class';
import __extendsStack from '@coffeekraken/sugar/shared/class/utils/getExtendsStack';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
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
        const processSettings = (__deepMerge(this.processSettings, settings));
        if (this.currentExecutionObj !== undefined) {
            if (processSettings.throw === true) {
                throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name || this.metas.id || this.constructor.name}</yellow>" SProcess instance...`);
            }
            return;
        }
        if (!__isChildProcess() && processSettings.stdio && !this.stdio) {
            this.stdio = __SStdio.new(this, processSettings.stdio, {});
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
            }).value;
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
            const commandToRun = __buildCommandLine(`node ${__path.resolve(__dirname, 'runAsChild.cli.js')} [arguments]`, Object.assign(Object.assign({}, this._params), { _settings: processSettings }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBRXZDLE9BQU8sa0JBQWtCLE1BQU0saURBQWlELENBQUM7QUFDakYsT0FBTyxlQUFtQyxNQUFNLCtCQUErQixDQUFDO0FBRWhGLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sV0FBaUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RSxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sUUFBcUIsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sY0FBYyxNQUFNLHdEQUF3RCxDQUFDO0FBQ3BGLE9BQU8sT0FFTixNQUFNLHdDQUF3QyxDQUFDO0FBWWhELG1EQUFtRDtBQUNuRCxrQ0FBa0M7QUFDbEMsTUFBTTtBQUNOLG9EQUFvRDtBQUNwRCxnQ0FBZ0M7QUFDaEMsTUFBTTtBQUVOOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxRQUFTLFNBQVEsZUFBZTtJQXdRcEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUF3QyxFQUN4QyxRQUFnQzs7UUFFaEMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLE9BQU8sRUFBRSxFQUFFO1NBQ1osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxF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