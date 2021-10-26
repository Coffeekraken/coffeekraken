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
                this._stdio = __SStdio.existingOrNew('default', this, this.processManagerSettings.stdio, this.processManagerSettings.stdioSettings);
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
        // console.log(processId, this._processesStack[processId]);
        // promise.then((res) => {
        //     console.log('___SS', res);
        // });
        return promise;
    }
}
export default SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLFFBQTZCLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxhQUFhLE1BQU0sa0RBQWtELENBQUM7QUFDN0UsT0FBTywrQkFFTixNQUFNLGlDQUFpQyxDQUFDO0FBaUN6QyxNQUFNLGVBQWdCLFNBQVEsZUFBZTtJQTJCekM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQWdEO1FBQ3hELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLGFBQWEsRUFBRSxFQUFFO2FBQ3BCO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTlDTjs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBZSxHQUErQixFQUFFLENBQUM7UUFzQzdDLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRTtZQUNuQyxDQUFDLEdBQVMsRUFBRTtnQkFDUixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLFNBQVMsRUFDVCxJQUFJLEVBQ0osSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFDakMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FDNUMsQ0FBQztZQUNOLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztTQUNSO0lBQ0wsQ0FBQztJQTlDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHNCQUFzQjtRQUN0QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQ2hELENBQUM7SUFvQ0Q7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