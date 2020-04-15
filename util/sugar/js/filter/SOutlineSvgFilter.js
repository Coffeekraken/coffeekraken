"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SSvgFilter = _interopRequireDefault(require("./SSvgFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO tests

/**
 * @name 		        SOutlineSvgFilter
 * @namespace       sugar.js.filter
 * @type            Class
 * @extends 	    	SSvgFilter
 *
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
   * @name            constructor
   * @type            Function
   * 
   * Constructor
   * 
   * @param 		{Number} 		[radius=8] 		The amount of effect to apply
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(radius = 8) {
    super(`
			<feMorphology operator="dilate" radius="${radius}"
			in="SourceGraphic" result="THICKNESS" />
			<feComposite operator="out" in="THICKNESS" in2="SourceGraphic" ></feComposite>
		`);
    this._$morphology = this.filter.querySelector("feMorphology");
  }
  /**
   * @name          radius
   * @type          Number
   * 
   * Get/Set the radius to produce the effect
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  set radius(value) {
    this._$morphology.setAttribute("radius", value);
  }

  get radius() {
    return parseFloat(this._$morphology.getAttribute("radius"));
  }

} // export modules


var _default = SOutlineSvgFilter;
exports.default = _default;
module.exports = exports.default;