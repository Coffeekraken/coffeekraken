// @ts-nocheck
import SSvgFilter from './SSvgFilter';
/**
 * @name 		        SGooeySvgFilter
 * @namespace            js.filter
 * @type           Class
 * @extends       SSvgFilter
 * @platform      js
 * @status        beta
 *
 * This class represent a gooey SVG filter that can be applied on any HTMLElement.
 * Here's the values that you can control on it:
 * - blur: The amout of blur you want
 * - contrast: The amout of contrast you want
 * - shrink: The amount of shrink you want
 * - amount: The overall amount of effect you want
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 		js
 * const filter = new SGooeySvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 *
 * @since         1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SGooeySvgFilter extends SSvgFilter {
    /**
     * @name              constructor
     * @type              Function
     *
     * Constructor
     *
     * @param 		{Number} 		[amount=8] 		The amount of effect to apply
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(amount = 8) {
        super(`
			<feGaussianBlur in="SourceGraphic" stdDeviation="${amount}" result="blur" />
			<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${parseInt(amount) + 9} -9" result="gooey" />
			<feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
		`);
        this._blur = this.filter.querySelector('feGaussianBlur');
        this._color_matrix = this.filter.querySelector('feColorMatrix');
    }
    /**
     * @name                blur
     * @type                Number
     *
     * Get/Set the blur amount to produce the effect
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set blur(value) {
        this._blur.setAttribute('stdDeviation', value);
    }
    get blur() {
        return parseFloat(this._blur.getAttribute('stdDeviation'));
    }
    /**
     * @name              contrast
     * @type              Number
     *
     * Get the contrast amount to produce the effect
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set contrast(value) {
        // get value
        let v = this._color_matrix.getAttribute('values');
        // process
        v = v.split(' ');
        v[v.length - 2] = value;
        // apply the new filter
        this._color_matrix.setAttribute('values', v.join(' '));
    }
    /**
     * @name            shrink
     * @type            Number
     *
     * Get the shrink amount to produce the effect
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set shrink(value) {
        // get value
        let v = this._color_matrix.getAttribute('values');
        // process
        v = v.split(' ');
        v[v.length - 1] = value;
        // apply the new filter
        this._color_matrix.setAttribute('values', v.join(' '));
    }
    /**
     * @name              amount
     * @type              Number
     *
     * Set the overall amount of effect to produce
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set amount(value) {
        this._blur.setAttribute('stdDeviation', value);
        this._color_matrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${parseInt(value) + 9} -9`);
    }
}
// export modules
export default SGooeySvgFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2V5U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0dvb2V5U3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLGVBQWdCLFNBQVEsVUFBVTtJQUN0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLE1BQU0sR0FBRyxDQUFDO1FBQ3BCLEtBQUssQ0FBQztzREFDNEMsTUFBTTsyRkFFcEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3JCOztHQUVILENBQUMsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksUUFBUSxDQUFDLEtBQUs7UUFDaEIsWUFBWTtRQUNaLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELFVBQVU7UUFDVixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLE1BQU0sQ0FBQyxLQUFLO1FBQ2QsWUFBWTtRQUNaLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELFVBQVU7UUFDVixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLE1BQU0sQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUM3QixRQUFRLEVBQ1IsMENBQTBDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FDbkUsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELGlCQUFpQjtBQUNqQixlQUFlLGVBQWUsQ0FBQyJ9