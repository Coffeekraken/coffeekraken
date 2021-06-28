// @ts-nocheck
import SSvgFilter from './SSvgFilter';
/**
 * @name 		        SOutlineSvgFilter
 * @namespace            js.filter
 * @type            Class
 * @extends 	    	SSvgFilter
 * @platform          js
 * @platform          ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU091dGxpbmVTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTT3V0bGluZVN2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLGlCQUFrQixTQUFRLFVBQVU7SUFDeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxNQUFNLEdBQUcsQ0FBQztRQUNwQixLQUFLLENBQUM7NkNBQ21DLE1BQU07OztHQUdoRCxDQUFDLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxNQUFNLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0Y7QUFFRCxpQkFBaUI7QUFDakIsZUFBZSxpQkFBaUIsQ0FBQyJ9