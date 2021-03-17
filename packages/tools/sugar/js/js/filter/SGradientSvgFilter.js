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
     * @name 		SGradientSvgFilter
     * @namespace           sugar.js.filter
     * @type      Class
     * @extends 		SSvgFilter
     * @stable
     *
     * This SVG filter class apply either a linear or a radial gradient of your choice
     * on an HTMLElement.
     * This is useful cause the gradient will only be applied on part of the elements that is really visible and will respect the opacity
     * of each parts
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 		js
     * const filter = new SGradientSvgFilter();
     * filter.linear(['red','blue','green']);
     * filter.applyTo(myCoolHTMLElement);
     *
     * @since           1.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SGradientSvgFilter = /** @class */ (function (_super) {
        __extends(SGradientSvgFilter, _super);
        /**
         * @name          constructor
         * @type          Function
         *
         * Constructor
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SGradientSvgFilter() {
            var _this = _super.call(this, "\n\t\t\t<feImage xlink:href=\"\" x=\"0\" y=\"0\" result=\"IMAGEFILL\" preserveAspectRatio=\"none\" />\n\t\t\t<feComposite operator=\"in\" in=\"IMAGEFILL\" in2=\"SourceAlpha\" />\n\t\t") || this;
            _this._image = _this.filter.querySelector('feImage');
            _this._tile = _this.filter.querySelector('feTile');
            return _this;
        }
        /**
         * @name              linear
         * @type              Function
         *
         * Linear gradient
         *
         * @param 		{Array} 			colors 			An array of colors for your gradient
         * @param 		{Object} 			settings 		The settings of your gradient that consist of an object like : ```{width: 512, height: 512, x0: 0, x1: 512, y0: 0, y1: 1}```
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SGradientSvgFilter.prototype.linear = function (colors, settings) {
            if (settings === void 0) { settings = {}; }
            var width = settings.width || 512, height = settings.height || 512, x0 = settings.x0 || 0, x1 = settings.x1 || width, y0 = settings.y0 || 0, y1 = settings.y1 || 0;
            var can = document.createElement('canvas');
            can.setAttribute('width', width);
            can.setAttribute('height', height);
            var ctx = can.getContext('2d'), grad = ctx.createLinearGradient(x0, y0, x1, y1);
            // loop on each colors
            var i = 0;
            colors.forEach(function (color) {
                grad.addColorStop((1 / (colors.length - 1)) * i, color);
                i++;
            });
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
            this.grad64 = can.toDataURL();
            this._image.setAttribute('xlink:href', this.grad64);
        };
        /**
         * @name          radial
         * @type          Function
         *
         * Radial gradient
         *
         * @param 		{Array} 			colors 			An array of colors for your gradient
         * @param 		{Object} 			settings 		The settings of your gradient that consist of an object like : ```{width: 512, height: 512, x0: 256, x1: 256, y0: 256, y1: 256, r0: 0, r1: 512}```
         *
         * @example         js
         * myFilter.radial(['#ff0000', '#00ffff], {
         *    width: 300,
         *    height: 300
         * });
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SGradientSvgFilter.prototype.radial = function (colors, settings) {
            if (settings === void 0) { settings = {}; }
            var width = settings.width || 512, height = settings.height || 512, x0 = settings.x0 || width / 2, x1 = settings.x1 || width / 2, r0 = settings.r0 || 0, y0 = settings.y0 || height / 2, y1 = settings.y1 || height / 2, r1 = settings.r1 || width;
            var can = document.createElement('canvas');
            can.setAttribute('width', width);
            can.setAttribute('height', height);
            var ctx = can.getContext('2d'), grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
            // loop on each colors
            var i = 0;
            colors.forEach(function (color) {
                grad.addColorStop((1 / (colors.length - 1)) * i, color);
                i++;
            });
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
            this.grad64 = can.toDataURL();
            this._image.setAttribute('xlink:href', this.grad64);
        };
        /**
         * @name          applyTo
         * @type          Function
         * @override
         *
         * Apply the filter to element
         *
         * @param 		{HTMLElement} 		elm 		The element on which to apply the filter
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SGradientSvgFilter.prototype.applyTo = function (elm) {
            _super.prototype.applyTo.call(this, elm);
            this._setImageSize();
            window.addEventListener('resize', this._onWindowResize.bind(this));
        };
        /**
         * @name            unapplyFrom
         * @type            Function
         * @override
         *
         * Remove the filter from element
         *
         * @param 	{HTMLElement} 	elm 	The element to unapply the filter from
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SGradientSvgFilter.prototype.unapplyFrom = function (elm) {
            _super.prototype.unapplyFrom.call(this, elm);
            window.removeEventListener('resize', this._onWindowResize);
        };
        /**
         * @name          _onWindowResize
         * @type          Function
         * @private
         *
         * When the window is resizing
         *
         * @param 		{Event} 		e 		The resize event
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SGradientSvgFilter.prototype._onWindowResize = function (e) {
            // set the image size
            this._setImageSize();
        };
        /**
         * @name        _setImageSize
         * @type        Function
         * @private
         *
         * Set image width
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SGradientSvgFilter.prototype._setImageSize = function () {
            var width = this.elms[0].offsetWidth, height = this.elms[0].offsetHeight;
            if (width >= height) {
                this._image.setAttribute('width', width);
                this._image.removeAttribute('height');
            }
            else {
                this._image.setAttribute('height', height);
                this._image.removeAttribute('width');
            }
            // this._image.setAttribute('width', width);
            // this._image.setAttribute('height', height);
        };
        return SGradientSvgFilter;
    }(SSvgFilter_1.default));
    // export modules
    exports.default = SGradientSvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dyYWRpZW50U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pzL2ZpbHRlci9TR3JhZGllbnRTdmdGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNERBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNIO1FBQWlDLHNDQUFVO1FBQ3pDOzs7Ozs7O1dBT0c7UUFDSDtZQUFBLFlBQ0Usa0JBQU0seUxBR1AsQ0FBQyxTQUdEO1lBRkMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUNuRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILG1DQUFNLEdBQU4sVUFBTyxNQUFNLEVBQUUsUUFBYTtZQUFiLHlCQUFBLEVBQUEsYUFBYTtZQUMxQixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFDakMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUMvQixFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQ3JCLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLEtBQUssRUFDekIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUNyQixFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUM5QixJQUFJLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELHNCQUFzQjtZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztnQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3hELENBQUMsRUFBRSxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNyQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JHO1FBQ0gsbUNBQU0sR0FBTixVQUFPLE1BQU0sRUFBRSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBQzFCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksR0FBRyxFQUNqQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQy9CLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQzdCLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQzdCLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsRUFDckIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksTUFBTSxHQUFHLENBQUMsRUFDOUIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksTUFBTSxHQUFHLENBQUMsRUFDOUIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDO1lBQzVCLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFDOUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFELHNCQUFzQjtZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztnQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3hELENBQUMsRUFBRSxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNyQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxvQ0FBTyxHQUFQLFVBQVEsR0FBRztZQUNULGlCQUFNLE9BQU8sWUFBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsd0NBQVcsR0FBWCxVQUFZLEdBQUc7WUFDYixpQkFBTSxXQUFXLFlBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCw0Q0FBZSxHQUFmLFVBQWdCLENBQUM7WUFDZixxQkFBcUI7WUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILDBDQUFhLEdBQWI7WUFDRSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFDcEMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ3JDLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsNENBQTRDO1lBQzVDLDhDQUE4QztRQUNoRCxDQUFDO1FBQ0gseUJBQUM7SUFBRCxDQUFDLEFBdktELENBQWlDLG9CQUFVLEdBdUsxQztJQUVELGlCQUFpQjtJQUNqQixrQkFBZSxrQkFBa0IsQ0FBQyJ9