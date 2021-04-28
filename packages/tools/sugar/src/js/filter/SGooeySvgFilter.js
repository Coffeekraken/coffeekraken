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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2V5U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2ZpbHRlci9TR29vZXlTdmdGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsOERBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxNQUFNLGVBQWdCLFNBQVEsb0JBQVU7UUFDdEM7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxNQUFNLEdBQUcsQ0FBQztZQUNwQixLQUFLLENBQUM7c0RBQzRDLE1BQU07MkZBRXBELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNyQjs7R0FFSCxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILElBQUksSUFBSSxDQUFDLEtBQUs7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELElBQUksSUFBSTtZQUNOLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxJQUFJLFFBQVEsQ0FBQyxLQUFLO1lBQ2hCLFlBQVk7WUFDWixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxVQUFVO1lBQ1YsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsSUFBSSxNQUFNLENBQUMsS0FBSztZQUNkLFlBQVk7WUFDWixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxVQUFVO1lBQ1YsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsSUFBSSxNQUFNLENBQUMsS0FBSztZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FDN0IsUUFBUSxFQUNSLDBDQUEwQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQ25FLENBQUM7UUFDSixDQUFDO0tBQ0Y7SUFFRCxpQkFBaUI7SUFDakIsa0JBQWUsZUFBZSxDQUFDIn0=