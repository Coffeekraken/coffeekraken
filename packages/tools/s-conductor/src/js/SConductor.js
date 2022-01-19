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
import __SConductorSettingsInterface from './interface/SConductorSettingsInterface';
import __whenDomReady from '@coffeekraken/sugar/js/dom/detect/whenDomReady';
import __whenInteract from '@coffeekraken/sugar/js/dom/detect/whenInteract';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import __whenOutOfViewport from '@coffeekraken/sugar/js/dom/detect/whenOutOfViewport';
import __whenStylesheetsReady from '@coffeekraken/sugar/js/dom/detect/whenStylesheetsReady';
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
            conductor: __SConductorSettingsInterface.defaults()
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
     * @param       {ISConductorTimes[]}     time            The time to execute the task. Can be multiple times and the first reached will be the one used
     * @param       {HTMLElement}       [$elm=null]            The element to watch
     * @param       {Function}           task           The task function to execute
     * @return      {SPromise}                          An SPromise instance resolved when one of the passed time(s) is/are reached
     *
     * @since      2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    static when(time, $elm, task) {
        return this.defaultInstance.when(time, $elm, task);
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
     * @name            _elementNeeded
     * @type            Function
     *
     * This method simply check if the element parameter has been passed or not.
     * If not, throw an error
     *
     * @param       {HTMLElement}       [$elm=null]            The element that has been passed
     *
     * @since      2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    _elementNeeded($elm = null, time) {
        if (!$elm) {
            throw new Error(`To use the "${time}" SConductor.when detector, you MUST pass an HTMLElement...`);
        }
    }
    /**
     * @name            when
     * @type            Function
     *
     * This method allows you to register a task to execute at a specific time in the "default" conductor instance.
     *
     * @param       {ISConductorTimes[]}     time            The time to execute the task. Can be multiple times and the first reached will be the one used
     * @param       {HTMLElement}       [$elm=null]            The element to watch. Optional depending on the time listened
     * @param       {Function}           task           The task function to execute
     * @return      {SPromise}                          An SPromise instance resolved when one of the passed time(s) is/are reached
     *
     * @since      2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    when(time, $elm, task) {
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
                        this._elementNeeded($elm, t);
                        taskObj.watchers.push(__whenInViewport($elm));
                        break;
                    case 'nearViewport':
                        this._elementNeeded($elm, t);
                        taskObj.watchers.push(__whenNearViewport($elm));
                        break;
                    case 'outOfViewport':
                        this._elementNeeded($elm, t);
                        taskObj.watchers.push(__whenOutOfViewport($elm));
                        break;
                    case 'interact':
                        this._elementNeeded($elm, t);
                        taskObj.watchers.push(__whenInteract($elm));
                        break;
                    case 'domReady':
                        taskObj.watchers.push(__whenDomReady());
                        break;
                    case 'stylesheetsReady':
                        taskObj.watchers.push(__whenStylesheetsReady($elm ? [$elm] : null));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmR1Y3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25kdWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sV0FBaUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RSxPQUFPLGdCQUFnQixNQUFNLGdEQUFnRCxDQUFDO0FBRTlFLE9BQU8sNkJBQTZCLE1BQU0seUNBQXlDLENBQUM7QUFFcEYsT0FBTyxjQUFjLE1BQU0sZ0RBQWdELENBQUM7QUFDNUUsT0FBTyxjQUFjLE1BQU0sZ0RBQWdELENBQUM7QUFDNUUsT0FBTyxnQkFBZ0IsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLGtCQUFrQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3BGLE9BQU8sbUJBQW1CLE1BQU0scURBQXFELENBQUM7QUFDdEYsT0FBTyxzQkFBc0IsTUFBTSx3REFBd0QsQ0FBQztBQXFFNUYsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQXFLNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEyQztRQUNuRCxLQUFLLENBQUMsV0FBVyxDQUNUO1lBQ0ksU0FBUyxFQUFFLDZCQUE2QixDQUFDLFFBQVEsRUFBRTtTQUN0RCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBNUZOOzs7Ozs7Ozs7V0FTRztRQUNILGdCQUFXLEdBQXVDLEVBQUUsQ0FBQztRQUVyRDs7Ozs7Ozs7O1dBU0c7UUFDSCx1QkFBa0IsR0FBdUMsRUFBRSxDQUFDO1FBZ0I1RDs7Ozs7Ozs7O1dBU0c7UUFDSCxnQkFBVyxHQUFXLElBQUks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