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
            var _a, _b;
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
            this.config = yield ((_a = this.loadConfig) === null || _a === void 0 ? void 0 : _a.call(this, this.uid));
            // ready
            this.dobby.events.emit('pool.ready', this);
            // loop on each tasks to schedule them
            for (let [taskUid, taskMetas] of Object.entries((_b = this.config.tasks) !== null && _b !== void 0 ? _b : {})) {
                this._initTask(taskMetas);
            }
            // listen for new tasks
            this.events.on('pool.task.add', (taskMetas) => {
                this._initTask(taskMetas);
            });
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
        node_schedule_1.default.scheduleJob(taskMetas.schedule, () => {
            // execute task
            this.executeTask(taskMetas);
        });
    }
    /**
     * Start the scheduler that will execute the tasks when needed
     */
    _startScheduler() { }
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
        return this.config.tasks;
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
            // @ts-ignore
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9EQUFvRDtBQUNwRCxvRUFBNkM7QUFDN0MsdURBQXlEO0FBQ3pELHlEQUE4RDtBQUU5RCxvRkFBNEQ7QUFFNUQsa0VBQTJDO0FBRTNDLDJDQUE2RDtBQWtCN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBcUIsVUFBVyxTQUFRLGlCQUFRO0lBK0M1Qzs7Ozs7Ozs7T0FRRztJQUNILElBQUksR0FBRztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQVlELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxLQUFlLEVBQ2YsU0FBMkIsRUFDM0IsUUFBOEI7UUFFOUIsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQWhFM0M7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQW9CLElBQUkseUJBQWUsRUFBRSxDQUFDO1FBMEJoRDs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBRyxLQUFLLENBQUM7UUFxQmIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FBQyxNQUErQjtRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLE1BQU0sV0FBVyxHQUEyQixpQkFBUSxDQUFDLEtBQUssQ0FDdEQsTUFBTSxFQUNOLGtDQUEwQixDQUM3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