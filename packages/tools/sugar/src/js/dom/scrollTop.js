/**
 * @name      scrollTop
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Return the amount of scroll top that the user as made in the page
 *
 * @example     js
 * import scrollTop from '@coffeekraken/sugar/js/dom/scrollTop';
 * scrollTop();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
 */
export default function scrollTop() {
  return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}
