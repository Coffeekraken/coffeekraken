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
const argsToObject_1 = __importDefault(require("../../shared/cli/argsToObject"));
const buildCommandLine_1 = __importDefault(require("../../shared/cli/buildCommandLine"));
const SError_1 = __importDefault(require("../../shared/error/SError"));
const SEventEmitter_1 = __importDefault(require("../../shared/event/SEventEmitter"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const toString_1 = __importDefault(require("../../shared/string/toString"));
const convert_1 = __importDefault(require("../../shared/time/convert"));
const SDuration_1 = __importDefault(require("../../shared/time/SDuration"));
const wait_1 = __importDefault(require("../../shared/time/wait"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const stdio_1 = __importDefault(require("../stdio/stdio"));
const SProcessSettingsInterface_1 = __importDefault(require("./interface/SProcessSettingsInterface"));
const onProcessExit_1 = __importDefault(require("./onProcessExit"));
const spawn_1 = __importDefault(require("./spawn"));
const toJson_1 = __importDefault(require("../../shared/object/toJson"));
class SProcess extends SEventEmitter_1.default {
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
    constructor(initialParams, settings = {}) {
        super(deepMerge_1.default({
            process: {}
        }, settings));
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
        this.initialParams = Object.assign({}, initialParams);
        // get the definition from interface or settings
        this.paramsInterface = this.getInterface('params');
        if (this.processSettings.paramsInterface !== undefined)
            this.paramsInterface = this.processSettings.paramsInterface;
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
            throw new SError_1.default(`An SProcess instance MUST have a "<yellow>processPath</yellow>" property either populated automatically if possible, or specified in the "<cyan>settings.processPath</cyan>" property...`);
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const processSettings = (deepMerge_1.default(this.processSettings, settings));
            if (this.currentExecutionObj !== undefined) {
                if (processSettings.throw === true) {
                    throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name || this.metas.id || this.constructor.name}</yellow>" SProcess instance...`);
                }
                return;
            }
            if (!childProcess_1.default() && processSettings.stdio && !this.stdio) {
                this.stdio = stdio_1.default(this, processSettings.stdio, {});
            }
            this._duration = new SDuration_1.default();
            // init the currentExecution object
            // @ts-ignore
            this.currentExecutionObj = {
                state: 'idle',
                stdout: [],
                stderr: []
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
            yield wait_1.default(50);
            const paramsObj = argsToObject_1.default(paramsOrStringArgs, {
                definition: Object.assign(Object.assign({}, (this.paramsInterface !== undefined
                    ? this.paramsInterface.definition
                    : {})), { processPath: {
                        type: 'String'
                    } })
            });
            console.log(paramsObj);
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
            // update state
            this.state('running');
            if (processSettings.runAsChild && !childProcess_1.default()) {
                // build the command to run depending on the passed command in the constructor and the params
                const commandToRun = buildCommandLine_1.default(`node --enable-source-maps ${path_1.default.resolve(__dirname, '../../cli/sugar.cli.js')} process.runChild [arguments]`, Object.assign(Object.assign({}, paramsObj), { processPath: this._processPath }), {
                    definition: Object.assign(Object.assign({}, (this.paramsInterface !== undefined
                        ? this.paramsInterface.definition
                        : {})), { processPath: {
                            type: 'String',
                            required: true
                        } }),
                    alias: false
                });
                // run child process
                this._processPromise = spawn_1.default(commandToRun, [], Object.assign({}, (processSettings.spawnSettings || {})));
            }
            else {
                // run the actual process using the "process" method
                this._processPromise = this.process(this._params, settings);
                if (childProcess_1.default() &&
                    process.send &&
                    typeof process.send === 'function') {
                    this._processPromise &&
                        this._processPromise.on('*', (value, metas) => {
                            process.send !== undefined &&
                                process.send(toJson_1.default({
                                    value,
                                    metas
                                }));
                        });
                }
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
                    this.kill(data);
                });
            // updating state when needed
            this._processPromise &&
                this._processPromise.on([
                    'resolve:1',
                    'reject:1',
                    'cancel:1',
                    'close.error:1',
                    'close.killed:1'
                ].join(','), (data, metas) => {
                    if (metas.event === 'resolve' || metas.event === 'close.success')
                        this.state('success');
                    else if (metas.event === 'reject' || metas.event === 'close.error')
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
            (_a = this._processPromise) === null || _a === void 0 ? void 0 : _a.registerProxy('resolve', (value) => {
                if (value.spawn && value.value !== undefined)
                    value = value.value;
                return Object.assign({ value }, this.executionsStack.pop());
                return value;
            });
            // return the process promise
            return this._processPromise;
        });
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
        var _a;
        // update the current execution state
        if (!this.currentExecutionObj)
            return;
        this.currentExecutionObj.state = state;
        // check if is the end of the process
        if (state === 'killed' || state === 'error' || state === 'success') {
            this.currentExecutionObj = Object.assign(Object.assign({}, this.currentExecutionObj), this._duration.end());
        }
        let data;
        const strArray = [];
        if (!childProcess_1.default() &&
            this._settings // @todo      check why this is causing context problem after 2 or 3 kill run...
        ) {
            switch (state) {
                case 'success':
                    if (this.processSettings.decorators === true) {
                        this.log({
                            color: 'green',
                            type: 'heading',
                            value: `The <yellow>${this.metas.name || 'process'}</yellow> <cyan>${this.metas.id}</cyan> execution has finished <green>successfully</green> in <yellow>${convert_1.default((_a = this.currentExecutionObj) === null || _a === void 0 ? void 0 : _a.duration, convert_1.default.SECOND)}s</yellow>`
                        });
                    }
                    // this.emit('notification', {
                    //   type: 'success',
                    //   title: `${this.metas.id} success`
                    // });
                    break;
                case 'running':
                    if (this.processSettings.decorators === true) {
                        // log a start message
                        this.log({
                            type: 'heading',
                            value: `Starting the <yellow>${this.metas.name || 'process'}</yellow> <cyan>${this.metas.id}</cyan> execution...`
                        });
                    }
                    // this.emit('notification', {
                    //   type: 'start',
                    //   title: `${this.metas.id} starting`
                    // });
                    break;
                case 'error':
                    if (this.processSettings.decorators === true) {
                        // @ts-ignore
                        data = this.currentExecutionObj.stderr.toString();
                        strArray.push(' ');
                        strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                        strArray.push(`<red>Something went wrong</red> during the <yellow>${this.metas.name || 'process'}</yellow> <cyan>${this.metas.id}</cyan> execution.`);
                        if (this.currentExecutionObj &&
                            this.currentExecutionObj.stderr.length) {
                            strArray.push(`Here's some details:`);
                            strArray.push(data);
                        }
                        strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                        strArray.push(' ');
                        this.log({
                            value: strArray.join('\n')
                        });
                    }
                    // this.emit('notification', {
                    //   type: 'error',
                    //   title: `${this.metas.id} error`
                    // });
                    break;
                case 'killed':
                    if (this.processSettings.decorators === true) {
                        // @ts-ignore
                        data = this.currentExecutionObj.stderr.toString();
                        strArray.push(' ');
                        strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                        strArray.push(`The <yellow>${this.metas.name || 'process'}</yellow> <cyan>${this.metas.id}</cyan> execution has been <red>killed</red>.`);
                        if (this.currentExecutionObj &&
                            this.currentExecutionObj.stderr.length) {
                            strArray.push(`Here's some details:`);
                            strArray.push(data);
                        }
                        strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                        strArray.push(' ');
                        this.log({
                            value: strArray.join('\n')
                        });
                    }
                    // this.emit('notification', {
                    //   type: 'error',
                    //   title: `${this.metas.id} killed`
                    // });
                    break;
            }
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
     * @param       {String}        message           The message you want to log
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
     * @param       {String}        message           The message you want to error
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
        apply: true,
        on: '_settings.process',
        class: SProcessSettingsInterface_1.default
    }
};
exports.default = SProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUEwQjtBQUMxQiw4REFBdUM7QUFFdkMsaUZBQTJEO0FBQzNELHlGQUFtRTtBQUNuRSx1RUFBaUQ7QUFDakQscUZBRTBDO0FBRTFDLDhFQUF3RDtBQUN4RCw0RUFBc0Q7QUFDdEQsd0VBQWtEO0FBQ2xELDRFQUFzRDtBQUN0RCxrRUFBNEM7QUFFNUMsc0VBQWtEO0FBRWxELDJEQUFxQztBQUNyQyxzR0FBZ0Y7QUFDaEYsb0VBQThDO0FBQzlDLG9EQUFrRDtBQUNsRCx3RUFBa0Q7QUErRWxELE1BQU0sUUFBUyxTQUFRLHVCQUFlO0lBZ0pwQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQXNDLEVBQ3RDLFdBQWtDLEVBQUU7UUFFcEMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxPQUFPLEVBQUUsRUFBRTtTQUNaLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQTdJSjs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxTQUFTLENBQUM7UUFFbEI7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQUcsTUFBTSxDQUFDO1FBRWhCOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQTBCLEVBQUUsQ0FBQztRQStHMUMsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdEQsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxLQUFLLFNBQVM7WUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQztRQUU5RCxzQkFBc0I7UUFD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