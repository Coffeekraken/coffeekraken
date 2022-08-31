// @ts-nocheck
import __isInViewport from '../is/inViewport';

/**
 * @name      whenEntersViewport
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Monitor an HTMLElement to be notified when it is enters in the viewport (1/3vh in the viewport), or in the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings available to tweak the behavior
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Partial<IWhenEntersViewportSettings>} 					[settings={}] 		Some settings to tweak the detection behavior
 * @return 		(Promise<HTMLElement>) 											The promise that will be resolved when the element is in the viewport
 *
 * @setting         {String}        [offset='0px 0px -25% 0px']         An offset to detect the element entering in viewport earlier or later
 *
 * @todo      tests
 *
 * @example 	js
 * import __whenEntersViewport from '@coffeekraken/sugar/js/dom/whenEntersViewport'
 * __whenEntersViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWhenEntersViewportSettings {
    offset: string;
}

export default function whenEntersViewport(
    elm: HTMLElement,
    settings: Partials<IWhenEntersViewportSettings> = {},
): Promise<HTMLElement> {
    const offset = `0px 0px -25% 0px`;

    settings = {
        offset,
        ...settings,
    };

    let observer: IntersectionObserver, resizeTimeout: number;

    return new Promise(async (resolve) => {
        const options = {
            root: null, // relative to document viewport
            rootMargin: settings.offset, // margin around root. Values are similar to css property. Unitless values not allowed
            threshold: 0, // visible amount of item shown in relation to root
        };

        if (__isInViewport(elm)) {
            return resolve(elm);
        }

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
                options.rootMargin = settings.offset;
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    });
}
