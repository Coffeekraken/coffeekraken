"use strict";

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                                SCacheAdapter
 * @namespace           js.cache.cacheAdapters
 * @type                                Class
 *
 * Base class for SCache adapters
 *
 * @example             js
 * class SCacheCoolAdapter extends SCacheAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this._settings
 *    }
 *    async set(name, value, settings = {}) {
 *      const objectToSave = this.processItem(name, value, settings);
 *      // make what you want with the objectToSave...
 *      return objectToSave; // return the objectToSave or false if something goes wrong
 *    }
 *    async get(name) {
 *      // make what you need to get back the cached item
 *      return objectOfCachedItem; // return the cached item in object format
 *    }
 *    async delete(name) {
 *      // make what you need to delete the cached item
 *      return true; // return true or false if something goes wrong
 *    }
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_temp =
/**
 * @name                              _settings
 * @type                              Object
 * @private
 *
 * Store the default settings of the SCacheAdapter instance
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

/**
 * @name                              constructor
 * @type                              Function
 *
 * Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.
 *
 * @param         {Object}          [settings={}]             An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function SCacheAdapter(settings) {
  if (settings === void 0) {
    settings = {};
  }

  _classCallCheck(this, SCacheAdapter);

  _defineProperty(this, "_settings", {});

  // store the settings
  this._settings = settings;
}, _temp);