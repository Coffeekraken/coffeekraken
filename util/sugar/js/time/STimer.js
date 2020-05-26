"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _convert = _interopRequireDefault(require("./convert"));

var _SPromise2 = _interopRequireDefault(require("../promise/SPromise"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		            STimer
 * @namespace           sugar.js.time
 * @type                  Class
 * @extends               SPromise
 *
 * Class that let you create and handle timer with ease.
 * With this class you can set some callback function that will be
 * called each x ms or tell that you want your callbacks to be called
 * a certain number of time during the timer time.
 * This class extends the SPromise one, meaning that you can subscribe to differents "events" triggered by the timer instance. Here's the list:
 * - complete: Triggered when the timer is completed
 * - tick: Triggered at each ticks depending on your settings
 * - duration: Triggered when the duration has been changed
 * - tickCount: Triggered when the tickCount has been changed
 * - reset: Triggered when the timer has been reseted
 * - start: Triggered when the timer starts
 * - pause: Triggered when the timer has been paused
 * - stop: Triggered when the timer has been stoped
 * - destroy: Triggered when the timer has been destroyed
 *
 * @param     {Number|String}     duration      The duration of the timer. Can be a Number that will be treated as miliseconds, or a string like "1s", "2m", etc...
 * @param     {Object}            [settings={}]     A settings object to configure your timer more deeply:
 * - tickInterval (1000) {Number}: Specify the interval wanted between each ticks in miliseconds
 * - tickCount (null) {Number}: Specify how many ticks you want during the timer process
 * - loop (false) {Boolean}: Specify if you want the timer to loop or not.
 *
 * @example 	js
 * const STimer = require('@coffeekraken/sugar/js/time/STimer');
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
let STimer = /*#__PURE__*/function (_SPromise) {
  _inherits(STimer, _SPromise);

  var _super = _createSuper(STimer);

  /**
   * @name          _duration
   * @type          Number
   * @private
   *
   * Store the timer duration wanted
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _remaining
   * @type        Number
   * @private
   *
   * Store the remaining time
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _tickCount
   * @type            Number
   * @private
   *
   * How many ticks wanted during the timeout
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _tickInterval
   * @type          Number
   * @private
   *
   * Computed value depending on the settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _tickSetTimeout
   * @type          Numbee
   * @private
   *
   * Store the setInterval instance
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _startTime
   * @type            Date
   * @private
   *
   * Store the time when the timer is started
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _tickTime
   * @type          Date
   * @private
   *
   * Store the last tick time
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _pauseTime
   * @type          Date
   * @private
   *
   * Store the pause time
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function STimer(duration, settings = {}) {
    var _this;

    _classCallCheck(this, STimer);

    _this = _super.call(this, (resolve, reject, trigger, cancel) => {
      _this.duration = duration; // calculate the tickInterval

      if (_this._settings.tickCount) {
        _this._tickCount = _this._settings.tickCount;
        _this._tickInterval = _this._duration / _this._tickCount; // remove 1 cause the first tick is always the start time
      } else {
        _this._tickInterval = (0, _convert.default)(_this._settings.tickInterval, 'ms');
      }
    }, (0, _deepMerge.default)({
      tickInterval: 1000,
      tickCount: null,
      loop: false
    }, settings));

    _defineProperty(_assertThisInitialized(_this), "_duration", 0);

    _defineProperty(_assertThisInitialized(_this), "_remaining", 0);

    _defineProperty(_assertThisInitialized(_this), "_tickCount", null);

    _defineProperty(_assertThisInitialized(_this), "_tickInterval", 1000);

    _defineProperty(_assertThisInitialized(_this), "_tickSetTimeout", null);

    _defineProperty(_assertThisInitialized(_this), "_startTime", null);

    _defineProperty(_assertThisInitialized(_this), "_tickTime", null);

    _defineProperty(_assertThisInitialized(_this), "_pauseTime", null);

    _get(_getPrototypeOf(STimer.prototype), "start", _assertThisInitialized(_this)).call(_assertThisInitialized(_this));

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


  _createClass(STimer, [{
    key: "_tick",
    value: function _tick() {
      // save the remaining timeout
      this._tickTime = new Date(); // update remaing

      this._remaining -= this._tickInterval; // if we are at the end of the timer

      if (this.remaining <= 0) {
        // stop the timer
        this.stop(); // check if need to loop

        if (this._settings.loop) {
          this.start();
        } // loop on each completes functions


        this.trigger('complete', this);
      } else {
        // launch another tick
        clearTimeout(this._tickSetTimeout);
        this._tickSetTimeout = setTimeout(() => {
          this._tick();
        }, this._tickInterval);
      } // loop on each ticks functions


      if (this.isStarted()) this.trigger('tick', this);
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

  }, {
    key: "reset",

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
    value: function reset(start = false) {
      // stop the timeout
      clearTimeout(this._tickSetTimeout); // reset the different timer elements

      this._pauseTime = null;
      this._startTime = null;
      this._remaining = this._duration; // check if need to start again

      if (start) this.start(); // loop on each resets functions

      this.trigger('reset', this); // maintain chainability

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

  }, {
    key: "start",
    value: function start(duration = null) {
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


      this.trigger('start', this); // maintain chainability

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

  }, {
    key: "pause",
    value: function pause() {
      // set the pauseTime
      this._pauseTime = new Date(); // clean the interval

      clearTimeout(this._tickSetTimeout); // loop on each pause functions

      this.trigger('pause', this); // maintain chainability

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

  }, {
    key: "stop",
    value: function stop() {
      // reset
      this.reset(); // loop on each stop functions

      this.trigger('stop', this); // maintain chainability

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

  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      this._completesCallbacks = [];
      this._ticksCallbacks = []; // loop on each destroy functions

      this.trigger('destroy', this); // maintain chainability

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

  }, {
    key: "isStarted",
    value: function isStarted() {
      return this._startTime && !this._pauseTime;
    }
  }, {
    key: "remaining",
    get: function () {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "duration",
    set: function (duration) {
      duration = (0, _convert.default)(duration, 'ms');
      this._duration = duration;

      if (this._tickCount) {
        this._tickInterval = this._duration / this._tickCount; // remove 1 cause the first tick is always the start time
      } // loop on each change duration functions


      this.trigger('duration', this);
    },
    get: function () {
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

  }, {
    key: "tickCount",
    set: function (tickCount) {
      this._tickCount = tickCount;
      this._tickInterval = this._duration / this._tickCount; // loop on each change tick count functions

      this.trigger('tickCount', this);
    },
    get: function () {
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

  }, {
    key: "percentage",
    get: function () {
      if (!this.isStarted()) return 0;
      return 100 / this.duration * (this.duration - this.remaining);
    }
  }]);

  return STimer;
}(_SPromise2.default);

exports.default = STimer;
module.exports = exports.default;