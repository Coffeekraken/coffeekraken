"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqid = _interopRequireDefault(require("../utils/uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 			SSvgFilter
 * This class allows you to create with ease some complexe SVG filters and to apply it on any HTMLElement that you want
 * by extending this class like so
 *
 * @example 		js
 * class MyBlurFilter extends SSvgFilter {
 *
 * 		constructor(amount = 8) {
 * 			super(`
 * 				<feGaussianBlur in="SourceGraphic" stdDeviation="${amount}" result="blur" />
 * 			`);
 * 		}
 * }
 *
 * // using your filter
 * const myFilter = new MyBlurFilter(10);
 * myFilter.applyTo(myCoolHTMLElement);
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _sSvgFilters = [];
let _sIsSvgInjected = false;

class SSvgFilter {
  /**
   * @constructor
   * @param 			{String} 			The SVG filter string representation
   */
  constructor(filter_content) {
    // save the reference of each elements
    this.elms = []; // save parameters

    this.filter_content = filter_content; // generate a uniqid

    this.id = "s-svg-filter-" + (0, _uniqid.default)(); // if need to inject svg

    if (!document.body.querySelector("#s-svg-filters")) SSvgFilter._injectFiltersContainer(); // insert the filter

    this._insertFilter();
  }
  /**
   * Apply the filter to an element
   * @param 		{HTMLElement} 			elm 			The element on which to apply the filter
   */


  applyTo(elm) {
    ["-webkit-", "-moz-", "-ms-", "-o-", ""].forEach(vendor => {
      elm.style[vendor + "filter"] = 'url("#' + this.id + '")';
    });
    this.elms.push(elm);
  }
  /**
   * Unapply from
   * @param 		{HTMLElement} 			elm 			The element from which to remove the filter
   */


  unapplyFrom(elm) {
    ["-webkit-", "-moz-", "-ms-", "-o-", ""].forEach(vendor => {
      elm.style[vendor + "filter"] = null;
      delete elm.style[vendor + "filter"];
    }); // remove from stack

    let idx = this.elms.indexOf(elm);
    if (idx) this.elms.splice(idx, 1);
  }
  /**
   * Insert the filter
   */


  _insertFilter() {
    let svg = "\n\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n\t\t\t\t<defs>\n\t\t\t\t</defs>\n\t\t\t</svg>\n\t\t";
    let div = document.createElement("div");
    div.innerHTML = svg;
    let defs = div.querySelector("defs"); // add the filter to the svg

    this.filter_content = '<filter id="' + this.id + '">' + this.filter_content + "</filter>";
    defs.innerHTML = this.filter_content;
    this.filter = defs.querySelector("#" + this.id);
    this.svg = div.querySelector("svg");
    SSvgFilter.filtersContainer.appendChild(this.svg);
  }
  /**
   * Destroy the filter
   */


  destroy() {
    // loop on each element savec in stack to remove the filter
    this.elms.forEach(elm => {
      this.unapplyFrom(elm);
    }); // remove the filter from the html

    this.svg.parentNode.removeChild(this.svg);
  }
  /**
   * Inject the svg that will contains all the filters created through this class
   * @private
   */


  static _injectFiltersContainer() {
    let style = ["position:absolute;", "left:-1000px;", "top:-300px;"];

    if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
      style.push("display:none;");
    }

    SSvgFilter.filtersContainer = document.createElement("div");
    SSvgFilter.filtersContainer.id = "s-svg-filters";
    SSvgFilter.filtersContainer.style = style.join(" ");
    document.body.appendChild(SSvgFilter.filtersContainer);
  }

}

exports.default = SSvgFilter;
module.exports = exports.default;