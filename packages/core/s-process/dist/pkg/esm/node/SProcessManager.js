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
        this._queuePromise = new __SPromise(({ resolve, pipe }) => {
            clearTimeout(this._parallelRunTimeout);
            this._parallelRunTimeout = setTimeout(() => {
                const queuePromise = __SPromise.queue(this._processesQueue);
                queuePromise.then((results) => {
                    resolve(results);
                    this._queuePromise = undefined;
                });
                pipe(queuePromise);
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
            this.pipe(promise, {
                overrideEmitter: true,
            });
        }
        return promise;
    }
}
export default SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUdqRCxPQUFPLGFBQWEsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLCtCQUVOLE1BQU0saUNBQWlDLENBQUM7QUErQnpDLE1BQU0sZUFBZ0IsU0FBUSxlQUFlO0lBc0N6Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNEM7UUFDcEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRSxVQUFVO1lBQ2pCLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF4RE47Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBK0IsRUFBRSxDQUFDO1FBRWpEOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQStCLEVBQUUsQ0FBQztRQUVqRDs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBZSxHQUFZLEtBQUssQ0FBQztJQXVCakMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxhQUFhLENBQ1QsRUFBVSxFQUNWLGVBQTJCLEVBQzNCLFFBQTBEO1FBRTFELGdDQUFnQztRQUNoQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsWUFBWSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksK0RBQStELEVBQUUseURBQXlELENBQzlKLENBQUM7UUFFTixNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxpQkFBaUI7WUFDdkMs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