"use strict";

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

const __blessed = require('blessed');

const __SComponent = require('../SComponent');

const __deepMerge = require('../../object/deepMerge');

const __parseHtml = require('../../terminal/parseHtml');

const __countLine = require('../../string/countLine');

const __hotkey = require('../../keyboard/hotkey');

const __color = require('../../color/color');

const __SPromise = require('../../promise/SPromise');

const __SInput = require('../form/SInput');

const __multiple = require('../../class/multipleExtends');

const __activeSpace = require('../../core/activeSpace');

const __escapeStack = require('../../terminal/escapeStack');
/**
 * @name                  SWindowBox
 * @namespace           node.blessed.box
 * @type                  Class
 *
 * This class gives you the ability to display windowed style boxes with a header, a body and a footer
 *
 * @param         {Array}          $content               A content to display inside the window. Must be a child of blessed.node class
 * @param        {Object}         [settings = {}]         A settings object to configure your this. Here's the available settings:
 * - title (null) {String|blessed.node}: The box title to display
 * - titleRight (null) {String|blessed.node}: The box title displayed to the right
 * - footer (null) {String|blessed.node}: The box footer to display
 * - footerRight (null) {String|blessed.node}: The box footer displayed to the right
 * - colors ({}) {Object}: The colors to use for the window
 *    - fg (black) {Color}: The foreground color to use
 *    - bg (__color('terminal.primary').toString()) {Color}: The background color to use
 * - ...blessed.box settings
 * @example       js
 * const SWindowBox = require('@coffeekraken/sugar/node/blessed/box/SWindowBox');
 * const box = new SWindowBox(myCoolContent, {});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SComponent) {
  _inherits(SWindowBox, _SComponent);

  var _super = _createSuper(SWindowBox);

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SWindowBox($content, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SWindowBox);

    _this = _super.call(this, __deepMerge({
      style: {
        fg: 'black',
        bg: __color('terminal.primary').toString()
      },
      padding: {
        top: 1,
        left: 2,
        right: 2,
        bottom: 1
      }
    }, settings));
    _this._$body = __blessed.box({
      width: '100%',
      height: '100%',
      position: {
        top: 0,
        left: 0
      },
      style: {
        fg: 'white',
        bg: 'black'
      }
    });

    _this.append(_this._$body);

    _this.update();

    return _this;
  }

  _createClass(SWindowBox, [{
    key: "update",
    value: function update() {
      setTimeout(() => {
        _get(_getPrototypeOf(SWindowBox.prototype), "update", this).call(this);
      });
    }
  }]);

  return SWindowBox;
}(__SComponent);