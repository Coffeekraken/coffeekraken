// @ts-nocheck
import { __closestScrollable } from '@coffeekraken/sugar/dom';

/**
 * @name      whenNearViewport
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        beta
 * @async
 *
 * Monitor an HTMLElement to be notified when it is near (100vh before or after) the viewport, or in the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings available to tweak the behavior
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Partial<IWhenNearViewportSettings>} 					[settings={}] 		Some settings to tweak the detection behavior
 * @return 		(Promise<HTMLElement>) 											The promise that will be resolved when the element is in the viewport
 *
 * @setting         {String}            [offset=`${window.innerHeight}px ${window.innerWidth}px`]           Some offset
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenNearViewport } from '@coffeekraken/sugar/dom'
 * __whenNearViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWhenNearViewportSettings {
    offset: string;
}

export default function __whenNearViewport(
    elm: HTMLElement,
    settings: Partials<IWhenNearViewportSettings> = {},
): Promise<HTMLElement> {
    function getRootMargin() {
        return [
            `${Math.round(window.innerHeight * 0.5)}px`,
            `${Math.round(window.innerWidth * 0.5)}px`,
            `${Math.round(window.innerHeight * 0.5)}px`,
            `${Math.round(window.innerWidth * 0.5)}px`,
        ].join(' ');
    }

    settings = {
        ...settings,
    };

    let observer: IntersectionObserver, resizeTimeout: number;

    let $closest = __closestScrollable(elm);
    if ($closest?.tagName === 'HTML') $closest = null;

    return new Promise(async (resolve) => {
        const options = {
            root: $closest, // relative to document viewport
            rootMargin: settings.offset ?? getRootMargin(), // margin around root. Values are similar to css property. Unitless values not allowed
            threshold: 0, // visible amount of item shown in relation to root
        };

        function onChange(changes, observer) {
            changes.forEach((change) => {
                if (change.intersectionRatio > 0) {
                    observer.disconnect?.();
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
                options.rootMargin = settings.offset ?? getRootMargin();
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    });
}
