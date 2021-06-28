// @ts-nocheck

/**
 * @name      inViewport
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				elm  			The element to insert
 * @param 		{Object} 					[offset=50] 	An object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import inViewport from '@coffeekraken/sugar/js/dom/is/inViewport'
 * if (inViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IInViewport {
  offset: number | Record<string, number>;
}

function inViewport(elm: HTMLElement, settings: Partial<IInViewport> = {}): boolean {

  settings = {
    offset: 50,
    ...settings
  };

  // handle offset
  let offsetTop = settings.offset;
  let offsetRight = settings.offset;
  let offsetBottom = settings.offset;
  let offsetLeft = settings.offset;
  if (typeof settings.offset === 'object') {
    offsetTop = settings.offset.top || 0;
    offsetRight = settings.offset.right || 0;
    offsetBottom = settings.offset.bottom || 0;
    offsetLeft = settings.offset.left || 0;
  }
  const containerHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const containerWidth =
    window.innerWidth || document.documentElement.clientWidth;
  const rect = elm.getBoundingClientRect();
  const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
  const isBottomIn = rect.bottom - offsetTop >= 0;
  const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
  const isRightIn = rect.right - offsetLeft >= 0;
  return isTopIn && isBottomIn && isLeftIn && isRightIn;
}
export default inViewport;
