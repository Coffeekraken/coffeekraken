// @ts-nocheck

/**
 * @name      realHeight
 * @namespace            js.dom.size
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Return the full height of an element that has maybe a max-height, etc...
 *
 * @param 		{HTMLElement} 		elm 		The element to process
 * @return 		{Number} 						The real height of the element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __realHeight } from '@coffeekraken/sugar/dom';
 * __realHeight(myCoolHtmlElement);
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __realHeight(elm: HTMLElement): number {
    // apply an overflow-y to the element
    elm.style.transition = 'none';
    elm.style.overflowY = 'scroll';
    // get the actual height through the scrollHeight
    const height = elm.scrollHeight;
    // reset the overflowY
    elm.style.overflowY = '';
    elm.style.transition = '';
    // return the height
    return height;
}
