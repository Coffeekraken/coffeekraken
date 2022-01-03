// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __SDuration, { ISDurationObject } from '@coffeekraken/s-duration';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __formatDuration from '@coffeekraken/sugar/shared/time/formatDuration';

import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';

/**
 * @name                SConductor
 * @namespace           s-duration
 * @type                Class
 * @extends             SClass
 * @status              beta
 *
 * This class represent the conductor for your UI. With it you can register some "task" to execute
 * at a specific time. The "times" available are these ones:
 *
 * - direct: Execute directly the task
 * - directly: Execute directly the task
 * - inViewport: Execute when the element enter the viewport
 * - nearViewport: Execute when the element is near the viewport
 * - idle: Execute when no other task is running
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SConductor from '@coffeekraken/s-duration';
 * const duration = new SConductor();
 * await ...
 * console.log(duration.end());
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISConductorSettings {
    idleTimeout: number;
    logTimeout: number;
    log: boolean;
}

export interface ISConductorCtorSettings {
    conductor: Partial<ISConductorSettings>;
}

export type TSConductorTimes =
    | 'direct'
    | 'directly'
    | 'inViewport'
    | 'nearViewport'
    | 'idle';

export interface ISConductorTaskObj extends ISDurationObject {
    id: string;
    registerTime: number;
    times: TSConductorTimes[];
    $elm: HTMLElement;
    task: function;
    watchers: function[];
    resolve: function;
}

export default class SConductor extends __SClass {
    /**
     * @name            _defaultInstance
     * @type            SConductor
     * @private
     * @static
     *
     * Store the default instance
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    static _defaultInstance: SConductor;

    /**
     * @name            _defaultInstanceSettings
     * @type            Partial<ISConductorSettings>
     * @private
     * @static
     *
     * Store the default instance settings
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    static _defaultInstanceSettings: Partial<ISConductorSettings> = {};

    /**
     * @name            defaultInstance
     * @type            SConductor
     * @static
     * @get
     *
     * Access the default instance of the SConductor class
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    static get defaultInstance(): SConductor {
        if (this._defaultInstance) return this._defaultInstance;
        this._defaultInstance = new SConductor({
            conductor: this._defaultInstanceSettings,
        });
        return this._defaultInstance;
    }

    /**
     * @name            when
     * @type            Function
     * @static
     *
     * This static method allows you to register a task to execute at a specific time in the "default" conductor instance.
     *
     * @param       {HTMLElement}       $elm            The element to watch
     * @param       {TSConductorTimes[]}     time            The time to execute the task. Can be multiple times and the first reached will be the one used
     * @param       {Function}           task           The task function to execute
     * @return      {SPromise}                          An SPromise instance resolved when one of the passed time(s) is/are reached
     *
     * @since      2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    static when(
        $elm: HTMLElement,
        time: TSConductorTimes[],
        task: Function = null,
    ): Promise<ISConductorTaskObj> {
        return this.defaultInstance.when($elm, time, task);
    }

    /**
     * @name            setup
     * @type            Function
     * @static
     *
     * This static method allows you to setup the "default" SConductor instance created when you use the static methods like "when", etc...
     *
     * @param      {Partial<ISConductorSettings>}       settings    The settings to use
     *
     * @since      2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    static setup(settings: Partial<ISConductorSettings>): void {
        if (this._defaultInstance) {
            throw new Error(
                `Sorry but you need to call the "SConductor.setup" method before all other static methods like "when"`,
            );
        }
        this._defaultInstanceSettings = settings;
    }

    /**
     * @name            _tasksStack
     * @type            Record<string, ISConductorTaskObj>
     * @private
     *
     * Store all the tasks to be executed
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    _tasksStack: Record<string, ISConductorTaskObj> = {};

    /**
     * @name            _runningTasksStack
     * @type            Record<string, ISConductorTaskObj>
     * @private
     *
     * Store all the tasks that are running
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    _runningTasksStack: Record<string, ISConductorTaskObj> = {};

    /**
     * @name        conductorSettings
     * @type        ISConductorSettings
     * @get
     *
     * Access the settings of the conductor
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    get conductorSettings(): ISConductorSettings {
        return (this as any)._settings.conductor;
    }

    /**
     * @name        _logTimeout
     * @type        number
     * @private
     *
     * Store the log timeout
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    _logTimeout: number = null;

    /**
     * @name        _idleInterval
     * @type        number
     * @private
     *
     * Store the idle interval
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    _idleInterval: number = null;

    /**
     * @name           _startTime
     * @type            number
     * @private
     *
     * Store the SDuration instance that tells us how much time has passed between the start of the conductor to the log.
     * Note that the log is done after the conductor has been idle for the setted "idleTimeout" setting.
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    _startTime: number = Date.now();

    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings?: Partial<ISConductorCtorSettings>) {
        super(
            __deepMerge(
                {
                    conductor: {
                        idleInterval: 500,
                        logTimeout: 2000,
                        log: false,
                    },
                },
                settings ?? {},
            ),
        );

        this._idleInterval = setInterval(() => {
            this._checkIdle();
        }, this.conductorSettings.idleInterval);
    }

    /**
     * @name        _checkIdle
     * @type       Function
     * @private
     *
     * Check if the conductor is idle (no more tasks to execute) and run the next idle task
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    _checkIdle() {
        if (Object.keys(this._runningTasksStack).length) {
            return;
        }

        let taskToExecute;
        for (let [taskId, taskObj] of Object.entries(this._tasksStack)) {
            if (taskObj.times.includes('idle')) {
                taskToExecute = taskObj;
                break;
            }
        }

        if (taskToExecute) {
            this._executeTask(taskToExecute);
        } else if (!this._logTimeout && this.conductorSettings.log) {
            this._logTimeout = setTimeout(() => {
                console.log(
                    `[SConductor] The conductor "${
                        this.metas.id
                    }" has been executed tasks during ${__formatDuration(
                        Date.now() -
                            this._startTime -
                            this.conductorSettings.logTimeout,
                    )}`,
                );
            }, this.conductorSettings.logTimeout);
        }
    }

    /**
     * @name        _executeTask
     * @type       Function
     * @async
     * @private
     *
     * Build the result object to send back with the promise resolve statement
     *
     * @param       {ISConductorTaskObj}    taskObj    The task object to execute
     * @return      {Promise<ISConductorTaskObj}        A promise resolved with the task object
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    async _executeTask(taskObj: ISConductorTaskObj): ISConductorTaskObj {
        // add the task into the running stack
        this._runningTasksStack[taskObj.id] = taskObj;

        // cancel the log timeout
        clearTimeout(this._logTimeout);

        // cancel all watchers
        taskObj.watchers.forEach((watcher) => {
            watcher.cancel?.();
        });
        // init an SDuration instance
        const duration = new __SDuration();
        // execute the task
        await taskObj.task();
        // set the duration
        taskObj = {
            resolved: true,
            ...taskObj,
            ...duration.end(),
        };

        // remove the task from the running stack
        delete this._tasksStack[taskObj.id];
        delete this._runningTasksStack[taskObj.id];

        // resolve the task
        taskObj.resolve(taskObj);

        // check idle
        clearInterval(this._idleInterval);
        setTimeout(() => {
            this._checkIdle();
            this._idleInterval = setInterval(() => {
                this._checkIdle();
            }, this.conductorSettings.idleTimeout);
        }, 100);

        // return the task object
        return taskObj;
    }

    /**
     * @name            when
     * @type            Function
     *
     * This method allows you to register a task to execute at a specific time in the "default" conductor instance.
     *
     * @param       {HTMLElement}       $elm            The element to watch
     * @param       {TSConductorTimes[]}     time            The time to execute the task. Can be multiple times and the first reached will be the one used
     * @param       {Function}           task           The task function to execute
     * @return      {SPromise}                          An SPromise instance resolved when one of the passed time(s) is/are reached
     *
     * @since      2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    when(
        $elm: HTMLElement,
        time: TSConductorTimes[],
        task: Function,
    ): Promise<ISConductorTaskObj> {
        return new __SPromise(async ({ resolve, reject }) => {
            // ensure we work with an array of time(s)
            if (!Array.isArray(time))
                time = time.split(',').map((t) => t.trim());

            // register the task
            const taskObj: ISConductorTaskObj = {
                id: __uniqid(),
                registerTime: Date.now(),
                times: time,
                $elm,
                task,
                watchers: [],
                resolve,
            };

            // adding into tasks stack
            this._tasksStack[taskObj.id] = taskObj;

            // adding watchers
            time.forEach((t) => {
                switch (t) {
                    case 'inViewport':
                        taskObj.watchers.push(__whenInViewport($elm));
                        break;
                    case 'nearViewport':
                        taskObj.watchers.push(__whenNearViewport($elm));
                        break;
                    case 'idle':
                        taskObj.watchers.push(
                            (() => new __SPromise(() => {}))($elm),
                        );
                        break;
                }
            });

            // if no times setted, execute directly
            if (
                !time.length ||
                time.includes('direct') ||
                time.includes('directly')
            ) {
                return this._executeTask(taskObj);
            }

            // listen for at least 1 promise resolved
            await Promise.race(taskObj.watchers);

            // execute the task
            this._executeTask(taskObj);
        });
    }
}
