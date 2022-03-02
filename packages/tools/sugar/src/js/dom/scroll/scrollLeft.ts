// @ts-nocheck

/**
 * @name      scrollLeft
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the amount of scroll left that the user as made in the page
 *
 * @return      {Number}            The amount of scroll top that the user as made in the page
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import scrollLeft from '@coffeekraken/sugar/js/dom/scroll/scrollLeft';
 * scrollLeft();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) (https://olivierbossel.com)
 */
function scrollLeft(): number {
    return window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
}
export default scrollLeft;
