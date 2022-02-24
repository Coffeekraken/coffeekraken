import __scrollTop from '../scroll/scrollTop';
import __offset from '../offset/offset';

/**
 * @name            fromElementTopToViewportTop
 * @namespace       js.dom.distance
 * @type            Function
 * @platform          js
 * @status          betas
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport top in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @example         js
 * import distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
 * distanceFromElementTopViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function fromElementTopToViewportTop(elm: HTMLElement): number {
    const offsets = __offset(elm);
    const scrollTop = __scrollTop();
    // @ts-ignore
    return offsets.top - scrollTop;
}
