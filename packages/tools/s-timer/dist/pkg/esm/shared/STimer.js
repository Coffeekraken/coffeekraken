// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import { __convertTime } from '@coffeekraken/sugar/datetime';
import { __deepMerge } from '@coffeekraken/sugar/object';
/**
 * @name 		            STimer
 * @namespace           shared
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
 * @param     {Object}            [settings={}]     A settings object to configure your timer more deeply:
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STimer extends __SPromise {
    /**
     * @name          constructor
     * @type          Function
     *
     * Constructor
     *
     * @param 	{number} 	[duration=1000] 		The duration of the timer. Can be a number of milliseconds of a string time like '1s', '2m', etc...
     * @param 	{Object} 	settings 		The settings for the timer
     *
     * @example         js
     * import STimer from '@coffeekraken/s-timer';
     * const timer = new STimer('2m');
     * timer.onTick(() => {
     *    // do something...
     * });
     * timer.start();
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(duration, settings = {}) {
        super(({ resolve, reject, emit }) => {
            this.duration = duration;
            // calculate the tickInterval
            if (this.settings.tickCount) {
                this._tickCount = this.settings.tickCount;
                this._tickInterval = this._duration / this._tickCount; // remove 1 cause the first tick is always the start time
            }
            else {
                this._tickInterval = __convertTime(this.settings.tickInterval, 'ms');
            }
        }, __deepMerge({
            id: 'STimer',
            tickInterval: 1000,
            tickCount: null,
            loop: false,
        }, settings));
        /**
         * @name          _duration
         * @type          Number
         * @private
         *
         * Store the timer duration wanted
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._duration = 0;
        /**
         * @name        _remaining
         * @type        Number
         * @private
         *
         * Store the remaining time
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._remaining = 0;
        /**
         * @name            _tickCount
         * @type            Number
         * @private
         *
         * How many ticks wanted during the timeout
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._tickCount = null;
        /**
         * @name          _tickInterval
         * @type          Number
         * @private
         *
         * Computed value depending on the settings
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._tickInterval = 1000;
        /**
         * @name          _tickSetTimeout
         * @type          Numbee
         * @private
         *
         * Store the setInterval instance
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._tickSetTimeout = null;
        /**
         * @name            _startTime
         * @type            Date
         * @private
         *
         * Store the time when the timer is started
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._startTime = null;
        /**
         * @name          _tickTime
         * @type          Date
         * @private
         *
         * Store the last tick time
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._tickTime = null;
        /**
         * @name          _pauseTime
         * @type          Date
         * @private
         *
         * Store the pause time
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            if (this.settings.loop) {
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
        this.emit('tick', this);
    }
    /**
     * @name            remaing
     * @type            Number
     * @get
     *
     * Get the remaining time in ms
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set duration(duration) {
        duration = __convertTime(duration, 'ms');
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isStarted() {
        return this._startTime && !this._pauseTime;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFVBQVU7SUF5RjFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxZQUFZLFFBQVEsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMvQixLQUFLLENBQ0QsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUV6Qiw2QkFBNkI7WUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyx5REFBeUQ7YUFDbkg7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUMxQixJQUFJLENBQ1AsQ0FBQzthQUNMO1FBQ0wsQ0FBQyxFQUNELFdBQVcsQ0FDUDtZQUNJLEVBQUUsRUFBRSxRQUFRO1lBQ1osWUFBWSxFQUFFLElBQUk7WUFDbEIsU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsS0FBSztTQUNkLEVBQ0QsUUFBUSxDQUNY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