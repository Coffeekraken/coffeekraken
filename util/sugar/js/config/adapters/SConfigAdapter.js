"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                                SConfigAdapter
 * @namespace           js.config.adapters
 * @type                                Class
 *
 * Base class for SCache adapters
 *
 * @example             js
 * class SConfigCoolAdapter extends SConfigAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this._settings
 *    }
 *    async load() {
 *      // load the config the way you want and return it in Object format
 *      return {};
 *    }
 *    async save(newConfig) {
 *      // save the newConfig object the way you want and return true when all it ok
 *      return true;
 *    }
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SConfigAdapter = /*#__PURE__*/function () {
  /**
   * @name                              _settings
   * @type                              Object
   * @private
   *
   * Store the default settings of the SConfigAdapter instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
   *
   * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
   * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
   * - ...others: All the settings you need for your specific adapter
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SConfigAdapter(settings = {}) {
    _classCallCheck(this, SConfigAdapter);

    _defineProperty(this, "_settings", {});

    if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
      throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
    } // store the settings


    this._settings = settings;
  }
  /**
   * @name                  name
   * @type                  String
   * @get
   *
   * Access the adapter setted name
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SConfigAdapter, [{
    key: "name",
    get: function () {
      return this._settings.name;
    },
    set: function (value) {
      if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
        throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
      }

      this._settings.name = value;
    }
    /**
     * @name                  settings
     * @type                  Object
     * @get
     *
     * Access the adapter setted settings
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "settings",
    get: function () {
      return this._settings;
    }
  }]);

  return SConfigAdapter;
}();

exports.default = SConfigAdapter;
module.exports = exports.default;