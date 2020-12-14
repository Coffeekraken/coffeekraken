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
        define(["require", "exports", "../util/uniqid"], factory);
    }
})(function (require, exports) {
    "use strict";
    var uniqid_1 = __importDefault(require("../util/uniqid"));
    return /** @class */ (function () {
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
});
//# sourceMappingURL=module.js.map