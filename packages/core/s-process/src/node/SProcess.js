"use strict";
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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const path_1 = __importDefault(require("path"));
const stack_trace_1 = __importDefault(require("stack-trace"));
const buildCommandLine_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/buildCommandLine"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const childProcess_1 = __importDefault(require("@coffeekraken/sugar/node/is/childProcess"));
const s_stdio_1 = __importDefault(require("@coffeekraken/s-stdio"));
const SProcessSettingsInterface_1 = __importDefault(require("./interface/SProcessSettingsInterface"));
const onProcessExit_1 = __importDefault(require("@coffeekraken/sugar/node/process/onProcessExit"));
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
const class_1 = __importDefault(require("@coffeekraken/sugar/shared/is/class"));
const getExtendsStack_1 = __importDefault(require("@coffeekraken/sugar/shared/class/getExtendsStack"));
const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
class SProcess extends s_event_emitter_1.default {
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
        super(deepMerge_1.default({
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
        onProcessExit_1.default((state) => __awaiter(this, void 0, void 0, function* () {
            this.state(state);
        }));
        if (!this.processSettings.processPath) {
            for (const callSite of stack_trace_1.default.get()) {
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
        if (class_1.default(what) && getExtendsStack_1.default(what)['SProcess']) {
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
            const potentialPath = path_1.default.resolve(what);
            let requireValue;
            try {
                requireValue = require(potentialPath).default; // eslint-disable-line
            }
            catch (e) { } // eslint-disable-line
            if (requireValue) {
                // pass this value back to the from method
                return this.from(requireValue, deepMerge_1.default({
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
        const processSettings = (deepMerge_1.default(this.processSettings, settings));
        if (this.currentExecutionObj !== undefined) {
            if (processSettings.throw === true) {
                throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name || this.metas.id || this.constructor.name}</yellow>" SProcess instance...`);
            }
            return;
        }
        if (!childProcess_1.default() && processSettings.stdio && !this.stdio) {
            this.stdio = s_stdio_1.default.new(this, processSettings.stdio, {});
        }
        this._duration = new s_duration_1.default();
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
                    return toString_1.default(item);
                })
                    .join('\n');
            };
            this.currentExecutionObj.stderr.toString = () => {
                if (!this.currentExecutionObj)
                    return '';
                return this.currentExecutionObj.stderr
                    .map((item) => {
                    return toString_1.default(item);
                })
                    .join('\n');
            };
        }
        // @ts-ignore
        let paramsObj = plainObject_1.default(paramsOrStringArgs)
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
        if (processSettings.runAsChild && !childProcess_1.default()) {
            // build the command to run depending on the passed command in the constructor and the params
            const commandToRun = buildCommandLine_1.default(`node ${path_1.default.resolve(__dirname, 'runAsChild.cli.js')} [arguments]`, Object.assign(Object.assign({}, this._params), { _settings: processSettings }));
            // run child process
            this._processPromise = spawn_1.default(commandToRun, [], Object.assign({}, (processSettings.spawnSettings || {})));
        }
        else {
            // run the actual process using the "process" method
            this._processPromise = this.process(this._params, processSettings);
            if (childProcess_1.default() &&
                this._processPromise &&
                this._processPromise.on &&
                typeof this._processPromise.on === 'function' &&
                process.send &&
                typeof process.send === 'function') {
                this._processPromise &&
                    this._processPromise.on('*', (value, metas) => {
                        if (value.value && value.value instanceof Error) {
                            value.value = toString_1.default(value.value);
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
        if (this._processPromise instanceof s_promise_1.default) {
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
            return new s_promise_1.default(({ resolve }) => {
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
            throw new Error(`Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${toString_1.default(value)}</magenta>" of your "<cyan>${this.constructor.name}</cyan>" class can contain only one of these values: ${[
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
        class: SProcessSettingsInterface_1.default
    }
};
exports.default = SProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxnREFBMEI7QUFFMUIsOERBQXVDO0FBRXZDLHVHQUFpRjtBQUNqRixvRkFBZ0Y7QUFFaEYsNEZBQXNFO0FBQ3RFLDBGQUFvRTtBQUNwRSwwRUFBeUU7QUFFekUsNEZBQXdFO0FBQ3hFLG9FQUEwRDtBQUMxRCxzR0FBZ0Y7QUFDaEYsbUdBQTZFO0FBQzdFLDRGQUF3RTtBQUN4RSxnRkFBNEQ7QUFDNUQsdUdBQThFO0FBQzlFLG1GQUVnRDtBQXdGaEQsTUFBTSxRQUFTLFNBQVEseUJBQWU7SUF3UXBDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBd0MsRUFDeEMsUUFBZ0M7O1FBRWhDLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsT0FBTyxFQUFFLEVBQUU7U0FDWixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUF0UUo7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBRWxCOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFHLE1BQU0sQ0FBQztRQUVoQjs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBZSxHQUEwQixFQUFFLENBQUM7UUF3TzFDLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTVELGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxlQUFlO2dCQUNsQixNQUFNLElBQUssQ0FBQyxX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