/**
*
* @name 		          SGooeySvgFilter
* @namespace            js.filter
* @type             Class
* @platform          js
* @platform          ts
* @status          wip
*
* This class allows you to create with ease some complexe SVG filters and to apply it on any HTMLElement that you want
* by extending this class like so
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 		js
* class MyBlurFilter extends SSvgFilter {
*
* 		constructor(amount = 8) {
* 			super(`
* 				<feGaussianBlur in="SourceGraphic" stdDeviation="${amount}" result="blur" />
* 			`);
* 		}
* }
*
* // using your filter
* const myFilter = new MyBlurFilter(10);
* myFilter.applyTo(myCoolHTMLElement);
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
* @param 			{String} 			filter          The SVG filter string representation
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            applyTo
* @type            Function
*
* Apply the filter to an element
*
* @param 		{HTMLElement} 			elm 			The element on which to apply the filter
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          unapplyFrom
* @type          Function
*
* Unapply from
*
* @param 		{HTMLElement} 			elm 			The element from which to remove the filter
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          _insertFilter
* @type          Function
* @private
*
* Insert the filter
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          destroy
* @type          Function
*
* Destroy the filter
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          _injectFiltersContainer
* @type          Function
* @private
* @static
*
* Inject the svg that will contains all the filters created through this class
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/