"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __deepMerge = require('../../object/deepMerge');

var __prependFile = require('prepend-file');

var __makeDir = require('make-dir');

var __filesPreset = require('../htmlPresets/files');
/**
 * @name                    SLogFilesAdapter
 * @namespace           js.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily and store them in some files where you want on your file system.
 *
 * @example               js
 * conse SLog = require('@coffeekraken/sugar/js/log/SLog');
 * const SLogFilesAdapter = require('@coffeekraken/sugar/node/log/adapters/SLogFilesAdapter');
 * const logger = new SLog({
 *    adapters: [
 *      new SLogFilesAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


var SLogFilesAdapter = /*#__PURE__*/function () {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store this instance settings. Here's the list of available settings
   * - path (process.cwd() + '/.logs') {String}: Where you want to store the logs. This must be a path to a writable folder
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   *
   * Constructor
   *
   * @param         {Object}        [settings={}]           The settings object to configure your SLogFilesAdapter instance. Here's the settings available:
   * - path (process.cwd() + '/.logs') {String}: Where you want to store the logs. This must be a path to a writable folder
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SLogFilesAdapter(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SLogFilesAdapter);

    _defineProperty(this, "_settings", {});

    // extend settings
    this._settings = __deepMerge({
      path: process.cwd() + '/.logs'
    }, settings);
  }
  /**
   * @name            log
   * @type            Function
   * @async
   *
   * This is the main method of the logger. It actually log the message passed as parameter to the confilesole
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


  _createClass(SLogFilesAdapter, [{
    key: "log",
    value: function () {
      var _log = _asyncToGenerator(function* (message, level) {
        return new Promise((resolve, reject) => {
          // ensure the log directory exist
          __makeDir.sync(this._settings.path); // prepend the new log


          var newLog = "# ".concat(new Date().toISOString(), "\n# ").concat(__filesPreset(message), "\n\n");

          __prependFile.sync("".concat(this._settings.path, "/").concat(level, ".log"), newLog); // resolving the file logging


          resolve();
        });
      });

      function log(_x, _x2) {
        return _log.apply(this, arguments);
      }

      return log;
    }()
  }]);

  return SLogFilesAdapter;
}();

exports.default = SLogFilesAdapter;
module.exports = exports.default;