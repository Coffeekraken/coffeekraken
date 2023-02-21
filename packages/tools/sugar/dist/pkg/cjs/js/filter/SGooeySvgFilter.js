"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("@coffeekraken/sugar/filter");
/**
 * @name 		        SGooeySvgFilter
 * @namespace            js.filter
 * @type           Class
 * @extends       SSvgFilter
 * @platform          js
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
 * import { __SGooeySvgFilter } from '@coffeekraken/sugar/filter';
 * const filter = new __SGooeySvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 *
 @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class __SGooeySvgFilter extends filter_1.__SSvgFilter {
    /**
     * @name              constructor
     * @type              Function
     *
     * Constructor
     *
     * @param 		{Number} 		[amount=8] 		The amount of effect to apply
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set amount(value) {
        this._blur.setAttribute('stdDeviation', value);
        this._color_matrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${parseInt(value) + 9} -9`);
    }
}
exports.default = __SGooeySvgFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLHVEQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFxQixpQkFBa0IsU0FBUSxxQkFBWTtJQUN2RDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLE1BQU0sR0FBRyxDQUFDO1FBQ2xCLEtBQUssQ0FBQztzREFDd0MsTUFBTTsyRkFFNUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3ZCOztHQUVULENBQUMsQ0FBQztRQUNHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSztRQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ0osT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksUUFBUSxDQUFDLEtBQUs7UUFDZCxZQUFZO1FBQ1osSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsVUFBVTtRQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN4Qix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksTUFBTSxDQUFDLEtBQUs7UUFDWixZQUFZO1FBQ1osSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsVUFBVTtRQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN4Qix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksTUFBTSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQzNCLFFBQVEsRUFDUiwwQ0FBMEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUNyRSxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekZELG9DQXlGQyJ9