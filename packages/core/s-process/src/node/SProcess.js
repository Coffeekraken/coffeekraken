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
            this.paramsInterface = (_a = this.constructor.interface) !== null && _a !== void 0 ? _a : this.getInterface('params');
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
        // if (this.processSettings.asyncStart === false) {
        //   setTimeout(() => {
        //     this.ready();
        //   });
        // }
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
                const potentialPath = __path.resolve(what);
                let requireValue;
                try {
                    requireValue = (yield import(potentialPath)).default; // eslint-disable-line
                }
                catch (e) { } // eslint-disable-line
                if (requireValue) {
                    // pass this value back to the from method
                    return this.from(requireValue, __deepMerge({
                        process: {
                            processPath: potentialPath,
                        },
                    }, settings));
                }
                else {
                    const { default: __SCommandProcess } = yield import('./SCommandProcess'); // eslint-disable-line
                    // considere the passed string as a command
                    const commandProcess = new __SCommandProcess({
                        command: what,
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
        return this.executionsStack[this.executionsStack.length - 1];
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
        const processSettings = __deepMerge(this.processSettings, settings);
        if (this.currentExecutionObj !== undefined) {
            if (processSettings.throw === true) {
                throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name || this.metas.id || this.constructor.name}</yellow>" SProcess instance...`);
            }
            return;
        }
        (() => __awaiter(this, void 0, void 0, function* () {
            if (!__isChildProcess() && processSettings.stdio && !this.stdio) {
                this.stdio = yield __SStdio.existingOrNew('default', this, processSettings.stdio, {});
                if (this._processPromise) {
                    this._processPromise._eventEmitter.start();
                }
            }
        }))();
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
        let paramsObj = __isPlainObject(paramsOrStringArgs) ? paramsOrStringArgs : {};
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
        if (processSettings.runAsChild && !__isChildProcess()) {
            // build the command to run depending on the passed command in the constructor and the params
            const commandToRun = __buildCommandLine(`node ${__path.resolve(__dirname(), 'runAsChild.cli.js')} [arguments]`, Object.assign(Object.assign({}, this._params), { _settings: processSettings }));
            // run child process
            this._processPromise = __spawn(commandToRun, [], Object.assign({}, (processSettings.spawnSettings || {})));
        }
        else {
            // run the actual process using the "process" method
            this._processPromise = this.process(this._params, processSettings);
            if (__isChildProcess() && this._processPromise && this._processPromise.pipeTo) {
                this._processPromise.pipeTo(process);
            }
        }
        // handle SPromise based processes
        if (this._processPromise instanceof __SPromise) {
            // make event emitter async to wait for stdio to be ready
            if (!__isChildProcess() && processSettings.stdio) {
                this._processPromise.eventEmitterSettings.asyncStart = true;
            }
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
                'close.killed:1',
            ].join(','), (data, metas) => {
                if (metas.event === 'resolve' || metas.event === 'close.success')
                    this.state('success');
                else if (metas.event === 'reject' || metas.event === 'error' || metas.event === 'close.error')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGVBQW1DLE1BQU0sK0JBQStCLENBQUM7QUFFaEYsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxnQkFBZ0IsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLE9BQU8sTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RCxPQUFPLGNBQWMsTUFBTSx3REFBd0QsQ0FBQztBQUNwRixPQUFPLGtCQUFrQixNQUFNLGlEQUFpRCxDQUFDO0FBQ2pGLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFlBQVksTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQVdoRixPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sUUFBUyxTQUFRLGVBQWU7SUF1UWxDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksYUFBd0MsRUFBRSxRQUFnQzs7UUFDbEYsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWxRTjs7Ozs7Ozs7V0FRRztRQUNI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