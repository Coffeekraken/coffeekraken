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
            console.log(this.constructor.name, this.paramsInterface, paramsObj);
            // check if asking for the help
            if (paramsObj.help === true && this.paramsInterface !== undefined) {
                // new __SPromise(({ resolve }) => {
                //   console.log('DDDD');
                const helpString = this.paramsInterface.render();
                console.log(helpString);
                // resolve(helpString);
                // });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUEwQjtBQUMxQiw4REFBd0M7QUFDeEMsd0RBQWtDO0FBRWxDLG9FQUE4QztBQUU5QyxvRUFBOEM7QUFFOUMsc0VBQWtEO0FBRWxELDZEQUF1QztBQUN2QywrRUFBeUQ7QUFFekQsdUVBQWlEO0FBRWpELDJEQUFxQztBQUNyQyw4REFBdUM7QUFFdkMsa0VBQTRDO0FBRTVDLG9EQUE4QjtBQUc5QiwyRUFBcUQ7QUFDckQsc0dBQWdGO0FBRWhGLGtFQUE0QztBQXNGNUMsTUFBTSxRQUFTLFNBQVEsdUJBQWU7SUF5SHBDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBc0MsRUFDdEMsV0FBa0MsRUFBRTtRQUVwQyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLE9BQU8sRUFBRSxFQUFFO1NBQ1osRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBdEhKOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUVsQjs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBRyxNQUFNLENBQUM7UUFFaEI7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBMEIsRUFBRSxDQUFDO1FBd0YxQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV0RCxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssU0FBUztZQUNwRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDO1FBRTlELHNCQUFzQjtRQUN0Qix1QkFBZSxDQUFD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