// @ts-nocheck
import __traverseUp from '../traverse/up';
import __isScrollable from '../is/scrollable';

/**
 * @name        closestScrollable
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Go up the dom three to find the first element that is scrollable
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __closestScrollable from '@coffeekraken/sugar/js/node/query/closestScrollable';
 * __closestScrollable($myElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function closestScrollable($elm: HTMLElement, selector: string | Function): HTMLElement {
    return __traverseUp($elm, ($e) => __isScrollable($e));
}
