import __isInViewport from './isInViewport';
import __throttle from '../function/throttle';
import __closest from './closest';

// TODO tests

/**
 * @name      whenOutOfViewport
 * @namespace           js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when it exit the viewport
 *
 * @param 		{HTMLElement} 				elm 				The element to monitor
 * @param 		{Number} 					[offset=50] 		An offset that represent the distance before entering the viewport for the detection
 * @return 		(Promise) 										The promise that will be resolved when the element exit the viewport
 *
 * @example 	js
 * import whenOutOfViewport from '@coffeekraken/sugar/js/dom/whenOutOfViewport'
 * whenOutOfViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has exit the viewport...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function whenOutOfViewport(elm, offset = 50) {
  return new Promise((resolve, reject) => {
    if (window.IntersectionObserver) {
      let isInViewport = false,
        _cb = () => {
          if (!isInViewport) {
            observer.disconnect();
            resolve(elm);
          }
        };

      const observer = new IntersectionObserver(
        (entries, observer) => {
          if (!entries.length) return;
          const entry = entries[0];
          if (entry.intersectionRatio > 0) {
            isInViewport = true;
          } else {
            isInViewport = false;
          }
          _cb();
        },
        {
          root: null, // viewport
          rootMargin: `${offset}px`,
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }
      );

      observer.observe(elm);
    } else {
      // try to get the closest element that has an overflow
      let scrollContainerElm = document;
      if (!elm._inViewportContainer) {
        const overflowContainer = __closest(
          elm,
          '[data-in-viewport-container]'
        );
        if (overflowContainer) {
          scrollContainerElm = overflowContainer;
          elm._inViewportContainer = overflowContainer;
        }
      } else {
        scrollContainerElm = elm._inViewportContainer;
      }

      let isInViewport = true,
        _cb = () => {
          if (!isInViewport) {
            scrollContainerElm.removeEventListener('scroll', checkViewport);
            window.removeEventListener('resize', checkViewport);
            resolve(elm);
          }
        };
      let checkViewport = __throttle((e) => {
        isInViewport = __isInViewport(elm, offset);
        _cb();
      }, 100);

      // listen for resize
      scrollContainerElm.addEventListener('scroll', checkViewport);
      window.addEventListener('resize', checkViewport);
      setTimeout(() => {
        checkViewport(null);
      });
    }
  });
}
