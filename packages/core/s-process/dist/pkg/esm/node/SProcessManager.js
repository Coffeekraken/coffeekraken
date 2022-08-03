// @ts-nocheck
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SPromise from '@coffeekraken/s-promise';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SProcessManagerProcessWrapper from './SProcessManagerProcessWrapper';
class SProcessManager extends __SEventEmitter {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({
            stdio: 'terminal',
            stdioSettings: {},
            runInParallel: true,
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        _processesStack
         * @type        Record<string, SProcess>
         * @private
         *
         * Store all the processes that this manager has launched
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._processesStack = {};
        /**
         * @name        _processesQueue
         * @type        SProcess[]
         * @private
         *
         * Store all the processed ONLY when runInParallel is false to manage the processed queue
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._processesQueue = {};
        /**
         * @name        _isQueueRunning
         * @type        Boolean
         * @private
         *
         * Store a flag to know if the queue is running
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._isQueueRunning = false;
        // __onProcessExit(() => {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve();
        //         }, 2000);
        //     });
        // });
        // if (this.settings.stdio) {
        //     (async () => {
        //         this._stdio = __SStdio.existingOrNew(
        //             'default',
        //             this,
        //             this.settings.stdio,
        //             this.settings.stdioSettings,
        //         );
        //     })();
        // }
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    attachProcess(id, processInstance, settings) {
        // avoid multiple same processes
        if (this._processesStack[id])
            throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" is already attached to this process manager`);
        const instanceId = this.constructor.name === 'SProcessManager'
            ? `SPM.${id}`
            : `${this.constructor.name}.${id}`;
        const processManagerProcess = new __SProcessManagerProcessWrapper(processInstance, Object.assign({ metas: {
                color: __getColorFor(instanceId, {
                    scope: this.constructor.name,
                }),
                id: instanceId,
            } }, (settings !== null && settings !== void 0 ? settings : {})));
        this._processesStack[id] = processManagerProcess;
    }
    /**
     * @name          detachProcess
     * @type          Function
     *
     * Simple method to detach a process from the manager using his id.
     *
     * @param       {String}      id        The process id to detach
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    detachProcess(id) {
        if (!this._processesStack[id])
            throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" has not being attached to this process manager`);
        this._processesStack[id].detach();
    }
    runQueue() {
        if (this._queuePromise) {
            return this._queuePromise;
        }
        this._queuePromise = new Promise((resolve) => {
            clearTimeout(this._parallelRunTimeout);
            this._parallelRunTimeout = setTimeout(() => {
                __SPromise
                    .queue(this._processesQueue, (processId, promise) => { })
                    .then((results) => {
                    resolve(results);
                    this._queuePromise = undefined;
                });
            });
        });
        return this._queuePromise;
    }
    run(processId, paramsOrStringArgs = {}, settings = {}) {
        if (!this._processesStack[processId])
            throw new Error(`<red>[${this.constructor.name}.run]</red> Sorry but no process exists with the id "<magenta>${processId}</magenta>"`);
        let promise;
        // if don't run in parallel, add this process to the queue
        if (!this.settings.runInParallel) {
            this._processesQueue[processId] = () => {
                return this.pipe(this._processesStack[processId].run(paramsOrStringArgs, settings));
            };
            promise = this.runQueue();
        }
        else {
            // run the process
            promise = this._processesStack[processId].run(paramsOrStringArgs, settings);
            // this.emit('log', {
            //     type: __SLog.TYPE_INFO,
            //     value: `<bgYellow><black> Starting process ${processId} </black></bgYellow><yellow>${'-'.repeat(
            //         process.stdout.columns - 19 - processId.length,
            //     )}</yellow>`,
            // });
            this.pipe(promise, {
                overrideEmitter: true,
            });
        }
        return promise;
    }
}
export default SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUdqRCxPQUFPLGFBQWEsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLCtCQUVOLE1BQU0saUNBQWlDLENBQUM7QUErQnpDLE1BQU0sZUFBZ0IsU0FBUSxlQUFlO0lBc0N6Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNEM7UUFDcEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRSxVQUFVO1lBQ2pCLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF4RE47Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBK0IsRUFBRSxDQUFDO1FBRWpEOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQStCLEVBQUUsQ0FBQztRQUVqRDs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQXdCN0IsMEJBQTBCO1FBQzFCLHdDQUF3QztRQUN4Qyw2QkFBNkI7UUFDN0IseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixVQUFVO1FBQ1YsTUFBTTtRQUVOLDZCQUE2QjtRQUM3QixxQkFBcUI7UUFDckIsZ0RBQWdEO1FBQ2hELHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIsbUNBQW1DO1FBQ25DLDJDQUEyQztRQUMzQyxhQUFhO1FBQ2IsWUFBWTtRQUNaLElBQUk7SUFDUixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGFBQWEsQ0FDVCxFQUFVLEVBQ1YsZUFBMkIsRUFDM0IsUUFB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