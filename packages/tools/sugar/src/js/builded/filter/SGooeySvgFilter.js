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
    var SGooeySvgFilter = /** @class */ (function (_super) {
        __extends(SGooeySvgFilter, _super);
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
        function SGooeySvgFilter(amount) {
            if (amount === void 0) { amount = 8; }
            var _this = _super.call(this, "\n\t\t\t<feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"" + amount + "\" result=\"blur\" />\n\t\t\t<feColorMatrix in=\"blur\" mode=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + (parseInt(amount) + 9) + " -9\" result=\"gooey\" />\n\t\t\t<feComposite in=\"SourceGraphic\" in2=\"gooey\" operator=\"atop\"/>\n\t\t") || this;
            _this._blur = _this.filter.querySelector('feGaussianBlur');
            _this._color_matrix = _this.filter.querySelector('feColorMatrix');
            return _this;
        }
        Object.defineProperty(SGooeySvgFilter.prototype, "blur", {
            get: function () {
                return parseFloat(this._blur.getAttribute('stdDeviation'));
            },
            /**
             * @name                blur
             * @type                Number
             *
             * Get/Set the blur amount to produce the effect
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            set: function (value) {
                this._blur.setAttribute('stdDeviation', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SGooeySvgFilter.prototype, "contrast", {
            /**
             * @name              contrast
             * @type              Number
             *
             * Get the contrast amount to produce the effect
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            set: function (value) {
                // get value
                var v = this._color_matrix.getAttribute('values');
                // process
                v = v.split(' ');
                v[v.length - 2] = value;
                // apply the new filter
                this._color_matrix.setAttribute('values', v.join(' '));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SGooeySvgFilter.prototype, "shrink", {
            /**
             * @name            shrink
             * @type            Number
             *
             * Get the shrink amount to produce the effect
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            set: function (value) {
                // get value
                var v = this._color_matrix.getAttribute('values');
                // process
                v = v.split(' ');
                v[v.length - 1] = value;
                // apply the new filter
                this._color_matrix.setAttribute('values', v.join(' '));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SGooeySvgFilter.prototype, "amount", {
            /**
             * @name              amount
             * @type              Number
             *
             * Set the overall amount of effect to produce
             *
             * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            set: function (value) {
                this._blur.setAttribute('stdDeviation', value);
                this._color_matrix.setAttribute('values', "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + (parseInt(value) + 9) + " -9");
            },
            enumerable: false,
            configurable: true
        });
        return SGooeySvgFilter;
    }(SSvgFilter_1.default));
    // export modules
    exports.default = SGooeySvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2V5U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZmlsdGVyL1NHb29leVN2Z0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNIO1FBQThCLG1DQUFVO1FBQ3RDOzs7Ozs7Ozs7V0FTRztRQUNILHlCQUFZLE1BQVU7WUFBVix1QkFBQSxFQUFBLFVBQVU7WUFBdEIsWUFDRSxrQkFBTSxpRUFDNEMsTUFBTSxpSUFFcEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0hBR3pCLENBQUMsU0FHRDtZQUZDLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RCxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUNsRSxDQUFDO1FBVUQsc0JBQUksaUNBQUk7aUJBR1I7Z0JBQ0UsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBYkQ7Ozs7Ozs7ZUFPRztpQkFDSCxVQUFTLEtBQUs7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELENBQUM7OztXQUFBO1FBYUQsc0JBQUkscUNBQVE7WUFSWjs7Ozs7OztlQU9HO2lCQUNILFVBQWEsS0FBSztnQkFDaEIsWUFBWTtnQkFDWixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEQsVUFBVTtnQkFDVixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN4Qix1QkFBdUI7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQzs7O1dBQUE7UUFVRCxzQkFBSSxtQ0FBTTtZQVJWOzs7Ozs7O2VBT0c7aUJBQ0gsVUFBVyxLQUFLO2dCQUNkLFlBQVk7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xELFVBQVU7Z0JBQ1YsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDeEIsdUJBQXVCO2dCQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUM7OztXQUFBO1FBVUQsc0JBQUksbUNBQU07WUFSVjs7Ozs7OztlQU9HO2lCQUNILFVBQVcsS0FBSztnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUM3QixRQUFRLEVBQ1IsNkNBQTBDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQUssQ0FDbkUsQ0FBQztZQUNKLENBQUM7OztXQUFBO1FBQ0gsc0JBQUM7SUFBRCxDQUFDLEFBekZELENBQThCLG9CQUFVLEdBeUZ2QztJQUVELGlCQUFpQjtJQUNqQixrQkFBZSxlQUFlLENBQUMifQ==