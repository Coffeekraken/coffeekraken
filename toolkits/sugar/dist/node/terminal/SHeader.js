"use strict";

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __deepMerge = require('../object/deepMerge');

var __blessed = require('blessed');

var __parseHtml = require('./parseHtml');

var __splitEvery = require('../string/splitEvery');

var __countLine = require('../string/countLine');
/**
 * @name                    SHeader
 * @namespace           node.terminal
 * @type                    Class
 *
 * This class define a "header" in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          title            Specify a title for this header.
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 * - screen (true) {Boolean}: Specify if you want your header wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your header in the terminal. If you have your own screen object
 *
 * @example         js
 * const SHeader = require('@coffeekraken/sugar/node/terminal/SHeader');
 * const header = new SHeader('Hello world', {});
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = /*#__PURE__*/function (_blessed$box) {
  _inherits(SHeader, _blessed$box);

  var _super = _createSuper(SHeader);

  /**
   * @name              _title
   * @type              String
   * @private
   *
   * Store the header title
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the header settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SHeader(title, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SHeader);

    // save the settings
    var _settings = __deepMerge({
      blessed: {
        tags: true,
        padding: {
          top: 1,
          bottom: 0,
          left: 2,
          right: 1
        }
      }
    }, settings); // extend from blessed.box


    _this = _super.call(this, _settings.blessed); // save settings

    _defineProperty(_assertThisInitialized(_this), "_title", null);

    _defineProperty(_assertThisInitialized(_this), "_settings", {});

    _this._settings = _settings; // save the title

    _this._title = title; // set the size

    _this.height = 3; // set the header content

    _this.setContent(__parseHtml(title)); // render the screen


    if (_this.screen) _this.screen.render();
    return _this;
  }

  return SHeader;
}(__blessed.box), _temp);