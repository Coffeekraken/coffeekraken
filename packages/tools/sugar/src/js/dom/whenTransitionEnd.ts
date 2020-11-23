import __getTransitionProperties from './getTransitionProperties';

/**
 * @name      whenTransitionEnd
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element transition has ended
 * @return 		(Promise) 								The promise that will be resolved when the element transition has ended
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenTransitionEnd from '@coffeekraken/sugar/js/dom/whenTransitionEnd'
 * whenTransitionEnd(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element transition has ended...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function whenTransitionEnd(elm, cb = null) {
  return new Promise((resolve, reject) => {
    const transition = __getTransitionProperties(elm);
    setTimeout(() => {
      resolve();
      cb && cb();
    }, transition.totalDuration);
  });
}
