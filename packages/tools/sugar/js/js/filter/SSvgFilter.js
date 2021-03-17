// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../shared/string/uniqid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
    /**
     * @name 		          SGooeySvgFilter
     * @namespace           sugar.js.filter
     * @type             Class
     * @status          wip
     *
     * This class allows you to create with ease some complexe SVG filters and to apply it on any HTMLElement that you want
     * by extending this class like so
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
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
     * @since           1.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SSvgFilter = /** @class */ (function () {
        /**
         * @name          constructor
         * @type          Function
         *
         * Constructor
         *
         * @param 			{String} 			filter          The SVG filter string representation
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SSvgFilter(filter_content) {
            // save the reference of each elements
            this.elms = [];
            // save parameters
            this.filter_content = filter_content;
            // generate a uniqid
            this.id = 's-svg-filter-' + uniqid_1.default();
            // if need to inject svg
            if (!document.body.querySelector('#s-svg-filters'))
                SSvgFilter._injectFiltersContainer();
            // insert the filter
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SSvgFilter.prototype.applyTo = function (elm) {
            var _this = this;
            ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(function (vendor) {
                elm.style[vendor + 'filter'] = 'url("#' + _this.id + '")';
            });
            this.elms.push(elm);
        };
        /**
         * @name          unapplyFrom
         * @type          Function
         *
         * Unapply from
         *
         * @param 		{HTMLElement} 			elm 			The element from which to remove the filter
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SSvgFilter.prototype.unapplyFrom = function (elm) {
            ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(function (vendor) {
                elm.style[vendor + 'filter'] = null;
                delete elm.style[vendor + 'filter'];
            });
            // remove from stack
            var idx = this.elms.indexOf(elm);
            if (idx)
                this.elms.splice(idx, 1);
        };
        /**
         * @name          _insertFilter
         * @type          Function
         * @private
         *
         * Insert the filter
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SSvgFilter.prototype._insertFilter = function () {
            var svg = "\n\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n\t\t\t\t<defs>\n\t\t\t\t</defs>\n\t\t\t</svg>\n\t\t";
            var div = document.createElement('div');
            div.innerHTML = svg;
            var defs = div.querySelector('defs');
            // add the filter to the svg
            this.filter_content =
                '<filter id="' + this.id + '">' + this.filter_content + '</filter>';
            defs.innerHTML = this.filter_content;
            this.filter = defs.querySelector('#' + this.id);
            this.svg = div.querySelector('svg');
            SSvgFilter.filtersContainer.appendChild(this.svg);
        };
        /**
         * @name          destroy
         * @type          Function
         *
         * Destroy the filter
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SSvgFilter.prototype.destroy = function () {
            var _this = this;
            // loop on each element savec in stack to remove the filter
            this.elms.forEach(function (elm) {
                _this.unapplyFrom(elm);
            });
            // remove the filter from the html
            this.svg.parentNode.removeChild(this.svg);
        };
        /**
         * @name          _injectFiltersContainer
         * @type          Function
         * @private
         * @static
         *
         * Inject the svg that will contains all the filters created through this class
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SSvgFilter._injectFiltersContainer = function () {
            var style = ['position:absolute;', 'left:-1000px;', 'top:-300px;'];
            if (/Chrome/.test(navigator.userAgent) &&
                /Google Inc/.test(navigator.vendor)) {
                style.push('display:none;');
            }
            SSvgFilter.filtersContainer = document.createElement('div');
            SSvgFilter.filtersContainer.id = 's-svg-filters';
            SSvgFilter.filtersContainer.style = style.join(' ');
            document.body.appendChild(SSvgFilter.filtersContainer);
        };
        return SSvgFilter;
    }());
    exports.default = SSvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2Z0ZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9maWx0ZXIvU1N2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzRUFBZ0Q7SUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0g7UUFDRTs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBWSxjQUFjO1lBQ3hCLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVmLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUVyQyxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxlQUFlLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO1lBRXJDLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2hELFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBRXZDLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILDRCQUFPLEdBQVAsVUFBUSxHQUFHO1lBQVgsaUJBS0M7WUFKQyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO2dCQUN0RCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxRQUFRLEdBQUcsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gs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