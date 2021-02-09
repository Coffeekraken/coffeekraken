// @ts-nocheck

/**
 * @name      offset
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Get the offset top and left of the passed element from the document top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{Object} 									The offset top and left object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import offset from '@coffeekraken/sugar/js/dom/offset'
 * const offsetElm = offset(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function offset(elm) {
  const box = elm.getBoundingClientRect(),
    body = document.body,
    docEl = document.documentElement,
    scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
    scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
    clientTop = docEl.clientTop || body.clientTop || 0,
    clientLeft = docEl.clientLeft || body.clientLeft || 0,
    top = box.top + scrollTop - clientTop,
    left = box.left + scrollLeft - clientLeft;
  return {
    top: Math.round(top),
    left: Math.round(left)
  };
}
export default offset;
