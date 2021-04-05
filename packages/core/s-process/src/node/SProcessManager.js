"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_stdio_1 = __importDefault(require("@coffeekraken/s-stdio"));
const SProcessManagerProcess_1 = __importDefault(require("./SProcessManagerProcess"));
class SProcessManager extends s_event_emitter_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(deepMerge_1.default({
            processManager: {
                stdio: 'terminal',
                stdioSettings: {}
            }
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        _processesStack
         * @type        Record<string, SProcess>
         * @private
         *
         * Store all the processes that this manager has launched
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._processesStack = {};
        console.log(this.processManagerSettings);
        if (this.processManagerSettings.stdio) {
            this._stdio = s_stdio_1.default.new([], this.processManagerSettings.stdio, this.processManagerSettings.stdioSettings);
        }
    }
    /**
     * @name          processManageSettings
     * @type          ISProcessManageSettings
     * @get
     *
     * Access the process manager process settings
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get processManagerSettings() {
        return this._settings.processManager;
    }
    /**
     * @name        attachProcess
     * @type        Function
     *
     * This method allows you to attach a process to the manager with
     * his proper settings like restart, etc...
     *
     * @param       {String}        id                    A uniquid for your process
     * @param       {SProcess}      processInstance       The actual process instance
     * @param       {ISProcessManagerProcessSettings}     [settings={}]       Some settings to configure your added process management like restart, etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    attachProcess(id, processInstance, settings) {
        // avoid multiple same processes
        if (this._processesStack[id])
            throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" is already attached to this process manager`);
        const processManagerProcess = new SProcessManagerProcess_1.default(processInstance, {
            metas: {
                id
            },
            processManagerProcess: settings
        });
        // register process for stdio
        if (this._stdio)
            this._stdio.registerSource(processManagerProcess);
        this._processesStack[id] = processManagerProcess;
    }
    /**
     * @name      run
     * @type      Function
     * @async
     *
     * Proxy to the ```run``` method on the passed processInstance for the specified process id
     *
     * @param     {String}              processId             The process id you want to run
     * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
     * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
     * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(processId, paramsOrStringArgs = {}, settings = {}) {
        if (!this._processesStack[processId])
            throw new Error(`<red>[${this.constructor.name}.run]</red> Sorry but no process exists with the id "<magenta>${id}</magenta>"`);
        // emit a run event
        this.emit(`${processId}.run`, {
            time: Date.now()
        });
        // run the process
        const promise = this._processesStack[processId].run(paramsOrStringArgs, settings);
        this.pipe(promise, {
            prefixEvent: processId,
            exclude: []
            // overrideEmitter: true
        });
        return promise;
    }
}
exports.default = SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9GQUE0RDtBQUM1RCw0RkFBc0U7QUFFdEUsb0VBQTZDO0FBQzdDLHNGQUVrQztBQTZCbEMsTUFBTSxlQUFnQixTQUFRLHlCQUFlO0lBMkIzQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBZ0Q7UUFDMUQsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxjQUFjLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLGFBQWEsRUFBRSxFQUFFO2FBQ2xCO1NBQ0YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBOUNKOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQStCLEVBQUUsQ0FBQztRQXNDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FDeEIsRUFBRSxFQUNGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQ2pDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQzFDLENBQUM7U0FDSDtJQUNILENBQUM7SUE3Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDeEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBbUNEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxhQUFhLENBQ1gsRUFBVSxFQUNWLGVBQTJCLEVBQzNCLFFBQW1EO1FBRW5ELGdDQUFnQztRQUNoQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQ2IsWUFBWSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksK0RBQStELEVBQUUseURBQXlELENBQzVKLENBQUM7UUFFSixNQUFNLHFCQUFxQixHQUFHLElBQUksZ0NBQXdCLENBQ3hELGVBQWUsRUFDZjtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFO2FBQ0g7WUFDRCxxQkFBcUIsRUFBRSxRQUFRO1NBQ2hDLENBQ0YsQ0FBQztRQUVGLDZCQUE2QjtRQUM3QixJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxHQUFHLHFCQUFxQixDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILEdBQUcsQ0FDRCxTQUFTLEVBQ1Qsa0JBQWtCLEdBQUcsRUFBRSxFQUN2QixXQUF1QyxFQUFFO1FBRXpDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGlFQUFpRSxFQUFFLGFBQWEsQ0FDL0csQ0FBQztRQUNKLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxNQUFNLEVBQUU7WUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsa0JBQWtCO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUNqRCxrQkFBa0IsRUFDbEIsUUFBUSxDQUNULENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixXQUFXLEVBQUUsU0FBUztZQUN0QixPQUFPLEVBQUUsRUFBRTtZQUNYLHdCQUF3QjtTQUN6QixDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFDRCxrQkFBZSxlQUFlLENBQUMifQ==