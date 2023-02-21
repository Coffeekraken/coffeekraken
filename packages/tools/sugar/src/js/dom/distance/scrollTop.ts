// @ts-nocheck

/**
 * @name      scrollTop
 * @namespace            js.dom.distance
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the amount of scroll top that the user as made in the page
 *
 * @return      {Number}            The amount of scroll top that the user as made in the page
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __scrollTop } from '@coffeekraken/sugar/dom';
 * __scrollTop();
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) (https://olivierbossel.com)
 */
function scrollTop(): number {
    return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}
export default scrollTop;
