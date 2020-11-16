"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SCacheAdapter = _interopRequireDefault(require("./adapters/SCacheAdapter"));

var _convert = _interopRequireDefault(require("../time/convert"));

var _node = _interopRequireDefault(require("../is/node"));

var _md = _interopRequireDefault(require("../crypt/md5"));

var _toString = _interopRequireDefault(require("../string/toString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                                SCache
 * @namespace           sugar.js.cache
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
 * @since     2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SCache = /*#__PURE__*/function () {
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
   * @param         {String}        name                  A name for your cache instance. Can have only these characters: [a-zA-Z0-9_-]
   * @param         {Object}          [settings={}]         The settings for the SCache instance
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
  function SCache(name, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SCache);

    _defineProperty(this, "_name", null);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_defaultAdaptersPaths", {
      ls: '@coffeekraken/sugar/js/cache/adapters/SCacheLsAdapter',
      fs: "../../cache/adapters/SCacheFsAdapter"
    });

    _defineProperty(this, "_adapter", null);

    // make sure we have a name
    if (!name) {
      throw new Error("The SCache instance need a name. To set it, pass the \"name\" as the first argument of the constructor...");
    } // store the name


    if (!/^[a-zA-Z0-9-_\.]+$/.test(name)) {
      throw new Error("The name of an SCache instance can contain only letters like <green>[a-zA-Z0-9_-.]</green> but you've passed \"<red>".concat(name, "</red>\"..."));
    }

    this._name = name;
    this._settings = (0, _deepMerge.default)({
      name,
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
    value: function () {
      var _getAdapter = _asyncToGenerator(function* () {
        // check if we have already an adapter setted for this instance
        if (this._adapter) return this._adapter; // get the adapter specified in the settings

        var adapter = this._settings.adapter; // check the type

        if (typeof adapter === 'string' && this._defaultAdaptersPaths[adapter]) {
          var adptr = yield Promise.resolve("".concat(
          /* webpackChunkName: "SCacheAdapter" */
          this._defaultAdaptersPaths[adapter])).then(s => _interopRequireWildcard(require(s)));
          if (adptr.default) adptr = adptr.default;
          this._adapter = new adptr(this._settings);
        } else if (adapter instanceof _SCacheAdapter.default) {
          this._adapter = adapter;
        } // return the adapter


        return this._adapter;
      });

      function getAdapter() {
        return _getAdapter.apply(this, arguments);
      }

      return getAdapter;
    }()
    /**
     * @name                            get
     * @type                            Function
     * @async
     *
     * Get a value back from the cache using the specified adapter in the settings
     *
     * @param               {String|Array|Object}              name              The name of the item to get back from the cache. If not a string, will be hased using md5 encryption
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
    value: function () {
      var _get = _asyncToGenerator(function* (name, valueOnly) {
        if (valueOnly === void 0) {
          valueOnly = true;
        }

        // check the name
        if (typeof name !== 'string') {
          name = (0, _md.default)((0, _toString.default)(name)).toString();
        } // get the adapter


        var adapter = yield this.getAdapter(); // using the specified adapter to get the value back

        var rawValue = yield adapter.get("".concat(this._name, ".").concat(name)); // check that we have a value back

        if (!rawValue || typeof rawValue !== 'string') return null; // parse the raw value back to an object

        var value = adapter.parse ? adapter.parse(rawValue) : this._parse(rawValue); // check if the item is too old...

        if (value.deleteAt !== -1 && value.deleteAt < new Date().getTime()) {
          // this item has to be deleted
          if (value.deleteOnExpire) yield adapter.delete(name); // return null cause the item is too old

          return null;
        } // otherwise, this is good so return the item
        // either the value only, or the full cache object


        if (valueOnly) return value.value;
        return value;
      });

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * @name                            set
     * @type                            Function
     * @async
     *
     * Set a value to the cache system using the specified adapter with some settings like described bellow
     *
     * @param               {String|Array|Object}              name              The name of the item to get back from the cache. If not a string, will be hased using md5 encryption
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
    value: function () {
      var _set = _asyncToGenerator(function* (name, value, settings) {
        if (settings === void 0) {
          settings = {};
        }

        // check the name
        if (typeof name !== 'string') {
          name = (0, _md.default)((0, _toString.default)(name)).toString();
        } // test name


        if (!/^[a-zA-Z0-9_\-\+\.]+$/.test(name)) {
          throw new Error("You try to set an item named \"<yellow>".concat(name, "</yellow>\" in the \"").concat(this._name, "\" SCache instance but an item name can contain only these characters <green>[a-zA-Z0-9_-.]</green> but you've passed \"<red>").concat(name, "</red>\"..."));
        } // get the adapter


        var adapter = yield this.getAdapter(); // try to get the value to update it

        var existingValue = yield this.get(name, false); // merge the default and the item settings

        var finalSettings = (0, _deepMerge.default)({
          ttl: this._settings.ttl,
          deleteOnExpire: this._settings.deleteOnExpire
        }, settings); // initial the object that will be saved in the cache

        var deleteAt = finalSettings.ttl === -1 ? -1 : new Date().getTime() + (0, _convert.default)(typeof finalSettings.ttl === 'number' ? "".concat(finalSettings.ttl, "s") : finalSettings.ttl, 'ms');
        var valueToSave = {
          name,
          value,
          created: existingValue ? existingValue.created : new Date().getTime(),
          updated: new Date().getTime(),
          deleteAt,
          settings: finalSettings
        }; // stringify the value to save

        var stringifiedValueToSave = adapter.stringify ? adapter.stringify(valueToSave) : this._stringify(valueToSave); // use the adapter to save the value

        return adapter.set("".concat(this._name, ".").concat(name), stringifiedValueToSave);
      });

      function set(_x3, _x4, _x5) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
    /**
     * @name                                exists
     * @type                                Function
     * @async
     *
     * Check if the passed cache item id exists
     *
     * @param                 {String}               name               The name of the item to check
     * @return                {Boolean}                             true if exists, false if not
     *
     * @example           js
     * await myCache.exists('coco'); // => true
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "exists",
    value: function () {
      var _exists = _asyncToGenerator(function* (name) {
        // check
        var value = yield this.get(name); // return the status

        if (value) return true;
        return false;
      });

      function exists(_x6) {
        return _exists.apply(this, arguments);
      }

      return exists;
    }()
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
    value: function () {
      var _delete2 = _asyncToGenerator(function* (name) {
        // get the adapter
        var adapter = yield this.getAdapter(); // delete the item

        return adapter.delete("".concat(this._name, ".").concat(name));
      });

      function _delete(_x7) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
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
    value: function () {
      var _clear = _asyncToGenerator(function* () {
        // get the adapter
        var adapter = yield this.getAdapter(); // clear the cache

        return adapter.clear(this._name);
      });

      function clear() {
        return _clear.apply(this, arguments);
      }

      return clear;
    }()
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