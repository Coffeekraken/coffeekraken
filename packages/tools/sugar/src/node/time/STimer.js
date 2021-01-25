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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLHdEQUFrQztBQUNsQyxtRUFBNkM7QUFDN0Msb0VBQThDO0FBK0M5QyxpQkFBUyxNQUFNLE1BQU8sU0FBUSxrQkFBVTtJQXlGdEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILFlBQVksUUFBUSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2pDLEtBQUssQ0FDSCxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBRXpCLDZCQUE2QjtZQUM3QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLHlEQUF5RDthQUNqSDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLGlCQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbkU7UUFDSCxDQUFDLEVBQ0QsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxRQUFRO1lBQ1osWUFBWSxFQUFFLElBQUk7WUFDbEIsU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsS0FBSztTQUNaLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQWpJSjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxDQUFDLENBQUM7UUFFZDs7Ozs7Ozs7V0FRRztRQUNILGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFZjs7Ozs7Ozs7V0FRRztRQUNILGVBQVUsR0FB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