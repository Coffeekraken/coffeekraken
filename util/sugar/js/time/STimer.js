"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _convert = _interopRequireDefault(require("./convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		            STimer
 * @namespace           sugar.js.time
 * @type                  Class
 *
 * Class that let you create and handle timer with ease.
 * With this class you can set some callback function that will be
 * called each x ms or tell that you want your callbacks to be called
 * a certain number of time during the timer time.
 *
 * @example 	js
 * const STimer = require('@coffeekraken/sugar/js/time/STimer');
 * const myTimer = new STimer(2000, {
 * 		tickCount : 5
 * })
 * myTimer.onTick((myTimer) => {
 * 		// do something here...
 * })
 * myTimer.start()
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class STimer {
  /**
   * @name              _settings
   * @type              Object
   * @private
   * 
   * Store the settings for the timer
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name          _duration
   * @type          Number
   * @private
   * 
   * Store the timer duration wanted
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name        _remaining
   * @type        Number
   * @private
   * 
   * Store the remaining time
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _tickCount
   * @type            Number
   * @private
   * 
   * How many ticks wanted during the timeout
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name          _tickInterval
   * @type          Number
   * @private
   * 
   * Computed value depending on the settings
   *
   */

  /**
   * @name            _ticksCallbacks
   * @type            {Array}
   * @private
   * 
   * Store all the functions to call on tick
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _completesCallbacks
   * @type            Array
   * @private
   * 
   * Store all the functions to call on complete
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _startsCallbacks
   * @type            Array
   * @private
   * 
   * Store all the functions to call on start
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _pausesCallbackes
   * @type            Array
   * @private
   * 
   * Store all the functions to call on pause
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _stopsCallbacks
   * @type            Array
   * @private
   * 
   * Store all the functions to call on stop
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _destroysCallbacks
   * @type            Array
   * @private
   * 
   * Store all the functions to call on destroy
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _changeDurationsCallbacks
   * @type            Array
   * @private
   * 
   * Store all the functions to call on change duration
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _changeTicksCountCallbacks
   * @type            Array
   * @private
   * 
   * Store all the functions to call on changing ticks count
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _resetsCallbacks
   * @type            Array
   * @private
   * 
   * Store all the functions to call on reset
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name          _tickSetTimeout
   * @type          Numbee
   * @private
   * 
   * Store the setInterval instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            _startTime
   * @type            Date
   * @private
   * 
   * Store the time when the timer is started
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name          _tickTime
   * @type          Date
   * @private
   * 
   * Store the last tick time
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name          _pauseTime
   * @type          Date
   * @private
   * 
   * Store the pause time
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

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
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(duration, settings = {}) {
    _defineProperty(this, "_settings", {
      /**
       * @name            tickInterval
       * @type            Number
       * @default         1000
       * @setting
       * 
       * Store the interval between ticks. If specified in number format, it will mean milliseconds.
       * You can specify also the time by string like: '1s', '2m', '1h', etc...
       *
       * @author 		Olivier Bossel<olivier.bossel@gmail.com>
       */
      tickInterval: 1000,

      /**
       * @name                tickCount
       * @type                Number
       * @default             null
       * @setting
       * 
       * Set the number of tick wanted
       *
       * @author 		Olivier Bossel<olivier.bossel@gmail.com>
       */
      tickCount: null,

      /**
       * @name          loop
       * @type          Boolean
       * @default       false
       * @setting
       * 
       * Set if the timer has to loop
       *
       * @author 		Olivier Bossel<olivier.bossel@gmail.com>
       */
      loop: false
    });

    _defineProperty(this, "_duration", 0);

    _defineProperty(this, "_remaining", 0);

    _defineProperty(this, "_tickCount", null);

    _defineProperty(this, "_tickInterval", 1000);

    _defineProperty(this, "_ticksCallbacks", []);

    _defineProperty(this, "_completesCallbacks", []);

    _defineProperty(this, "_startsCallbacks", []);

    _defineProperty(this, "_pausesCallbackes", []);

    _defineProperty(this, "_stopsCallbacks", []);

    _defineProperty(this, "_destroysCallbacks", []);

    _defineProperty(this, "_changeDurationsCallbacks", []);

    _defineProperty(this, "_changeTicksCountCallbacks", []);

    _defineProperty(this, "_resetsCallbacks", []);

    _defineProperty(this, "_tickSetTimeout", null);

    _defineProperty(this, "_startTime", null);

    _defineProperty(this, "_tickTime", null);

    _defineProperty(this, "_pauseTime", null);

    this._duration = (0, _convert.default)(duration, 'ms'); // updating settings

    this._settings = Object.assign(this._settings, settings); // calculate the tickInterval

    if (this._settings.tickCount) {
      this._tickCount = this._settings.tickCount;
      this._tickInterval = this._duration / this._tickCount; // remove 1 cause the first tick is always the start time
    } else {
      this._tickInterval = (0, _convert.default)(this._settings.tickInterval, 'ms');
    }
  }
  /**
   * @name          _tick
   * @type          Function
   * @private
   * 
   * Internal tick function
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _tick() {
    // save the remaining timeout
    this._tickTime = new Date(); // update remaing

    this._remaining -= this._tickInterval; // if we are at the end of the timer

    if (this.remaining <= 0) {
      // stop the timer
      this.stop(); // check if need to loop

      if (this._settings.loop) {
        this.start();
      } // loop on each completes functions


      this._completesCallbacks.forEach(complete => {
        complete(this);
      });
    } else {
      // launch another tick
      clearTimeout(this._tickSetTimeout);
      this._tickSetTimeout = setTimeout(() => {
        this._tick();
      }, this._tickInterval);
    } // loop on each ticks functions


    this._ticksCallbacks.forEach(tick => {
      tick(this);
    });
  }
  /**
   * @name            remaing
   * @type            Number
   * @get
   * 
   * Get the remaining time in ms
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  get remaining() {
    if (!this._startTime) return 0;
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
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  set duration(duration) {
    duration = (0, _convert.default)(duration, 'ms');
    this._duration = duration;

    if (this._tickCount) {
      this._tickInterval = this._duration / this._tickCount; // remove 1 cause the first tick is always the start time
    } // loop on each change duration functions


    this._changeDurationsCallbacks.forEach(durationFn => {
      durationFn(this);
    });
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
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  set tickCount(tickCount) {
    this._tickCount = tickCount;
    this._tickInterval = this._duration / this._tickCount; // loop on each change tick count functions

    this._changeTicksCountCallbacks.forEach(tickCountFn => {
      tickCountFn(this);
    });
  }

  get tickCount() {
    return this._tickCount;
  }
  /**
   * @name          onTick
   * @type          Function
   * 
   * Register a function called on tick
   * 
   * @param 	      {Function} 	      A       function to call on tick
   * @return 	      {STimer} 	                The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onTick(fn) {
    // add the function if not already
    if (this._ticksCallbacks.indexOf(fn) !== -1) return this;

    this._ticksCallbacks.push(fn);

    return this;
  }
  /**
   * @name            onComplete
   * @type            Function
   * 
   * Register a function called on complete
   * 
   * @param 	{Function} 	A function to call on complete
   * @retun 	{STimer} 	The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onComplete(fn) {
    // add the function if not already
    if (this._completesCallbacks.indexOf(fn) !== -1) return this;

    this._completesCallbacks.push(fn);

    return this;
  }
  /**
   * @name          onPause
   * @type          Function
   * 
   * Register a function called on pause
   * 
   * @param 	      {Function} 	      A       function to call on pause
   * @return 	      {STimer} 	                The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onPause(fn) {
    // add the function if not already
    if (this._pausesCallbackes.indexOf(fn) !== -1) return this;

    this._pausesCallbackes.push(fn);

    return this;
  }
  /**
   * @name          onStart
   * @type          Function
   * 
   * Register a function called on start
   * 
   * @param 	      {Function} 	      A       function to call on start
   * @return 	      {STimer} 	                The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onStart(fn) {
    // add the function if not already
    if (this._startsCallbacks.indexOf(fn) !== -1) return this;

    this._startsCallbacks.push(fn);

    return this;
  }
  /**
   * @name          onReset
   * @type          Function
   * 
   * Register a function called on reset
   * 
   * @param 	      {Function} 	      A       function to call on reset
   * @return 	      {STimer} 	                The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onReset(fn) {
    // add the function if not already
    if (this._resetsCallbacks.indexOf(fn) !== -1) return this;

    this._resetsCallbacks.push(fn);

    return this;
  }
  /**
   * @name          onStop
   * @type          Function
   * 
   * Register a function called on stop
   * 
   * @param 	      {Function} 	      A       function to call on stop
   * @return 	      {STimer} 	                The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onStop(fn) {
    // add the function if not already
    if (this._stopsCallbacks.indexOf(fn) !== -1) return this;

    this._stopsCallbacks.push(fn);

    return this;
  }
  /**
   * @name          onChangeDuration
   * @type          Function
   * 
   * Register a function called on duration change
   * 
   * @param 	      {Function} 	      A       function to call on duration change
   * @return 	      {STimer} 	                The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onChangeDuration(fn) {
    // add the function if not already
    if (this._changeDurationsCallbacks.indexOf(fn) !== -1) return this;

    this._changeDurationsCallbacks.push(fn);

    return this;
  }
  /**
   * @name          onChangeTickCount
   * @type          Function
   * 
   * Register a function called on tick counts change
   * 
   * @param 	      {Function} 	      A       function to call on tick count changes
   * @return 	      {STimer} 	                The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onChangeTickCount(fn) {
    // add the function if not already
    if (this._changeTicksCountCallbacks.indexOf(fn) !== -1) return this;

    this._changeTicksCountCallbacks.push(fn);

    return this;
  }
  /**
   * @name          onDestroy
   * @type          Function
   * 
   * Register a function called on destroy
   * 
   * @param 	      {Function} 	      A       function to call on destroy
   * @return 	      {STimer} 	                The timer instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  onDestroy(fn) {
    // add the function if not already
    if (this._destroysCallbacks.indexOf(fn) !== -1) return this;

    this._destroysCallbacks.push(fn);

    return this;
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
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  reset(start = false) {
    // stop the timeout
    clearTimeout(this._tickSetTimeout); // reset the different timer elements

    this._pauseTime = null;
    this._startTime = null;
    this._remaining = this._duration; // check if need to start again

    if (start) this.start(); // loop on each resets functions

    this._resetsCallbacks.forEach(resetFn => {
      resetFn(this);
    }); // maintain chainability


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
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  start(duration = null) {
    // clear the timeout to be sure
    clearTimeout(this._tickSetTimeout); // set the duration

    if (duration) this.duration = duration; // if no tick time

    if (!this._tickTime) {
      this._tickTime = new Date();
    } // if is a pausetime
    // mean that we resume the timer


    if (this._pauseTime) {
      // calculate time before new tick
      const elapsed = this._pauseTime.getTime() - this._tickTime.getTime();

      const remaining = this._tickInterval - elapsed;
      clearTimeout(this._tickSetTimeout);
      this._tickSetTimeout = setTimeout(() => {
        this._tick();
      }, remaining); // set the start time

      this._startTime = new Date(); // reset pauseTime

      this._pauseTime = null;
    } else {
      // save the start time
      this._startTime = new Date();
      this._remaining = this._duration; // first time tick

      clearTimeout(this._tickSetTimeout);
      this._tickSetTimeout = setTimeout(() => {
        this._tick();
      }, this._tickInterval);
    } // loop on each start functions


    this._startsCallbacks.forEach(startFn => {
      startFn(this);
    }); // maintain chainability


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
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  pause() {
    // set the pauseTime
    this._pauseTime = new Date(); // clean the interval

    clearTimeout(this._tickSetTimeout); // loop on each pause functions

    this._pausesCallbackes.forEach(pauseFn => {
      pauseFn(this);
    }); // maintain chainability


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
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  stop() {
    // reset
    this.reset(); // loop on each stop functions

    this._stopsCallbacks.forEach(stopFn => {
      stopFn(this);
    }); // maintain chainability


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
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  destroy() {
    this.stop();
    this._completesCallbacks = [];
    this._ticksCallbacks = []; // loop on each destroy functions

    this._destroysCallbacks.forEach(destroyFn => {
      destroyFn(this);
    }); // maintain chainability


    return this;
  }
  /**
   * @name              isStarted
   * @type              Boolean
   * @get
   * 
   * Check if the timer is started
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  get isStarted() {
    return this._startTime && !this._pauseTime;
  }

}

exports.default = STimer;
module.exports = exports.default;