// @ts-nocheck
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
        // __onProcessExit(() => {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve();
        //         }, 2000);
        //     });
        // });
        // if (this.processManagerSettings.stdio) {
        //     (async () => {
        //         this._stdio = __SStdio.existingOrNew(
        //             'default',
        //             this,
        //             this.processManagerSettings.stdio,
        //             this.processManagerSettings.stdioSettings,
        //         );
        //     })();
        // }
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
        // run the process
        const promise = this._processesStack[processId].run(paramsOrStringArgs, settings);
        this.pipe(promise, {
            overrideEmitter: true,
        });
        // console.log(processId, this._processesStack[processId]);
        // promise.then((res) => {
        //     console.log('___SS', res);
        // });
        return promise;
    }
}
export default SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUd0RSxPQUFPLGFBQWEsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLCtCQUVOLE1BQU0saUNBQWlDLENBQUM7QUFrQ3pDLE1BQU0sZUFBZ0IsU0FBUSxlQUFlO0lBMkJ6Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLGNBQWMsRUFBRTtnQkFDWixLQUFLLEVBQUUsVUFBVTtnQkFDakIsYUFBYSxFQUFFLEVBQUU7YUFDcEI7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBOUNOOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQStCLEVBQUUsQ0FBQztRQXNDN0MsMEJBQTBCO1FBQzFCLHdDQUF3QztRQUN4Qyw2QkFBNkI7UUFDN0IseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixVQUFVO1FBQ1YsTUFBTTtRQUVOLDJDQUEyQztRQUMzQyxxQkFBcUI7UUFDckIsZ0RBQWdEO1FBQ2hELHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIsaURBQWlEO1FBQ2pELHlEQUF5RDtRQUN6RCxhQUFhO1FBQ2IsWUFBWTtRQUNaLElBQUk7SUFDUixDQUFDO0lBdEREOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksc0JBQXNCO1FBQ3RCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDaEQsQ0FBQztJQTRDRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsYUFBYSxDQUNULEVBQVUsRUFDVixlQUEyQixFQUMzQixRQUEwRDtRQUUxRCxnQ0FBZ0M7UUFDaEMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUNYLFlBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLCtEQUErRCxFQUFFLHlEQUF5RCxDQUM5SixDQUFDO1FBRU4sTUFBTSxVQUFVLEdBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssaUJBQWlCO1lBQ3ZDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNiLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQzNDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSwrQkFBK0IsQ0FDN0QsZUFBZSxFQUNmO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFO29CQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2lCQUMvQixDQUFDO2dCQUNGLEVBQUUsRUFBRSxVQUFVO2FBQ2pCO1lBQ0QscUJBQXFCLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRTtTQUN4QyxDQUNKLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxHQUFHLHFCQUFxQixDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsYUFBYSxDQUFDLEVBQVU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQ1gsWUFBWSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksK0RBQStELEVBQUUsNERBQTRELENBQ2pLLENBQUM7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILEdBQUcsQ0FDQyxTQUFTLEVBQ1Qsa0JBQWtCLEdBQUcsRUFBRSxFQUN2QixXQUF1QyxFQUFFO1FBRXpDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztZQUNoQyxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGlFQUFpRSxTQUFTLGFBQWEsQ0FDeEgsQ0FBQztRQUVOLGtCQUFrQjtRQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FDL0Msa0JBQWtCLEVBQ2xCLFFBQVEsQ0FDWCxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixlQUFlLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUM7UUFFSCwyREFBMkQ7UUFFM0QsMEJBQTBCO1FBQzFCLGlDQUFpQztRQUNqQyxNQUFNO1FBRU4sT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBQ0QsZUFBZSxlQUFlLENBQUMifQ==