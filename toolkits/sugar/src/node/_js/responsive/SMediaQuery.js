"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SPromise2 = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                SMediaQuery
 * @namespace           sugar.js.responsive
 * @type                Class
 * @extends             SPromise
 *
 * This class expose some nice and easy methods to get the active media query defined in the config.media.queries configuration
 * stack, as well as register to some events list "match" or "unmatch".
 *
 * @param           {String}            mediaName           The media name you want to track. Can be an array of names or simple "*" to track every media queries
 * @param           {Object}            [settings={}]       An object of settings to configure your media query instance
 *
 * @example             js
 * import SMediaQuery from '@coffeekraken/sugar/js/responsive/SMediaQuery';
 * const mediaQuery = new SMediaQuery('mobile');
 * mediaQuery.on('match', media => {
 *      // do something
 * });
 * SMediaQuery.getActiveMedia(); // => mobile
 *
 * @since           2.0.0
 * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SMediaQuery = /*#__PURE__*/function (_SPromise) {
  _inherits(SMediaQuery, _SPromise);

  var _super = _createSuper(SMediaQuery);

  _createClass(SMediaQuery, null, [{
    key: "getActiveMedia",

    /**
     * @name                this._activeMedia
     * @type                String
     * @static
     *
     * Store the active media name
     *
     * @since           2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name                _promisesStack
     * @type                Object
     * @static
     *
     * Store all the promises for each media
     *
     * @since           2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name              startListener
     * @type              Function
     * @static
     *
     * Add the global listener based on the "init-body-media-queries" scss mixin
     *
     * @since             2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function getActiveMedia() {
      return this._activeMedia;
    }
    /**
     * @name              startListener
     * @type              Function
     * @static
     *
     * Add the global listener based on the "init-body-media-queries" scss mixin
     *
     * @since             2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "startListener",
    value: function startListener() {
      document.addEventListener('animationend', e => {
        var mediaName = e.animationName.replace(/^mq-/, '');
        var previousActiveMedia = this._activeMedia; // keep track of the active media

        this._activeMedia = mediaName;
        Object.keys(this._promisesStack).forEach(name => {
          var nameArray = name.split(' ');

          if (previousActiveMedia) {
            if (nameArray.indexOf(previousActiveMedia) !== -1) {
              var promises = this._promisesStack[name];
              promises.forEach(promise => {
                promise.trigger('unmatch', {
                  name: previousActiveMedia
                });
              });
            }
          }

          if (nameArray.indexOf(mediaName) !== -1) {
            var promise = this._promisesStack[name];
            var _promises = this._promisesStack[name];

            _promises.forEach(promise => {
              promise.trigger('match', {
                name: mediaName
              });
            });
          }
        });

        if (this._promisesStack['*']) {
          var allPromises = this._promisesStack['*'];
          allPromises.forEach(allPromise => {
            if (previousActiveMedia) {
              allPromise.trigger('unmatch', {
                name: previousActiveMedia
              });
            }

            allPromise.trigger('match', {
              name: mediaName
            });
          });
        }
      });
    }
    /**
     * @name                constructor
     * @type                Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }]);

  function SMediaQuery(mediaName, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SMediaQuery);

    if (!Array.isArray(mediaName)) mediaName = [mediaName];
    var name = mediaName.join(' ');
    _this = _super.call(this, settings, {
      id: "SMediaQuery.".concat(name.split(' ').join('-'))
    });
    if (!_this.constructor._promisesStack[name]) _this.constructor._promisesStack[name] = [];

    _this.constructor._promisesStack[name].push(_assertThisInitialized(_this));

    return _this;
  }

  return SMediaQuery;
}(_SPromise2.default); // start listener


_defineProperty(SMediaQuery, "_activeMedia", 'desktop');

_defineProperty(SMediaQuery, "_promisesStack", {});

SMediaQuery.startListener();
var _default = SMediaQuery;
exports.default = _default;
module.exports = exports.default;