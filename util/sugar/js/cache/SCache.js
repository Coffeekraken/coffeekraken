"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SCacheAdapter = _interopRequireDefault(require("./adapters/SCacheAdapter"));

var _convert = _interopRequireDefault(require("../time/convert"));

var _node = _interopRequireDefault(require("../is/node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                                SCache
 * @namespace                           sugar.js.cache
 * @type                                Class
 * 
 * Gives you the ability to manage cache through some defaults available adapters or using yours.
 * This cache class take care of these features:
 * - Standard and custom TTL by cache item
 * - Delete cache items on expires or not
 * 
 * @example             js
 * import SCache from '@coffeekraken/sugar/js/cache/SCache';
 * const cache = new SCache({
 *  ttl: '10s' // 10 seconds
 * });
 * cache.set('myCoolCacheItem', someData);
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SCache = /*#__PURE__*/function () {
  /**
   * @name                              _name
   * @type                              String
   * @private
   * 
   * Store the cache name
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                              _settings
   * @type                              Object
   * @private
   * 
   * Store the default settings of the SCache instance
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                              _defaultAdaptersPaths
   * @type                              Object
   * @private
   * 
   * List all the default adapters and their path
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                              _adapter
   * @type                              SCacheAdapter
   * @private
   * 
   * Store this current instance adapter
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                              constructor
   * @type                              Function
   * 
   * Construct the SCache instance with the settings passed in object format. See description bellow.
   * 
   * @param         {Object}          [settings={}]             
   * The settings for the SCache instance
   * - ttl (-1) {Number|String}: Time to live for each cache items in seconds or in String like '10s', '20h', '300ms', etc...
   * - deleteOnExpire (true) {Boolean}: Specify if you want that the items are deleted on expire
   * - adapter (fs) {String|SCacheAdapter}: Specify the adapter to use as default one. Can be a simple string like "fs" (filesystem) or an instance of an SCacheAdapter class. Here's the available ones:
   *    - 'fs': File system that store the items in the "temp" folder of your system
   *    - SCacheFsAdapter: An instance of the SCacheFsAdapter class that you can configure as you want
   * - parse (JSON.parse) {Function}: Specify the function used to parse the items once theirs get back from theirs save place
   * - stringify (JSON.stringify) {Function}: Specify the function used to stringify the item object before saving it
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SCache(settings = {}) {
    _classCallCheck(this, SCache);

    _defineProperty(this, "_name", null);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_defaultAdaptersPaths", {
      ls: '@coffeekraken/sugar/js/cache/adapters/SCacheLsAdapter',
      fs: `@coffeekraken/sugar/node/cache/adapters/SCacheFsAdapter`
    });

    _defineProperty(this, "_adapter", null);

    // make sure we have a name
    if (!settings.name) {
      throw new Error(`The SCache instance need a name. To set it, pass the "name" property in the "settings" object...`);
    } // store the name


    if (!/^[a-zA-Z0-9_-]+$/.test(settings.name)) {
      throw new Error(`The name of an SCache instance can contain only letters like [a-zA-Z0-9_-]...`);
    }

    this._name = settings.name;
    this._settings = (0, _deepMerge.default)({
      ttl: -1,
      deleteOnExpire: true,
      adapter: (0, _node.default)() ? 'fs' : 'ls',
      parse: JSON.parse,
      stringify: JSON.stringify
    }, settings);
  }
  /**
   * @name                            adapter
   * @type                            SCacheAdapter
   * 
   * Access this cache instance adapter
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SCache, [{
    key: "getAdapter",
    value: async function getAdapter() {
      // check if we have already an adapter setted for this instance
      if (this._adapter) return this._adapter; // get the adapter specified in the settings

      let adapter = this._settings.adapter; // check the type

      if (typeof adapter === 'string' && this._defaultAdaptersPaths[adapter]) {
        let adptr = await Promise.resolve().then(() => _interopRequireWildcard(require(`${
        /* webpackChunkName: "SCacheAdapter" */
        this._defaultAdaptersPaths[adapter]}`)));
        if (adptr.default) adptr = adptr.default;
        this._adapter = new adptr();
      } else if (adapter instanceof _SCacheAdapter.default) {
        this._adapter = adapter;
      } // return the adapter


      return this._adapter;
    }
    /**
     * @name                            get
     * @type                            Function
     * @async
     * 
     * Get a value back from the cache using the specified adapter in the settings
     * 
     * @param               {String}              name              The name of the item to get back from the cache
     * @param               {Boolean}             [valueOnly=true]  Specify if you want the value only or the all cache object
     * @return              {Promise}                               A promise that will be resolved once the item has been getted
     * 
     * @example             js
     * const myValue = myCache.get('coolValue');
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "get",
    value: async function get(name, valueOnly = true) {
      // get the adapter
      const adapter = await this.getAdapter(); // using the specified adapter to get the value back

      const rawValue = await adapter.get(`${this._name}.${name}`); // check that we have a value back

      if (!rawValue || typeof rawValue !== 'string') return null; // parse the raw value back to an object

      const value = adapter.parse ? adapter.parse(rawValue) : this._parse(rawValue); // check if the item is too old...

      if (value.deleteAt !== -1 && value.deleteAt < new Date().getTime()) {
        // this item has to be deleted
        if (value.deleteOnExpire) await adapter.delete(name); // return null cause the item is too old

        return null;
      } // otherwise, this is good so return the item
      // either the value only, or the full cache object


      if (valueOnly) return value.value;
      return value;
    }
    /**
     * @name                            set
     * @type                            Function
     * @async
     * 
     * Set a value to the cache system using the specified adapter with some settings like described bellow
     * 
     * @param               {String}              name              The name of the item to set in the cache system
     * @param               {Mixed}               value             The value to set.
     * @param               {Object}              [settings={}]     
     * The settings for this particular item:
     * - ttl (-1) {Number}: Time to live in seconds
     * - deleteOnExpire (true) {Boolean}: Specify if this item has to be deleted on expire on not
     * @return              {Promise}                               A promise that will be resolved once the item has been saved
     * 
     * @example             js
     * const myValue = myCache.set('coolValue', { hello: 'world' }, {
     *    ttl: 1000
     * });
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "set",
    value: async function set(name, value, settings = {}) {
      // test name
      if (!/^[a-zA-Z0-9_\-\+]+$/.test(name)) {
        throw new Error(`You try to set an item named "${name}" is the "${this._name}" SCache instance but an item name can contain only these characters [a-zA-Z0-9_-]...`);
      } // get the adapter


      const adapter = await this.getAdapter(); // try to get the value to update it

      const existingValue = await this.get(name, false); // merge the default and the item settings

      const finalSettings = (0, _deepMerge.default)({
        ttl: this._settings.ttl,
        deleteOnExpire: this._settings.deleteOnExpire
      }, settings); // initial the object that will be saved in the cache

      const deleteAt = finalSettings.ttl === -1 ? -1 : new Date().getTime() + (0, _convert.default)(typeof finalSettings.ttl === 'number' ? `${finalSettings.ttl}s` : finalSettings.ttl, 'ms');
      const valueToSave = {
        name,
        value,
        created: existingValue ? existingValue.created : new Date().getTime(),
        updated: new Date().getTime(),
        deleteAt,
        settings: finalSettings
      }; // stringify the value to save

      const stringifiedValueToSave = adapter.stringify ? adapter.stringify(valueToSave) : this._stringify(valueToSave); // use the adapter to save the value

      return adapter.set(`${this._name}.${name}`, stringifiedValueToSave);
    }
    /**
     * @name                                delete
     * @type                                Function
     * 
     * Delete an item in the cache by his name
     * 
     * @param                 {String}               name               The name of the item to delete
     * @return                {Promise}                                  A promise that will return true if correctly deleted, false if not
     * 
     * @example           js
     * await myCache.delete('coco');
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "delete",
    value: async function _delete(name) {
      // get the adapter
      const adapter = await this.getAdapter(); // delete the item

      return adapter.delete(`${this._name}.${name}`);
    }
    /**
     * @name                                clear
     * @type                                Function
     * 
     * Delete all the items in the current cache instance
     * 
     * @return                {Promise}                                  A promise that will return true if correctly deleted, false if not
     * 
     * @example           js
     * await myCache.clear();
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "clear",
    value: async function clear() {
      // get the adapter
      const adapter = await this.getAdapter(); // clear the cache

      return adapter.clear(this._name);
    }
    /**
     * @name                                _parse
     * @type                                Function
     * @private
     * 
     * Take the raw value getted from the cache system and parse it to his actual object format
     * You can hook how this method will act by specify the "settings.parse" property to a different function
     * 
     * @param               {String}                      rawValue                    The raw value to transform into an object
     * @return              {Object}                                                  The object format of the value getted back from the cache system
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_parse",
    value: function _parse(rawValue) {
      return this._settings.parse(rawValue);
    }
    /**
     * @name                                _stringify
     * @type                                Function
     * @private
     * 
     * Transform the passed object to a simple string in order to save it in the cache system using the specified adapter.
     * You can hook how this method will act by specify the "settings.stringify" property to a different function
     * 
     * @param               {Object}                      object                       The object to save to the cache system that have to transformed in string before...                
     * @return              {String}                                                  The string format of the item to save to cache
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_stringify",
    value: function _stringify(object) {
      return this._settings.stringify(object);
    }
  }]);

  return SCache;
}();

exports.default = SCache;
module.exports = exports.default;