"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildCommandLine_1 = __importDefault(require("./buildCommandLine"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const argsToObject_1 = __importDefault(require("../cli/argsToObject"));
const SClass_1 = __importDefault(require("../class/SClass"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2NsaS9TQ2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQU1kLDBFQUFvRDtBQUNwRCxvRUFBOEM7QUFDOUMsdUVBQWlEO0FBT2pELDZEQUF1QztBQTJDdkMsTUFBTSxJQUFLLFNBQVEsZ0JBQVE7SUEyRHpCOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxhQUFhLEdBQUcsRUFBRSxFQUFFLFFBQWlDO1FBQy9ELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLE1BQU07WUFDVixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLG9CQUFvQixFQUFFLEVBQUU7U0FDekIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQTdFSjs7Ozs7Ozs7V0FRRztRQUNILG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCOzs7Ozs7OztXQVFHO1FBQ0gsc0JBQWlCLEdBQVEsRUFBRSxDQUFDO1FBMkQxQiwwREFBMEQ7UUFDMUQsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUNiLHlGQUF5RixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksMkJBQTJCLENBQzFJLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsc0JBQWMsQ0FDbEMsYUFBYTtRQUNiLGFBQWE7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUExREQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLFNBQVM7UUFDWCxNQUFNLEdBQUc7UUFDUCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQzlELElBQUksQ0FBQyxHQUFHLEVBQUU7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