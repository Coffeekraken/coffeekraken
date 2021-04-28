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
    const uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
    /**
     * @name 		          SGooeySvgFilter
     * @namespace            js.filter
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
    class SSvgFilter {
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
        constructor(filter_content) {
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
        applyTo(elm) {
            ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach((vendor) => {
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        unapplyFrom(elm) {
            ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach((vendor) => {
                elm.style[vendor + 'filter'] = null;
                delete elm.style[vendor + 'filter'];
            });
            // remove from stack
            const idx = this.elms.indexOf(elm);
            if (idx)
                this.elms.splice(idx, 1);
        }
        /**
         * @name          _insertFilter
         * @type          Function
         * @private
         *
         * Insert the filter
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _insertFilter() {
            const svg = `
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
				</defs>
			</svg>
		`;
            const div = document.createElement('div');
            div.innerHTML = svg;
            const defs = div.querySelector('defs');
            // add the filter to the svg
            this.filter_content =
                '<filter id="' + this.id + '">' + this.filter_content + '</filter>';
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        destroy() {
            // loop on each element savec in stack to remove the filter
            this.elms.forEach((elm) => {
                this.unapplyFrom(elm);
            });
            // remove the filter from the html
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        static _injectFiltersContainer() {
            const style = ['position:absolute;', 'left:-1000px;', 'top:-300px;'];
            if (/Chrome/.test(navigator.userAgent) &&
                /Google Inc/.test(navigator.vendor)) {
                style.push('display:none;');
            }
            SSvgFilter.filtersContainer = document.createElement('div');
            SSvgFilter.filtersContainer.id = 's-svg-filters';
            SSvgFilter.filtersContainer.style = style.join(' ');
            document.body.appendChild(SSvgFilter.filtersContainer);
        }
    }
    exports.default = SSvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2Z0ZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9maWx0ZXIvU1N2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBZ0Q7SUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsTUFBcUIsVUFBVTtRQUM3Qjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLGNBQWM7WUFDeEIsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWYsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBRXJDLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsRUFBRSxHQUFHLGVBQWUsR0FBRyxnQkFBTSxFQUFFLENBQUM7WUFFckMsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDaEQsVUFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFFdkMsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsT0FBTyxDQUFDLEdBQUc7WUFDVCxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDMUQsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FB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