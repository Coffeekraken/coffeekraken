// @ts-nocheck

import __isInViewport from '../is/inViewport';
import __throttle from '../../../shared/function/throttle';
import __closest from '../query/closest';

/**
 * @name      whenOutOfViewport
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status        stable
 *
 * Monitor an HTMLElement to be notified when it exit the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings to tweak the detection behavior
 *
 * @setting       {Number}      [offset=50]     An offset to detect sooner or later the element exits the viewport
 *
 * @param 		{HTMLElement} 				elm 				The element to monitor
 * @param 		{IWhenOutOfViewportSettings} 					[settings={}]       Some settings to tweak the detection behavior
 * @return 		(Promise) 										The promise that will be resolved when the element exit the viewport
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenOutOfViewport from '@coffeekraken/sugar/js/dom/whenOutOfViewport'
 * whenOutOfViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has exit the viewport...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IWhenOutOfViewportSettings {
    offset: number;
}

function whenOutOfViewport(
    elm: HTMLElement,
    settings: Partial<IWhenOutOfViewportSettings> = {},
) {
    return new Promise((resolve, reject) => {
        settings = {
            offset: 10,
            ...settings,
        };

        let isInViewport = false;
        const _cb = () => {
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
                rootMargin: `${settings.offset}px`,
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            },
        );

        observer.observe(elm);
    });
}
export default whenOutOfViewport;
