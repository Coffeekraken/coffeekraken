"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get = _interopRequireDefault(require("../object/get"));

var _base = _interopRequireDefault(require("../is/base64"));

var _base2 = _interopRequireDefault(require("../crypt/base64"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __decryptedConfig, __decryptedMeta;
/**
 * @name                                            SApp
 * @namespace           js.class
 * @type                                            Class
 *
 * This class represent an application route class. This mean that you can create an application class that extend this one
 * and your instance will have access to a whole package of data like the application name taken from the package.json file, the version,
 * the description, the author(s), the contributor(s), etc...
 *
 * @example             js
 * import SApp = from ''@coffeekraken/sugar/js/class/SApp';
 * class MyCoolApp extends SApp {
 *    // your app class here...
 * }
 * const myApp = new MyCoolApp();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


var SApp = /*#__PURE__*/function () {
  /**
   * @name                __settings
   * @type                Object
   * @private
   */

  /**
   * @name              __meta
   * @type              Object
   * @private
   */

  /**
   * @name              __config
   * @type              Object
   * @private
   */

  /**
   * @name                __data
   * @type                Object
   * @private
   */

  /**
   * @name                __log
   * @type                Object
   * @private
   */

  /**
   * @constructor
   * @param                {Object}                [settings={}]         The application settings
   * @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
   *
   * @setting            {String}                  [name='SApp']         The application name that you want. This will gives you access to your app instance through window.{settings.name}
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SApp(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SApp);

    _defineProperty(this, "__settings", {});

    _defineProperty(this, "__meta", {});

    _defineProperty(this, "__config", {});

    _defineProperty(this, "__data", {});

    _defineProperty(this, "__log", {});

    // store the settings
    this.__settings = _objectSpread({
      name: 'SApp'
    }, settings); // expose this instance in the "window" scope

    window[this.__settings.name] = this;
  }
  /**
   * @name                            config
   * @namespace           js.class.SApp
   * @type                            Function
   *
   * Get a configuration value from the backend using an ajax call
   *
   * @param               {String}              [path=null]                           The configuration object dotted path to get like log.frontend.mail.host
   * @return              {Mixed}                                                     The configuration value getted
   *
   * @example           js
   * const host = await myApp.config('log.frontend.mail.host');
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SApp, [{
    key: "config",
    value: function config(path) {
      if (path === void 0) {
        path = null;
      }

      var config = window['_' + this.__settings.name + 'Data'].config || {};

      if ((0, _base.default)(config) && !__decryptedConfig) {
        __decryptedConfig = _base2.default.decrypt(config);
      }

      return (0, _get.default)(__decryptedConfig, path);
    }
    /**
     * @name                            meta
     * @namespace           js.class.SApp
     * @type                            Function
     *
     * Usefull function that give you back an application meta taken depending on your passed dotted object path
     *
     * @param               {String}              [path=null]                           The meta object dotted path to get like "name"
     * @return              {Mixed}                                                     The meta value getted
     *
     * @example           js
     * const name = await myApp.meta('name');
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "meta",
    value: function meta(path) {
      if (path === void 0) {
        path = null;
      }

      var meta = window['_' + this.__settings.name + 'Data'].meta || {};

      if ((0, _base.default)(meta) && !__decryptedMeta) {
        __decryptedMeta = _base2.default.decrypt(meta);
      }

      return (0, _get.default)(__decryptedMeta, path);
    }
    /**
     * @name                                  log
     * @namespace                             squid.js.log
     * @type                                  Function
     *
     * Log a message using the transports log system.
     *
     * @param           {String}              message                   The message to log
     * @param           {String}              [type="info"]             The type of log. Can be "error", "warn", "info", "http", "verbose", "debug", "silly"
     * @param           {Array}               [transports=null]         The transports that you want to use for this log process. If null, use all the transports configured in the squid config for the type of log passed
     * @return          {Promise}                                       A promise resolved once the log process is finished
     *
     * @example           js
     * Squid.log('Hello world', 'error').then(() => {
     *    // do something if needed...
     * });
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "log",
    value: function log(message, type, transports) {
      if (type === void 0) {
        type = 'info';
      }

      if (transports === void 0) {
        transports = null;
      }

      return new Promise((resolve, reject) => {
        var _this = this; // __ensureExist('window.Squid._log');


        Promise.all([Promise.resolve().then(() => _interopRequireWildcard(require('../log/log'))), Promise.resolve().then(() => _interopRequireWildcard(require('../log/isTransportRegistered'))), Promise.resolve().then(() => _interopRequireWildcard(require('../log/getRegisteredTransports'))), Promise.resolve().then(() => _interopRequireWildcard(require('../log/registerTransport')))]).then(modules => {
          var __log = modules[0],
              __isTransportRegistered = modules[1],
              __getRegisteredTransports = modules[2],
              __registerTransport = modules[3]; // get the transports needed for this type

          var configTransports = this.config('log.frontend.transportsByType')[type] ? this.config('log.frontend.transportsByType')[type].split(' ') : [];
          var transp = transports ? transports : configTransports;

          if (!this.__log.sugarTransports) {
            this.__log.sugarTransports = require.context("@coffeekraken/sugar/js/log/transports", true, /\.js$/, 'lazy');
          }

          var transportsImportPromises = [];
          transp.forEach(t => {
            if (this.__log.sugarTransports.keys().indexOf("./".concat(t, ".js")) !== -1) {
              transportsImportPromises.push(this.__log.sugarTransports("./".concat(t, ".js")).then(m => {
                if (!__isTransportRegistered.default(t)) __registerTransport.default(t, m.default || m);
              }));
            }
          });
          Promise.all(transportsImportPromises).then(() => {
            __log.default(message, type, transp).then(() => {
              resolve();
            });
          });
        });
      });
    }
  }]);

  return SApp;
}();

exports.default = SApp;
module.exports = exports.default;