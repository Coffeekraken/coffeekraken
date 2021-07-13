/**
*
* @name      whenVisible
* @namespace            js.dom.detect
* @type      Function
* @async
* @platform          js
* @platform          ts
* @status          beta
*
* Monitor an HTMLElement to be notified when it is visible
*
* @feature       Promise based API
* @feature       Callback support
*
* @param 		{HTMLElement} 				elm 		The element to monitor
* @param 		{Function} 					[cb=null] 	An optional callback to call when the element is visible
* @return 		(Promise) 								The promise that will be resolved when the element is visible
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'
* whenVisible(myCoolHTMLElement).then((elm) => {
* 		// do something with your element that is now visible
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/