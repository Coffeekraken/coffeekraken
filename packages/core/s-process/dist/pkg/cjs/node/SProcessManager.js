"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dev_1 = require("@coffeekraken/sugar/dev");
const object_1 = require("@coffeekraken/sugar/object");
const SProcessManagerProcessWrapper_1 = __importDefault(require("./SProcessManagerProcessWrapper"));
class SProcessManager extends s_event_emitter_1.default {
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
        super((0, object_1.__deepMerge)({
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
        const processManagerProcess = new SProcessManagerProcessWrapper_1.default(processInstance, Object.assign({ metas: {
                color: (0, dev_1.__getColorFor)(instanceId, {
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
        this._queuePromise = new s_promise_1.default(({ resolve, pipe }) => {
            clearTimeout(this._parallelRunTimeout);
            this._parallelRunTimeout = setTimeout(() => {
                const queuePromise = s_promise_1.default.queue(this._processesQueue);
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
exports.default = SProcessManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9GQUE0RDtBQUM1RCx3RUFBaUQ7QUFHakQsaURBQXdEO0FBQ3hELHVEQUF5RDtBQUV6RCxvR0FFeUM7QUFnQ3pDLE1BQU0sZUFBZ0IsU0FBUSx5QkFBZTtJQXNDekM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTRDO1FBQ3BELEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxLQUFLLEVBQUUsVUFBVTtZQUNqQixhQUFhLEVBQUUsRUFBRTtZQUNqQixhQUFhLEVBQUUsSUFBSTtTQUN0QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBeEROOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQStCLEVBQUUsQ0FBQztRQUVqRDs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBZSxHQUErQixFQUFFLENBQUM7UUFFakQ7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBWSxLQUFLLENBQUM7SUF1QmpDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsYUFBYSxDQUNULEVBQVUsRUFDVixlQUEyQixFQUMzQixRQUEwRDtRQUUxRCxnQ0FBZ0M7UUFDaEMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUNYLFlBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLCtEQUErRCxFQUFFLHlEQUF5RCxDQUM5SixDQUFDO1FBRU4sTUFBTSxVQUFVLEdBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssaUJBQWlCO1lBQ3ZDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNiLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFD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