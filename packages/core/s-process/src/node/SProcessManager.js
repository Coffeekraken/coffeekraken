// @ts-nocheck
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __SProcessManagerProcessWrapper from './SProcessManagerProcessWrapper';
import __SPromise from '@coffeekraken/s-promise';
import __SLog from '@coffeekraken/s-log';
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
                runInParallel: true
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
        /**
         * @name        _processesQueue
         * @type        SProcess[]
         * @private
         *
         * Store all the processed ONLY when runInParallel is false to manage the processed queue
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._isQueueRunning = false;
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
    runQueue() {
        if (this._queuePromise) {
            return this._queuePromise;
        }
        this._queuePromise = new Promise((resolve) => {
            clearTimeout(this._parallelRunTimeout);
            this._parallelRunTimeout = setTimeout(() => {
                __SPromise.queue(this._processesQueue, (processId, promise) => {
                    this.emit('log', {
                        margin: {
                            top: 1,
                            bottom: 1
                        },
                        type: __SLog.TYPE_INFO,
                        value: `<bgYellow><black> Starting process ${processId} </black></bgYellow><yellow>${'-'.repeat(process.stdout.columns - 19 - processId.length)}</yellow>`
                    });
                }).then((results) => {
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
        if (!this.processManagerSettings.runInParallel) {
            this._processesQueue[processId] = () => {
                return this.pipe(this._processesStack[processId].run(paramsOrStringArgs, settings));
            };
            promise = this.runQueue();
        }
        else {
            // run the process
            promise = this._processesStack[processId].run(paramsOrStringArgs, settings);
            this.emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<bgYellow><black> Starting process ${processId} </black></bgYellow><yellow>${'-'.repeat(process.stdout.columns - 19 - processId.length)}</yellow>`
            });
            this.pipe(promise, {
                overrideEmitter: true,
            });
        }
        return promise;
    }
}
export default SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUd0RSxPQUFPLGFBQWEsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLCtCQUVOLE1BQU0saUNBQWlDLENBQUM7QUFFekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFrQ3pDLE1BQU0sZUFBZ0IsU0FBUSxlQUFlO0lBb0R6Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLGNBQWMsRUFBRTtnQkFDWixLQUFLLEVBQUUsVUFBVTtnQkFDakIsYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLGFBQWEsRUFBRSxJQUFJO2FBQ3RCO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXhFTjs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBZSxHQUErQixFQUFFLENBQUM7UUFFakQ7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBK0IsRUFBRSxDQUFDO1FBRWpEOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBd0M3QiwwQkFBMEI7UUFDMUIsd0NBQXdDO1FBQ3hDLDZCQUE2QjtRQUM3Qix5QkFBeUI7UUFDekIsb0JBQW9CO1FBQ3BCLFVBQVU7UUFDVixNQUFNO1FBRU4sMkNBQTJDO1FBQzNDLHFCQUFxQjtRQUNyQixnREFBZ0Q7UUFDaEQseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixpREFBaUQ7UUFDakQseURBQXlEO1FBQ3pELGFBQWE7UUFDYixZQUFZO1FBQ1osSUFB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