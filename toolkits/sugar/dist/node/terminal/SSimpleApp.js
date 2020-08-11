"use strict";

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

var __SApp = require('./SApp');

var __SHeader = require('./SHeader');

var __deepMerge = require('../object/deepMerge');

var __blessed = require('blessed');

var __parseHtml = require('./parseHtml');

var __splitEvery = require('../string/splitEvery');

var __countLine = require('../string/countLine');

var __parseSchema = require('../url/parseSchema');

var __sugarConfig = require('../config/sugar');
/**
 * @name                    SSimpleApp
 * @namespace           node.terminal
 * @type                    Class
 *
 * This class define an application in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this application
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 *
 * @example         js
 * const SSimpleApp = require('@coffeekraken/sugar/node/terminal/SSimpleApp');
 * const app = new SSimpleApp('My Cool Application', {
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SApp) {
  _inherits(SSimpleApp, _SApp);

  var _super = _createSuper(SSimpleApp);

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SSimpleApp(name, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SSimpleApp);

    // extend from blessed.box
    _this = _super.call(this, name, __deepMerge({}, settings));
    _this._settings.layout = _this._layout.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * @name              _layout
   * @type              Function
   * @private
   *
   * Render the layout of the app
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SSimpleApp, [{
    key: "_layout",
    value: function _layout(content) {
      // make a container box
      var container = __blessed.box({
        width: '100%',
        height: '100%'
      }); // preparing the menu


      var menuString = '';
      Object.keys(this._settings.menu).forEach((url, i) => {
        var menuObj = this._settings.menu[url];
        menuString += this.isActive(url) ? "<bgBlack> ".concat(menuObj.title, " </bgBlack>") : "<black> ".concat(menuObj.title, " </black>");
      });
      var headerContent = "<black>Coffeekraken Sugar</black>\n" + "{right}".concat(menuString, "{/right}");
      var header = new __SHeader(headerContent, {
        blessed: {
          style: {
            bg: __sugarConfig('colors.primary.color')
          }
        }
      });
      content.top = header.height;
      content.width = '100%';
      container.append(header);
      container.append(content); // return the container

      return container;
    }
  }]);

  return SSimpleApp;
}(__SApp);