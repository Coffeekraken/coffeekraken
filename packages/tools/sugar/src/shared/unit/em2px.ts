// @ts-nocheck

/**
 * @name                    em2px
 * @namespace            js.unit
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import em2px from '@coffeekraken/sugar/js/unit/em2px';
 * em2px(2);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function em2px(em, $elm = document.documentElement) {
    return em * parseFloat(getComputedStyle($elm).fontSize || '16px');
}
export default em2px;
