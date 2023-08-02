"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
// import __SPromise from '@coffeekraken/s-promise';
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const specs_1 = require("../shared/specs");
/**
 * @name                SDobbyPool
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base pool to save the configuration of the dobby deamon
 *
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @example         js
 * import { __SDobbyPool } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobbyAdapter extends __SDobbyPool {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDobbyPool extends s_class_1.default {
    /**
     * @name        uid
     * @type        String
     *
     * Store the dobby uid
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get uid() {
        return this.metas.uid;
    }
    get started() {
        return this._started;
    }
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(dobby, poolMetas, settings) {
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        events
         * @type        String
         *
         * Store the SEventEmitter instance that will emit events like "ready", etc...
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.events = new s_event_emitter_1.default();
        /**
         * @name        config
         * @type        ISDobbyPoolConfig
         *
         * Store the actual config
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.config = {
            tasks: {},
        };
        /**
         * @name        started
         * @type        Boolean
         *
         * Store if the pool is started or not
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._started = false;
        this.dobby = dobby;
        this.metas = poolMetas;
    }
    /**
     * @name        start
     * @type        Function
     * @async
     *
     * Start the dobby ppol work for the good, the bad and the ugly
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = s_specs_1.default.apply(params, specs_1.SDobbyPoolStartParamsSpecs);
            // pool started
            this._started = true;
            // killing scheduled tasks gracefully
            (0, process_1.__onProcessExit)(() => __awaiter(this, void 0, void 0, function* () {
                console.log(`<red>[SDobby]</red> Gracefully kill the <yellow>${this.uid}</yellow> pool scheduled tasks...`);
                yield node_schedule_1.default.gracefulShutdown();
            }));
            // load the configs of all the pools
            this.config = yield this.loadConfig(this.uid);
            // ready
            this.dobby.events.emit('pool.ready', this);
            // start the scheduler
            this._startScheduler();
            // resolve
            resolve();
        }));
    }
    /**
     * Enqueue a task
     */
    _enqueueTask(taskMetas) {
        node_schedule_1.default.scheduleJob(taskMetas.schedule, () => {
            // execute task
            this.executeTask(taskMetas);
        });
    }
    /**
     * Start the scheduler that will execute the tasks when needed
     */
    _startScheduler() {
        var _a;
        // loop on each tasks to schedule them
        for (let [taskUid, taskMetas] of Object.entries((_a = this.config.tasks) !== null && _a !== void 0 ? _a : {})) {
            if (taskMetas.schedule) {
                this._enqueueTask(taskMetas);
            }
        }
    }
    /**
     * Executing a tasks
     */
    executeTask(taskMetasOrUid) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskMetas;
            if (typeof taskMetasOrUid === 'string') {
                taskMetas = this.getTask(taskMetasOrUid);
            }
            else {
                taskMetas = taskMetasOrUid;
            }
            // check the task status to avoid running paused ones
            if (taskMetas.schedule && taskMetas.state !== 'active') {
                return;
            }
            const TaskClass = 
            // @ts-ignore
            this.dobby.constructor.registeredTasks[taskMetas.type];
            // broadcast a start task event
            this.dobby.broadcast({
                type: 'task.start',
                data: {
                    pool: this.metas,
                    task: taskMetas,
                },
            });
            if (!TaskClass) {
                throw new Error(`<red>[SDobby]</red> The task <yellow>${taskMetas.name} (${taskMetas.type})</yellow> is not an available task type...`);
            }
            const task = new TaskClass(taskMetas);
            const taskResult = yield task.run();
            // broadcast a start task event
            this.dobby.broadcast({
                type: 'task.end',
                data: taskResult,
            });
            return taskResult;
        });
    }
    /**
     * @name        getTask
     * @type        Function
     * @async
     *
     * Get a particular task metas from config
     *
     * @param       {String}          taskUid             The task uid to get
     * @return      {ISDobbyTaskMetas}                         The tasks metas
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getTask(uid) {
        return this.config.tasks[uid];
    }
    /**
     * @name        addTask
     * @type        Function
     * @async
     *
     * Add a new task in the queue
     *
     * @param       {ISDobbyTask}          task             The task to add
     * @return      {Promise<void>}                         A promise resolved once the task is added successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    addTask(taskMetas) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // make sure the tasks not already exists
            if ((_a = this.config.tasks) === null || _a === void 0 ? void 0 : _a[taskMetas.uid]) {
                return reject({
                    message: `A task with the uid \`${taskMetas.uid}\` already exists`,
                });
            }
            // add the task in the config
            this.config.tasks[taskMetas.uid] = taskMetas;
            // save the config
            this.saveConfig();
            // enqueue the new task
            this._enqueueTask(taskMetas);
        }));
    }
    /**
     * @name        removeTask
     * @type        Function
     * @async
     *
     * Remove an existing task from the queue
     *
     * @param       {String}          taskUid             The task UID to remove
     * @return      {Promise<void>}                         A promise resolved once the task is added successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    removeTask(taskUid) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () { }));
    }
}
exports.default = SDobbyPool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9EQUFvRDtBQUNwRCxvRUFBNkM7QUFDN0MsdURBQXlEO0FBQ3pELHlEQUE4RDtBQUU5RCxvRkFBNEQ7QUFFNUQsa0VBQTJDO0FBRTNDLDJDQUE2RDtBQWlCN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFxQixVQUFXLFNBQVEsaUJBQVE7SUFpRDVDOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxHQUFHO1FBQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMxQixDQUFDO0lBWUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEtBQWUsRUFDZixTQUEyQixFQUMzQixRQUE4QjtRQUU5QixLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBbEUzQzs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBb0IsSUFBSSx5QkFBZSxFQUFFLENBQUM7UUFFaEQ7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQXNCO1lBQ3hCLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztRQWVGOzs7Ozs7OztXQVFHO1FBQ0gsYUFBUSxHQUFHLEtBQUssQ0FBQztRQXFCYixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsS0FBSyxDQUFDLE1BQStCO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxN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