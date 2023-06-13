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
const dom_1 = __importDefault(require("@coffeekraken/sugar/dom"));
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const SConductorSettingsInterface_1 = __importDefault(require("./interface/SConductorSettingsInterface"));
class SConductor extends s_class_1.default {
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
                yield (0, dom_1.default)($elm, trigger, {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUU3QywwRUFBbUQ7QUFDbkQsd0VBQWlEO0FBQ2pELDJEQUFnRTtBQUNoRSxrRUFBK0Q7QUFDL0QsdURBQXlEO0FBQ3pELHVEQUFzRDtBQUN0RCwwR0FBb0Y7QUF5RHBGLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQTJCNUM7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxlQUFlO1FBQ3RCLElBQUksSUFBSSxDQUFDLGdCQUFnQjtZQUFFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjtTQUMzQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUNQLElBQWtCLEVBQ2xCLE9BQTZCLEVBQzdCLElBQWU7UUFFZixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFzQztRQUMvQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUEsb0JBQVcsRUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFDOUIsUUFBUSxDQUNYLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLENBQUM7SUFDN0MsQ0FBQztJQStERDs7Ozs7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