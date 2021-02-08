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
            var _this = _super.call(this, function (_a) {
                var resolve = _a.resolve, reject = _a.reject, emit = _a.emit;
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
                this.emit('complete', this);
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
                this.emit('tick', this);
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
                this.emit('duration', this);
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
                this.emit('tickCount', this);
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
            this.emit('reset', this);
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
            this.emit('start', this);
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
            this.emit('pause', this);
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
            this.emit('stop', this);
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
            this.emit('destroy', this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixzREFBa0M7SUFDbEMsaUVBQTZDO0lBQzdDLGtFQUE4QztJQStDOUM7UUFBOEIsMEJBQVU7UUF5RnRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FrQkc7UUFDSCxnQkFBWSxRQUFRLEVBQUUsUUFBYTtZQUFiLHlCQUFBLEVBQUEsYUFBYTtZQUFuQyxZQUNFLGtCQUNFLFVBQUMsRUFBeUI7b0JBQXZCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLElBQUksVUFBQTtnQkFDdEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBRXpCLDZCQUE2QjtnQkFDN0IsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtvQkFDNUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztvQkFDM0MsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyx5REFBeUQ7aUJBQ2pIO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxhQUFhLEdBQUcsaUJBQVMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDbkU7WUFDSCxDQUFDLEVBQ0QsbUJBQVcsQ0FDVDtnQkFDRSxFQUFFLEVBQUUsUUFBUTtnQkFDWixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsSUFBSSxFQUFFLEtBQUs7YUFDWixFQUNELFFBQVEsQ0FDVCxDQUNGLFNBQ0Y7WUFsSUQ7Ozs7Ozs7O2VBUUc7WUFDSCxlQUFTLEdBQUcsQ0FBQyxDQUFDO1lBRWQ7Ozs7Ozs7O2VBUUc7WUFDSCxnQkFBVSxHQUFHLENB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