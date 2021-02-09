"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convert_1 = __importDefault(require("./convert"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name 		            STimer
 * @namespace           sugar.js.time
 * @type                  Class
 * @extends               SPromise
 * @status              beta
 *
 * Class that let you create and handle timer with ease.
 * With this class you can set some callback function that will be
 * called each x ms or tell that you want your callbacks to be called
 * a certain number of time during the timer time.
 * This class extends the SPromise one, meaning that you can subscribe to differents "events" emited by the timer instance. Here's the list:
 * - complete: emited when the timer is completed
 * - tick: emited at each ticks depending on your settings
 * - duration: emited when the duration has been changed
 * - tickCount: emited when the tickCount has been changed
 * - reset: emited when the timer has been reseted
 * - start: emited when the timer starts
 * - pause: emited when the timer has been paused
 * - stop: emited when the timer has been stoped
 * - destroy: emited when the timer has been destroyed
 *
 * @param     {Number|String}     duration      The duration of the timer. Can be a Number that will be treated as miliseconds, or a string like "1s", "2m", etc...
 * @param     {Object}            [settings={}]     A settings object to configure your timer more deeply:
 * - tickInterval (1000) {Number}: Specify the interval wanted between each ticks in miliseconds
 * - tickCount (null) {Number}: Specify how many ticks you want during the timer process
 * - loop (false) {Boolean}: Specify if you want the timer to loop or not.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import STimer from '@coffeekraken/sugar/js/time/STimer';
 * const myTimer = new STimer(2000, {
 * 		tickCount : 5
 * })
 * myTimer.on('tick', myTimer => {
 * 		// do something here...
 * })
 * myTimer.start()
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STimer extends SPromise_1.default {
    /**
     * @name          constructor
     * @type          Function
     *
     * Constructor
     *
     * @param 	{number} 	[duration=1000] 		The duration of the timer. Can be a number of milliseconds of a string time like '1s', '2m', etc...
     * @param 	{Object} 	settings 		The settings for the timer
     *
     * @example         js
     * import STimer from '@coffeekraken/sugar/js/time/STimer';
     * const timer = new STimer('2m');
     * timer.onTick(() => {
     *    // do something...
     * });
     * timer.start();
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(duration, settings = {}) {
        super(({ resolve, reject, emit }) => {
            this.duration = duration;
            // calculate the tickInterval
            if (this._settings.tickCount) {
                this._tickCount = this._settings.tickCount;
                this._tickInterval = this._duration / this._tickCount; // remove 1 cause the first tick is always the start time
            }
            else {
                this._tickInterval = convert_1.default(this._settings.tickInterval, 'ms');
            }
        }, deepMerge_1.default({
            id: 'STimer',
            tickInterval: 1000,
            tickCount: null,
            loop: false
        }, settings));
        /**
         * @name          _duration
         * @type          Number
         * @private
         *
         * Store the timer duration wanted
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._duration = 0;
        /**
         * @name        _remaining
         * @type        Number
         * @private
         *
         * Store the remaining time
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._remaining = 0;
        /**
         * @name            _tickCount
         * @type            Number
         * @private
         *
         * How many ticks wanted during the timeout
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._tickCount = null;
        /**
         * @name          _tickInterval
         * @type          Number
         * @private
         *
         * Computed value depending on the settings
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._tickInterval = 1000;
        /**
         * @name          _tickSetTimeout
         * @type          Numbee
         * @private
         *
         * Store the setInterval instance
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._tickSetTimeout = null;
        /**
         * @name            _startTime
         * @type            Date
         * @private
         *
         * Store the time when the timer is started
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._startTime = null;
        /**
         * @name          _tickTime
         * @type          Date
         * @private
         *
         * Store the last tick time
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._tickTime = null;
        /**
         * @name          _pauseTime
         * @type          Date
         * @private
         *
         * Store the pause time
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._pauseTime = null;
    }
    /**
     * @name          _tick
     * @type          Function
     * @private
     *
     * Internal tick function
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _tick() {
        // save the remaining timeout
        this._tickTime = new Date();
        // update remaing
        this._remaining -= this._tickInterval;
        // if we are at the end of the timer
        if (this.remaining <= 0) {
            // stop the timer
            this.stop();
            // check if need to loop
            if (this._settings.loop) {
                this.start();
            }
            // loop on each completes functions
            this.emit('complete', this);
        }
        else {
            // launch another tick
            clearTimeout(this._tickSetTimeout);
            this._tickSetTimeout = setTimeout(() => {
                this._tick();
            }, this._tickInterval);
        }
        // loop on each ticks functions
        if (this.isStarted())
            this.emit('tick', this);
    }
    /**
     * @name            remaing
     * @type            Number
     * @get
     *
     * Get the remaining time in ms
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get remaining() {
        if (!this._startTime)
            return 0;
        return this._startTime.getTime() + this._duration - Date.now();
    }
    /**
     * @name              duration
     * @type              Number
     * @get
     * @set
     *
     * Set or get the duration. Can be a number in milliseconds, or a time string like '1m', '2s', etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set duration(duration) {
        duration = convert_1.default(duration, 'ms');
        this._duration = duration;
        if (this._tickCount) {
            this._tickInterval = this._duration / this._tickCount; // remove 1 cause the first tick is always the start time
        }
        // loop on each change duration functions
        this.emit('duration', this);
    }
    get duration() {
        return this._duration;
    }
    /**
     * @name          tickCount
     * @type          Number
     * @get
     * @set
     *
     * Set of get the tickCount
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set tickCount(tickCount) {
        this._tickCount = tickCount;
        this._tickInterval = this._duration / this._tickCount;
        // loop on each change tick count functions
        this.emit('tickCount', this);
    }
    get tickCount() {
        return this._tickCount;
    }
    /**
     * @name              percentage
     * @type              Number
     * @get
     *
     * Get the current timer advancement percentage
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get percentage() {
        if (!this.isStarted())
            return 0;
        return (100 / this.duration) * (this.duration - this.remaining);
    }
    /**
     * @name              reset
     * @type              Function
     *
     * Reset the timer
     *
     * @param 	{Boolean} 	start 	If the timer has to start after reseting or not
     * @return 	{STimer}            The STimer instance
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    reset(start = false) {
        // stop the timeout
        clearTimeout(this._tickSetTimeout);
        // reset the different timer elements
        this._pauseTime = null;
        this._startTime = null;
        this._remaining = this._duration;
        // check if need to start again
        if (start)
            this.start();
        // loop on each resets functions
        this.emit('reset', this);
        // maintain chainability
        return this;
    }
    /**
     * @name            start
     * @type            Function
     *
     * Start the timer
     *
     * @param         {Number}          [duration=null]           An optional duration for the timer session
     * @return 	{STimer}      The STimer instance
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(duration = null) {
        // clear the timeout to be sure
        clearTimeout(this._tickSetTimeout);
        // set the duration
        if (duration)
            this.duration = duration;
        // if no tick time
        if (!this._tickTime) {
            this._tickTime = new Date();
        }
        // if is a pausetime
        // mean that we resume the timer
        if (this._pauseTime) {
            // calculate time before new tick
            const elapsed = this._pauseTime.getTime() - this._tickTime.getTime();
            const remaining = this._tickInterval - elapsed;
            clearTimeout(this._tickSetTimeout);
            this._tickSetTimeout = setTimeout(() => {
                this._tick();
            }, remaining);
            // set the start time
            this._startTime = new Date();
            // reset pauseTime
            this._pauseTime = null;
        }
        else {
            // save the start time
            this._startTime = new Date();
            this._remaining = this._duration;
            // first time tick
            clearTimeout(this._tickSetTimeout);
            this._tickSetTimeout = setTimeout(() => {
                this._tick();
            }, this._tickInterval);
        }
        // loop on each start functions
        this.emit('start', this);
        // maintain chainability
        return this;
    }
    /**
     * @name            pause
     * @type            Function
     *
     * Pause the timer
     *
     * @return 	{STimer}        The STimer instance
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    pause() {
        // set the pauseTime
        this._pauseTime = new Date();
        // clean the interval
        clearTimeout(this._tickSetTimeout);
        // loop on each pause functions
        this.emit('pause', this);
        // maintain chainability
        return this;
    }
    /**
     * @name              stop
     * @type              Function
     *
     * Stop the timer
     *
     * @return 	{STimer}      The STimer instance
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    stop() {
        // reset
        this.reset();
        // loop on each stop functions
        this.emit('stop', this);
        // maintain chainability
        return this;
    }
    /**
     * @name            destroy
     * @type            Function
     *
     * Destroy the timer
     *
     * @return        {STimer}            The STimer instance
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    destroy() {
        this.stop();
        this._completesCallbacks = [];
        this._ticksCallbacks = [];
        // loop on each destroy functions
        this.emit('destroy', this);
        // maintain chainability
        return this;
    }
    /**
     * @name              isStarted
     * @type              Function
     *
     * Check if the timer is started
     *
     * @return          {Boolean}         true if started, false if not
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    isStarted() {
        return this._startTime && !this._pauseTime;
    }
}
exports.default = STimer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVix3REFBa0M7QUFDbEMsbUVBQTZDO0FBQzdDLG9FQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxNQUFxQixNQUFPLFNBQVEsa0JBQVU7SUF5RjVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxZQUFZLFFBQVEsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNqQyxLQUFLLENBQ0gsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUV6Qiw2QkFBNkI7WUFDN0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyx5REFBeUQ7YUFDakg7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ25FO1FBQ0gsQ0FBQyxFQUNELG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsUUFBUTtZQUNaLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLEtBQUs7U0FDWixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFqSUo7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWQ7Ozs7Ozs7O1dBUUc7UUFDSCxl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