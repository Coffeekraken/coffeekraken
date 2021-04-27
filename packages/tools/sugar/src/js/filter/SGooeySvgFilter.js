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
        define(["require", "exports", "./SSvgFilter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SSvgFilter_1 = __importDefault(require("./SSvgFilter"));
    /**
     * @name 		        SGooeySvgFilter
     * @namespace            js.filter
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
    class SGooeySvgFilter extends SSvgFilter_1.default {
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
    exports.default = SGooeySvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2V5U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0dvb2V5U3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDhEQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsTUFBTSxlQUFnQixTQUFRLG9CQUFVO1FBQ3RDOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksTUFBTSxHQUFHLENBQUM7WUFDcEIsS0FBSyxDQUFDO3NEQUM0QyxNQUFNOzJGQUVwRCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDckI7O0dBRUgsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCxJQUFJLElBQUk7WUFDTixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsSUFBSSxRQUFRLENBQUMsS0FBSztZQUNoQixZQUFZO1lBQ1osSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsVUFBVTtZQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN4Qix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILElBQUksTUFBTSxDQUFDLEtBQUs7WUFDZCxZQUFZO1lBQ1osSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsVUFBVTtZQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN4Qix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILElBQUksTUFBTSxDQUFDLEtBQUs7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQzdCLFFBQVEsRUFDUiwwQ0FBMEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUNuRSxDQUFDO1FBQ0osQ0FBQztLQUNGO0lBRUQsaUJBQWlCO0lBQ2pCLGtCQUFlLGVBQWUsQ0FBQyJ9