"use strict";
// @ts-nocheck
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
const completeArgsObject_1 = __importDefault(require("../cli/completeArgsObject"));
const path_1 = __importDefault(require("path"));
const convert_1 = __importDefault(require("../time/convert"));
const wait_1 = __importDefault(require("../time/wait"));
const class_1 = __importDefault(require("../is/class"));
const onProcessExit_1 = __importDefault(require("./onProcessExit"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const node_notifier_1 = __importDefault(require("node-notifier"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const SIpcClient_1 = __importDefault(require("../ipc/SIpcClient"));
const SError_1 = __importDefault(require("../error/SError"));
const buildCommandLine_1 = __importDefault(require("../cli/buildCommandLine"));
const parseArgs_1 = __importDefault(require("../cli/parseArgs"));
const output_1 = __importDefault(require("./output"));
const stack_trace_1 = __importDefault(require("stack-trace"));
const toString_1 = __importDefault(require("../string/toString"));
const spawn_1 = __importDefault(require("./spawn"));
module.exports = class SProcess extends SPromise_1.default {
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
    constructor(settings = {}) {
        super(deepMerge_1.default({
            output: false,
            throw: true,
            runAsChild: false,
            definition: undefined,
            killOnError: true,
            processPath: null,
            notifications: {
                enable: true,
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
            env: Object.assign(Object.assign({}, process.env), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, IS_CHILD_PROCESS: true })
        }, settings));
        this._state = 'idle';
        /**
         * @name      executionsStack
         * @type      Array<Object>
         *
         * This array store each executions informations in separated objects
         * that store the duration, startTime, endTime, state, etc...
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.executionsStack = [];
        /**
         * @name     currentExecutionObj
         * @type      Object
         *
         * Store the current execution object info like startTime, endTime, duration, state, etc...
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.currentExecutionObj = undefined;
        /**
         * @name      definition
         * @type      Object
         *
         * Store the definition comming from the static "interface" property,
         * or by the "settings.definition" property
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.definition = undefined;
        // get the definition from interface or settings
        this.definition =
            settings.definition !== undefined
                ? settings.definition
                : this.constructor.interface !== undefined
                    ? this.constructor.interface.definition
                    : null;
        // handle process exit
        onProcessExit_1.default((state) => __awaiter(this, void 0, void 0, function* () {
            this.state = state;
        }));
        this._processPath = this._settings.processPath;
        for (var callSite of stack_trace_1.default.get()) {
            if (callSite.getFunctionName() === this.constructor.name) {
                this._processPath = callSite.getFileName();
                break;
            }
        }
        if (!this._processPath) {
            throw new SError_1.default(`An SProcess instance MUST have a "<yellow>processPath</yellow>" property either populated automatically if possible, or specified in the "<cyan>settings.processPath</cyan>" property...`);
        }
        if (!this._settings.notifications.start.title) {
            this._settings.notifications.start.title = `${this._settings.name} (${this._settings.id})`;
        }
        if (!this._settings.notifications.success.title) {
            this._settings.notifications.success.title = `${this._settings.name} (${this._settings.id})`;
        }
        if (!this._settings.notifications.error.title) {
            this._settings.notifications.error.title = `${this._settings.name} (${this._settings.id})`;
        }
        if (!this._settings.notifications.kill.title) {
            this._settings.notifications.kill.title = `${this._settings.name} (${this._settings.id})`;
        }
        if (!childProcess_1.default()) {
            if (this._settings.output) {
                if (class_1.default(this._settings.output)) {
                    const outputInstance = new this._settings.output(this, this._settings.initialParams);
                }
                else {
                    const outputSettings = typeof this._settings.output === 'object'
                        ? this._settings.output
                        : {};
                    output_1.default(this, outputSettings);
                }
            }
        }
        // listen for state changes
        this.on('state', (state) => {
            this._onStateChange(state);
        });
    }
    /**
     * @name      id
     * @type      String
     * @get
     *
     * Access the process id (not the same as a node process id)
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get id() {
        return this._settings.id;
    }
    /**
     * @name      name
     * @type      String
     * @get
     *
     * Access the process name (not the same as a node process name)
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get name() {
        return this._settings.name;
    }
    /**
     * @name      params
     * @type      String
     * @get
     *
     * Access the process params
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get params() {
        return this._params;
    }
    /**
     * @name      state
     * @type      String
     *
     * Access the process state like 'idle', 'running', 'kill', 'error', 'success'
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get state() {
        return this._state;
    }
    set state(value) {
        this._setState(value);
    }
    _setState(value) {
        if (['idle', 'running', 'killed', 'error', 'success'].indexOf(value) === -1) {
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
        // trigger an event
        this.trigger('state', value);
        this._state = value;
    }
    /**
     * @name      toObject
     * @type      Function
     *
     * This method allows you to transform this instance into
     * a plain object that you can use whenever you want
     *
     * @return    {Object}      The object version of this instance
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toObject() {
        return {
            state: this.state,
            startTime: this.startTime,
            endTime: this.endTime,
            duration: this.duration,
            stdout: this.stdout,
            stderr: this.stderr,
            value: this.value
        };
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
            settings = deepMerge_1.default(this._settings, settings);
            if (this.currentExecutionObj !== undefined) {
                if (settings.throw === true) {
                    throw `Sorry but you can not execute multiple process of the "<yellow>${settings.name || settings.id || this.constructor.name}</yellow>" SProcess instance...`;
                }
                return;
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
                return this.currentExecutionObj.stdout
                    .map((item) => {
                    return toString_1.default(item);
                })
                    .join('\n');
            };
            this.currentExecutionObj.stderr.toString = () => {
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
                    definition: Object.assign(Object.assign({}, (this.definition || {})), { processPath: {
                            type: 'String'
                        } })
                });
            }
            else if (typeof paramsObj === 'object') {
                paramsObj = completeArgsObject_1.default(paramsObj, {
                    definition: this.definition || {}
                });
            }
            // save current process params
            this._params = Object.assign({}, paramsObj);
            // apply the interface on the params
            if (this.constructor.interface !== undefined) {
                const interfaceRes = this.constructor.interface.apply(this._params, {
                    throwOnError: true
                });
                if (interfaceRes.hasIssues()) {
                    this.log({
                        value: interfaceRes.toString()
                    });
                }
            }
            // update state
            this.state = 'running';
            if (settings.runAsChild && !childProcess_1.default()) {
                // build the command to run depending on the passed command in the constructor and the params
                const commandToRun = buildCommandLine_1.default(`node --enable-source-maps ${path_1.default.resolve(__dirname, '../../cli/sugar.cli.js')} process.runChild [arguments]`, Object.assign(Object.assign({}, paramsObj), { processPath: this._processPath }), {
                    definition: Object.assign(Object.assign({}, (this.definition || {})), { processPath: {
                            type: 'String',
                            required: true
                        } }),
                    alias: false
                }, {});
                // run child process
                this._processPromise = spawn_1.default(commandToRun, [], Object.assign(Object.assign({}, settings), { ipc: true }));
            }
            else {
                // handle ipc connection
                let ipcClient;
                if (childProcess_1.default() && SIpcClient_1.default.hasParentServer()) {
                    console.log('CCCOCOC');
                    ipcClient = yield SIpcClient_1.default.connectToParent();
                    console.log('connected');
                }
                // run the actual process using the "process" method
                this._processPromise = this.process(this._params, settings);
                if (childProcess_1.default() && ipcClient) {
                    console.log('UPC');
                    this._processPromise.on('*', (data, metas) => {
                        console.log('something', metas);
                        // ipcClient.trigger(`child.${metas.stack}`, data);
                    });
                    // __SPromise.pipe(this._processPromise, ipcClient, {
                    //   prefixStack: 'child'
                    // });
                }
            }
            SPromise_1.default.pipe(this._processPromise, this, {
                prefixStack: false
            });
            // listen for "data" and "log" events
            this._processPromise.on('log,child.log', (data, metas) => {
                // console.log('DADAD', data, metas.stack);
                if (this.currentExecutionObj) {
                    this.currentExecutionObj.stdout.push(data);
                }
            });
            // listen for errors
            this._processPromise.on('error,child.error', (data, metas) => {
                if (this.currentExecutionObj) {
                    this.currentExecutionObj.stderr.push(data);
                }
                this.state = 'error';
                if (settings.killOnError) {
                    this.kill(data);
                }
            });
            // updating state when needed
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
                if (metas.stack === 'resolve' || metas.stack === 'close.success')
                    this.state = 'success';
                else if (metas.stack === 'reject' || metas.stack === 'close.error')
                    this.state = 'error';
                else if (metas.stack === 'cancel' || metas.stack === 'close.killed')
                    this.state = 'killed';
                else
                    this.state = 'idle';
            });
            // return the process promise
            return this._processPromise;
        });
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
        if (this.state === 'running')
            this.state = 'killed';
        // cancel the passed promise
        if (this._processPromise && this._processPromise.cancel)
            this._processPromise.cancel(data);
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
        if (state === 'killed' ||
            (state === 'error' && this._settings.killOnError)) {
            this.currentExecutionObj.endTime = Date.now();
            this.currentExecutionObj.duration =
                this.currentExecutionObj.endTime - this.currentExecutionObj.startTime;
        }
        let data;
        const strArray = [];
        if (!childProcess_1.default()) {
            switch (state) {
                case 'success':
                    this.log({
                        value: `\n<green>${'-'.repeat(process.stdout.columns - 4)}</green>\nThe <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution has finished <green>successfully</green> in <yellow>${convert_1.default(this.currentExecutionObj.duration, convert_1.default.SECOND)}s</yellow>\n<green>${'-'.repeat(process.stdout.columns - 4)}</green>\n`
                    });
                    if (this._settings.notifications.enable) {
                        node_notifier_1.default.notify(this._settings.notifications.success);
                    }
                    break;
                case 'running':
                    // log a start message
                    this.log({
                        value: `\n<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>\nStarting the <yellow>${this.name || 'process'}</yellow> <cyan>${this.id}</cyan> execution...\n<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>\n`
                    });
                    if (this._settings.notifications.enable) {
                        node_notifier_1.default.notify(this._settings.notifications.start);
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
                    if (this._settings.notifications.enable) {
                        node_notifier_1.default.notify(this._settings.notifications.cancel);
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
                    if (this._settings.notifications.enable) {
                        node_notifier_1.default.notify(this._settings.notifications.cancel);
                    }
                    break;
            }
        }
        if (state === 'success' ||
            state === 'killed' ||
            (state === 'error' && this._settings.killOnError)) {
            // push the currentExecutionObj into the execution stack
            this.executionsStack.push(Object.assign({}, this.currentExecutionObj));
            // reset the currentExecutionObj
            this.currentExecutionObj = undefined;
        }
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
            this.trigger('log', log);
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
            this.trigger('error', error);
        });
    }
};
//# sourceMappingURL=SProcess.js.map