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
const SIpc_1 = __importDefault(require("../ipc/SIpc"));
const SError_1 = __importDefault(require("../error/SError"));
const buildCommandLine_1 = __importDefault(require("../cli/buildCommandLine"));
const parseArgs_1 = __importDefault(require("../cli/parseArgs"));
const child_process_1 = __importDefault(require("child_process"));
const output_1 = __importDefault(require("./output"));
const stack_trace_1 = __importDefault(require("stack-trace"));
const toString_1 = __importDefault(require("../string/toString"));
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
                }
            },
            env: Object.assign(Object.assign({}, process.env), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, IS_CHILD_PROCESS: true })
        }, settings));
        this._state = 'idle';
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
        /**
         * @name      duration
         * @type      Number
         * @get
         *
         * Access the process duration when this one is finished
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.duration = -1;
        /**
         * @name      startTime
         * @type      Number
         * @get
         *
         * Access the process startTime when this one has started
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.startTime = Date.now();
        /**
         * @name      endTime
         * @type      Number
         * @get
         *
         * Access the process endTime when this one is finished
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.endTime = -1;
        /**
         * @name      stdout
         * @type      Array<String>
         * @get
         *
         * Access the process stdout stack
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.stdout = [];
        /**
         * @name      stderr
         * @type
         * @get
         *
         * Access the process stderr stack
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.stderr = [];
        /**
         * @name        value
         * @type        Mixed
         *
         * Access the process result value
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.value = null;
        /**
         * @name        isKilling
         * @type        Boolean
         *
         * Tell is the process is in kill state or not
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.isKilling = false;
        // get the definition from interface or settings
        this.definition =
            settings.definition !== undefined
                ? settings.definition
                : this.constructor.interface.definition;
        // if (this.definition === undefined) {
        //   const errorStr = `Sorry but your process "<yellow>${this.constructor.name}</yellow>" does not have any "<cyan>definition</cyan>". You can either specify it by setting an <green>SInterface instance as a static interface property</green> or by setting the "<green>settings.definition</green>" property`;
        //   if (settings.throw === true) {
        //     throw errorStr;
        //   } else {
        //     return new __SError(errorStr);
        //   }
        // }
        // handle process exit
        onProcessExit_1.default(() => {
            this._currentSpawnedProcess !== undefined &&
                this._currentSpawnedProcess.kill();
        });
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
        // add the listeners
        this.on('resolve,reject,cancel', (data, metas) => {
            this.value = data;
            this.endTime = Date.now();
            this.duration = Date.now() - this.startTime;
            if (metas.stack === 'resolve')
                this.state = 'success';
            else if (metas.stack === 'reject')
                this.state = 'error';
            else if (metas.stack === 'cancel')
                this.state = 'killed';
            else
                this.state = 'idle';
            if (this.state === 'success') {
                if (!childProcess_1.default()) {
                    // log a success message
                    this.log({
                        value: `<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>\nThe <yellow>${this.name}</yellow> (<cyan>${this.id}</cyan>) process has finished <green>successfully</green> in <yellow>${convert_1.default(this.duration, convert_1.default.SECOND)}s</yellow>\n<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`
                    });
                    if (this._settings.notifications.enable) {
                        node_notifier_1.default.notify(this._settings.notifications.success);
                    }
                }
            }
            else if (this.state === 'error') {
                if (!childProcess_1.default()) {
                    this.log({
                        value: `<red>${'-'.repeat(process.stdout.columns - 4)}</red>\n<red>Something went wrong</red> during the <yellow>${this.name}</yellow> (<cyan>${this.id}</cyan>) process execution`
                    });
                    if (this._settings.notifications.enable) {
                        node_notifier_1.default.notify(this._settings.notifications.error);
                    }
                }
            }
            return this.toObject();
        });
        if (childProcess_1.default()) {
            this.on('*', (data, metas) => {
                SIpc_1.default.trigger(`${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`, {
                    stack: metas.stack,
                    value: data,
                    metas: Object.assign({ pid: process.pid }, metas)
                });
            });
            return;
        }
        else {
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
     * Access the process state like 'idle', 'running', 'killed', 'error', 'success'
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
     * @name      bindSPromise
     * @type      Function
     *
     * This method allows you to bind a SPromise instance to
     * this proces. That allows the SProcess instance to listen
     * for errors, end of process, etc automatically
     *
     * @param     {SPromise}      promise       An SPromise instance that you want to bind to this process
     * @return    {SProcess}                    Maintain the chainability
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    bindSPromise(promise) {
        if (!(promise instanceof SPromise_1.default)) {
            throw new SError_1.default(`Sorry but the passed promise parameter to the "bindSPromise" method has to be an SPromise instance and you've passed a "${typeof promise}"`);
        }
        this._promise = promise;
        SPromise_1.default.pipe(this._promise, this, {
        // exclude: ['resolve']
        });
        this._promise.on('resolve', (data, metas) => {
            this.resolve(data);
        });
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
            let processPromise;
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
            // log a start message
            if (!childProcess_1.default()) {
                this.log({
                    value: `<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>\nStarting the <yellow>${this.name}</yellow> (<cyan>${this.id}</cyan>) process...\n<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`
                });
            }
            if (settings.notifications.enable) {
                node_notifier_1.default.notify(settings.notifications.start);
            }
            this.trigger(`start`, this.toObject());
            if (settings.runAsChild && !childProcess_1.default()) {
                // build the command to run depending on the passed command in the constructor and the params
                const commandToRun = buildCommandLine_1.default(`node ${path_1.default.resolve(__dirname, '../../cli/sugar.cli.js')} process.runChild [arguments]`, Object.assign(Object.assign({}, paramsObj), { processPath: this._processPath }), {
                    definition: Object.assign(Object.assign({}, (this.definition || {})), { processPath: {
                            type: 'String',
                            required: true
                        } }),
                    alias: false
                }, {});
                if (yield SIpc_1.default.isServer()) {
                    SIpc_1.default.on(`${settings.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`, (data, socket) => {
                        this.trigger(data.stack, data.value, data.metas);
                    });
                }
                // run child process
                processPromise = this.spawn(commandToRun, settings);
            }
            // run the actual process using the "process" method
            processPromise = this.process(this._params, settings);
            // return the process promise
            return processPromise;
        });
    }
    /**
     * @name      spawn
     * @type      Function
     * @async
     *
     * This method take a command to run and some settings
     * and spawn a new process
     *
     * @param       {String}        command         The command to run
     * @param       {ISProcessSettings}       [settings={}]       Some settings to configure your process
     * @return      {SPromise}                      An SPromise instance that will be resolved when the command is finished on in error
     *
     * @since       2.0.0
     *
     */
    spawn(command, settings = {}) {
        return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
            const childProcess = child_process_1.default.spawn(command, [], Object.assign({ env: settings.env, shell: true }, (settings.spawn || {})));
            childProcess.on('close', (code, signal) => {
                if (this.stderr.length) {
                    reject(this.stderr.join('\n'));
                    const error = new SError_1.default(this.stderr.join('\n'));
                    this.error(`<yellow>Child Process</yellow>\n${error.message}`);
                }
                else if (this._isKilling || (!code && signal)) {
                    trigger('killed');
                }
                else if (code === 0 && !signal) {
                    resolve();
                }
                else {
                    reject();
                }
                // reset isKilling boolean
                this._isKilling = false;
            });
            // stdout data
            if (childProcess.stdout) {
                childProcess.stdout.on('data', (data) => {
                    this.log({
                        value: data.toString()
                    });
                });
            }
            // stderr data
            if (childProcess.stderr) {
                childProcess.stderr.on('data', (error) => {
                    this.error({
                        value: error.toString()
                    });
                });
            }
        }));
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
    kill() {
        this.isKilling = true;
        // call the cancel method on the parent SPromise instance
        this.cancel();
        // cancel the passed promise
        if (this._promise && this.promise.cancel)
            this._promise.cancel();
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
            this.stdout.push(log.value || log.toString());
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
            this.stderr.push(error.value || error.toString());
            this.trigger('error', error);
        });
    }
};
