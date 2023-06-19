// @ts-nocheck

import __isVisible from '../is/isVisible';

/**
 * @name      inViewportPercentage
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Return how many percent the passed element is visible in the viewport
 *
 * @param 		{HTMLElement} 				elm  		The element to get the in viewport percentage from
 * @return 		{Number} 								The percentage visible in the viewport
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __inViewportPercentage($1)
 *
 * @example  	js
 * import { __inViewportPercentage } from '@coffeekraken/sugar/dom'
 * const percentage = __inViewportPercentage(myCoolHTMLElement);
 * // 20
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __inViewportPercentage(elm: HTMLElement): number {
    // if not visible at all
    if (!__isVisible(elm)) return 0;

    // calculate the visible percentage
    const bounding = elm.getBoundingClientRect();

    let percentageWidth = 100,
        percentageHeight = 100;

    // percentageHeight
    if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
        percentageHeight = 100;
    } else {
        const elmHeight = bounding.bottom - bounding.top;
        if (bounding.top < 0) {
            percentageHeight -= (100 / elmHeight) * (bounding.top * -1);
        }
        if (bounding.bottom > window.innerHeight) {
            percentageHeight -=
                (100 / elmHeight) * (bounding.bottom - window.innerHeight);
        }
    }
    percentageHeight = Math.round(percentageHeight);
    if (percentageHeight < 0) percentageHeight = 0;
    if (percentageHeight > 100) percentageHeight = 100;

    // percentageWidth
    if (bounding.left >= 0 && bounding.right <= window.innerWidth) {
        percentageWidth = 100;
    } else {
        const elmWidth = bounding.right - bounding.left;
        if (bounding.left < 0) {
            percentageWidth -= (100 / elmWidth) * (bounding.left * -1);
        }
        if (bounding.right > window.innerWidth) {
            percentageWidth -=
                (100 / elmWidth) * (bounding.right - window.innerWidth);
        }
    }
    percentageWidth = Math.round(percentageWidth);
    if (percentageWidth < 0) percentageWidth = 0;
    if (percentageWidth > 100) percentageWidth = 100;

    // calculate the percentage in total
    return Math.round(
        (100 / (100 * 100)) * (percentageWidth * percentageHeight),
    );
}
