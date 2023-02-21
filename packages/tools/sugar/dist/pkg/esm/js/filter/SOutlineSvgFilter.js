// @ts-nocheck
import { __SSvgFilter } from '@coffeekraken/sugar/filter';
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
 * import {__SOutlineSvgFilter } from '@coffeekraken/sugar/filter';
 * const filter = new __SOutlineSvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class __SOutlineSvgFilter extends __SSvgFilter {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @param 		{Number} 		[radius=8] 		The amount of effect to apply
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set radius(value) {
        this._$morphology.setAttribute('radius', value);
    }
    get radius() {
        return parseFloat(this._$morphology.getAttribute('radius'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUJBQW9CLFNBQVEsWUFBWTtJQUN6RDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLE1BQU0sR0FBRyxDQUFDO1FBQ2xCLEtBQUssQ0FBQzs2Q0FDK0IsTUFBTTs7O0dBR2hELENBQUMsQ0FBQztRQUNHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLE1BQU0sQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDRCxJQUFJLE1BQU07UUFDTixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FDSiJ9