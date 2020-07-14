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
 * @name 		SGradientSvgFilter
 * @namespace           js.filter
 * @type      Class
 * @extends 		SSvgFilter
 *
 * This SVG filter class apply either a linear or a radial gradient of your choice
 * on an HTMLElement.
 * This is useful cause the gradient will only be applied on part of the elements that is really visible and will respect the opacity
 * of each parts
 *
 * @example 		js
 * const filter = new SGradientSvgFilter();
 * filter.linear(['red','blue','green']);
 * filter.applyTo(myCoolHTMLElement);
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SGradientSvgFilter = /*#__PURE__*/function (_SSvgFilter) {
  _inherits(SGradientSvgFilter, _SSvgFilter);

  var _super = _createSuper(SGradientSvgFilter);

  /**
   * @name          constructor
   * @type          Function
   *
   * Constructor
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SGradientSvgFilter() {
    var _this;

    _classCallCheck(this, SGradientSvgFilter);

    _this = _super.call(this, `
			<feImage xlink:href="" x="0" y="0" result="IMAGEFILL" preserveAspectRatio="none" />
			<feComposite operator="in" in="IMAGEFILL" in2="SourceAlpha" />
		`);
    _this._image = _this.filter.querySelector('feImage');
    _this._tile = _this.filter.querySelector('feTile');
    return _this;
  }
  /**
   * @name              linear
   * @type              Function
   *
   * Linear gradient
   *
   * @param 		{Array} 			colors 			An array of colors for your gradient
   * @param 		{Object} 			settings 		The settings of your gradient that consist of an object like : ```{width: 512, height: 512, x0: 0, x1: 512, y0: 0, y1: 1}```
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SGradientSvgFilter, [{
    key: "linear",
    value: function linear(colors, settings = {}) {
      let width = settings.width || 512,
          height = settings.height || 512,
          x0 = settings.x0 || 0,
          x1 = settings.x1 || width,
          y0 = settings.y0 || 0,
          y1 = settings.y1 || 0;
      let can = document.createElement('canvas');
      can.setAttribute('width', width);
      can.setAttribute('height', height);
      let ctx = can.getContext('2d'),
          grad = ctx.createLinearGradient(x0, y0, x1, y1); // loop on each colors

      let i = 0;
      colors.forEach(color => {
        grad.addColorStop(1 / (colors.length - 1) * i, color);
        i++;
      });
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      this.grad64 = can.toDataURL();

      this._image.setAttribute('xlink:href', this.grad64);
    }
    /**
     * @name          radial
     * @type          Function
     *
     * Radial gradient
     *
     * @param 		{Array} 			colors 			An array of colors for your gradient
     * @param 		{Object} 			settings 		The settings of your gradient that consist of an object like : ```{width: 512, height: 512, x0: 256, x1: 256, y0: 256, y1: 256, r0: 0, r1: 512}```
     *
     * @example         js
     * myFilter.radial(['#ff0000', '#00ffff], {
     *    width: 300,
     *    height: 300
     * });
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "radial",
    value: function radial(colors, settings = {}) {
      let width = settings.width || 512,
          height = settings.height || 512,
          x0 = settings.x0 || width / 2,
          x1 = settings.x1 || width / 2,
          r0 = settings.r0 || 0,
          y0 = settings.y0 || height / 2,
          y1 = settings.y1 || height / 2,
          r1 = settings.r1 || width;
      let can = document.createElement('canvas');
      can.setAttribute('width', width);
      can.setAttribute('height', height);
      let ctx = can.getContext('2d'),
          grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1); // loop on each colors

      let i = 0;
      colors.forEach(color => {
        grad.addColorStop(1 / (colors.length - 1) * i, color);
        i++;
      });
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      this.grad64 = can.toDataURL();

      this._image.setAttribute('xlink:href', this.grad64);
    }
    /**
     * @name          applyTo
     * @type          Function
     * @override
     *
     * Apply the filter to element
     *
     * @param 		{HTMLElement} 		elm 		The element on which to apply the filter
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "applyTo",
    value: function applyTo(elm) {
      _get(_getPrototypeOf(SGradientSvgFilter.prototype), "applyTo", this).call(this, elm);

      this._setImageSize();

      window.addEventListener('resize', this._onWindowResize.bind(this));
    }
    /**
     * @name            unapplyFrom
     * @type            Function
     * @override
     *
     * Remove the filter from element
     *
     * @param 	{HTMLElement} 	elm 	The element to unapply the filter from
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "unapplyFrom",
    value: function unapplyFrom(elm) {
      _get(_getPrototypeOf(SGradientSvgFilter.prototype), "unapplyFrom", this).call(this, elm);

      window.removeEventListener('resize', this._onWindowResize);
    }
    /**
     * @name          _onWindowResize
     * @type          Function
     * @private
     *
     * When the window is resizing
     *
     * @param 		{Event} 		e 		The resize event
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_onWindowResize",
    value: function _onWindowResize(e) {
      // set the image size
      this._setImageSize();
    }
    /**
     * @name        _setImageSize
     * @type        Function
     * @private
     *
     * Set image width
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_setImageSize",
    value: function _setImageSize() {
      let width = this.elms[0].offsetWidth,
          height = this.elms[0].offsetHeight;

      if (width >= height) {
        this._image.setAttribute('width', width);

        this._image.removeAttribute('height');
      } else {
        this._image.setAttribute('height', height);

        this._image.removeAttribute('width');
      } // this._image.setAttribute('width', width);
      // this._image.setAttribute('height', height);

    }
  }]);

  return SGradientSvgFilter;
}(_SSvgFilter2.default); // export modules


var _default = SGradientSvgFilter;
exports.default = _default;
module.exports = exports.default;