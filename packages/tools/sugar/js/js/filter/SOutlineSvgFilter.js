// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var SSvgFilter_1 = __importDefault(require("./SSvgFilter"));
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
    var SOutlineSvgFilter = /** @class */ (function (_super) {
        __extends(SOutlineSvgFilter, _super);
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
        function SOutlineSvgFilter(radius) {
            if (radius === void 0) { radius = 8; }
            var _this = _super.call(this, "\n\t\t\t<feMorphology operator=\"dilate\" radius=\"" + radius + "\"\n\t\t\tin=\"SourceGraphic\" result=\"THICKNESS\" />\n\t\t\t<feComposite operator=\"out\" in=\"THICKNESS\" in2=\"SourceGraphic\" ></feComposite>\n\t\t") || this;
            _this._$morphology = _this.filter.querySelector('feMorphology');
            return _this;
        }
        Object.defineProperty(SOutlineSvgFilter.prototype, "radius", {
            get: function () {
                return parseFloat(this._$morphology.getAttribute('radius'));
            },
            /**
             * @name          radius
             * @type          Number
             *
             * Get/Set the radius to produce the effect
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            set: function (value) {
                this._$morphology.setAttribute('radius', value);
            },
            enumerable: false,
            configurable: true
        });
        return SOutlineSvgFilter;
    }(SSvgFilter_1.default));
    // export modules
    exports.default = SOutlineSvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU091dGxpbmVTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZmlsdGVyL1NPdXRsaW5lU3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDREQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNIO1FBQWdDLHFDQUFVO1FBQ3hDOzs7Ozs7Ozs7V0FTRztRQUNILDJCQUFZLE1BQVU7WUFBVix1QkFBQSxFQUFBLFVBQVU7WUFBdEIsWUFDRSxrQkFBTSx3REFDbUMsTUFBTSw2SkFHaEQsQ0FBQyxTQUVEO1lBREMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7UUFDaEUsQ0FBQztRQVVELHNCQUFJLHFDQUFNO2lCQUdWO2dCQUNFLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUQsQ0FBQztZQWJEOzs7Ozs7O2VBT0c7aUJBQ0gsVUFBVyxLQUFLO2dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxDQUFDOzs7V0FBQTtRQUlILHdCQUFDO0lBQUQsQ0FBQyxBQWxDRCxDQUFnQyxvQkFBVSxHQWtDekM7SUFFRCxpQkFBaUI7SUFDakIsa0JBQWUsaUJBQWlCLENBQUMifQ==