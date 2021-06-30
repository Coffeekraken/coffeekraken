// @ts-nocheck

/**
 * @name      whenInViewport
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * Monitor an HTMLElement to be notified when it is in the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings available to tweak the behavior
 * 
 * @setting     {Number}      [offset=50]         An offset to detect sooner or later the element entering in the viewport
 * 
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{IWhenInViewportSettings} 					[settings={}] 		Some settings to tweak the detection behavior
 * @return 		(Promise) 											The promise that will be resolved when the element is in the viewport
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
 * whenInViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IWhenInViewportSettings {
  offset: number;
}

function whenInViewport(elm: HTMLElement, settings: Partials<IWhenInViewportSettings> = {}) {

  settings = {
    offset: 50,
    ...settings
  };

  return new Promise((resolve) => {

    const options = {
      root: null, // relative to document viewport 
      rootMargin: `${settings.offset}px`, // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 1.0 // visible amount of item shown in relation to root
    };
    
    function onChange(changes, observer) {
      changes.forEach(change => {
        if (change.intersectionRatio > 0) {
            // your observer logic
            observer.disconnect();
            resolve(elm);
        }
      });
    }

    const observer = new IntersectionObserver(onChange, options);

    observer.observe(elm);

  });
}
export default whenInViewport;
