"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqid = _interopRequireDefault(require("../util/uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO tests

/**
 * @name 		          SGooeySvgFilter
 * @namespace           sugar.js.filter
 * @type             Class
 *
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
var SSvgFilter = /*#__PURE__*/function () {
  /**
   * @name          constructor
   * @type          Function
   *
   * Constructor
   *
   * @param 			{String} 			filter          The SVG filter string representation
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SSvgFilter(filter_content) {
    _classCallCheck(this, SSvgFilter);

    // save the reference of each elements
    this.elms = []; // save parameters

    this.filter_content = filter_content; // generate a uniqid

    this.id = 's-svg-filter-' + (0, _uniqid.default)(); // if need to inject svg

    if (!document.body.querySelector('#s-svg-filters')) SSvgFilter._injectFiltersContainer(); // insert the filter

    this._insertFilter();
  }
  /**
   * @name            applyTo
   * @type            Function
   *
   * Apply the filter to an element
   *
   * @param 		{HTMLElement} 			elm 			The element on which to apply the filter
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SSvgFilter, [{
    key: "applyTo",
    value: function applyTo(elm) {
      ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(vendor => {
        elm.style[vendor + 'filter'] = 'url("#' + this.id + '")';
      });
      this.elms.push(elm);
    }
    /**
     * @name          unapplyFrom
     * @type          Function
     *
     * Unapply from
     *
     * @param 		{HTMLElement} 			elm 			The element from which to remove the filter
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "unapplyFrom",
    value: function unapplyFrom(elm) {
      ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(vendor => {
        elm.style[vendor + 'filter'] = null;
        delete elm.style[vendor + 'filter'];
      }); // remove from stack

      var idx = this.elms.indexOf(elm);
      if (idx) this.elms.splice(idx, 1);
    }
    /**
     * @name          _insertFilter
     * @type          Function
     * @private
     *
     * Insert the filter
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_insertFilter",
    value: function _insertFilter() {
      var svg = "\n\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n\t\t\t\t<defs>\n\t\t\t\t</defs>\n\t\t\t</svg>\n\t\t";
      var div = document.createElement('div');
      div.innerHTML = svg;
      var defs = div.querySelector('defs'); // add the filter to the svg

      this.filter_content = '<filter id="' + this.id + '">' + this.filter_content + '</filter>';
      defs.innerHTML = this.filter_content;
      this.filter = defs.querySelector('#' + this.id);
      this.svg = div.querySelector('svg');
      SSvgFilter.filtersContainer.appendChild(this.svg);
    }
    /**
     * @name          destroy
     * @type          Function
     *
     * Destroy the filter
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // loop on each element savec in stack to remove the filter
      this.elms.forEach(elm => {
        this.unapplyFrom(elm);
      }); // remove the filter from the html

      this.svg.parentNode.removeChild(this.svg);
    }
    /**
     * @name          _injectFiltersContainer
     * @type          Function
     * @private
     * @static
     *
     * Inject the svg that will contains all the filters created through this class
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }], [{
    key: "_injectFiltersContainer",
    value: function _injectFiltersContainer() {
      var style = ['position:absolute;', 'left:-1000px;', 'top:-300px;'];

      if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
        style.push('display:none;');
      }

      SSvgFilter.filtersContainer = document.createElement('div');
      SSvgFilter.filtersContainer.id = 's-svg-filters';
      SSvgFilter.filtersContainer.style = style.join(' ');
      document.body.appendChild(SSvgFilter.filtersContainer);
    }
  }]);

  return SSvgFilter;
}();

exports.default = SSvgFilter;
module.exports = exports.default;