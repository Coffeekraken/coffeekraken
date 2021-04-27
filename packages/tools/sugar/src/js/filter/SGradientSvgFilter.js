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
     * @name 		SGradientSvgFilter
     * @namespace            js.filter
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
    class SGradientSvgFilter extends SSvgFilter_1.default {
        /**
         * @name          constructor
         * @type          Function
         *
         * Constructor
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor() {
            super(`
			<feImage xlink:href="" x="0" y="0" result="IMAGEFILL" preserveAspectRatio="none" />
			<feComposite operator="in" in="IMAGEFILL" in2="SourceAlpha" />
		`);
            this._image = this.filter.querySelector('feImage');
            this._tile = this.filter.querySelector('feTile');
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
        linear(colors, settings = {}) {
            const width = settings.width || 512, height = settings.height || 512, x0 = settings.x0 || 0, x1 = settings.x1 || width, y0 = settings.y0 || 0, y1 = settings.y1 || 0;
            const can = document.createElement('canvas');
            can.setAttribute('width', width);
            can.setAttribute('height', height);
            const ctx = can.getContext('2d'), grad = ctx.createLinearGradient(x0, y0, x1, y1);
            // loop on each colors
            let i = 0;
            colors.forEach((color) => {
                grad.addColorStop((1 / (colors.length - 1)) * i, color);
                i++;
            });
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
            this.grad64 = can.toDataURL();
            this._image.setAttribute('xlink:href', this.grad64);
        }
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
        radial(colors, settings = {}) {
            const width = settings.width || 512, height = settings.height || 512, x0 = settings.x0 || width / 2, x1 = settings.x1 || width / 2, r0 = settings.r0 || 0, y0 = settings.y0 || height / 2, y1 = settings.y1 || height / 2, r1 = settings.r1 || width;
            const can = document.createElement('canvas');
            can.setAttribute('width', width);
            can.setAttribute('height', height);
            const ctx = can.getContext('2d'), grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
            // loop on each colors
            let i = 0;
            colors.forEach((color) => {
                grad.addColorStop((1 / (colors.length - 1)) * i, color);
                i++;
            });
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
            this.grad64 = can.toDataURL();
            this._image.setAttribute('xlink:href', this.grad64);
        }
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
        applyTo(elm) {
            super.applyTo(elm);
            this._setImageSize();
            window.addEventListener('resize', this._onWindowResize.bind(this));
        }
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
        unapplyFrom(elm) {
            super.unapplyFrom(elm);
            window.removeEventListener('resize', this._onWindowResize);
        }
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
        _onWindowResize(e) {
            // set the image size
            this._setImageSize();
        }
        /**
         * @name        _setImageSize
         * @type        Function
         * @private
         *
         * Set image width
         *
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _setImageSize() {
            const width = this.elms[0].offsetWidth, height = this.elms[0].offsetHeight;
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
        }
    }
    // export modules
    exports.default = SGradientSvgFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dyYWRpZW50U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0dyYWRpZW50U3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDhEQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxNQUFNLGtCQUFtQixTQUFRLG9CQUFVO1FBQ3pDOzs7Ozs7O1dBT0c7UUFDSDtZQUNFLEtBQUssQ0FBQzs7O0dBR1AsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUMxQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFDakMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUMvQixFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQ3JCLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLEtBQUssRUFDekIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUNyQixFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNu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