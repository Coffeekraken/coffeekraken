"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_stdio_1 = __importDefault(require("@coffeekraken/s-stdio"));
const getColorFor_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/getColorFor"));
const SProcessManagerProcessWrapper_1 = __importDefault(require("./SProcessManagerProcessWrapper"));
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
     * @param       {ISProcessManagerAttachSettings}     [settings={}]       Some settings to configure your added process management like restart, etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    attachProcess(id, processInstance, settings) {
        // avoid multiple same processes
        if (this._processesStack[id])
            throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" is already attached to this process manager`);
        const instanceId = this.constructor.name === 'SProcessManager'
            ? `SPM.${id}`
            : `${this.constructor.name}.${id}`;
        const processManagerProcess = new SProcessManagerProcessWrapper_1.default(processInstance, {
            metas: {
                color: getColorFor_1.default(instanceId, {
                    scope: this.constructor.name
                }),
                id: instanceId
            },
            processManagerProcess: settings !== null && settings !== void 0 ? settings : {}
        });
        // register process for stdio
        if (this._stdio)
            this._stdio.registerSource(processManagerProcess);
        this._processesStack[id] = processManagerProcess;
    }
    /**
     * @name          detachProcess
     * @type          Function
     *
     * Simple method to detach a process from the manager using his id.
     *
     * @param       {String}      id        The process id to detach
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    detachProcess(id) {
        if (!this._processesStack[id])
            throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" has not being attached to this process manager`);
        this._processesStack[id].detach();
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
            exclude: [],
            overrideEmitter: true
        });
        return promise;
    }
}
exports.default = SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9GQUE0RDtBQUM1RCw0RkFBc0U7QUFFdEUsb0VBQTZDO0FBQzdDLG1HQUE2RTtBQUM3RSxvR0FFeUM7QUFnQ3pDLE1BQU0sZUFBZ0IsU0FBUSx5QkFBZTtJQTJCM0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQWdEO1FBQzFELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsY0FBYyxFQUFFO2dCQUNkLEtBQUssRUFBRSxVQUFVO2dCQUNqQixhQUFhLEVBQUUsRUFBRTthQUNsQjtTQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQTlDSjs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBZSxHQUErQixFQUFFLENBQUM7UUFzQy9DLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRTtZQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUN4QixFQUFFLEVBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFDakMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FDMUMsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQTNDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHNCQUFzQjtRQUN4QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFpQ0Q7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGFBQWEsQ0FDWCxFQUFVLEVBQ1YsZUFBMkIsRUFDM0IsUUFBa0Q7UUFFbEQsZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FDYixZQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwrREFBK0QsRUFBRSx5REFBeUQsQ0FDNUosQ0FBQztRQUVKLE1BQU0sVUFBVSxHQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGlCQUFpQjtZQUN6QyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDYixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUN2QyxNQUFNLHFCQUFxQixHQUFHLElBQUksdUNBQStCLENBQy9ELGVBQWUsRUFDZjtZQUNFLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUscUJBQWEsQ0FBQyxVQUFVLEVBQUU7b0JBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7aUJBQzdCLENBQUM7Z0JBQ0YsRUFBRSxFQUFFLFVBQVU7YUFDZjtZQUNELHFCQUFxQixFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUU7U0FDdEMsQ0FDRixDQUFDO1FBRUYsNkJBQTZCO1FBQzdCLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEdBQUcscUJBQXFCLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxhQUFhLENBQUMsRUFBVTtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FDYixZQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwrREFBK0QsRUFBRSw0REFBNEQsQ0FDL0osQ0FBQztRQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsR0FBRyxDQUNELFNBQVMsRUFDVCxrQkFBa0IsR0FBRyxFQUFFLEVBQ3ZCLFdBQXVDLEVBQUU7UUFFekMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksaUVBQWlFLEVBQUUsYUFBYSxDQUMvRyxDQUFDO1FBQ0osbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLE1BQU0sRUFBRTtZQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUNqQixDQUFDLENBQUM7UUFDSCxrQkFBa0I7UUFDbEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQ2pELGtCQUFrQixFQUNsQixRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBQ0Qsa0JBQWUsZUFBZSxDQUFDIn0=