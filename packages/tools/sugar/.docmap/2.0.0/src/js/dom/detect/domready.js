/**
*
* @name      domReady
* @namespace            js.dom.detection
* @type      Function
* @async
* @platform          js
* @platform          ts
* @stable
*
* Wait that the dom is ready before resolving the promise
*
* @param 		{Function} 		cb 			An optional callback that will be called when the dom is ready
* @return 		{Promise} 					A promise that will be resolved when the dom is ready
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import domReady from '@coffeekraken/sugar/js/dom/domReady'
* // using callback
* domReady(() => {
* 		// do something
* });
* // using promise
* domReady().then(() => {
* 		// do something
* });
*
* @since           1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/