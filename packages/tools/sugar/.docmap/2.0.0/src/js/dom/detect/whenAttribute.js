/**
*
* @name      whenAttribute
* @namespace            js.dom.detect
* @type      Function
* @async
* @platform          js
* @platform          ts
* @status        beta
*
* Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
*
* @feature       Detect attribute changes
* @feature       Possibility to pass a check function to check if the attribute suits your needs
* @feature       Promise based API
*
* @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
* @param 		{String} 					attribute 			The attribute to monitor
* @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
* @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import whenAttribute from '@coffeekraken/sugar/js/dom/whenAttribute'
* whenAttribute(myCoolHTMLElement, 'value').then((value) => {
* 		// the value attribute exist on the element
* });
* // with a checkFn
* whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
* 		// make sure the value is a number
* 		return typeof(newVal) === 'number';
* }).then((value) => {
* 		// do something with your number value...
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/