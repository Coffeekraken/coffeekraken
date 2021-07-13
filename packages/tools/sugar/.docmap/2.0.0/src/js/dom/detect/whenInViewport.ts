/**
*
* @name      whenInViewport
* @namespace            js.dom.detect
* @type      Function
* @async
* @platform          js
* @platform          ts
* @status        beta
*
* Monitor an HTMLElement to be notified when it is in the viewport
*
* @feature       Promise based API
* @feature       Some settings available to tweak the behavior
*
* @setting     {Number}      [offset=50]         An offset to detect sooner or later the element entering in the viewport
*
* @param 		{HTMLElement} 				elm 					The element to monitor
* @param 		{IWhenInViewportSettings} 					[settings={}] 		Some settings to tweak the detection behavior
* @return 		(Promise) 											The promise that will be resolved when the element is in the viewport
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
* whenInViewport(myCoolHTMLElement).then((elm) => {
* 		// do something with your element that has entered the viewport...
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/