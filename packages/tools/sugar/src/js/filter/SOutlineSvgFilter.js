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
     * @name 		        SOutlineSvgFilter
     * @namespace            js.filter
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
    class SOutlineSvgFilter extends SSvgFilter_1.default {
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
    exports.default = SOutlineSvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU091dGxpbmVTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZmlsdGVyL1NPdXRsaW5lU3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDhEQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILE1BQU0saUJBQWtCLFNBQVEsb0JBQVU7UUFDeEM7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxNQUFNLEdBQUcsQ0FBQztZQUNwQixLQUFLLENBQUM7NkNBQ21DLE1BQU07OztHQUdoRCxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsSUFBSSxNQUFNLENBQUMsS0FBSztZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQ0QsSUFBSSxNQUFNO1lBQ1IsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM5RCxDQUFDO0tBQ0Y7SUFFRCxpQkFBaUI7SUFDakIsa0JBQWUsaUJBQWlCLENBQUMifQ==