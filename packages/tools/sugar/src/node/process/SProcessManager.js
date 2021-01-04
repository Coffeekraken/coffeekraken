"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const class_1 = __importDefault(require("../is/class"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const SError_1 = __importDefault(require("../error/SError"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
const stdio_1 = __importDefault(require("./stdio"));
/**
 * @name            SProcessManager
 * @namespace       sugar.node.process
 * @type            Class
 * @extends         SPromise
 * @implements      SProcessManagerInterface
 * @wip
 *
 * This class represent a process handler class that will fire up some SProcess processes
 *
 * @param         {Object}          [settings={}]           An object of settings to configure your process instance:
 * - id (processHandler.unnamed) {String}: Specify a unique id for your particular process instance
 * - name (Unnamed Process Handler) {String}: Specify a name for your process instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @see         https://www.npmjs.com/package/node-notifier
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessManager extends SPromise_1.default {
    /**
     * @name            triggerParent
     * @type            Function
     * @static
     *
     * This method allows you to "pipe" some promise from a child process to a his parent process promise
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // static triggerParent(stack, value, metas = {}) {
    //   const trigger = process.env.GLOBAL_SIPC_TRIGGER_ID
    //     ? `${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`
    //     : 'trigger';
    //   __SIpc.trigger(trigger, {
    //     stack,
    //     value,
    //     metas
    //   });
    // }
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(ProcessClass, settings = {}) {
        settings = deepMerge_1.default({
            id: 'SProcessManager',
            name: 'Unnamed Process Manager',
            deamon: null,
            initialParams: {},
            stdio: 'inherit',
            watchProperties: ['watch'],
            autoStart: true,
            autoRun: false,
            throw: false,
            processSettings: {}
        }, settings);
        super(settings);
        /**
         * @name        _processesStack
         * @type        Array<SProcess>
         * @private
         *
         * Store all the processes that this manager has launched
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._processesStack = [];
        /**
         * @name          currentProcess
         * @type          SPromise
         * @private
         *
         * Store the current ```run``` returned promise
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.currentProcess = null;
        if (getExtendsStack_1.default(ProcessClass).indexOf('SProcess') === -1) {
            throw new SError_1.default(`Sorry but the <yellow>SProcessManager</yellow> class can handle only <cyan>SProcess</cyan> based process classes...`);
        }
        this._ProcessClass = ProcessClass;
        if (!childProcess_1.default()) {
            if (this._settings.stdio) {
                if (class_1.default(this._settings.stdio)) {
                    this.stdio = new this._settings.stdio([this], this);
                }
                else if (this._settings.stdio === 'inherit') {
                    this.on('log,*.log,warn,*.warn,error,*.error,reject,*.reject', (data, metas) => {
                        if (!data)
                            return;
                        console.log(__parseHtml(__toString(data.value || data)));
                    });
                }
                else {
                    const outputSettings = typeof this._settings.stdio === 'object'
                        ? this._settings.stdio
                        : {};
                    this.stdio = stdio_1.default([this], outputSettings);
                }
            }
        }
        // start if autoStart
        if (this._settings.autoStart)
            this.start(this._settings);
    }
    /**
     * @name          initialParams
     * @type          Object
     *
     * Store the initial params object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get initialParams() {
        return Object.assign({}, this._settings.initialParams);
    }
    /**
     * @name            deamon
     * @type            SDeamon
     * @get
     *
     * Access the deamon used with this process. If not exist, will return undefined
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get deamon() {
        return this._settings.deamon || undefined;
    }
    /**
     * @name            kill
     * @type            Function
     *
     * This method take care of the things to do when the process
     * has beek killed like update the state, etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    kill() {
        if (this.currentProcess && this.currentProcess.kill) {
            this.currentProcess.kill();
        }
    }
    start(settings = {}) {
        if (this._started)
            return;
        this._started = true;
        settings = deepMerge_1.default(this._settings, settings);
        // deamon
        if (this.deamon)
            this._initDeamon(settings);
        // auto run
        if (settings.autoRun) {
            setTimeout(() => {
                this.run(settings.initialParams, settings);
            });
        }
    }
    /**
     * @name        _initDeamon
     * @type        Function
     * @private
     *
     * This method take care of initialize the passed deamon
     *
     * @param       {Object}      [settings={}]       An object of settings to override the instance one
     *
     * @since       2.0.0
     *
     */
    _initDeamon(settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        this.deamon.on('update,*.update', (data, metas) => {
            // do not launch multiple processes at the same time
            if (this.currentProcess)
                return;
            // check if we have a "deamonUpdate" method
            let params = this.initialParams;
            params = this.deamon.processParams(params, data);
            const updateLog = this.deamon.updateLog(data);
            if (updateLog) {
                this.trigger('log', {
                    clear: true,
                    value: updateLog
                });
            }
            // run the process again
            this.run(params, settings);
            this.trigger('log', {
                clear: !updateLog,
                temp: true,
                value: `Restarting the process "<cyan>${settings.name || settings.id}</cyan>" automatically`
            });
        });
        let watchParam;
        for (let i = 0; i < settings.watchProperties.length; i++) {
            if (this.initialParams[settings.watchProperties[i]] !== undefined) {
                watchParam = settings.watchProperties[i];
                break;
            }
        }
        if (!watchParam) {
            this.trigger('warn', {
                value: `You try to use a "<yellow>${this.deamon.constructor.name}</yellow>" deamon which require at least one of these properties "<cyan>${settings.watchProperties.join(',')}</cyan>" to be available on the process params object...`
            });
        }
        else {
            this.deamon.watch(this.initialParams[watchParam]);
            setTimeout(() => {
                this.state = 'watching';
            });
        }
    }
    /**
     * @name             run
     * @type              Function
     *
     * This method is meant to be overrided by the subclass
     * in order to run the actual process code.
     * Your ```run``` method has to call this one at the end and pass it an SPromise instance that represent your process.
     * This will be usefull to automate some tasks like the duration calculation, updating the state automatically,
     * pipe the events from your process promise to this process class directly, etc...
     *
     * @param         {Object}        params              An object of params to pass to the actual process instance
     * @return        {SProcess}                          The started SProcess instance
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(params = {}, settings = {}) {
        settings = deepMerge_1.default(this._settings, {}, settings);
        params = deepMerge_1.default(this.initialParams, params);
        // check that their's not another processing process
        if (this.currentProcess) {
            if (settings.throw) {
                throw new SError_1.default(`Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`);
            }
            else {
                this.trigger('warn', {
                    value: `Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`
                });
            }
            return;
        }
        this.currentProcess = new this._ProcessClass(Object.assign({}, settings.processSettings));
        SPromise_1.default.pipe(this.currentProcess, this);
        this._processesStack.push(this.currentProcess);
        this.currentProcess.run(params);
        if (this.deamon && this.deamon.state === 'watching') {
            this.currentProcess.log({
                value: this.deamon.logs.paused
            });
        }
        this.currentProcess.on('close,cancel,resolve,reject', (data, metas) => {
            if (this.deamon && this.deamon.state === 'watching') {
                this.currentProcess.log({
                    value: this.deamon.logs.watching
                });
                setTimeout(() => {
                    this.state = 'watching';
                }, 1000);
            }
            this.currentProcess = null;
        });
        return this.currentProcess;
    }
}
module.exports = SProcessManager;
//# sourceMappingURL=SProcessManager.js.map