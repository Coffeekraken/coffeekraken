"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _SCacheAdapter2 = _interopRequireDefault(require("./SCacheAdapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @name                                SCacheFsAdapter
 * @namespace           sugar.js.cache.adapters
 * @type                                Class
 *
 * A filesystem SCache adapter that allows you to store your cache items on the user system
 *
 * @example             js
 * const cache = new SCache({
 *    ttl: 100,
 *    adapter: new SCacheLsAdapter({
 *    })
 * });
 *
 * @since     2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SCacheLsAdapter = /*#__PURE__*/function (_SCacheAdapter) {
  _inherits(SCacheLsAdapter, _SCacheAdapter);

  var _super = _createSuper(SCacheLsAdapter);

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SCacheFsAdapter instance with the settings passed in object format. See description bellow.
   *
   * @param         {Object}          [settings={}]             An object to configure the SCacheFsAdapter instance. This is specific to each adapters.settings.settings...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SCacheLsAdapter(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SCacheLsAdapter);

    return _super.call(this, (0, _deepMerge.default)({}, settings));
  }
  /**
   * @name                          set
   * @type                          Function
   *
   * Set a cache item in the localstorage
   *
   * @param             {String}              name              The item name
   * @param             {Mixed}               value             The value to save
   * @param             {Object}              [settings={}]     A settings object to override the default ones defined on the SCache instance
   * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
   *
   * @example           js
   * await myCache.set('myCoolItem', { hello: 'world' }, {
   *    ttl: 40000
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SCacheLsAdapter, [{
    key: "set",
    value: function () {
      var _set = _asyncToGenerator(function* (name, value) {
        // store data into localStorage
        window.localStorage.setItem("".concat(this._settings.name, ".").concat(name), value); // write has been done correctly

        return true;
      });

      function set(_x, _x2) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
    /**
     * @name                          get
     * @type                          Function
     *
     * Get a cache item in the localstorage
     *
     * @param             {String}              name              The item name
     * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
     *
     * @example           js
     * await myCache.get('myCoolItem');
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(function* (name) {
        return window.localStorage.getItem("".concat(this._settings.name, ".").concat(name));
      });

      function get(_x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * @name                          delete
     * @type                          Function
     *
     * Delete a cache item on the filesystem
     *
     * @param             {String}              name              The item name
     * @return            {Boolean}                               true if all of, false if not...
     *
     * @example           js
     * await myCache.delete('myCoolItem');
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(function* (name) {
        // delete the item from the localStorage
        window.localStorage.removeItem("".concat(this._settings.name, ".").concat(name)); // return true cause all went well

        return true;
      });

      function _delete(_x4) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
    /**
     * @name                          clear
     * @type                          Function
     *
     * Clear all the items in the current cache
     *
     * @param             {String}              cacheName              The current cache name to delete
     * @return            {Boolean}                               true if all of, false if not...
     *
     * @example           js
     * await myCache.clear;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "clear",
    value: function () {
      var _clear = _asyncToGenerator(function* (cacheName) {
        // get all the localStorage keys to filter them
        var keys = Object.keys(window.localStorage); // filter the keys to delete

        var keysToDelete = keys.filter(key => {
          return key.startsWith("".concat(cacheName, "."));
        }); // loop on each keys to delete

        keysToDelete.forEach(k => {
          window.localStorage.removeItem(k);
        }); // return true cause all went well

        return true;
      });

      function clear(_x5) {
        return _clear.apply(this, arguments);
      }

      return clear;
    }()
    /**
     * @name                      keys
     * @type                      Function
     * @async
     *
     * Return an array of all the items keys saved in this cache instance
     *
     * @param             {String}              cacheName              The current cache name to get keys from
     * @return        {Promise}                     A promise resolved with the array of keys
     *
     * @example         js
     * const keys = await myCache.keys(); // => ['item1','item2']
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "keys",
    value: function () {
      var _keys = _asyncToGenerator(function* (cacheName) {
        // get all the localStorage keys to filter them
        var keys = Object.keys(window.localStorage); // filter the keys to get only the ones that bellongs to this cache instance

        var cacheKeys = keys.filter(key => {
          return key.startsWith("".concat(cacheName, "."));
        }); // return the cache keys

        return cacheKeys;
      });

      function keys(_x6) {
        return _keys.apply(this, arguments);
      }

      return keys;
    }()
  }]);

  return SCacheLsAdapter;
}(_SCacheAdapter2.default);

exports.default = SCacheLsAdapter;
module.exports = exports.default;