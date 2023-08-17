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
const datetime_1 = require("@coffeekraken/sugar/datetime");
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
         * @name        reporters
         * @type        Record<string, ISDobbyReporterMetas>
         *
         * Store the actual reporters in this pool
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.reporters = {};
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
            // load the tasks of this pool
            // @ts-
            yield this.loadTasks();
            // load the reporters of this pool
            // @ts-ignore
            yield this.loadReporters();
            // ready
            this.dobby.events.emit('pool.ready', this);
            // loop on each tasks to schedule them
            for (let [taskUid, taskMetas] of Object.entries((_a = this.tasks) !== null && _a !== void 0 ? _a : {})) {
                this.addTask(taskMetas);
            }
            // resolve
            resolve();
        }));
    }
    /**
     * Enqueue a task
     */
    _scheduleTask(taskMetas) {
        // update the task state
        this.updateTask(taskMetas.uid, {
            state: 'schedules',
        });
        this._tasksJobs[taskMetas.uid] = node_schedule_1.default.scheduleJob(taskMetas.schedule, () => {
            this.updateTask(taskMetas.uid, {
                state: 'queued',
            });
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
            // update task state
            this.updateTask(taskMetasOrUid, {
                state: 'running',
            });
            yield (0, datetime_1.__wait)(1000);
            // const TaskClass =
            //     // @ts-ignore
            //     this.dobby.constructor.registeredTasks[taskMetas.type];
            // // broadcast a start task event
            // this.dobby.broadcast({
            //     type: 'task.start',
            //     data: {
            //         pool: this.metas,
            //         task: taskMetas,
            //     },
            // });
            // if (!TaskClass) {
            //     throw new Error(
            //         `<red>[SDobby]</red> The task <yellow>${taskMetas.name} (${taskMetas.type})</yellow> is not an available task type...`,
            //     );
            // }
            // const task = new TaskClass(taskMetas);
            // const taskResult = await task.run();
            // broadcast a start task event
            this.dobby.broadcast({
                type: 'task.end',
                data: taskResult,
            });
            // reset the task state
            this.updateTask(taskMetas.uid, {
                state: taskMetas.schedule ? 'scheduled' : 'idle',
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
            if (!this.tasks[taskMetas.uid]) {
                // make sure the tasks not already exists
                // if (this.tasks?.[taskMetas.uid]) {
                //     return reject(<ISDobbyError>{
                //         message: `A task with the uid \`${taskMetas.uid}\` already exists`,
                //     });
                // }
                // add the task in the config
                this.tasks[taskMetas.uid] = taskMetas;
            }
            // enqueue the new task
            if (taskMetas.schedule) {
                this._scheduleTask(taskMetas);
            }
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
    /**
     * @name        addReporter
     * @type        Function
     * @async
     *
     * Add a new reporter in the pool
     *
     * @param       {ISDobbyReporterMetas}          reporter             The reporter to add
     * @return      {Promise<void>}                         A promise resolved once the reporter is added successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    addReporter(reporterMetas) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // make sure the tasks not already exists
            if ((_a = this.reporters) === null || _a === void 0 ? void 0 : _a[reporterMetas.uid]) {
                return reject({
                    message: `A reporter with the uid \`${reporterMetas.uid}\` already exists`,
                });
            }
            // add the task in the config
            this.reporters[reporterMetas.uid] = reporterMetas;
            // dispatch en event
            this.events.emit('pool.reporter.add', reporterMetas);
        }));
    }
    /**
     * @name        removeReporter
     * @type        Function
     * @async
     *
     * Remove an existing tasreporterk from the pool
     *
     * @param       {String}          reporterUid             The reporter UID to remove
     * @return      {Promise<void>}                         A promise resolved once the reporter is removed successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    removeReporter(reporterUid) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // remove the task from the stack
            delete this.reporters[reporterUid];
            // dispatch en event
            this.events.emit('pool.reporter.remove', reporterUid);
            resolve();
        }));
    }
}
exports.default = SDobbyPool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9EQUFvRDtBQUNwRCxvRUFBNkM7QUFDN0MsMkRBQXNEO0FBQ3RELHVEQUF5RDtBQUN6RCx5REFBOEQ7QUFFOUQsb0ZBQTREO0FBRTVELGtFQUEyQztBQUUzQywyQ0FBNkQ7QUFrQjdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQTBENUM7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFZRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQU9EOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFNBQTJCLEVBQzNCLFFBQThCO1FBRTlCLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFoRjNDOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFvQixJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQUVoRDs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBcUMsRUFBRSxDQUFDO1FBRTdDOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUF5QyxFQUFFLENBQUM7UUFlckQ7Ozs7Ozs7O1dBUUc7UUFDSCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBS2pCOztXQUVHO1FBQ0ssZUFBVSxHQUF3QixFQUFFLENBQUM7UUFrQnpDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7Ozs7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