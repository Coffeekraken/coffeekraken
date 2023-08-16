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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9EQUFvRDtBQUNwRCxvRUFBNkM7QUFDN0MsdURBQXlEO0FBQ3pELHlEQUE4RDtBQUU5RCxvRkFBNEQ7QUFFNUQsa0VBQTJDO0FBRTNDLDJDQUE2RDtBQWtCN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBcUIsVUFBVyxTQUFRLGlCQUFRO0lBMEQ1Qzs7Ozs7Ozs7T0FRRztJQUNILElBQUksR0FBRztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQVlELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBT0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxLQUFlLEVBQ2YsU0FBMkIsRUFDM0IsUUFBOEI7UUFFOUIsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQWhGM0M7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQW9CLElBQUkseUJBQWUsRUFBRSxDQUFDO1FBRWhEOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFxQyxFQUFFLENBQUM7UUFFN0M7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQXlDLEVBQUUsQ0FBQztRQWVyRDs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBRyxLQUFLLENBQUM7UUFLakI7O1dBRUc7UUFDSyxlQUFVLEdBQXdCLEVBQUUsQ0FBQztRQWtCekMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtB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