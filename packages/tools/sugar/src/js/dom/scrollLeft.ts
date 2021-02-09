// @ts-nocheck

/**
 * @name      scrollLeft
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Get the amount of scroll left
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import scrollLeft from '@coffeekraken/sugar/js/dom/scrollLeft'
 * scrollLeft() // 40
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivier.bossel@gmail.com)
 */
function scrollLeft() {
  return window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
}
export default scrollLeft;
