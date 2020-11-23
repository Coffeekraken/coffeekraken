import __inViewport from 'in-viewport';

/**
 * @name      whenInViewport
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Monitor an HTMLElement to be notified when it is in the viewport
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Number} 					[offset=50] 			An offset that represent the distance before entering the viewport for the detection
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
export default function whenInViewport(elm, offset = 50) {
  return new Promise((resolve, reject) => {
    __inViewport(
      elm,
      {
        offset: offset
      },
      () => {
        resolve(elm);
      }
    );
  });
}
