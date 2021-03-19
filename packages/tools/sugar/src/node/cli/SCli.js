"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SClass_1 = __importDefault(require("../../shared/class/SClass"));
const argsToObject_1 = __importDefault(require("../../shared/cli/argsToObject"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const buildCommandLine_1 = __importDefault(require("./buildCommandLine"));
class SCli extends SClass_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams = {}, settings) {
        super(deepMerge_1.default({
            id: 'SCli',
            includeAllParams: true,
            childProcessSettings: {}
        }, settings || {}));
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
        // make sure the SCli based class is correctly implemented
        // @ts-ignore
        if (!this.constructor.command) {
            throw new Error(`You must specify a "<yellow>static command: string;</yellow>" property in your "<cyan>${this.constructor.name}</cyan>" SCli based class`);
        }
        this._initialParams = argsToObject_1.default(initialParams, 
        // @ts-ignore
        this.interface.definition);
    }
    /**
     * @name        interface
     * @type        SInterface
     * @get
     *
     * Access the interface used to format arguments, etc...
     * Take it first from the ```settings.interface``` setting, then check in the
     * static class property called ```interfaces.cli```.
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get interface() {
        const int = 
        // @ts-ignore
        this._settings.interface || this.constructor.interfaces.cli;
        if (!int) {
            throw new Error(`Your "<yellow>SCli</yellow>" based class called "<cyan>${this.constructor.name}</cyan>" does not have any interface specified under the "<magenta>settings.interface</magenta>" setting, or under the static "<magenta>interfaces.cli</magenta>" property.`);
        }
        return int;
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
        // @ts-ignore
        return this.constructor.command;
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
    run(paramsObj = {}, settings) {
        if (this._runningProcess) {
            throw new Error(`You cannot spawn multiple "${this.id}" process at the same time. Please kill the currently running one using the "kill" method...`);
        }
        const set = deepMerge_1.default(this._settings, settings || {});
        if (typeof paramsObj === 'string') {
            paramsObj = argsToObject_1.default(paramsObj, {
                // @ts-ignore
                definition: this.interface.definition
            });
        }
        else if (!paramsObj) {
            paramsObj = Object.assign({}, this._initialParams);
        }
        paramsObj = deepMerge_1.default(Object.assign({}, this._initialParams || {}), paramsObj);
        if (this.process && typeof this.process === 'function') {
            return this.process();
        }
        // build the command line
        const command = this.toString(paramsObj);
        console.log('com', command);
        return;
        // this._runningProcess = __spawn();
        // this._runningProcess.on('close', (args) => {
        //   this._runningProcess = null;
        // });
        // this._runningProcess.on('*', (d, v) => {
        // });
        // ${__sugarHeading({
        //   version: __packageJson(__dirname).version
        // })}\n\n
        // return this._runningProcess;
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
        return buildCommandLine_1.default(this.command, paramsObj, {
            // @ts-ignore
            definition: this.interface.definition,
            includeAllParams
        });
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
    kill() { }
}
exports.default = SCli;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsdUVBQWlEO0FBQ2pELGlGQUEyRDtBQUMzRCw4RUFBd0Q7QUFFeEQsMEVBQW9EO0FBeUNwRCxNQUFNLElBQUssU0FBUSxnQkFBUTtJQTJEekI7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLGFBQWEsR0FBRyxFQUFFLEVBQUUsUUFBaUM7UUFDL0QsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsTUFBTTtZQUNWLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsb0JBQW9CLEVBQUUsRUFBRTtTQUN6QixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBN0VKOzs7Ozs7OztXQVFHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkI7Ozs7Ozs7O1dBUUc7UUFDSCxzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUEyRDFCLDBEQUEwRDtRQUMxRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQ2IseUZBQXlGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwyQkFBMkIsQ0FDMUksQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxzQkFBYyxDQUNsQyxhQUFhO1FBQ2IsYUFBYTtRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUMxQixDQUFDO0lBQ0osQ0FBQztJQTFERDs7Ozs7Ozs7Ozs7T0FXRztJQUNILElBQUksU0FBUztRQUNYLE1BQU0sR0FBRztRQUNQLGFBQWE7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7UUFDOUQsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE1BQU0sSUFBSSxLQUFLLENB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