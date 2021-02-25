// @ts-nocheck
import SSvgFilter from './SSvgFilter';
/**
 * @name 		        SGooeySvgFilter
 * @namespace           sugar.js.filter
 * @type           Class
 * @extends       SSvgFilter
 * @stable
 *
 * This class represent a gooey SVG filter that can be applied on any HTMLElement.
 * Here's the values that you can control on it:
 * - blur: The amout of blur you want
 * - contrast: The amout of contrast you want
 * - shrink: The amount of shrink you want
 * - amout: The overall amount of effect you want
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2V5U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0dvb2V5U3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sZUFBZ0IsU0FBUSxVQUFVO0lBQ3RDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksTUFBTSxHQUFHLENBQUM7UUFDcEIsS0FBSyxDQUFDO3NEQUM0QyxNQUFNOzJGQUVwRCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDckI7O0dBRUgsQ0FBQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLElBQUksQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxRQUFRLENBQUMsS0FBSztRQUNoQixZQUFZO1FBQ1osSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsVUFBVTtRQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN4Qix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksTUFBTSxDQUFDLEtBQUs7UUFDZCxZQUFZO1FBQ1osSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsVUFBVTtRQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN4Qix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksTUFBTSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQzdCLFFBQVEsRUFDUiwwQ0FBMEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUNuRSxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsaUJBQWlCO0FBQ2pCLGVBQWUsZUFBZSxDQUFDIn0=