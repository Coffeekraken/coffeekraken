// @ts-nocheck
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
            this._stdio = __SStdio.new([], this.processManagerSettings.stdio, this.processManagerSettings.stdioSettings);
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
        const processManagerProcess = new __SProcessManagerProcessWrapper(processInstance, {
            metas: {
                color: __getColorFor(instanceId, {
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
export default SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGFBQWEsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLCtCQUVOLE1BQU0saUNBQWlDLENBQUM7QUFnQ3pDLE1BQU0sZUFBZ0IsU0FBUSxlQUFlO0lBMkIzQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBZ0Q7UUFDMUQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLGNBQWMsRUFBRTtnQkFDZCxLQUFLLEVBQUUsVUFBVTtnQkFDakIsYUFBYSxFQUFFLEVBQUU7YUFDbEI7U0FDRixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUE5Q0o7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBK0IsRUFBRSxDQUFDO1FBc0MvQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUN4QixFQUFFLEVBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFDakMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FDMUMsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQTNDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHNCQUFzQjtRQUN4QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFpQ0Q7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGFBQWEsQ0FDWCxFQUFVLEVBQ1YsZUFBMkIsRUFDM0IsUUFBa0Q7UUFFbEQsZ0NBQWdD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