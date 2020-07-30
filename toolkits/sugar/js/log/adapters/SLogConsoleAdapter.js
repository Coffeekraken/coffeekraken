"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _console = _interopRequireDefault(require("../htmlPresets/console"));

var _childProcess = _interopRequireDefault(require("../../is/childProcess"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _fmtObj = _interopRequireDefault(require("fmt-obj"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                    SLogConsoleAdapter
 * @namespace           js.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
 * "mail", "slack", etc...
 *
 * @example               js
 * import SLog from '@coffeekraken/sugar/js/log/SLog';
 * import SLogConsoleAdapter from '@coffeekraken/sugar/js/log/adapters/SLogConsoleAdapter';
 * const logger = new SLog({
 *    adapters: [
 *      new SLogConsoleAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SLogConsoleAdapter = /*#__PURE__*/function () {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store this instance settings. Here's the list of available settings
   * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   *
   * Constructor
   *
   * @param         {Object}        [settings={}]           The settings object to configure your SLogConsoleAdapter instance. Here's the settings available:
   * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SLogConsoleAdapter(settings = {}) {
    _classCallCheck(this, SLogConsoleAdapter);

    _defineProperty(this, "_settings", {});

    // extend settings
    this._settings = (0, _deepMerge.default)({
      enableChildProcessLogs: true,
      logMethods: {
        log: console.log,
        info: console.info,
        warn: console.warn,
        debug: console.debug,
        error: console.error,
        trace: console.trace
      }
    }, settings);
  }
  /**
   * @name            log
   * @type            Function
   * @async
   *
   * This is the main method of the logger. It actually log the message passed as parameter to the console
   *
   * @param         {Mixed}          message            The message to log
   * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
   * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
   *
   * @example         js
   * await consoleAdapter.log('hello world');
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SLogConsoleAdapter, [{
    key: "log",
    value: async function log(message, level) {
      return new Promise((resolve, reject) => {
        // init the console method to use
        let consoleMethod = 'log'; // adapting the console method to use depending on the type

        switch (level) {
          case 'trace':
            consoleMethod = 'trace';
            break;

          case 'error':
            consoleMethod = 'error';
            break;

          case 'warn':
            consoleMethod = 'warn';
            break;

          case 'info':
            consoleMethod = 'info';
            break;

          case 'debug':
            consoleMethod = 'debug';
            break;
        } // log the message


        if (typeof message === 'string') {
          ((global || window).nativeConsole || console)[consoleMethod]('⠀' + (0, _console.default)(message));
        } else if (typeof message === 'object') {
          ((global || window).nativeConsole || console)[consoleMethod]('⠀' + (0, _fmtObj.default)(message));
        } else {
          ((global || window).nativeConsole || console)[consoleMethod]('⠀' + message);
        } // resolve the promise


        resolve();
      });
    }
  }]);

  return SLogConsoleAdapter;
}();

exports.default = SLogConsoleAdapter;
module.exports = exports.default;