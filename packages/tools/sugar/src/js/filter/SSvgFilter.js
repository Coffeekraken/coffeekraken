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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2Z0ZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmdGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQWdEO0lBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUNILE1BQXFCLFVBQVU7UUFDN0I7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxjQUFjO1lBQ3hCLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVmLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUVyQyxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxlQUFlLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO1lBRXJDLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2hELFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBRXZDLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILE9BQU8sQ0FBQyxHQUFHO1lBQ1QsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQzFELEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxXQUFXLENBQUMsR0FBRztZQUNi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