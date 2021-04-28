// @ts-nocheck
import SSvgFilter from './SSvgFilter';
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
class SGradientSvgFilter extends SSvgFilter {
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
export default SGradientSvgFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dyYWRpZW50U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0dyYWRpZW50U3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxrQkFBbUIsU0FBUSxVQUFVO0lBQ3pDOzs7Ozs7O09BT0c7SUFDSDtRQUNFLEtBQUssQ0FBQzs7O0dBR1AsQ0FBQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMxQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFDakMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUMvQixFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQ3JCLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLEtBQUssRUFDekIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUNyQixFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztR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