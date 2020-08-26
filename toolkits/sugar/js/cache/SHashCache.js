"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _convert = _interopRequireDefault(require("../time/convert"));

var _node = _interopRequireDefault(require("../is/node"));

var _SCache2 = _interopRequireDefault(require("./SCache"));

var _md = _interopRequireDefault(require("../crypt/md5"));

var _toString = _interopRequireDefault(require("../string/toString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @name                                SHashCache
 * @namespace           js.cache
 * @type                                Class
 * @extends           SCache
 *
 * Gives you the ability to manage cache through some defaults available adapters or using yours.
 * This cache class take care of these features:
 * - Standard and custom TTL by cache item
 * - Delete cache items on expires or not
 *
 * @example             js
 * import SHashCache from '@coffeekraken/sugar/js/cache/SHashCache';
 * const cache = new SHashCache({
 *  ttl: '10s' // 10 seconds
 * });
 * cache.set('myCoolCacheItem', someData);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SHashCache = /*#__PURE__*/function (_SCache) {
  _inherits(SHashCache, _SCache);

  var _super = _createSuper(SHashCache);

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SHashCache instance with the settings passed in object format. See description bellow.
   *
   * @param         {String}        name                  A name for your cache instance. Can have only these characters: [a-zA-Z0-9_-]
   * @param         {Object}          [settings={}]               The settings for the SCache instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SHashCache(name, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SHashCache);

    return _super.call(this, name, (0, _deepMerge.default)({}, settings));
  }
  /**
   * @name              set
   * @type              Function
   * @async
   * @override
   *
   * Set an item into the cache by passing an object as reference as well as a value to store
   *
   * @param             {Object}          referenceObj        The object that will serve as base for calculating the hash used as name
   * @param             {Mixed}            value              The value to save in cache
   * @param             {Object}            [settings={}]       A settings object that support all the properties of the SCache.set method
   * @return            {Promise}                             A promise that will be resolved once the value has been cached
   *
   * @since           2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SHashCache, [{
    key: "set",
    value: function () {
      var _set = _asyncToGenerator(function* (referenceObj, value, settings) {
        if (settings === void 0) {
          settings = {};
        }

        // calculating the checksum
        var checksum = (0, _md.default)((0, _toString.default)(referenceObj)).toString();
        console.log('SAVE', checksum); // save the value in the cache

        return _get(_getPrototypeOf(SHashCache.prototype), "set", this).call(this, checksum, value, settings);
      });

      function set(_x, _x2, _x3) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
    /**
     * @name            get
     * @type            Function
     * @async
     * @override
     *
     * Get an item by passing a referenceObj that will be transformed into a checksum used as cache id.
     *
     * @since           2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "get",
    value: function () {
      var _get2 = _asyncToGenerator(function* (referenceObj, valueOnly) {
        if (valueOnly === void 0) {
          valueOnly = true;
        }

        // calculating the checksum
        var checksum = (0, _md.default)((0, _toString.default)(referenceObj)).toString(); // return the value getted from the cache

        return _get(_getPrototypeOf(SHashCache.prototype), "get", this).call(this, checksum, valueOnly);
      });

      function get(_x4, _x5) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
  }]);

  return SHashCache;
}(_SCache2.default);

exports.default = SHashCache;
module.exports = exports.default;