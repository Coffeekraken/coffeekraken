/**
*
* @name      matches
* @namespace            js.dom.query
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Polyfill for the Element.matches function
*
* @param 		{HTMLElement} 			elm  			The element to check
* @param 		{String} 				selector 		The selector to check on the element
* @return 		{Boolean} 								If the element match the selector or not
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import matches from '@coffeekraken/sugar/js/dom/matches'
* if (matches(myCoolHTMLElement, '.my-cool-css-selector')) {
* 		// the element match the selector
* }
*
* @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/