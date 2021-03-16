// @ts-nocheck

import easeInOutQuad from '../../shared/easing/easeInOutQuad';
import requestAnimationFrame from './requestAnimationFrame';
/**
 * @name      scrollTo
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Function that let you make a smooth page scroll to a specific element in the page
 *
 * @param 		{HTMLElement} 				target 			The element to scroll to
 * @param 		{Number} 					[duration=1000] 		The animation duration
 * @param 		{Function} 					[easing=easeInOutQuad] 			An easing Function
 * @param 		{Number} 					[offset=0] 			The destination offset
 * @param 		{String} 					[align='top'] 			The destination align (top, center, bottom)
 * @param 		{Function} 					[onFinish=null] 		A callback to call when the animation if finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import scrollTop from '@coffeekraken/sugar/js/dom/scrollTo'
 * import easeInOutQuad from '@coffeekraken/sugar/js/easings/easeInOutQuad'
 * scrollTo(myCoolHTMLElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let isUserScrolling = false;
let userScrollingTimeout;
let isScrollingHappening = false;
document.addEventListener('mousewheel', (e) => {
  if (!isScrollingHappening) return;
  isUserScrolling = true;
  clearTimeout(userScrollingTimeout);
  userScrollingTimeout = setTimeout(() => {
    isUserScrolling = false;
  }, 200);
});

function scrollTo(
  target,
  duration = 1000,
  easing = easeInOutQuad,
  offset = 0,
  align = 'top',
  onFinish = null
) {
  const docElem = document.documentElement; // to facilitate minification better
  const windowHeight = docElem.clientHeight;
  const maxScroll =
    'scrollMaxY' in window
      ? window.scrollMaxY
      : docElem.scrollHeight - windowHeight;
  const currentY = window.pageYOffset;

  isScrollingHappening = true;

  let targetY = currentY;
  const elementBounds = isNaN(target) ? target.getBoundingClientRect() : 0;

  if (align === 'center') {
    targetY += elementBounds.top + elementBounds.height / 2;
    targetY -= windowHeight / 2;
    targetY -= offset;
  } else if (align === 'bottom') {
    targetY += elementBounds.bottom;
    targetY -= windowHeight;
    targetY += offset;
  } else {
    // top, undefined
    targetY += elementBounds.top;
    targetY -= offset;
  }
  targetY = Math.max(Math.min(maxScroll, targetY), 0);

  const deltaY = targetY - currentY;

  const obj = {
    targetY: targetY,
    deltaY: deltaY,
    duration: duration,
    easing: easing,
    onFinish: onFinish,
    startTime: Date.now(),
    lastY: currentY,
    step: scrollTo.step
  };
  requestAnimationFrame(obj.step.bind(obj));
}

scrollTo.step = function () {
  if (this.lastY !== window.pageYOffset && this.onFinish) {
    isScrollingHappening = false;
    this.onFinish();
    return;
  }

  // Calculate how much time has passed
  const t = Math.min((Date.now() - this.startTime) / this.duration, 1);

  // Scroll window amount determined by easing
  const y = this.targetY - (1 - this.easing(t)) * this.deltaY;
  window.scrollTo(window.scrollX, y);

  // Continue animation as long as duration hasn't surpassed
  if (t !== 1 && !isUserScrolling) {
    this.lastY = window.pageYOffset;
    requestAnimationFrame(this.step.bind(this));
  } else {
    isScrollingHappening = false;
    if (this.onFinish) this.onFinish();
  }
};

export default scrollTo;
