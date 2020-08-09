"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SSvgFilter2 = _interopRequireDefault(require("./SSvgFilter"));

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

// TODO tests

/**
 * @name 		        SGooeySvgFilter
 * @namespace           js.filter
 * @type           Class
 * @extends       SSvgFilter
 *
 * This class represent a gooey SVG filter that can be applied on any HTMLElement.
 * Here's the values that you can control on it:
 * - blur: The amout of blur you want
 * - contrast: The amout of contrast you want
 * - shrink: The amount of shrink you want
 * - amout: The overall amount of effect you want
 *
 * @example 		js
 * const filter = new SGooeySvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SGooeySvgFilter = /*#__PURE__*/function (_SSvgFilter) {
  _inherits(SGooeySvgFilter, _SSvgFilter);

  var _super = _createSuper(SGooeySvgFilter);

  /**
   * @name              constructor
   * @type              Function
   *
   * Constructor
   *
   * @param 		{Number} 		[amount=8] 		The amount of effect to apply
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SGooeySvgFilter(amount) {
    var _this;

    if (amount === void 0) {
      amount = 8;
    }

    _classCallCheck(this, SGooeySvgFilter);

    _this = _super.call(this, "\n\t\t\t<feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"".concat(amount, "\" result=\"blur\" />\n\t\t\t<feColorMatrix in=\"blur\" mode=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ").concat(parseInt(amount) + 9, " -9\" result=\"gooey\" />\n\t\t\t<feComposite in=\"SourceGraphic\" in2=\"gooey\" operator=\"atop\"/>\n\t\t"));
    _this._blur = _this.filter.querySelector('feGaussianBlur');
    _this._color_matrix = _this.filter.querySelector('feColorMatrix');
    return _this;
  }
  /**
   * @name                blur
   * @type                Number
   *
   * Get/Set the blur amount to produce the effect
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SGooeySvgFilter, [{
    key: "blur",
    set: function set(value) {
      this._blur.setAttribute('stdDeviation', value);
    },
    get: function get() {
      return parseFloat(this._blur.getAttribute('stdDeviation'));
    }
    /**
     * @name              contrast
     * @type              Number
     *
     * Get the contrast amount to produce the effect
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "contrast",
    set: function set(value) {
      // get value
      var v = this._color_matrix.getAttribute('values'); // process


      v = v.split(' ');
      v[v.length - 2] = value; // apply the new filter

      this._color_matrix.setAttribute('values', v.join(' '));
    }
    /**
     * @name            shrink
     * @type            Number
     *
     * Get the shrink amount to produce the effect
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "shrink",
    set: function set(value) {
      // get value
      var v = this._color_matrix.getAttribute('values'); // process


      v = v.split(' ');
      v[v.length - 1] = value; // apply the new filter

      this._color_matrix.setAttribute('values', v.join(' '));
    }
    /**
     * @name              amount
     * @type              Number
     *
     * Set the overall amount of effect to produce
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "amount",
    set: function set(value) {
      this._blur.setAttribute('stdDeviation', value);

      this._color_matrix.setAttribute('values', "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ".concat(parseInt(value) + 9, " -9"));
    }
  }]);

  return SGooeySvgFilter;
}(_SSvgFilter2.default); // export modules


var _default = SGooeySvgFilter;
exports.default = _default;
module.exports = exports.default;