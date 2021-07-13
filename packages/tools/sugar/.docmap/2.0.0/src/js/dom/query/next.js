/**
*
* @name      next
* @namespace            js.dom.query
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Browse the passed element next siblings to find the first element that matches the passed selector
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
* import next from '@coffeekraken/sugar/js/dom/next'
* const nextElm = next(myCoolElement, '.my-cool-class');
* if (nextElm) {
* 		// we have found en element that matches the selector
* }
*
* @since       1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/