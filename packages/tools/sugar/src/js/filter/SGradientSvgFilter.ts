import SSvgFilter from './SSvgFilter';

/**
 * @name 		SGradientSvgFilter
 * @namespace           sugar.js.filter
 * @type      Class
 * @extends 		SSvgFilter
 *
 * This SVG filter class apply either a linear or a radial gradient of your choice
 * on an HTMLElement.
 * This is useful cause the gradient will only be applied on part of the elements that is really visible and will respect the opacity
 * of each parts
 *
 * @example 		js
 * const filter = new SGradientSvgFilter();
 * filter.linear(['red','blue','green']);
 * filter.applyTo(myCoolHTMLElement);
 *
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
    let width = settings.width || 512,
      height = settings.height || 512,
      x0 = settings.x0 || 0,
      x1 = settings.x1 || width,
      y0 = settings.y0 || 0,
      y1 = settings.y1 || 0;
    let can = document.createElement('canvas');
    can.setAttribute('width', width);
    can.setAttribute('height', height);
    let ctx = can.getContext('2d'),
      grad = ctx.createLinearGradient(x0, y0, x1, y1);
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
    let width = settings.width || 512,
      height = settings.height || 512,
      x0 = settings.x0 || width / 2,
      x1 = settings.x1 || width / 2,
      r0 = settings.r0 || 0,
      y0 = settings.y0 || height / 2,
      y1 = settings.y1 || height / 2,
      r1 = settings.r1 || width;
    let can = document.createElement('canvas');
    can.setAttribute('width', width);
    can.setAttribute('height', height);
    let ctx = can.getContext('2d'),
      grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
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
    let width = this.elms[0].offsetWidth,
      height = this.elms[0].offsetHeight;
    if (width >= height) {
      this._image.setAttribute('width', width);
      this._image.removeAttribute('height');
    } else {
      this._image.setAttribute('height', height);
      this._image.removeAttribute('width');
    }
    // this._image.setAttribute('width', width);
    // this._image.setAttribute('height', height);
  }
}

// export modules
export default SGradientSvgFilter;
