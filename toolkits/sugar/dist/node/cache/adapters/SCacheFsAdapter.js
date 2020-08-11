"use strict";

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

var __deepMerge = require('../../object/deepMerge');

var __tmpDir = require('../../fs/tmpDir');

var __fs = require('fs');

var __ensureDirSync = require('../../fs/ensureDirSync');

var __removeSync = require('../../fs/removeSync');

var __SCacheAdapter = require('../../../../js/cache/adapters/SCacheAdapter');
/**
 * @name                                SCacheFsAdapter
 * @namespace           node.fs.cacheAdapters
 * @type                                Class
 *
 * A filesystem SCache adapter that allows you to store your cache items on the user system
 *
 * @example             js
 * const cache = new SCache({
 *    ttl: 100,
 *    adapter: new SCacheFsAdapter({
 *      path: '/my/cool/folder
 *    })
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SCacheAdapter) {
  _inherits(SCacheFsAdapter, _SCacheAdapter);

  var _super = _createSuper(SCacheFsAdapter);

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
  function SCacheFsAdapter(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SCacheFsAdapter);

    return _super.call(this, __deepMerge({
      path: "".concat(__tmpDir(), "/SCache")
    }, settings));
  }
  /**
   * @name                          set
   * @type                          Function
   *
   * Set a cache item on the filesystem
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


  _createClass(SCacheFsAdapter, [{
    key: "set",
    value: function () {
      var _set = _asyncToGenerator(function* (name, value) {
        // generate the item fs name
        var fsName = "".concat(name.replace('.', '/'), ".json"); // ensure we have the folder

        __ensureDirSync("".concat(this._settings.path, "/").concat(fsName.split('/').slice(0, -1).join('/'))); // write the json file


        __fs.writeFileSync("".concat(this._settings.path, "/").concat(fsName), value); // write has been done correctly


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
     * Get a cache item on the filesystem
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
        // generate the item fs name
        var fsName = "".concat(name.replace('.', '/'), ".json"); // check that the file exists

        if (!__fs.existsSync("".concat(this._settings.path, "/").concat(fsName))) return null; // read the json file

        return __fs.readFileSync("".concat(this._settings.path, "/").concat(fsName), 'utf8');
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
        // generate the item fs name
        var fsName = "".concat(name.replace('.', '/'), ".json"); // read the json file

        return __fs.unlinkSync("".concat(this._settings.path, "/").concat(fsName));
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
        // read the json file
        return __removeSync("".concat(this._settings.path, "/").concat(cacheName));
      });

      function clear(_x5) {
        return _clear.apply(this, arguments);
      }

      return clear;
    }()
  }]);

  return SCacheFsAdapter;
}(__SCacheAdapter);