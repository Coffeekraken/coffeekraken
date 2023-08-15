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
 * @event           pool.ready          Emitted when the pool is ready
 * @event           pool.task.add           Emitted when a new task is added
 * @event           pool.task.remove        Emitted when a task is removed
 *
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
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
         * @name        tasks
         * @type        Record<string, ISDobbyTaskMetas>
         *
         * Store the actual tasks in this pool
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.tasks = {};
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
        /**
         * Store the tasks "jobs" to be able to cancel them later
         */
        this._tasksJobs = {};
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
            var _a;
            const finalParams = s_specs_1.default.apply(params, specs_1.SDobbyPoolStartParamsSpecs);
            // pool started
            this._started = true;
            // killing scheduled tasks gracefully
            (0, process_1.__onProcessExit)(() => __awaiter(this, void 0, void 0, function* () {
                console.log(`<red>[SDobby]</red> Gracefully kill the <yellow>${this.uid}</yellow> pool scheduled tasks...`);
                yield node_schedule_1.default.gracefulShutdown();
            }));
            // load the configs of all the pools
            // @ts-ignore
            yield this.loadTasks();
            // ready
            this.dobby.events.emit('pool.ready', this);
            // loop on each tasks to schedule them
            for (let [taskUid, taskMetas] of Object.entries((_a = this.tasks) !== null && _a !== void 0 ? _a : {})) {
                this._initTask(taskMetas);
            }
            // resolve
            resolve();
        }));
    }
    /**
     * Init task
     */
    _initTask(taskMetas) {
        if (taskMetas.schedule) {
            this._enqueueTask(taskMetas);
        }
    }
    /**
     * Enqueue a task
     */
    _enqueueTask(taskMetas) {
        this._tasksJobs[taskMetas.uid] = node_schedule_1.default.scheduleJob(taskMetas.schedule, () => {
            // execute task
            this.executeTask(taskMetas);
        });
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
     * @name        getTasks
     * @type        Function
     * @async
     *
     * Get all tasks metas from config
     *
     * @param       {String}          taskUid             The task uid to get
     * @return      {ISDobbyTaskMetas}                         The tasks metas
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getTasks() {
        return this.tasks;
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
        return this.tasks[uid];
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
            if ((_a = this.tasks) === null || _a === void 0 ? void 0 : _a[taskMetas.uid]) {
                return reject({
                    message: `A task with the uid \`${taskMetas.uid}\` already exists`,
                });
            }
            // add the task in the config
            this.tasks[taskMetas.uid] = taskMetas;
            // enqueue the new task
            this._enqueueTask(taskMetas);
            // dispatch en event
            this.events.emit('pool.task.add', taskMetas);
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // remove the task from the stack
            delete this.tasks[taskUid];
            // cancel job if exists
            (_b = (_a = this._tasksJobs[taskUid]) === null || _a === void 0 ? void 0 : _a.cancel) === null || _b === void 0 ? void 0 : _b.call(_a);
            // dispatch en event
            this.events.emit('pool.task.remove', taskUid);
            resolve();
        }));
    }
}
exports.default = SDobbyPool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9EQUFvRDtBQUNwRCxvRUFBNkM7QUFDN0MsdURBQXlEO0FBQ3pELHlEQUE4RDtBQUU5RCxvRkFBNEQ7QUFFNUQsa0VBQTJDO0FBRTNDLDJDQUE2RDtBQWlCN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBcUIsVUFBVyxTQUFRLGlCQUFRO0lBK0M1Qzs7Ozs7Ozs7T0FRRztJQUNILElBQUksR0FBRztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQVlELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBT0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxLQUFlLEVBQ2YsU0FBMkIsRUFDM0IsUUFBOEI7UUFFOUIsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQXJFM0M7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQW9CLElBQUkseUJBQWUsRUFBRSxDQUFDO1FBRWhEOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFxQyxFQUFFLENBQUM7UUFlN0M7Ozs7Ozs7O1dBUUc7UUFDSCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBS2pCOztXQUVHO1FBQ0ssZUFBVSxHQUF3QixFQUFFLENBQUM7UUFrQnpDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLLENBQUMsTUFBK0I7UUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFP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