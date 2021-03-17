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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU091dGxpbmVTdmdGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9maWx0ZXIvU091dGxpbmVTdmdGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNERBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0g7UUFBZ0MscUNBQVU7UUFDeEM7Ozs7Ozs7OztXQVNHO1FBQ0gsMkJBQVksTUFBVTtZQUFWLHVCQUFBLEVBQUEsVUFBVTtZQUF0QixZQUNFLGtCQUFNLHdEQUNtQyxNQUFNLDZKQUdoRCxDQUFDLFNBRUQ7WUFEQyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztRQUNoRSxDQUFDO1FBVUQsc0JBQUkscUNBQU07aUJBR1Y7Z0JBQ0UsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM5RCxDQUFDO1lBYkQ7Ozs7Ozs7ZUFPRztpQkFDSCxVQUFXLEtBQUs7Z0JBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELENBQUM7OztXQUFBO1FBSUgsd0JBQUM7SUFBRCxDQUFDLEFBbENELENBQWdDLG9CQUFVLEdBa0N6QztJQUVELGlCQUFpQjtJQUNqQixrQkFBZSxpQkFBaUIsQ0FBQyJ9