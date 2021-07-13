/**
*
* @name      whenOutOfViewport
* @namespace            js.dom.detect
* @type      Function
* @async
* @platform          js
* @platform          ts
* @status        stable
*
* Monitor an HTMLElement to be notified when it exit the viewport
*
* @feature       Promise based API
* @feature       Some settings to tweak the detection behavior
*
* @setting       {Number}      [offset=50]     An offset to detect sooner or later the element exits the viewport
*
* @param 		{HTMLElement} 				elm 				The element to monitor
* @param 		{IWhenOutOfViewportSettings} 					[settings={}]       Some settings to tweak the detection behavior
* @return 		(Promise) 										The promise that will be resolved when the element exit the viewport
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import whenOutOfViewport from '@coffeekraken/sugar/js/dom/whenOutOfViewport'
* whenOutOfViewport(myCoolHTMLElement).then((elm) => {
* 		// do something with your element that has exit the viewport...
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/