"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const childProcess_1 = __importDefault(require("../is/childProcess"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const SError_1 = __importDefault(require("../error/SError"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
const stdio_1 = __importDefault(require("../stdio/stdio"));
/**
 * @name            SProcessManager
 * @namespace       sugar.node.process
 * @type            Class
 * @extends         SPromise
 * @implements      SProcessManagerInterface
 * @status              wip
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
        if (Object.keys(getExtendsStack_1.default(ProcessClass)).indexOf('SProcess') === -1 &&
            ProcessClass.constructor &&
            ProcessClass.constructor.name !== 'SProcessPipe') {
            throw new SError_1.default(`Sorry but the <yellow>SProcessManager</yellow> class can handle only <cyan>SProcess</cyan> based process classes...`);
        }
        this._ProcessInstanceOrClass = ProcessClass;
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
     * @name        _isSProcessPipeInstance
     * @type        Function
     * @private
     *
     * Return if the passed argument if an instance of the SProcessPipe class
     *
     * @param     {Any}       toCheck       The parameter to check
     * @return    {Boolean}                 true if is an instance of the SProcessPipe class, false if not
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _isSProcessPipeInstance(toCheck) {
        if (toCheck.constructor && toCheck.constructor.name === 'SProcessPipe')
            return true;
        if (Object.keys(getExtendsStack_1.default(toCheck.constructor)).indexOf('SProcessPipe') !== -1)
            return true;
        return false;
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
                this.emit('log', {
                    clear: true,
                    value: updateLog
                });
            }
            // run the process again
            this.run(params, settings);
            this.emit('log', {
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
            this.emit('warn', {
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
        if (!childProcess_1.default() && settings.stdio && !this.stdio) {
            this.stdio = stdio_1.default(this, {
                stdio: settings.stdio
            });
        }
        // check that their's not another processing process
        if (this.currentProcess) {
            if (settings.throw) {
                throw new SError_1.default(`Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`);
            }
            else {
                this.emit('warn', {
                    value: `Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`
                });
            }
            return;
        }
        if (this._isSProcessPipeInstance(this._ProcessInstanceOrClass)) {
            if (!this.currentProcess) {
                this.currentProcess = this._ProcessInstanceOrClass;
                SPromise_1.default.pipe(this.currentProcess, this);
            }
        }
        else {
            this.currentProcess = new this._ProcessInstanceOrClass(Object.assign({}, settings.processSettings));
            SPromise_1.default.pipe(this.currentProcess, this);
        }
        const processPromise = this.currentProcess.run(params, {
            stdio: false
        });
        this._processesStack.push(processPromise);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBS2Qsc0VBQWtEO0FBRWxELG1FQUE2QztBQUU3Qyw2REFBdUM7QUFDdkMsb0VBQThDO0FBQzlDLCtFQUF5RDtBQUN6RCwyREFBcUM7QUFNckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sZUFBZ0IsU0FBUSxrQkFBVTtJQXNDdEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFlBQVksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNyQyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxFQUFFLEVBQUUsaUJBQWlCO1lBQ3JCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsTUFBTSxFQUFFLElBQUk7WUFDWixhQUFhLEVBQUUsRUFBRTtZQUNqQixLQUFLLEVBQUUsU0FBUztZQUNoQixlQUFlLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDMUIsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osZUFBZSxFQUFFLEVBQUU7U0FDcEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQTlEbEI7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFlckI7Ozs7Ozs7OztXQVNHO1FBQ0gsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUE2QnBCLElBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkUsWUFBWSxDQUFDLFdBQVc7WUFDeEIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUNoRDtZQUNBLE1BQU0sSUFBSSxnQkFBUSxD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