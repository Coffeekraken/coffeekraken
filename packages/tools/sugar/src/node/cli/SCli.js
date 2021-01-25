"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const class_1 = __importDefault(require("../is/class"));
const buildCommandLine_1 = __importDefault(require("./buildCommandLine"));
const SChildProcessManager_1 = __importDefault(require("../process/SChildProcessManager"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const argsToObject_1 = __importDefault(require("../cli/argsToObject"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const output_1 = __importDefault(require("../process/output"));
const parseArgs_1 = __importDefault(require("../cli/parseArgs"));
const SCliInterface_1 = __importDefault(require("./interface/SCliInterface"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
/**
 * @name                SCli
 * @namespace           sugar.node.cli
 * @implements          SCliInterface
 * @type                Class
 * @wip
 *
 * This class represent a basic CLI command with his definition object, his command string, etc...
 *
 * @param       {Object}        [settings={}]           An object of settings to configure your SCli instance:
 * - id (constructor.name) {String}: A uniqid for your instance.
 * - name (null) {String}: A name for your SCli instance like "Build SCSS", etc...
 * - includeAllArgs (true) {Boolean}: Specify if you want to include all arguments when for example you generate the command string, etc...
 * - output (false) {Boolean|Object}: Specify if you want your SCli instance to display automatically a nice output using the SOutput class, or you can specify this to false and handle all of this yourself using the SPromise events emited
 * - defaultParams ({}) {Object}: Specify some defaults for your accepted and described params of the definition object
 * - childProcess: ({}) {Object}: Specify some settings to pass to the SChildProcess instance like "pipe", etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SCli from '@coffeekraken/sugar/js/cli/SCli';
 * class MyCli extends SCli {
 *    static command = 'php %hostname:%port %rootDir %arguments';
 *    static interfaces = {
 *      this: MyCoolSInterface
 *    };
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 * const myCli = new MyCli();
 * myCli.command; // => php localhost:8888 .
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCli extends SPromise_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams = {}, settings = {}) {
        // save the settings
        settings = deepMerge_1.default({
            id: 'SCli',
            name: null,
            includeAllParams: true,
            output: false,
            defaultParams: {},
            processSettings: {},
            childProcessSettings: {
                emitParent: true
            }
        }, settings);
        super(settings);
        /**
         * @name          _runningProcess
         * @type          SPromise
         * @private
         *
         * Store the spawned child process
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._runningProcess = null;
        /**
         * @name        _runningParamsObj
         * @type        Object
         * @private
         *
         * Store the currently running process arguments object
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._runningParamsObj = {};
        if (!this._settings.id)
            this._settings.id = this.constructor.name;
        this._paramsObj = argsToObject_1.default(initialParams, this.interface.definition);
        this._paramsObj = deepMerge_1.default(this._settings.defaultParams, this._paramsObj);
        if (!this._paramsObj.forceChildProcess || !this.command) {
            // run the process
            const SProcessManagerInstance = this.constructor.processClass;
            this._processManagerInstance = new SProcessManagerInstance(this._paramsObj, this._settings.processSettings);
            if (settings.childProcessSettings.emitParent) {
                const stacks = Array.isArray(settings.childProcessSettings.emitParent)
                    ? settings.childProcessSettings.emitParent.join(',')
                    : '*';
                this._processManagerInstance.on(stacks, (value, metas) => {
                    SChildProcessManager_1.default.emitParent(metas.stack, value, metas);
                });
            }
        }
        else {
            const childProcessManager = new SChildProcessManager_1.default(this.command, Object.assign({ id: settings.id, definition: this.interface.definition, defaultParams: settings.defaultParams }, settings.childProcessSettings));
            // childProcessManager.on('state', (state) => {
            //   this.state = state;
            // });
            this._processManagerInstance = childProcessManager;
        }
        if (!childProcess_1.default()) {
            if (settings.output) {
                if (class_1.default(settings.output)) {
                    const outputInstance = new settings.output(this._processManagerInstance, this._paramsObj);
                }
                else {
                    const outputSettings = typeof settings.output === 'object' ? settings.output : {};
                    output_1.default(this._processManagerInstance, outputSettings);
                }
            }
        }
        SPromise_1.default.pipe(this._processManagerInstance, this);
    }
    /**
     * @name        parseArgs
     * @type        Function
     * @static
     *
     * This static method take a simple cli configuration string and returns you
     * an object representing each values passed.
     * This methods uses the static definition object of the class to do his job.
     *
     * @param     {String}          cliString         The cli string you want to parse
     * @return    {Object}                            The object of configuration values
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static parseArgs(cliString) {
        return parseArgs_1.default(cliString, {
            definition: this.interface.definition
        });
    }
    /**
     * @name        command
     * @type        String
     * @get
     *
     * Access the command string
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get command() {
        return this.constructor.command;
    }
    /**
     * @name        interface
     * @type        String
     * @get
     *
     * Access the definition object
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get interface() {
        const int = this.constructor.interface;
        int.definition.forceChildProcess = {
            type: 'Boolean',
            required: true,
            default: true,
            description: 'Allows you to force the SCli class to start a new child process even if the SCli instance already runs inside one'
        };
        return int;
    }
    /**
     * @name        runningParamsObj
     * @type        Object
     * @get
     *
     * Get the current process lauched with "run" or "runWithOutput" methods arguments
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get runningParamsObj() {
        return this._runningParamsObj || {};
    }
    /**
     * @name          run
     * @type          Function
     * @async
     *
     * This method run a new child process with the provided arguments and the definition object.
     * The returned object MUST be an SPromise instance that emit these "events":
     * - start: emited when the command start a process
     * - close: emited when the process is closed
     * - kill: emited when the process has been killed
     * - success: emited when the process has finished without any error
     * - error: emited when the process has had an error
     * - log: emited when some data are pushed in the stdout channel
     *
     * @param       {Object}        [paramsObj={}]      An argument object to override the default values of the definition object
     * @param       {Object}        [settings={}]       Same settings object as in the constructor but for this process only
     * @return      {SPromise}                        An SPromise instance on which you can subscribe for "events" described above
     *
     * @example       js
     * myCli.run({
     *    port: 8888
     * }).on('start', data => {
     *    // do something...
     * });
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(paramsObj = {}, settings = {}) {
        if (this._runningProcess) {
            throw new Error(`You cannot spawn multiple "${this.constructor.name}" process at the same time. Please kill the currently running one using the "kill" method...`);
        }
        settings = deepMerge_1.default(this._settings, settings);
        if (typeof paramsObj === 'string') {
            paramsObj = argsToObject_1.default(paramsObj, this.interface.definition);
        }
        else if (!paramsObj) {
            paramsObj = Object.assign({}, this._paramsObj);
        }
        paramsObj = deepMerge_1.default(Object.assign({}, this._paramsObj || {}), paramsObj);
        if (this._processManagerInstance instanceof SChildProcessManager_1.default) {
            paramsObj.forceChildProcess = false;
        }
        this._runningProcess = this._processManagerInstance.run(paramsObj, settings.processSettings);
        this._runningProcess.on('close', (args) => {
            this._runningProcess = null;
        });
        // this._runningProcess.on('*', (d, v) => {
        // });
        // ${__sugarHeading({
        //   version: __packageJson(__dirname).version
        // })}\n\n
        if (!childProcess_1.default()) {
            const launchingLogObj = {
                temp: true,
                value: `Launching the SCli "<primary>${this._settings.name || this._settings.id}</primary>" process...`
            };
            this._processManagerInstance.emit('log', launchingLogObj);
        }
        // save running process params
        this._runningParamsObj = paramsObj;
        // listen for some events on the process
        this._runningProcess.on('finally', () => {
            this._runningProcess = null;
            this._runningParamsObj = null;
        });
        return this._runningProcess;
    }
    /**
     * @name          toString
     * @type          Function
     *
     * This method allows you to pass an arguments object and return the builded command line string depending on the definition object.
     *
     * @param       {Object}      paramsObj         An argument object to use for the command line string generation
     * @param       {Boolean}     [includeAllParams=settings.includeAllParams]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your paramsObj argument
     * @return      {String}                        The generated command line string
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toString(paramsObj = {}, includeAllParams = this._settings.includeAllParams) {
        return buildCommandLine_1.default(this.command, this.interface.definition, paramsObj, includeAllParams);
    }
    /**
     * @name        isRunning
     * @type        Function
     *
     * This method simply return true or false if the child process is running or not
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    isRunning() {
        return this._runningProcess !== null;
    }
    /**
     * @name          kill
     * @type          Function
     * @async
     *
     * This method simply kill the running child process if their's one, otherwise it will do nothing.
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    kill() {
        if (!this._runningProcess)
            return;
        try {
            this._runningProcess.kill();
        }
        catch (e) { }
    }
}
module.exports = SCliInterface_1.default.implements(SCli);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFJZCx3REFBb0M7QUFFcEMsMEVBQW9EO0FBQ3BELDJGQUFxRTtBQUNyRSxvRUFBOEM7QUFDOUMsdUVBQWlEO0FBQ2pELHNFQUFrRDtBQUNsRCwrREFBeUM7QUFDekMsaUVBQTJDO0FBRzNDLDhFQUF3RDtBQUd4RCxtRUFBNkM7QUFHN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQ0c7QUFDSCxNQUFNLElBQUssU0FBUSxrQkFBVTtJQXVCM0I7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLGFBQWEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0Msb0JBQW9CO1FBQ3BCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLEVBQUUsRUFBRSxNQUFNO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsYUFBYSxFQUFFLEVBQUU7WUFDakIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsb0JBQW9CLEVBQUU7Z0JBQ3BCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQWhEbEI7Ozs7Ozs7O1dBUUc7UUFDSCxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2Qjs7Ozs7Ozs7V0FRRztRQUNILHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQThCckIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBRWxFLElBQUksQ0FBQyxVQUFVLEdBQUcsc0JBQWMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FB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