"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const when_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/when"));
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const SConductorSettingsInterface_1 = __importDefault(require("./interface/SConductorSettingsInterface"));
class SConductor extends s_class_1.default {
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
        super((0, object_1.__deepMerge)(
        // @ts-ignore
        SConductorSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
        }, this.settings.idleInterval);
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
     * @param       {TSConductorTrigger[]}     trigger            The trigger when to execute the task. Can be multiple times and the first reached will be the one used
     * @param       {HTMLElement}       [$elm=null]            The element to watch
     * @param       {Function}           task           The task function to execute
     * @return      {SPromise}                          An SPromise instance resolved when one of the passed time(s) is/are reached
     *
     * @since      2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    static when($elm, trigger, task) {
        return this.defaultInstance.when($elm, trigger, task);
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
            this._defaultInstance.settings = (0, object_1.__deepMerge)(this._defaultInstance.settings, settings);
        }
        this._defaultInstanceSettings = settings;
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
            if (taskObj.triggers.includes('idle')) {
                taskToExecute = taskObj;
                break;
            }
        }
        if (taskToExecute) {
            this._executeTask(taskToExecute);
        }
        else if (!this._logTimeout && this.settings.log) {
            this._logTimeout = setTimeout(() => {
                console.log(`[SConductor] The conductor "${this.metas.id}" has been executed tasks during ${(0, datetime_1.__formatDuration)(Date.now() - this._startTime - this.settings.logTimeout)}`);
            }, this.settings.logTimeout);
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
            const duration = new s_duration_1.default();
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
                }, this.settings.idleTimeout);
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
     * @param       {HTMLElement}       [$elm=null]            The element that has been passed
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
     * @param       {TSConductorTrigger[]}     time            The time to execute the task. Can be multiple times and the first reached will be the one used
     * @param       {HTMLElement}       [$elm=null]            The element to watch. Optional depending on the time listened
     * @param       {Function}           task           The task function to execute
     * @return      {SPromise}                          An SPromise instance resolved when one of the passed time(s) is/are reached
     *
     * @since      2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    when($elm, trigger, task) {
        return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            // ensure we work with an array of time(s)
            if (!Array.isArray(trigger))
                trigger = trigger.split(',').map((t) => t.trim());
            // register the task
            const taskObj = {
                id: (0, string_1.__uniqid)(),
                registerTime: Date.now(),
                triggers: trigger,
                $elm,
                task,
                watchers: [],
                resolve,
            };
            // adding into tasks stack
            this._tasksStack[taskObj.id] = taskObj;
            // listen for at least 1 promise resolved
            if (trigger !== 'direct' && trigger !== 'directly') {
                yield (0, when_1.default)($elm, trigger, {});
            }
            // execute the task
            this._executeTask(taskObj);
        }));
    }
}
exports.default = SConductor;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUU3QywwRUFBbUQ7QUFDbkQsd0VBQWlEO0FBQ2pELDJEQUFnRTtBQUNoRSxrRkFBOEU7QUFDOUUsdURBQXlEO0FBQ3pELHVEQUFzRDtBQUN0RCwwR0FBb0Y7QUF5RHBGLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQXdKNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxLQUFLLENBQ0QsSUFBQSxvQkFBVztRQUNQLGFBQWE7UUFDYixxQ0FBNkIsQ0FBQyxRQUFRLEVBQUUsRUFDeEMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUE5RU47Ozs7Ozs7OztXQVNHO1FBQ0gsZ0JBQVcsR0FBdUMsRUFBRSxDQUFDO1FBRXJEOzs7Ozs7Ozs7V0FTRztRQUNILHVCQUFrQixHQUF1QyxFQUFFLENBQUM7UUFFNUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFFM0I7Ozs7Ozs7OztXQVNHO1FBQ0gsa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFFN0I7Ozs7Ozs7Ozs7V0FVRztRQUNILGVBQVUsR0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFxQjVCLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQW5KRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLGVBQWU7UUFDdEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCO1lBQUUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDeEQsSUFB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