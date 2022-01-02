// @ts-nocheck

import __whenVisible from './whenVisible';

/**
 * @name      whenNearViewport
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status        beta
 *
 * Monitor an HTMLElement to be notified when it is near (100vh before or after) the viewport, or in the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings available to tweak the behavior
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{IWhenNearViewportSettings} 					[settings={}] 		Some settings to tweak the detection behavior
 * @return 		(Promise) 											The promise that will be resolved when the element is in the viewport
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenNearViewport from '@coffeekraken/sugar/js/dom/whenNearViewport'
 * whenNearViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IWhenNearViewportSettings {}

function whenNearViewport(
    elm: HTMLElement,
    settings: Partials<IWhenNearViewportSettings> = {},
) {
    settings = {
        offset: `${window.innerHeight}px ${window.innerWidth}px`,
        ...settings,
    };

    let observer: IntersectionObserver, resizeTimeout: number;

    return new Promise(async (resolve) => {
        const options = {
            root: null, // relative to document viewport
            rootMargin: settings.offset, // margin around root. Values are similar to css property. Unitless values not allowed
            threshold: 1.0, // visible amount of item shown in relation to root
        };

        function onChange(changes, observer) {
            changes.forEach((change) => {
                if (change.intersectionRatio > 0) {
                    // your observer logic
                    observer.disconnect();
                    resolve(elm);
                }
            });
        }

        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);

        window.addEventListener('resize', (e) => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                observer.disconnect?.();
                options.rootMargin = `${window.innerHeight}px ${window.innerWidth}px`;
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    });
}
export default whenNearViewport;
