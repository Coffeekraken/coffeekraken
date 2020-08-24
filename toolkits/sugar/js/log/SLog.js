"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SLogConsoleAdapter = _interopRequireDefault(require("./adapters/SLogConsoleAdapter"));

var _env = _interopRequireDefault(require("../core/env"));

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                    SLog
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
 *    adapters: {
 *      console: new SLogConsoleAdapter()
 *    }
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SLog = /*#__PURE__*/function () {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store this instance settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   *
   * Constructor
   *
   * @param         {Object}        [settings={}]           The settings object to configure your SLog instance. Here's the settings available:
   * - adapters ({}) {Object}: An object of adapters that you want to use in this SLog instance. The format is { adapterName: adapterInstance, etc... }
   * - overrideNativeConsole (false) {Boolean}: This will override the console.log, warn, etc... methods
   * - adaptersByLevel ({}) (Object): Specify which adapter you want to use by level. Can be an Array like ['console','mail'] or a comma separated string like "console,mail". The object format is { adapterName: adaptersList }
   * - adaptersByEnvironment ({}) {Object}: Same as the "adaptersByLevel" but for the environments like "test", "development" or "production". The environment value is taken using the "sugar.js.core.env" function using the key "ENV" or "NODE_ENV"
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SLog(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SLog);

    _defineProperty(this, "_settings", {
      adapters: {},
      adaptersByLevel: {},
      overrideNativeConsole: false
    });

    // extend settings
    this._settings = (0, _deepMerge.default)({
      adapters: {
        console: new _SLogConsoleAdapter.default()
      },
      adaptersByLevel: {
        log: null,
        info: null,
        warn: null,
        debug: null,
        error: null,
        trace: null
      },
      adaptersByEnvironment: {
        test: null,
        development: null,
        production: null
      },
      overrideNativeConsole: false
    }, settings); // ensure every adapters are a class instance

    Object.keys(this._settings.adapters).forEach(adapterName => {
      if (typeof this._settings.adapters[adapterName] === 'string') {
        var cls = require(this._settings.adapters[adapterName]);

        this._settings.adapters[adapterName] = new cls();
      }
    }); // if needed, override the native console

    if (this._settings.overrideNativeConsole) {
      this._overrideNativeConsole();
    }
  }
  /**
   * @name            _overrideNativeConsole
   * @type            Function
   * @private
   *
   * Override the native console object to call the SLog methods instead of the normal once.
   * Store the native console inside the global/window variable called "nativeConsole"
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SLog, [{
    key: "_overrideNativeConsole",
    value: function _overrideNativeConsole() {
      // check if need to override the native console methods
      var _this = this;

      var newConsole = function (oldCons) {
        (global || window).nativeConsole = Object.assign({}, oldCons);
        return {
          log: function log() {
            _this.log(...arguments);
          },
          info: function info() {
            _this.info(...arguments);
          },
          warn: function warn() {
            _this.warn(...arguments);
          },
          debug: function debug() {
            _this.debug(...arguments);
          },
          error: function error() {
            _this.error(...arguments);
          },
          trace: function trace() {
            _this.trace(...arguments);
          }
        };
      }((global || window).console);

      (global || window).console = newConsole;
    }
    /**
     * @name            _log
     * @type            Function
     * @private
     *
     * Internal log method that make the actual call to all the adapters, etc...
     *
     * @param         {Mixed}         ...args         The actual message(s) to log or the level wanted like "log", "warn", "info", "debug" or "error"
     * @return        {Promise}                             A promise that will be resolved once all the adapters have correctly log the message
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_log",
    value: function () {
      var _log2 = _asyncToGenerator(function* () {
        var adapters = null,
            level = 'log',
            messages = [];

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args.forEach(v => {
          if (typeof v === 'string') {
            if (['log', 'warn', 'info', 'error', 'debug', 'trace'].indexOf(v) !== -1) {
              level = v;
              return;
            }
          }

          messages.push(v);
        });
        messages = messages.filter(m => {
          if (m === null || m === '') return false;
          if (typeof m === 'string' && m.trim() === '') return false;
          return true;
        }); // process the adapters argument

        if (adapters === null) adapters = this._settings.adaptersByLevel[level];
        if (adapters === null) adapters = Object.keys(this._settings.adapters);else if (typeof adapters === 'string') adapters = adapters.split(',').map(a => a.trim());
        var env = (0, _env.default)('env') || (0, _env.default)('node_env') || 'production';

        if (env) {
          var adaptersByEnvironment = this._settings.adaptersByEnvironment[env];

          if (adaptersByEnvironment !== null) {
            if (typeof adaptersByEnvironment === 'string') adaptersByEnvironment = adaptersByEnvironment.split(',').map(a => a.trim());
            adapters = adapters.filter(a => {
              return adaptersByEnvironment.indexOf(a) !== -1;
            });
          }
        }

        if (!Array.isArray(adapters)) return; // init the promises stack

        var adaptersLogStack = []; // loop on all the adapters to log the message

        adapters.forEach(adapterName => {
          // check if the adapter exists
          if (!this._settings.adapters[adapterName]) return; // loop on all messages to log

          messages.forEach(message => {
            // make the actual log call to this adapter and add it's result to the
            // adaptersLogStack array
            adaptersLogStack.push(this._settings.adapters[adapterName].log(message, level));
          });
        }); // return the result of all the adapters promises

        return Promise.all(adaptersLogStack);
      });

      function _log() {
        return _log2.apply(this, arguments);
      }

      return _log;
    }()
    /**
     * @name            log
     * @type            Function
     * @async
     *
     * The main log method that log a normal message
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.log('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "log",
    value: function () {
      var _log3 = _asyncToGenerator(function* () {
        // call the internal _log method and return his result
        return this._log(...arguments);
      });

      function log() {
        return _log3.apply(this, arguments);
      }

      return log;
    }()
    /**
     * @name            info
     * @type            Function
     * @async
     *
     * The info method that log a message with the "info" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.info('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "info",
    value: function () {
      var _info = _asyncToGenerator(function* () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        // call the internal _log method and return his result
        return this._log(...args, 'info');
      });

      function info() {
        return _info.apply(this, arguments);
      }

      return info;
    }()
    /**
     * @name            warn
     * @type            Function
     * @async
     *
     * The warn method that log a message with the "warn" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.warn('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "warn",
    value: function () {
      var _warn = _asyncToGenerator(function* () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        // call the internal _log method and return his result
        return this._log(...args, 'warn');
      });

      function warn() {
        return _warn.apply(this, arguments);
      }

      return warn;
    }()
    /**
     * @name            debug
     * @type            Function
     * @async
     *
     * The debug method that log a message with the "debug" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.debug('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "debug",
    value: function () {
      var _debug = _asyncToGenerator(function* () {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        // call the internal _log method and return his result
        return this._log(...args, 'debug');
      });

      function debug() {
        return _debug.apply(this, arguments);
      }

      return debug;
    }()
    /**
     * @name            error
     * @type            Function
     * @async
     *
     * The error method that log a message with the "error" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.error('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "error",
    value: function () {
      var _error = _asyncToGenerator(function* () {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        // call the internal _log method and return his result
        return this._log(...args, 'error');
      });

      function error() {
        return _error.apply(this, arguments);
      }

      return error;
    }()
    /**
     * @name            trace
     * @type            Function
     * @async
     *
     * The trace method that log a message with the "trace" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.trace('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "trace",
    value: function () {
      var _trace = _asyncToGenerator(function* () {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        // call the internal _log method and return his result
        return this._log(...args, 'trace');
      });

      function trace() {
        return _trace.apply(this, arguments);
      }

      return trace;
    }()
  }]);

  return SLog;
}();

exports.default = SLog;
module.exports = exports.default;