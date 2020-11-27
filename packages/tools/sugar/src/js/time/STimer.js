// @ts-nocheck
// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./convert", "../promise/SPromise", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var convert_1 = __importDefault(require("./convert"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    return /** @class */ (function (_super) {
        __extends(STimer, _super);
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
        function STimer(duration, settings) {
            if (settings === void 0) { settings = {}; }
            var _this = _super.call(this, function (resolve, reject, trigger, cancel) {
                _this.duration = duration;
                // calculate the tickInterval
                if (_this._settings.tickCount) {
                    _this._tickCount = _this._settings.tickCount;
                    _this._tickInterval = _this._duration / _this._tickCount; // remove 1 cause the first tick is always the start time
                }
                else {
                    _this._tickInterval = convert_1.default(_this._settings.tickInterval, 'ms');
                }
            }, deepMerge_1.default({
                id: 'STimer',
                tickInterval: 1000,
                tickCount: null,
                loop: false
            }, settings)) || this;
            /**
             * @name          _duration
             * @type          Number
             * @private
             *
             * Store the timer duration wanted
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._duration = 0;
            /**
             * @name        _remaining
             * @type        Number
             * @private
             *
             * Store the remaining time
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._remaining = 0;
            /**
             * @name            _tickCount
             * @type            Number
             * @private
             *
             * How many ticks wanted during the timeout
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._tickCount = null;
            /**
             * @name          _tickInterval
             * @type          Number
             * @private
             *
             * Computed value depending on the settings
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._tickInterval = 1000;
            /**
             * @name          _tickSetTimeout
             * @type          Numbee
             * @private
             *
             * Store the setInterval instance
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._tickSetTimeout = null;
            /**
             * @name            _startTime
             * @type            Date
             * @private
             *
             * Store the time when the timer is started
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._startTime = null;
            /**
             * @name          _tickTime
             * @type          Date
             * @private
             *
             * Store the last tick time
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._tickTime = null;
            /**
             * @name          _pauseTime
             * @type          Date
             * @private
             *
             * Store the pause time
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._pauseTime = null;
            return _this;
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
        STimer.prototype._tick = function () {
            var _this = this;
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
                this._tickSetTimeout = setTimeout(function () {
                    _this._tick();
                }, this._tickInterval);
            }
            // loop on each ticks functions
            if (this.isStarted())
                this.trigger('tick', this);
        };
        Object.defineProperty(STimer.prototype, "remaining", {
            /**
             * @name            remaing
             * @type            Number
             * @get
             *
             * Get the remaining time in ms
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                if (!this._startTime)
                    return 0;
                return this._startTime.getTime() + this._duration - Date.now();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(STimer.prototype, "duration", {
            get: function () {
                return this._duration;
            },
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
            set: function (duration) {
                duration = convert_1.default(duration, 'ms');
                this._duration = duration;
                if (this._tickCount) {
                    this._tickInterval = this._duration / this._tickCount; // remove 1 cause the first tick is always the start time
                }
                // loop on each change duration functions
                this.trigger('duration', this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(STimer.prototype, "tickCount", {
            get: function () {
                return this._tickCount;
            },
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
            set: function (tickCount) {
                this._tickCount = tickCount;
                this._tickInterval = this._duration / this._tickCount;
                // loop on each change tick count functions
                this.trigger('tickCount', this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(STimer.prototype, "percentage", {
            /**
             * @name              percentage
             * @type              Number
             * @get
             *
             * Get the current timer advancement percentage
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                if (!this.isStarted())
                    return 0;
                return (100 / this.duration) * (this.duration - this.remaining);
            },
            enumerable: false,
            configurable: true
        });
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
        STimer.prototype.reset = function (start) {
            if (start === void 0) { start = false; }
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
        };
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
        STimer.prototype.start = function (duration) {
            var _this = this;
            if (duration === void 0) { duration = null; }
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
                var elapsed = this._pauseTime.getTime() - this._tickTime.getTime();
                var remaining = this._tickInterval - elapsed;
                clearTimeout(this._tickSetTimeout);
                this._tickSetTimeout = setTimeout(function () {
                    _this._tick();
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
                this._tickSetTimeout = setTimeout(function () {
                    _this._tick();
                }, this._tickInterval);
            }
            // loop on each start functions
            this.trigger('start', this);
            // maintain chainability
            return this;
        };
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
        STimer.prototype.pause = function () {
            // set the pauseTime
            this._pauseTime = new Date();
            // clean the interval
            clearTimeout(this._tickSetTimeout);
            // loop on each pause functions
            this.trigger('pause', this);
            // maintain chainability
            return this;
        };
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
        STimer.prototype.stop = function () {
            // reset
            this.reset();
            // loop on each stop functions
            this.trigger('stop', this);
            // maintain chainability
            return this;
        };
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
        STimer.prototype.destroy = function () {
            this.stop();
            this._completesCallbacks = [];
            this._ticksCallbacks = [];
            // loop on each destroy functions
            this.trigger('destroy', this);
            // maintain chainability
            return this;
        };
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
        STimer.prototype.isStarted = function () {
            return this._startTime && !this._pauseTime;
        };
        return STimer;
    }(SPromise_1.default));
});
