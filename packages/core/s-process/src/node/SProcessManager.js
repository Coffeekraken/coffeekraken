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
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SStdio from '@coffeekraken/s-stdio';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __SProcessManagerProcessWrapper from './SProcessManagerProcessWrapper';
class SProcessManager extends __SEventEmitter {
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
        super(__deepMerge({
            processManager: {
                stdio: 'terminal',
                stdioSettings: {},
            },
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
            (() => __awaiter(this, void 0, void 0, function* () {
                this._stdio = yield __SStdio.existingOrNew('default', this, this.processManagerSettings.stdio, this.processManagerSettings.stdioSettings);
            }))();
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
     * @param       {ISProcessManagerProcessWrapperSettings}     [settings={}]       Some settings to configure your added process management like restart, etc...
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
        const processManagerProcess = new __SProcessManagerProcessWrapper(processInstance, {
            metas: {
                color: __getColorFor(instanceId, {
                    scope: this.constructor.name,
                }),
                id: instanceId,
            },
            processManagerProcess: settings !== null && settings !== void 0 ? settings : {},
        });
        // register process for stdio
        this.pipe(processManagerProcess, {
            // prefixEvent: id,
            exclude: [],
            processor(data, metas) {
                if (metas.event !== 'log')
                    return data;
                data.decorators = true;
                return data;
            },
        });
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
            throw new Error(`<red>[${this.constructor.name}.run]</red> Sorry but no process exists with the id "<magenta>${processId}</magenta>"`);
        // emit a run event
        this.emit(`${processId}.run`, {
            time: Date.now(),
        });
        // run the process
        const promise = this._processesStack[processId].run(paramsOrStringArgs, settings);
        return promise;
    }
}
export default SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLFFBQTZCLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxhQUFhLE1BQU0sa0RBQWtELENBQUM7QUFDN0UsT0FBTywrQkFFTixNQUFNLGlDQUFpQyxDQUFDO0FBaUN6QyxNQUFNLGVBQWdCLFNBQVEsZUFBZTtJQTJCekM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQWdEO1FBQ3hELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLGFBQWEsRUFBRSxFQUFFO2FBQ3BCO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTlDTjs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBZSxHQUErQixFQUFFLENBQUM7UUFzQzdDLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRTtZQUNuQyxDQUFDLEdBQVMsRUFBRTtnQkFDUixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLGFBQWEsQ0FDdEMsU0FBUyxFQUNULElBQUksRUFDSixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUNqQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUM1QyxDQUFDO1lBQ04sQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO1NBQ1I7SUFDTCxDQUFDO0lBOUNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksc0JBQXNCO1FBQ3RCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDaEQsQ0FBQztJ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