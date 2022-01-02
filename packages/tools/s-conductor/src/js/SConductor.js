// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __SDuration from '@coffeekraken/s-duration';
import __formatDuration from '@coffeekraken/sugar/shared/time/formatDuration';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
export default class SConductor extends __SClass {
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
    constructor(settings = {}) {
        super(__deepMerge({
            conductor: {
                idleInterval: 500,
                logTimeout: 2000,
                log: true,
            },
        }, settings));
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
        this._tasksStack = {};
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
        this._runningTasksStack = {};
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
        this._logTimeout = null;
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
        this._idleInterval = null;
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
        this._startTime = Date.now();
        this._idleInterval = setInterval(() => {
            this._checkIdle();
        }, this.conductorSettings.idleInterval);
    }
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
    static get defaultInstance() {
        if (this._defaultInstance)
            return this._defaultInstance;
        this._defaultInstance = new SConductor();
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
    static when($elm, time, task = null) {
        return this.defaultInstance.when($elm, time, task);
    }
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
    get conductorSettings() {
        return this._settings.conductor;
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
        }
        else if (!this._logTimeout) {
            this._logTimeout = setTimeout(() => {
                console.log('LOG');
                console.log(`[SConductor] The conductor "${this.metas.id}" has been executed tasks during ${__formatDuration(Date.now() -
                    this._startTime -
                    this.conductorSettings.logTimeout)}`);
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
    _executeTask(taskObj) {
        return __awaiter(this, void 0, void 0, function* () {
            // add the task into the running stack
            this._runningTasksStack[taskObj.id] = taskObj;
            // cancel the log timeout
            clearTimeout(this._logTimeout);
            // cancel all watchers
            taskObj.watchers.forEach((watcher) => {
                var _a;
                (_a = watcher.cancel) === null || _a === void 0 ? void 0 : _a.call(watcher);
            });
            // init an SDuration instance
            const duration = new __SDuration();
            // execute the task
            yield taskObj.task();
            // set the duration
            taskObj = Object.assign(Object.assign({ resolved: true }, taskObj), duration.end());
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
        });
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
    when($elm, time, task) {
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            // ensure we work with an array of time(s)
            if (!Array.isArray(time))
                time = time.split(',').map((t) => t.trim());
            // register the task
            const taskObj = {
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
                        taskObj.watchers.push((() => new __SPromise(() => { }))($elm));
                        break;
                }
            });
            // if no times setted, execute directly
            if (!time.length ||
                time.includes('direct') ||
                time.includes('directly')) {
                return this._executeTask(taskObj);
            }
            // listen for at least 1 promise resolved
            yield Promise.race(taskObj.watchers);
            // execute the task
            this._executeTask(taskObj);
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmR1Y3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25kdWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sV0FBaUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RSxPQUFPLGdCQUFnQixNQUFNLGdEQUFnRCxDQUFDO0FBRTlFLE9BQU8sZ0JBQWdCLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxrQkFBa0IsTUFBTSxvREFBb0QsQ0FBQztBQXlEcEYsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQWlJNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUNyQixLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFO2dCQUNQLFlBQVksRUFBRSxHQUFHO2dCQUNqQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsR0FBRyxFQUFFLElBQUk7YUFDWjtTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztRQWpHTjs7Ozs7Ozs7O1dBU0c7UUFDSCxnQkFBVyxHQUF1QyxFQUFFLENBQUM7UUFFckQ7Ozs7Ozs7OztXQVNHO1FBQ0gsdUJBQWtCLEdBQXVDLEVBQUUsQ0FBQztRQWdCNUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFFM0I7Ozs7Ozs7OztXQVNHO1FBQ0gsa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFFN0I7Ozs7Ozs7Ozs7V0FVRztRQUNILGVBQVUsR0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUEwQjVCLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFD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