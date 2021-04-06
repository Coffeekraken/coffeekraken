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
        this._restarted = 0;
        // save initial params
        this.initialParams = Object.assign({}, initialParams !== null && initialParams !== void 0 ? initialParams : {});
        // get the definition from interface or settings
        this.paramsInterface =
            (_a = this.constructor.interface) !== null && _a !== void 0 ? _a : this.getInterface('params');
        if (this.processSettings.interface !== undefined)
            this.paramsInterface = this.processSettings.interface;
        // handle process exit
        onProcessExit_1.default((state) => __awaiter(this, void 0, void 0, function* () {
            this.state(state);
        }));
        this._processPath = this.processSettings.processPath;
        for (const callSite of stack_trace_1.default.get()) {
            if (callSite.getFunctionName() === this.constructor.name) {
                this._processPath = callSite.getFileName();
                break;
            }
        }
        if (!this._processPath) {
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
        const paramsObj = this.paramsInterface.apply(paramsOrStringArgs, {
            baseObj: (_a = this.initialParams) !== null && _a !== void 0 ? _a : {}
        }).value;
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
            const commandToRun = buildCommandLine_1.default(`node --enable-source-maps ${path_1.default.resolve(__dirname, 'runAsChild.cli.js')} [arguments]`, Object.assign(Object.assign({}, paramsObj), { processPath: this._processPath, _settings: processSettings }));
            // run child process
            this._processPromise = spawn_1.default(commandToRun, [], Object.assign({}, (processSettings.spawnSettings || {})));
        }
        else {
            // run the actual process using the "process" method
            this._processPromise = this.process(this._params, processSettings);
            if (childProcess_1.default() &&
                process.send &&
                typeof process.send === 'function') {
                this._processPromise &&
                    this._processPromise.on('*', (value, metas) => {
                        if (value.value && value.value instanceof Error) {
                            value.value = toString_1.default(value.value);
                        }
                        // console.log('EEE', value);
                        process.send !== undefined &&
                            process.send({
                                value,
                                metas
                            });
                    });
            }
        }
        this.pipe(this._processPromise, {});
        if ((_b = this._processPromise) === null || _b === void 0 ? void 0 : _b.promiseSettings) {
            this._processPromise.promiseSettings.emitErrorAsEvent = this.processSettings.emitErrorAsEvent;
        }
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
        this._processPromise &&
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
            this._processPromise.on('finally', (value, metas) => {
                // @ts-ignore
                if (this.processSettings.exitAtEnd === true) {
                    process.exit();
                }
            });
        // register some proxies
        (_c = this._processPromise) === null || _c === void 0 ? void 0 : _c.registerProxy('resolve,reject', (value) => {
            if (value.value !== undefined)
                value = value.value;
            return Object.assign({ value }, this.executionsStack[this.executionsStack.length - 1]);
        });
        // return the process promise
        return this._processPromise;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUEwQjtBQUMxQiw4REFBdUM7QUFFdkMsdUdBQWlGO0FBQ2pGLG9GQUFnRjtBQUVoRiw0RkFBc0U7QUFDdEUsMEZBQW9FO0FBQ3BFLDBFQUFtRDtBQUVuRCw0RkFBd0U7QUFDeEUsb0VBQTBEO0FBQzFELHNHQUFnRjtBQUNoRixtR0FBNkU7QUFDN0UsbUZBRWdEO0FBMEZoRCxNQUFNLFFBQVMsU0FBUSx5QkFBZTtJQStJcEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUF1QyxFQUN2QyxRQUFnQzs7UUFFaEMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxPQUFPLEVBQUUsRUFBRTtTQUNaLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQTdJSjs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxTQUFTLENBQUM7UUFFbEI7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQUcsTUFBTSxDQUFDO1FBRWhCOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQTBCLEVBQUUsQ0FBQztRQWdONUMsZUFBVSxHQUFHLENBQUMsQ0FBQztRQWpHYixzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxFQUFFLENBQUMsQ0FBQztRQUU1RCxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGVBQWU7WUFDbEIsTUFBTSxJQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsbUNBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFDOUMsSUFBSSxDQUFDLGVB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