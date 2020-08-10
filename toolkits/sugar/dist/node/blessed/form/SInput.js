"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

const __SPromise = require('../../promise/SPromise');

const __color = require('../../color/color');

const __escapeStack = require('../../terminal/escapeStack');

const __activeSpace = require('../../core/activeSpace');
/**
 * @name                  SInput
 * @namespace           node.blessed.input
 * @type                  Class
 *
 * This class represent a simple input
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - escapeKey (false) {Boolean}: Specify if you want to reject the input promise on escape key press
 * - placeholder (null) {String}: Specify a placeholder
 * - width (null) {String|Number}: This is the normal blessed component width parameter but you can specify "auto" if you want the input to adapt his width depending on his content
 *
 * // TODO: document the "promise" and "$input" properties
 *
 * @example       js
 * const SInput = require('@coffeekraken/sugar/node/blessed/form/SInput');
 * new SInput({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SComponent) {
  _inherits(SInput, _SComponent);

  var _super = _createSuper(SInput);

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SInput(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SInput);

    const inputSettings = __deepMerge({
      focus: true,
      placeholder: null,
      width: '100%',
      height: 3,
      keys: true,
      mouse: true,
      inputOnFocus: true,
      style: {
        bg: __color('terminal.cyan').toString(),
        fg: __color('terminal.black').toString()
      },
      padding: {
        top: 1,
        bottom: 1,
        left: 2,
        right: 2
      }
    }, settings);

    _this = _super.call(this, {// width: '100%',
      // height: null,
    });
    _this._escapeKeyPromise = null;
    _this.$input = __blessed.textbox(inputSettings);
    _this.promise = new __SPromise((resolve, reject, trigger, cancel) => {}).start();
    _this.$input.height = inputSettings.padding.top + inputSettings.padding.bottom + 1;
    _this.height = inputSettings.padding.top + inputSettings.padding.bottom + 1;

    _this.$input.on('blur', () => {
      console.log('blue');

      if (_this.$input.focused) {
        console.log('remove');
      }
    });

    _this.$input.on('focus', () => {
      __activeSpace.append('form.input');

      _this._escapeKeyPromise = __escapeStack(() => {
        __activeSpace.remove('.form.input');
      });
    });

    _this.$input.on('attach', () => {
      setTimeout(() => {
        if (inputSettings.focus) _this.$input.focus();
        let placeholderPressed = false;

        if (inputSettings.placeholder) {
          const placeholder = inputSettings.placeholder.toString();

          if (inputSettings.width === 'auto') {
            _this.$input.width = placeholder.length + _this.$input.padding.left + _this.$input.padding.right + 2;
          }

          _this.$input.setValue(placeholder);
        }

        let isBackspace = false;

        _this.$input.onceKey('backspace,space,escape', () => {
          isBackspace = true;
        });

        _this.$input.on('keypress', (value, key) => {
          setTimeout(() => {
            if (inputSettings.placeholder && !placeholderPressed) {
              if (!isBackspace) {
                _this.$input.setValue(value);
              }

              placeholderPressed = true;
            }

            if (inputSettings.width === 'auto') {
              _this.$input.width = _this.$input.getValue().length + _this.$input.padding.left + _this.$input.padding.right + 2;
            }

            _this.update();
          });
        });

        _this.$input.on('submit', value => {
          _this.promise.resolve(value);

          _this.$input.style.bg = __color('terminal.green').toString();

          if (inputSettings.width === 'auto') {
            _this.$input.width = _this.$input.getValue().length + _this.$input.padding.left + _this.$input.padding.right;
          }

          __activeSpace.remove('.form.input');

          if (_this._escapeKeyPromise) _this._escapeKeyPromise.cancel();

          _this.update();
        });

        _this.$input.on('cancel', () => {
          _this.promise.cancel();

          _this.$input.style.bg = __color('terminal.red').toString();

          if (inputSettings.width === 'auto') {
            _this.$input.width = _this.$input.getValue().length + _this.$input.padding.left + _this.$input.padding.right;
          }

          __activeSpace.remove('.form.input');

          if (_this._escapeKeyPromise) _this._escapeKeyPromise.cancel();

          _this.update();
        });

        _this.update();
      });
    });

    _this.append(_this.$input);

    return _this;
  }

  return SInput;
}(__SComponent);