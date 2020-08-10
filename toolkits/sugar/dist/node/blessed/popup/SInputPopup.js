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

const __deepMerge = require('../../object/deepMerge');

const __SInput = require('../form/SInput');

const __SPopup = require('./SPopup');

const __activeSpace = require('../../core/activeSpace');
/**
 * @name                  SInputPopup
 * @namespace           node.blessed.popup
 * @type                  Class
 * @extends               SPopup
 *
 * This class represent a simple input in a popup
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - closeDelay (500) {Number}: The delay before closing the popup when the input has been validated
 * - $input ({}) {Object}: An object of settings passed to the SInput instance constructor
 *
 * @example       js
 * const SInputPopup = require('@coffeekraken/sugar/node/blessed/popup/SInputPopup');
 * new SInputPopup({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SPopup) {
  _inherits(SInputPopup, _SPopup);

  var _super = _createSuper(SInputPopup);

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SInputPopup(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SInputPopup);

    _this = _super.call(this, __deepMerge({
      closeDelay: 500,
      $input: {}
    }, settings)); // create an input

    _this.$input = new __SInput(_this._settings.$input);

    _this.on('detach', () => {
      if (!_this.$input.promise.isPending()) return;

      _this.$input.promise.cancel();
    });

    _this.$input.promise.on('resolve', value => {
      setTimeout(() => {
        _this.parent.remove(_assertThisInitialized(_this));

        _this.promise.resolve(value);
      }, _this._settings.closeDelay);
    });

    _this.append(_this.$input);

    return _this;
  }

  _createClass(SInputPopup, [{
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(SInputPopup.prototype), "update", this).call(this);

      this.height = this.$content.getScrollHeight() + 5;
    }
  }]);

  return SInputPopup;
}(__SPopup);