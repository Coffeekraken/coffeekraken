// @ts-nocheck
import SSvgFilter from './SSvgFilter';
/**
 * @name 		        SOutlineSvgFilter
 * @namespace           sugar.js.filter
 * @type            Class
 * @extends 	    	SSvgFilter
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU091dGxpbmVTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTT3V0bGluZVN2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxpQkFBa0IsU0FBUSxVQUFVO0lBQ3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksTUFBTSxHQUFHLENBQUM7UUFDcEIsS0FBSyxDQUFDOzZDQUNtQyxNQUFNOzs7R0FHaEQsQ0FBQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksTUFBTSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGO0FBRUQsaUJBQWlCO0FBQ2pCLGVBQWUsaUJBQWlCLENBQUMifQ==