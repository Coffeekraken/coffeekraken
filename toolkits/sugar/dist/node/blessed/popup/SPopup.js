"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __blessed = require('blessed');

var __SComponent = require('../SComponent');

var __deepMerge = require('../../object/deepMerge');

var __parseHtml = require('../../terminal/parseHtml');

var __color = require('../../color/color');

var __escapeStack = require('../../terminal/escapeStack');

var __activeSpace = require('../../core/activeSpace');

var __SPromise = require('../../promise/SPromise');
/**
 * @name                  SPopup
 * @namespace           node.blessed.popup
 * @type                  Class
 *
 * This class is the base one for all the sugar blessed components like input, panel, etc...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - title (null) {String}: The popup title
 * - description (null) {String}: A description to display in the popup
 * - id (popup) {String}: An id to identify the popup. This id will be appended to the "activeSpace" when the popup is opened
 *
 * @example       js
 * const SPopup = require('@coffeekraken/sugar/node/blessed/popup/SPopup');
 * const myPopup = new SPopup();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SComponent) {
  _inherits(SPopup, _SComponent);

  var _super = _createSuper(SPopup);

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SPopup(settings) {
    var _thisSuper, _thisSuper2, _thisSuper3, _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SPopup);

    _this = _super.call(this, __deepMerge({
      title: null,
      description: null,
      id: 'popup',
      width: '80%',
      height: 200,
      top: '50%',
      left: '50%',
      style: {
        bg: __color('terminal.primary').toString(),
        fg: __color('terminal.black').toString()
      },
      padding: {
        top: 0,
        bottom: 1,
        left: 2,
        right: 2
      },
      $title: {
        top: 0,
        height: 3,
        padding: {
          top: 1,
          bottom: 1,
          left: 0,
          right: 0
        }
      },
      $description: {
        height: 2,
        style: {
          bg: __color('terminal.black').toString(),
          fg: __color('terminal.white').toString()
        },
        padding: {
          top: 1,
          bottom: 0,
          left: 2,
          right: 2
        }
      },
      $content: {
        left: 0,
        right: 0,
        scrollable: true,
        scrollbar: {
          ch: ' ',
          inverse: true
        },
        scrollable: true,
        mouse: true,
        keys: true,
        padding: {
          top: 1,
          left: 2,
          bottom: 1,
          right: 2
        }
      }
    }, settings));

    if (_this._settings.title) {
      _this.$title = __blessed.box(_objectSpread(_objectSpread({
        style: _this._settings.style
      }, _this._settings.$title), {}, {
        content: __parseHtml(_this._settings.title)
      }));
    }

    if (_this._settings.description) {
      _this.$description = __blessed.box(_objectSpread(_objectSpread({}, _this._settings.$description), {}, {
        top: _this.$title ? _this.$title.height : 0,
        content: __parseHtml(_this._settings.description)
      }));
    }

    if (_this.$title) _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(SPopup.prototype)), "append", _thisSuper).call(_thisSuper, _this.$title);
    if (_this.$description) _get((_thisSuper2 = _assertThisInitialized(_this), _getPrototypeOf(SPopup.prototype)), "append", _thisSuper2).call(_thisSuper2, _this.$description);
    var contentTop = 0;
    if (_this.$title) contentTop += _this.$title.height;
    if (_this.$description) contentTop += _this.$description.height;
    _this.$content = __blessed.box(_objectSpread({
      top: contentTop,
      style: {
        scrollbar: {
          bg: _this._settings.style.bg || __color('terminal.primary').toString()
        }
      }
    }, _this._settings.$content || {}));
    _this.promise = new __SPromise(() => {}).start();

    _get((_thisSuper3 = _assertThisInitialized(_this), _getPrototypeOf(SPopup.prototype)), "append", _thisSuper3).call(_thisSuper3, _this.$content);

    _this.promise.trigger('open');

    __activeSpace.append(_this._settings.id);

    var escape = __escapeStack(() => {
      __activeSpace.previous();

      escape.cancel();

      _this.promise.trigger('close');

      _this.detach();
    });

    return _this;
  }
  /**
   * @name            append
   * @type            Function
   * @override
   *
   * This method is simply used to append content inside the popup
   *
   * @return        {SComponent}            Return this component to maintain chainability
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SPopup, [{
    key: "append",
    value: function append(content) {
      this.$content.append(content);
      return this;
    }
    /**
     * @name            update
     * @type            Function
     * @override
     *
     * This method simply draw the header
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "update",
    value: function update() {
      this.height = this.$content.getScrollHeight() + 7;
      this.top = "50%-".concat(Math.round(this.height / 2));
      this.left = "50%-".concat(Math.round(this.width / 2));

      _get(_getPrototypeOf(SPopup.prototype), "update", this).call(this);
    }
  }]);

  return SPopup;
}(__SComponent);