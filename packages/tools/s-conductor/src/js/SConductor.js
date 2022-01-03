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
    constructor(settings) {
        super(__deepMerge({
            conductor: {
                idleInterval: 500,
                logTimeout: 2000,
                log: false,
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
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
    static when($elm, time, task = null) {
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
    static setup(settings) {
        if (this._defaultInstance) {
            throw new Error(`Sorry but you need to call the "SConductor.setup" method before all other static methods like "when"`);
        }
        this._defaultInstanceSettings = settings;
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
        else if (!this._logTimeout && this.conductorSettings.log) {
            this._logTimeout = setTimeout(() => {
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
SConductor._defaultInstanceSettings = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmR1Y3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25kdWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sV0FBaUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RSxPQUFPLGdCQUFnQixNQUFNLGdEQUFnRCxDQUFDO0FBRTlFLE9BQU8sZ0JBQWdCLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxrQkFBa0IsTUFBTSxvREFBb0QsQ0FBQztBQTZEcEYsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQXFLNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEyQztRQUNuRCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFO2dCQUNQLFlBQVksRUFBRSxHQUFHO2dCQUNqQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsR0FBRyxFQUFFLEtBQUs7YUFDYjtTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFqR047Ozs7Ozs7OztXQVNHO1FBQ0gsZ0JBQVcsR0FBdUMsRUFBRSxDQUFDO1FBRXJEOzs7Ozs7Ozs7V0FTRztRQUNILHVCQUFrQixHQUF1QyxFQUFFLENBQUM7UUFnQjVEOzs7Ozs7Ozs7V0FTRztRQUNILGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBRTNCOzs7Ozs7Ozs7V0FTRztRQUNILGtCQUFhLEdBQVcsSUFBSSxDQUFDO1FBRTdCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxlQUFVLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBMEI1QixJQUFJLENB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