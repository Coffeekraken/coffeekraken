/**
 * @name      realHeight
 * @namespace           js.dom
 * @type      Function
 *
 * Return the full height of an element that has maybe a max-height, etc...
 *
 * @param 		{HTMLElement} 		elm 		The element to process
 * @return 		{Number} 						The real height of the element
 *
 * @example     js
 * import realHeight from '@coffeekraken/sugar/js/dom/realHeight';
 * realHeight(myCoolHtmlElement);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function realHeight(elm) {
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
