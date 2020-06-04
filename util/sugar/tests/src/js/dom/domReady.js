/**
 * @name      domReady
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Wait that the dom is ready before resolving the promise
 *
 * @param 		{Function} 		cb 			An optional callback that will be called when the dom is ready
 * @return 		{Promise} 					A promise that will be resolved when the dom is ready
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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
import __domReady from "domready";
export default function domReady(cb = null) {
  return new Promise((resolve, reject) => {
    __domReady(() => {
      cb && cb();
      resolve();
    });
  });
}
