"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _convert = _interopRequireDefault(require("./convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                SDuration
 * @namespace           sugar.js.time
 * @type                Class
 *
 * This class represent a duration tracking process. Simply instanciate it,
 * then call the ```instance.get()``` method and you will get back
 * the duration between the instanciation and the ```get``` method call
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @setting      {String}           [format='s']            Specify the format you want for your instance. Can be 'ms|millisecond(s)', 's|second(s)', 'm|minute(s)', 'h|hour(s)', 'd|day', 'w|week(s)', 'month(s)', 'y|year(s)'
 * @setting      {Boolean}          [suffix=true]             Specify if you want the duration returned with the corresponding suffix like 'ms', 's', etc...
 *
 * @example             js
 * import SDuration from '@coffeekraken/sugar/js/time/SDuration';
 * const duration = new SDuration();
 * await ...
 * console.log(duration.end());
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
var SDuration = /*#__PURE__*/function () {
  /**
   * @name            _settings
   * @type            Object
   * @private
   *
   * Store the settings
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            startTime
   * @type            Number
   * @private
   *
   * Store the start timestamp
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name            endTime
   * @type            Number
   * @private
   *
   * Store the end timestamp
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

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
  function SDuration(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SDuration);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "startTime", null);

    _defineProperty(this, "endTime", null);

    this._settings = (0, _deepMerge.default)({
      format: 's',
      suffix: true
    }, settings);
    this.start();
  }
  /**
   * @name      start
   * @type      Function
   *
   * Start the duration process either with the current timestamp, or with a passed timestamp you prefer
   *
   * @param         {Number}            [startTime=null]            Specify the timestamp you want
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _createClass(SDuration, [{
    key: "start",
    value: function start(startTime) {
      if (startTime === void 0) {
        startTime = null;
      }

      this.startTime = startTime || Date.now();
    }
    /**
     * @name      end
     * @type      Function
     *
     * Stop the duration counter and return the result in the passed format or in the format setted in the settings
     *
     * @param       {Object}            [settings={}]           An object of settings to use
     * @return        {Mixed}                         Return the duration depending on your settings
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "end",
    value: function end(settings) {
      if (settings === void 0) {
        settings = {};
      }

      settings = (0, _deepMerge.default)(this._settings, settings);
      this.endTime = Date.now();
      var durationMs = this.endTime - this.startTime;
      var durationConverted = (0, _convert.default)(durationMs, settings.format);
      return settings.suffix ? durationConverted : parseFloat(durationConverted);
    }
  }]);

  return SDuration;
}();

exports.default = SDuration;
module.exports = exports.default;