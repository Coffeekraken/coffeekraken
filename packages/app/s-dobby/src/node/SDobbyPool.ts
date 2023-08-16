import __SClass from '@coffeekraken/s-class';
// import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';

import __SEventEmitter from '@coffeekraken/s-event-emitter';

import __nodeSchedule from 'node-schedule';

import { SDobbyPoolStartParamsSpecs } from '../shared/specs';

import type {
    ISDobbyError,
    ISDobbyPool,
    ISDobbyPoolMetas,
    ISDobbyPoolStartParams,
    ISDobbyReporterMetas,
    ISDobbyTask,
} from '../shared/types';

import type {
    ISDobbyPoolSettings,
    ISDobbyTaskMetas,
    ISDobbyTaskResult,
} from '../shared/types';
import __SDobby from './exports.js';

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

export default class SDobbyPool extends __SClass implements ISDobbyPool {
    settings: ISDobbyPoolSettings;

    /**
     * @name        metas
     * @type        ISDobbyPoolMetas
     *
     * Store the pool metas
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    metas: ISDobbyPoolMetas;

    /**
     * @name        dobby
     * @type        String
     *
     * Store the SDobby instance
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    dobby: __SDobby;

    /**
     * @name        events
     * @type        String
     *
     * Store the SEventEmitter instance that will emit events like "ready", etc...
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    events: __SEventEmitter = new __SEventEmitter();

    /**
     * @name        tasks
     * @type        Record<string, ISDobbyTaskMetas>
     *
     * Store the actual tasks in this pool
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    tasks: Record<string, ISDobbyTaskMetas> = {};

    /**
     * @name        reporters
     * @type        Record<string, ISDobbyReporterMetas>
     *
     * Store the actual reporters in this pool
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    reporters: Record<string, ISDobbyReporterMetas> = {};

    /**
     * @name        uid
     * @type        String
     *
     * Store the dobby uid
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get uid(): string {
        return this.metas.uid;
    }

    /**
     * @name        started
     * @type        Boolean
     *
     * Store if the pool is started or not
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _started = false;
    get started(): boolean {
        return this._started;
    }

    /**
     * Store the tasks "jobs" to be able to cancel them later
     */
    private _tasksJobs: Record<string, any> = {};

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
    constructor(
        dobby: __SDobby,
        poolMetas: ISDobbyPoolMetas,
        settings?: ISDobbyPoolSettings,
    ) {
        super(__deepMerge({}, settings ?? {}));
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
    start(params?: ISDobbyPoolStartParams): Promise<void | ISDobbyError> {
        return new Promise(async (resolve) => {
            const finalParams: ISDobbyPoolStartParams = __SSpecs.apply(
                params,
                SDobbyPoolStartParamsSpecs,
            );

            // pool started
            this._started = true;

            // killing scheduled tasks gracefully
            __onProcessExit(async () => {
                console.log(
                    `<red>[SDobby]</red> Gracefully kill the <yellow>${this.uid}</yellow> pool scheduled tasks...`,
                );
                await __nodeSchedule.gracefulShutdown();
            });

            // load the tasks of this pool
            // @ts-
            await this.loadTasks();

            // load the reporters of this pool
            // @ts-ignore
            await this.loadReporters();

            // ready
            this.dobby.events.emit('pool.ready', this);

            // loop on each tasks to schedule them
            for (let [taskUid, taskMetas] of Object.entries(this.tasks ?? {})) {
                this._initTask(taskMetas);
            }

            // resolve
            resolve();
        });
    }

    /**
     * Init task
     */
    _initTask(taskMetas: ISDobbyTaskMetas): void {
        if (taskMetas.schedule) {
            this._enqueueTask(taskMetas);
        }
    }

    /**
     * Enqueue a task
     */
    _enqueueTask(taskMetas: ISDobbyTaskMetas): void {
        this._tasksJobs[taskMetas.uid] = __nodeSchedule.scheduleJob(
            taskMetas.schedule,
            () => {
                // execute task
                this.executeTask(taskMetas);
            },
        );
    }

    /**
     * Executing a tasks
     */
    async executeTask(
        taskMetasOrUid: String | ISDobbyTaskMetas,
    ): Promise<ISDobbyTaskResult> {
        let taskMetas: ISDobbyTaskMetas;

        if (typeof taskMetasOrUid === 'string') {
            taskMetas = this.getTask(taskMetasOrUid);
        } else {
            taskMetas = <ISDobbyTaskMetas>taskMetasOrUid;
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
            throw new Error(
                `<red>[SDobby]</red> The task <yellow>${taskMetas.name} (${taskMetas.type})</yellow> is not an available task type...`,
            );
        }

        const task = new TaskClass(taskMetas);
        const taskResult = await task.run();

        // broadcast a start task event
        this.dobby.broadcast({
            type: 'task.end',
            data: taskResult,
        });

        return taskResult;
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
    getTasks(): Record<string, ISDobbyTaskMetas> {
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
    getTask(uid: string): ISDobbyTaskMetas {
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
    addTask(taskMetas: ISDobbyTaskMetas): Promise<void | ISDobbyError> {
        return new Promise(async (resolve, reject) => {
            // make sure the tasks not already exists
            if (this.tasks?.[taskMetas.uid]) {
                return reject(<ISDobbyError>{
                    message: `A task with the uid \`${taskMetas.uid}\` already exists`,
                });
            }
            // add the task in the config
            this.tasks[taskMetas.uid] = taskMetas;

            // enqueue the new task
            this._enqueueTask(taskMetas);

            // dispatch en event
            this.events.emit('pool.task.add', taskMetas);
        });
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
    removeTask(taskUid: string): Promise<void> {
        return new Promise(async (resolve) => {
            // remove the task from the stack
            delete this.tasks[taskUid];

            // cancel job if exists
            this._tasksJobs[taskUid]?.cancel?.();

            // dispatch en event
            this.events.emit('pool.task.remove', taskUid);

            resolve();
        });
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
    addReporter(
        reporterMetas: ISDobbyReporterMetas,
    ): Promise<void | ISDobbyError> {
        return new Promise(async (resolve, reject) => {
            // make sure the tasks not already exists
            if (this.reporters?.[reporterMetas.uid]) {
                return reject(<ISDobbyError>{
                    message: `A reporter with the uid \`${reporterMetas.uid}\` already exists`,
                });
            }
            // add the task in the config
            this.reporters[reporterMetas.uid] = reporterMetas;

            // dispatch en event
            this.events.emit('pool.reporter.add', reporterMetas);
        });
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
    removeReporter(reporterUid: string): Promise<void> {
        return new Promise(async (resolve) => {
            // remove the task from the stack
            delete this.reporters[reporterUid];

            // dispatch en event
            this.events.emit('pool.reporter.remove', reporterUid);

            resolve();
        });
    }
}
