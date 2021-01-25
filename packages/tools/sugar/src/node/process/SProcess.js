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
const completeArgsObject_1 = __importDefault(require("../cli/completeArgsObject"));
const path_1 = __importDefault(require("path"));
const convert_1 = __importDefault(require("../time/convert"));
const wait_1 = __importDefault(require("../time/wait"));
const onProcessExit_1 = __importDefault(require("./onProcessExit"));
const node_notifier_1 = __importDefault(require("node-notifier"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const SIpcClient_1 = __importDefault(require("../ipc/SIpcClient"));
const SError_1 = __importDefault(require("../error/SError"));
const buildCommandLine_1 = __importDefault(require("../cli/buildCommandLine"));
const parseArgs_1 = __importDefault(require("../cli/parseArgs"));
const stdio_1 = __importDefault(require("../stdio/stdio"));
const stack_trace_1 = __importDefault(require("stack-trace"));
const toString_1 = __importDefault(require("../string/toString"));
const spawn_1 = __importDefault(require("./spawn"));
const uniqid_1 = __importDefault(require("../string/uniqid"));
const SEventEmitter_1 = __importDefault(require("../event/SEventEmitter"));
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
            process: {
                asyncStart: false,
                stdio: 'inherit',
                decorators: true,
                throw: true,
                exitAtEnd: false,
                runAsChild: false,
                definition: undefined,
                processPath: null,
                notifications: {
                    enable: true,
                    process: {
                        title: null,
                        message: `Notification from process...`,
                        icon: `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_start.png`
                    },
                    start: {
                        title: null,
                        message: `Process is running...`,
                        icon: `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_start.png`
                    },
                    success: {
                        title: null,
                        message: `Process has finish successfully`,
                        icon: `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_success.png`
                    },
                    error: {
                        title: null,
                        message: `Something went wrong...`,
                        icon: `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_error.png`
                    },
                    kill: {
                        title: null,
                        message: `Process killed...`,
                        icon: `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_error.png`
                    }
                },
                env: {}
            }
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
        this._initialParams = initialParams;
        // get the definition from interface or settings
        this.paramsInterface = this.getInterface('params');
        if (this.processSettings.paramsInterface !== undefined)
            this.paramsInterface = this.processSettings.paramsInterface;
        // if ((<any>this.constructor).interface !== undefined) {
        //   // console.log((<any>this.constructor).interface.definition);
        //   this._initialParams = (<any>this.constructor).interface.apply(
        //     this._initialParams,
        //     {
        //       complete: true,
        //       throwOnMissingRequiredProp: true
        //     }
        //   ).value;
        // }
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
        if (!this.processSettings.notifications.start.title) {
            this.processSettings.notifications.start.title = `${this.name} (${this.id})`;
        }
        if (!this.processSettings.notifications.success.title) {
            this.processSettings.notifications.success.title = `${this.name} (${this.id})`;
        }
        if (!this.processSettings.notifications.error.title) {
            this.processSettings.notifications.error.title = `${this.name} (${this.id})`;
        }
        if (!this.processSettings.notifications.kill.title) {
            this.processSettings.notifications.kill.title = `${this.name} (${this.id})`;
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
    /**
     * @name      run
     * @type      Function
     * @async
     *
     * Run the process by calling the ```process``` method implemented on your
     * SProcess class (if exists).
     * Take care of starting timers for duration tracking, etc...
     *
     * @todo      Doc
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(paramsOrStringArgs = {}, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const processSettings = (deepMerge_1.default(this.processSettings, settings));
            if (this.currentExecutionObj !== undefined) {
                if (processSettings.throw === true) {
                    throw `Sorry but you can not execute multiple process of the "<yellow>${this.name || this.id || this.constructor.name}</yellow>" SProcess instance...`;
                }
                return;
            }
            if (!childProcess_1.default() && processSettings.stdio && !this.stdio) {
                this.stdio = stdio_1.default(this, {
                    type: processSettings.stdio
                });
            }
            // init the currentExecution object
            this.currentExecutionObj = {
                startTime: Date.now(),
                endTime: -1,
                duration: -1,
                state: 'idle',
                stdout: [],
                stderr: []
            };
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
            yield wait_1.default(50);
            let paramsObj = paramsOrStringArgs;
            if (typeof paramsObj === 'string') {
                paramsObj = parseArgs_1.default(paramsObj, {
                    definition: Object.assign(Object.assign({}, (this.paramsInterface !== undefined
                        ? this.paramsInterface.definition
                        : {})), { processPath: {
                            type: 'String'
                        } })
                });
            }
            else if (typeof paramsObj === 'object') {
                paramsObj = completeArgsObject_1.default(paramsObj, {
                    definition: this.paramsInterface !== undefined
                        ? this.paramsInterface.definition
                        : {}
                });
            }
            // save current process params
            this._params = Object.assign({}, paramsObj);
            // apply the interface on the params
            // if ((<any>this.constructor).interface !== undefined) {
            //   const interfaceRes = (<any>this.constructor).interface.apply(
            //     this._params,
            //     {
            //       throwOnError: true
            //     }
            //   );
            //   if (interfaceRes.hasIssues()) {
            //     this.log({
            //       value: interfaceRes.toString()
            //     });
            //   }
            // }
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
                this._processPromise = spawn_1.default(commandToRun, [], Object.assign({}, (processSettings.spawnSettings || {})
                // ipc: true
                ));
            }
            else {
                // handle ipc connection
                let ipcClient;
                if (childProcess_1.default() && SIpcClient_1.default.hasParentServer()) {
                    ipcClient = yield SIpcClient_1.default.connectToParent();
                }
                // run the actual process using the "process" method
                this._processPromise = this.process(this._params, settings);
                if (childProcess_1.default() && ipcClient) {
                    this._processPromise &&
                        this._processPromise.on('*', (data, metas) => {
                            ipcClient.emit(metas.event, data);
                        });
                }
            }
            this.pipe(this._processPromise, {
                filter: (value, metas) => {
                    if (metas.event.match(/error$/)) {
                        return false;
                    }
                    return true;
                }
            });
            // listen for notification
            if (this.processSettings.notifications.enable === true &&
                this.processSettings.notifications.process !== undefined) {
                this._processPromise &&
                    this._processPromise.on('notification', (notificationObj, metas) => {
                        let icon = `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_start.png`;
                        let id = notificationObj.id || uniqid_1.default();
                        if (notificationObj.type === 'success')
                            icon = `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_success.png`;
                        else if (notificationObj.type === 'error')
                            icon = `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_error.png`;
                        else if (notificationObj.type === 'warn')
                            icon = `${packageRoot_1.default(__dirname)}/src/data/notifications/ck_start.png`;
                        node_notifier_1.default.notify(Object.assign(Object.assign(Object.assign(Object.assign({}, this.processSettings.notifications.process), { icon }), notificationObj), { id, message: notificationObj.value ||
                                notificationObj.message ||
                                this.processSettings.notifications.process.message }));
                    });
            }
            // listen for "data" and "log" events
            this._processPromise &&
                this._processPromise.on('log,log', (data, metas) => {
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
                    'child.resolve:1',
                    'reject:1',
                    'child.reject:1',
                    'cancel:1',
                    'child.cancel:1',
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
                this._processPromise.on('finally', () => {
                    // @ts-ignore
                    if (this.processSettings.exitAtEnd === true) {
                        process.exit();
                    }
                });
            // return the process promise
            return this._processPromise;
        });
    }
    state(value) {
        if (!value)
            return this._state;
        if (['idle', 'ready', 'running', 'killed', 'error', 'success'].indexOf(value) === -1) {
            throw new SError_1.default(`Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${toString_1.default(value)}</magenta>" of your "<cyan>${this.constructor.name}</cyan>" class can contain only one of these values: ${[
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
        this.emit(`state.${value}`, true);
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
        if (state === 'killed' || state === 'error') {
            this.currentExecutionObj.endTime = Date.now();
            this.currentExecutionObj.duration =
                this.currentExecutionObj.endTime - this.currentExecutionObj.startTime;
        }
        let data;
        const strArray = [];
        if (!childProcess_1.default() &&
            this._settings && // @todo      check why this is causing context problem after 2 or 3 kill run...
            this.processSettings.decorators === true) {
            switch (state) {
                case 'success':
                    this.log({
                        color: 'green',
                        type: 'heading',
                        value: `The <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution has finished <green>successfully</green> in <yellow>${convert_1.default(this.currentExecutionObj.duration, convert_1.default.SECOND)}s</yellow>`
                    });
                    if (this.processSettings.notifications.enable) {
                        node_notifier_1.default.notify(this.processSettings.notifications.success);
                    }
                    break;
                case 'running':
                    // log a start message
                    this.log({
                        type: 'heading',
                        value: `Starting the <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution...`
                    });
                    if (this.processSettings.notifications.enable) {
                        node_notifier_1.default.notify(this.processSettings.notifications.start);
                    }
                    break;
                case 'error':
                    data = this.currentExecutionObj.stderr.toString();
                    strArray.push(' ');
                    strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                    strArray.push(`<red>Something went wrong</red> during the <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution.`);
                    if (this.currentExecutionObj.stderr.length) {
                        strArray.push(`Here's some details:`);
                        strArray.push(data);
                    }
                    strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                    strArray.push(' ');
                    this.log({
                        value: strArray.join('\n')
                    });
                    if (this.processSettings.notifications.enable &&
                        this.processSettings.notifications.cancel) {
                        node_notifier_1.default.notify(this.processSettings.notifications.cancel);
                    }
                    break;
                case 'killed':
                    data = this.currentExecutionObj.stderr.toString();
                    strArray.push(' ');
                    strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                    strArray.push(`The <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution has been <red>killed</red>.`);
                    if (this.currentExecutionObj.stderr.length) {
                        strArray.push(`Here's some details:`);
                        strArray.push(data);
                    }
                    strArray.push(`<red>${'-'.repeat(process.stdout.columns - 4)}</red>`);
                    strArray.push(' ');
                    this.log({
                        value: strArray.join('\n')
                    });
                    if (this.processSettings.notifications.enable &&
                        this.processSettings.notifications.cancel !== undefined) {
                        node_notifier_1.default.notify(this.processSettings.notifications.cancel);
                    }
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
exports.default = SProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG1GQUE2RDtBQUM3RCxnREFBMEI7QUFDMUIsOERBQXdDO0FBQ3hDLHdEQUFrQztBQUVsQyxvRUFBOEM7QUFFOUMsa0VBQXVDO0FBQ3ZDLG9FQUE4QztBQUM5QyxzRUFBZ0Q7QUFDaEQsc0VBQWtEO0FBQ2xELG1FQUE2QztBQUM3Qyw2REFBdUM7QUFDdkMsK0VBQXlEO0FBQ3pELGlFQUEyQztBQUUzQywyREFBcUM7QUFDckMsOERBQXVDO0FBRXZDLGtFQUE0QztBQUU1QyxvREFBOEI7QUFFOUIsOERBQXdDO0FBQ3hDLDJFQUFxRDtBQStHckQsTUFBTSxRQUFTLFNBQVEsdUJBQWU7SUFpSHBDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBc0MsRUFDdEMsV0FBa0MsRUFBRTtRQUVwQyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsS0FBSztnQkFDakIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixLQUFLLEVBQUUsSUFBSTtnQkFDWCxTQUFTLEVBQUUsS0FBSztnQkFDaEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixXQUFXLEVBQUUsSUFBSTtnQkFDakIsYUFBYSxFQUFFO29CQUNiLE1BQU0sRUFBRSxJQUFJO29CQUNaLE9BQU8sRUFBRTt3QkFDUCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxPQUFPLEVBQUUsOEJBQThCO3dCQUN2QyxJQUFJLEVBQUUsR0FBRyxxQkFBYSxDQUNwQixTQUFTLENBQ1Ysc0NBQXNDO3FCQUN4QztvQkFDRCxLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLElBQUk7d0JBQ1gsT0FBTyxFQUFFLHVCQUF1Qjt3QkFDaEMsSUFBSSxFQUFFLEdBQUcscUJBQWEs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