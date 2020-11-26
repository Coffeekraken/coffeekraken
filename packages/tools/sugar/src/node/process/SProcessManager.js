"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const argsToObject_1 = __importDefault(require("../cli/argsToObject"));
const class_1 = __importDefault(require("../is/class"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const SProcessManagerInterface_1 = __importDefault(require("./interface/SProcessManagerInterface"));
const SError_1 = __importDefault(require("../error/SError"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SIpc_1 = __importDefault(require("../ipc/SIpc"));
const getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
const output_1 = __importDefault(require("./output"));
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
            output: {},
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
        this._settings.initialParams = argsToObject_1.default(this._settings.initialParams, {
            definition: ProcessClass.interface.definition
        });
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
        // start if autoStart
        if (settings.autoStart)
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
        return this._settings.initialParams;
    }
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
    static triggerParent(stack, value, metas = {}) {
        const trigger = process.env.GLOBAL_SIPC_TRIGGER_ID
            ? `${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`
            : 'trigger';
        SIpc_1.default.trigger(trigger, {
            stack,
            value,
            metas
        });
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
            let params = Object.assign({}, this.initialParams);
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
        params = deepMerge_1.default(Object.assign(settings.initialParams), params);
        // check that their's not another processing process
        if (this.currentProcess) {
            if (settings.throw) {
                throw new SError_1.default(`Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`);
            }
            else {
                this.trigger('log', {
                    error: true,
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
module.exports = SProcessManagerInterface_1.default.implements(SProcessManager, [
    SProcessManagerInterface_1.default
]);
