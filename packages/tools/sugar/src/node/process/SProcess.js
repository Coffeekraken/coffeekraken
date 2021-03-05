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
const convert_1 = __importDefault(require("../time/convert"));
const wait_1 = __importDefault(require("../time/wait"));
const onProcessExit_1 = __importDefault(require("./onProcessExit"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const SError_1 = __importDefault(require("../error/SError"));
const buildCommandLine_1 = __importDefault(require("../cli/buildCommandLine"));
const argsToObject_1 = __importDefault(require("../cli/argsToObject"));
const stdio_1 = __importDefault(require("../stdio/stdio"));
const stack_trace_1 = __importDefault(require("stack-trace"));
const toString_1 = __importDefault(require("../string/toString"));
const spawn_1 = __importDefault(require("./spawn"));
const SEventEmitter_1 = __importDefault(require("../event/SEventEmitter"));
const SProcessSettingsInterface_1 = __importDefault(require("./interface/SProcessSettingsInterface"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
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
        for (var callSite of stack_trace_1.default.get()) {
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
                    throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.name || this.id || this.constructor.name}</yellow>" SProcess instance...`);
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
            let paramsObj = argsToObject_1.default(paramsOrStringArgs, {
                definition: Object.assign(Object.assign({}, (this.paramsInterface !== undefined
                    ? this.paramsInterface.definition
                    : {})), { processPath: {
                        type: 'String'
                    } })
            });
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
                                process.send({
                                    value,
                                    metas
                                });
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
                            value: `The <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution has finished <green>successfully</green> in <yellow>${convert_1.default((_a = this.currentExecutionObj) === null || _a === void 0 ? void 0 : _a.duration, convert_1.default.SECOND)}s</yellow>`
                        });
                    }
                    // this.emit('notification', {
                    //   type: 'success',
                    //   title: `${this.id} success`
                    // });
                    break;
                case 'running':
                    if (this.processSettings.decorators === true) {
                        // log a start message
                        this.log({
                            type: 'heading',
                            value: `Starting the <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution...`
                        });
                    }
                    // this.emit('notification', {
                    //   type: 'start',
                    //   title: `${this.id} starting`
                    // });
                    break;
                case 'error':
                    if (this.processSettings.decorators === true) {
                        // @ts-ignore
                        data = this.currentExecutionObj.stderr.toString();
                        strArray.push(' ');
                        strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                        strArray.push(`<red>Something went wrong</red> during the <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution.`);
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
                    //   title: `${this.id} error`
                    // });
                    break;
                case 'killed':
                    if (this.processSettings.decorators === true) {
                        // @ts-ignore
                        data = this.currentExecutionObj.stderr.toString();
                        strArray.push(' ');
                        strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                        strArray.push(`The <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution has been <red>killed</red>.`);
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
                    //   title: `${this.id} killed`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUEwQjtBQUMxQiw4REFBd0M7QUFDeEMsd0RBQWtDO0FBRWxDLG9FQUE4QztBQUU5QyxvRUFBOEM7QUFFOUMsc0VBQWtEO0FBRWxELDZEQUF1QztBQUN2QywrRUFBeUQ7QUFFekQsdUVBQWlEO0FBRWpELDJEQUFxQztBQUNyQyw4REFBdUM7QUFFdkMsa0VBQTRDO0FBRTVDLG9EQUE4QjtBQUc5QiwyRUFBcUQ7QUFDckQsc0dBQWdGO0FBRWhGLGtFQUE0QztBQXNGNUMsTUFBTSxRQUFTLFNBQVEsdUJBQWU7SUFnSnBDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBc0MsRUFDdEMsV0FBa0MsRUFBRTtRQUVwQyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLE9BQU8sRUFBRSxFQUFFO1NBQ1osRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBN0lKOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUVsQjs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBRyxNQUFNLENBQUM7UUFFaEI7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBMEIsRUFBRSxDQUFDO1FBK0cxQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV0RCxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssU0FBUztZQUNwRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDO1FBRTlELHNCQUFzQjtRQUN0Qix1QkFBZSxDQUFD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