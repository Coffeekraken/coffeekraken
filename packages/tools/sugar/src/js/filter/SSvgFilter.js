// @ts-nocheck
import uniqid from '../../shared/string/uniqid';
/**
 * @name 		          SGooeySvgFilter
 * @namespace            js.filter
 * @type             Class
 * @platform        js
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
export default class SSvgFilter {
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
        this.id = 's-svg-filter-' + uniqid();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2Z0ZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmdGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFDO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVU7SUFDN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxjQUFjO1FBQ3hCLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVmLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUVyQyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxlQUFlLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFFckMsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoRCxVQUFVLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUV2QyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxPQUFPLENBQUMsR0FBRztRQUNULENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzFELEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxX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