/**
*
* @name      inViewportStatusChange
* @namespace            js.dom.detect
* @type      Function
* @async
* @platform          js
* @platform          ts
* @status        beta
*
* Monitor when the passed element enter or exit the viewport
*
* @param 		{HTMLElement} 						elm  		The element to monitor
* @return 		{SPromise} 		                    The SPromise on wich you can register your callbacks. Available callbacks registration function are "enter" and "exit"
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import inViewportStatusChange from '@coffeekraken/sugar/js/dom/inViewportStatusChange';
* inViewportStatusChange(myElm).on('enter', $elm => {
*    // do something...
* }).on('exit', $elm => {
*    // do something...
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/