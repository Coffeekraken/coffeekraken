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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU091dGxpbmVTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTT3V0bGluZVN2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4REFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxNQUFNLGlCQUFrQixTQUFRLG9CQUFVO1FBQ3hDOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksTUFBTSxHQUFHLENBQUM7WUFDcEIsS0FBSyxDQUFDOzZDQUNtQyxNQUFNOzs7R0FHaEQsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILElBQUksTUFBTSxDQUFDLEtBQUs7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELElBQUksTUFBTTtZQUNSLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUQsQ0FBQztLQUNGO0lBRUQsaUJBQWlCO0lBQ2pCLGtCQUFlLGlCQUFpQixDQUFDIn0=