// @ts-nocheck
import uniqid from '../../shared/string/uniqid';
/**
 * @name 		          SGooeySvgFilter
 * @namespace            js.filter
 * @type             Class
 * @platform          js
 * @platform          ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2Z0ZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmdGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFDO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVO0lBQzdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksY0FBYztRQUN4QixzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFFZixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFFckMsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsZUFBZSxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBRXJDLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7WUFDaEQsVUFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFFdkMsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsT0FBTyxDQUFDLEdBQUc7UUFDVCxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMxRCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gs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