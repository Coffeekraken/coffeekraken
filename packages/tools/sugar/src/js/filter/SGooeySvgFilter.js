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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2V5U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0dvb2V5U3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDREQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0g7UUFBOEIsbUNBQVU7UUFDdEM7Ozs7Ozs7OztXQVNHO1FBQ0gseUJBQVksTUFBVTtZQUFWLHVCQUFBLEVBQUEsVUFBVTtZQUF0QixZQUNFLGtCQUFNLGlFQUM0QyxNQUFNLGlJQUVwRCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnSEFHekIsQ0FBQyxTQUdEO1lBRkMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pELEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7O1FBQ2xFLENBQUM7UUFVRCxzQkFBSSxpQ0FBSTtpQkFHUjtnQkFDRSxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUM7WUFiRDs7Ozs7OztlQU9HO2lCQUNILFVBQVMsS0FBSztnQkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsQ0FBQzs7O1dBQUE7UUFhRCxzQkFBSSxxQ0FBUTtZQVJaOzs7Ozs7O2VBT0c7aUJBQ0gsVUFBYSxLQUFLO2dCQUNoQixZQUFZO2dCQUNaLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxVQUFVO2dCQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6RCxDQUFDOzs7V0FBQTtRQVVELHNCQUFJLG1DQUFNO1lBUlY7Ozs7Ozs7ZUFPRztpQkFDSCxVQUFXLEtBQUs7Z0JBQ2QsWUFBWTtnQkFDWixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEQsVUFBVTtnQkFDVixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN4Qix1QkFBdUI7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQzs7O1dBQUE7UUFVRCxzQkFBSSxtQ0FBTTtZQVJWOzs7Ozs7O2VBT0c7aUJBQ0gsVUFBVyxLQUFLO2dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQzdCLFFBQVEsRUFDUiw2Q0FBMEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBSyxDQUNuRSxDQUFDO1lBQ0osQ0FBQzs7O1dBQUE7UUFDSCxzQkFBQztJQUFELENBQUMsQUF6RkQsQ0FBOEIsb0JBQVUsR0F5RnZDO0lBRUQsaUJBQWlCO0lBQ2pCLGtCQUFlLGVBQWUsQ0FBQyJ9