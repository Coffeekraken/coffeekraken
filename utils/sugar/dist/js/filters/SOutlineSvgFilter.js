"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SSvgFilter = _interopRequireDefault(require("./SSvgFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 			SOutlineSvgFilter
 * @extends 		SSvgFilter
 * This class represent an outline filter that can be applied on any HTMLElement.
 *
 * @example 		js
 * const filter = new SOutlineSvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SOutlineSvgFilter extends _SSvgFilter.default {
  /**
   * @constructor
   * @param 		{Number} 		amount 		The amount of effect to apply
   */
  constructor(radius = 8) {
    super("\n\t\t\t<feMorphology operator=\"dilate\" radius=\"".concat(radius, "\"\n\t\t\tin=\"SourceGraphic\" result=\"THICKNESS\" />\n\t\t\t<feComposite operator=\"out\" in=\"THICKNESS\" in2=\"SourceGraphic\" ></feComposite>\n\t\t"));
    this._$morphology = this.filter.querySelector("feMorphology");
  }
  /**
   * The radius to produce the effect
   * @type 	{Number}
   */


  set radius(value) {
    this._$morphology.setAttribute("radius", value);
  }

} // export modules


var _default = SOutlineSvgFilter;
exports.default = _default;
module.exports = exports.default;