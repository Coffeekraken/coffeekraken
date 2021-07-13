/**
*
* @name      stylesheetsReady
* @namespace            js.dom.detect
* @type      Function
* @async
* @platform          js
* @platform          ts
* @status        beta
*
* Wait until all the HTMLLinkElement's are properly loaded
*
* @feature       Async promise based
* @feature       Callback support
* @feature       Multiple stylesheets elements listening
*
* @param 		{Array}<HTMLLinkElement> 		links 			The HTMLLinkElement tags to process
* @param 		{Function} 						[cb=null] 		An optional callback function to call when all the links are loaded
* @return 		{Promise} 										The promise that will be resolved when all the links are loaded
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import stylesheetsReady from '@coffeekraken/sugar/js/dom/stylesheetsReady'
* stylesheetsReady([
* 		myHTMLLinkElement1,
* 		myHTMLLinkElement2
* ]).then(() => {
* 		// do something when all the links are loaded
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/