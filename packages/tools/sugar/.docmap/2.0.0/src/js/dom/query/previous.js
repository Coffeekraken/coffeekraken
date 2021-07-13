/**
*
* @name      previous
* @namespace            js.dom.query
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Browse the passed element previous siblings to find the first element that matches the passed selector
*
* @param 		{HTMLElement} 					elm  		The element to start on
* @param 		{String} 						selector 	A css selector to search for
* @return 		{HTMLElement} 								The element found or null
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import previous from '@coffeekraken/sugar/js/dom/previous'
* const previousElm = previous(myCoolElement, '.my-cool-class');
* if (previousElm) {
* 		// we have found en element that matches the selector
* }
*
* @since       1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/