// @ts-nocheck

import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SPromise from '@coffeekraken/s-promise';
import type { ISStdioSettings } from '@coffeekraken/s-stdio';
import __SStdio from '@coffeekraken/s-stdio';
import { __getColorFor } from '@coffeekraken/sugar/dev';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SProcess from './SProcess';
import __SProcessManagerProcessWrapper, {
    ISProcessManagerProcessWrapperSettings,
} from './SProcessManagerProcessWrapper';

/**
 * @name            SProcessManager
 * @namespace       node
 * @type            Class
 * @extends         SEventEmitter
 * @platform        node
 * @status              beta
 *
 * This class represent a process handler class that will fire up some SProcess processes
 *
 * @param         {Object}          [settings={}]           An object of settings to configure your process instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @see         https://www.npmjs.com/package/node-notifier
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISProcessManagerProcessSettings
    extends ISProcessManagerProcessWrapperSettings {}

export interface ISProcessManagerSettings {
    stdio: __SStdio | string;
    stdioSettings: ISStdioSettings;
    runInParallel: boolean;
}

class SProcessManager extends __SEventEmitter {
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
    _processesStack: Record<string, __SProcess> = {};

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
    _processesQueue: Record<string, __SProcess> = {};

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
    _isQueueRunning: boolean = false;
    _queuePromise: Promise;

    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISProcessManagerSettings>) {
        super(
            __deepMerge(
                {
                    stdio: 'terminal',
                    stdioSettings: {},
                    runInParallel: true,
                },
                settings ?? {},
            ),
        );
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
    attachProcess(
        id: string,
        processInstance: __SProcess,
        settings?: Partial<ISProcessManagerProcessWrapperSettings>,
    ): void {
        // avoid multiple same processes
        if (this._processesStack[id])
            throw new Error(
                `<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" is already attached to this process manager`,
            );

        const instanceId =
            this.constructor.name === 'SProcessManager'
                ? `SPM.${id}`
                : `${this.constructor.name}.${id}`;
        const processManagerProcess = new __SProcessManagerProcessWrapper(
            processInstance,
            {
                metas: {
                    color: __getColorFor(instanceId, {
                        scope: this.constructor.name,
                    }),
                    id: instanceId,
                },
                ...(settings ?? {}),
            },
        );

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
    detachProcess(id: string): void {
        if (!this._processesStack[id])
            throw new Error(
                `<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" has not being attached to this process manager`,
            );
        this._processesStack[id].detach();
    }

    runQueue(): Promise<Promise[]> {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _parallelRunTimeout;
    run(
        processId,
        paramsOrStringArgs = {},
        settings: Partial<ISProcessSettings> = {},
    ) {
        if (!this._processesStack[processId])
            throw new Error(
                `<red>[${this.constructor.name}.run]</red> Sorry but no process exists with the id "<magenta>${processId}</magenta>"`,
            );

        let promise;

        // if don't run in parallel, add this process to the queue
        if (!this.settings.runInParallel) {
            this._processesQueue[processId] = () => {
                return this.pipe(
                    this._processesStack[processId].run(
                        paramsOrStringArgs,
                        settings,
                    ),
                );
            };

            promise = this.runQueue();
        } else {
            // run the process
            promise = this._processesStack[processId].run(
                paramsOrStringArgs,
                settings,
            );

            this.pipe(promise, {
                overrideEmitter: true,
            });
        }

        return promise;
    }
}
export default SProcessManager;
