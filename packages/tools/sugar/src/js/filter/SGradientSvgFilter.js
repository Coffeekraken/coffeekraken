// @ts-nocheck
import SSvgFilter from './SSvgFilter';
/**
 * @name 		SGradientSvgFilter
 * @namespace            js.filter
 * @type      Class
 * @extends 		SSvgFilter
 * @platform      js
 * @status      beta
 *d
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dyYWRpZW50U3ZnRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0dyYWRpZW50U3ZnRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sa0JBQW1CLFNBQVEsVUFBVTtJQUN6Qzs7Ozs7OztPQU9HO0lBQ0g7UUFDRSxLQUFLLENBQUM7OztHQUdQLENBQUMsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDMUIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQ2pDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFDL0IsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUNyQixFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxLQUFLLEVBQ3pCLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsRUFDckIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7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