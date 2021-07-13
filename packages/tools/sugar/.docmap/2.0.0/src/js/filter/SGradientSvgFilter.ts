/**
*
* @name 		SGradientSvgFilter
* @namespace            js.filter
* @type      Class
* @extends 		SSvgFilter
* @platform          js
* @platform          ts
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
/**
*
* @name          constructor
* @type          Function
*
* Constructor
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
* @name        _setImageSize
* @type        Function
* @private
*
* Set image width
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/