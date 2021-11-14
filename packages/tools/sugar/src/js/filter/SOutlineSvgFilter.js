// @ts-nocheck
import SSvgFilter from './SSvgFilter';
/**
 * @name 		        SOutlineSvgFilter
 * @namespace            js.filter
 * @type            Class
 * @extends 	    	SSvgFilter
 * @platform          js
 * @status        beta
 *
 * This class represent an outline filter that can be applied on any HTMLElement.
 *
 * @example 		js
 * const filter = new SOutlineSvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since         1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SOutlineSvgFilter extends SSvgFilter {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @param 		{Number} 		[radius=8] 		The amount of effect to apply
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(radius = 8) {
        super(`
			<feMorphology operator="dilate" radius="${radius}"
			in="SourceGraphic" result="THICKNESS" />
			<feComposite operator="out" in="THICKNESS" in2="SourceGraphic" ></feComposite>
		`);
        this._$morphology = this.filter.querySelector('feMorphology');
    }
    /**
     * @name          radius
     * @type          Number
     *
     * Get/Set the radius to produce the effect
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set radius(value) {
        this._$morphology.setAttribute('radius', value);
    }
    get radius() {
        return parseFloat(this._$morphology.getAttribute('radius'));
    }
}
// export modules
export default SOutlineSvgFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU091dGxpbmVTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTT3V0bGluZVN2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0saUJBQWtCLFNBQVEsVUFBVTtJQUN0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLE1BQU0sR0FBRyxDQUFDO1FBQ2xCLEtBQUssQ0FBQzs2Q0FDK0IsTUFBTTs7O0dBR2hELENBQUMsQ0FBQztRQUNHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLE1BQU0sQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDRCxJQUFJLE1BQU07UUFDTixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FDSjtBQUVELGlCQUFpQjtBQUNqQixlQUFlLGlCQUFpQixDQUFDIn0=