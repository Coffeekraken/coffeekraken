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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2Z0ZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmdGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwREFBb0M7SUFnQ3BDO1FBQ0U7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQVksY0FBYztZQUN4QixzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZixrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFFckMsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsZUFBZSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztZQUVyQyx3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO2dCQUNoRCxVQUFVLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUV2QyxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCw0QkFBTyxHQUFQLFVBQVEsR0FBRztZQUFYLGlCQUtDO1lBSkMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtnQkFDdEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsUUFBUSxHQUFHLEtBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILGdDQUFXLEdBQVgsVUFBWSxHQUFHO1lBQ2IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxL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