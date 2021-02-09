// @ts-nocheck

import __matches from './matches';

/**
 * @name        closest
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Go up the dom three to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{String|Function} 				selector 	A css selector to search for or a check function that will be used
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import closest from '@coffeekraken/sugar/js/dom/closest'
 * const closestElm = closest(myCoolElement, '.my-cool-class');
 * if (closestElm) {
 * 		// we have found en element that matches the selector
 * }
 * // the selector param can be a function that need to return either true or false like so:
 * closest(myCoolElement, (elm) => {
 *   return elm.hasAttribute('my-cool-attribute')
 * })
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function closest($elm, selector) {
  const originalElm = $elm;
  $elm = $elm.parentNode;
  while ($elm && $elm != originalElm.ownerDocument) {
    if (typeof selector === 'function') {
      if (selector($elm)) return $elm;
    } else if (typeof selector === 'string' && __matches($elm, selector)) {
      return $elm;
    }
    $elm = $elm.parentNode;
  }
  return null;
}
export default closest;
