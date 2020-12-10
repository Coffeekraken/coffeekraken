"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const convert_1 = __importDefault(require("./convert"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
module.exports = class STimer extends SPromise_1.default {
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
        super((resolve, reject, trigger, cancel) => {
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
            this.trigger('complete', this);
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
            this.trigger('tick', this);
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
        this.trigger('duration', this);
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
        this.trigger('tickCount', this);
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
        this.trigger('reset', this);
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
        this.trigger('start', this);
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
        this.trigger('pause', this);
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
        this.trigger('stop', this);
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
        this.trigger('destroy', this);
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
};
//# sourceMappingURL=module.js.map