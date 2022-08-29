// @ts-nocheck

/**
 * @name      whenInViewport
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        beta
 * @async
 *
 * Monitor an HTMLElement to be notified when it is in the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings available to tweak the behavior
 *
 * @setting     {String}      [offset='10px']         An offset to detect sooner or later the element entering in the viewport
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Partial<IWhenInViewportSettings>} 					[settings={}] 		Some settings to tweak the detection behavior
 * @return 		(Promise<HTMLElement>) 											The promise that will be resolved when the element is in the viewport
 *
 * @todo      tests
 *
 * @example 	js
 * import __whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
 * __whenInViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWhenInViewportSettings {
    offset: string;
}

export default function whenInViewport(
    elm: HTMLElement,
    settings: Partials<IWhenInViewportSettings> = {},
): Promise<HTMLElement> {
    settings = {
        offset: '10px',
        ...settings,
    };

    return new Promise((resolve) => {
        const options = {
            root: null, // relative to document viewport
            rootMargin: settings.offset, // margin around root. Values are similar to css property. Unitless values not allowed
            threshold: 0, // visible amount of item shown in relation to root
        };

        function onChange(changes, observer) {
            changes.forEach((change) => {
                if (change.intersectionRatio > 0) {
                    // your observer logic
                    observer.disconnect?.();
                    resolve(elm);
                }
            });
        }

        const observer = new IntersectionObserver(onChange, options);

        observer.observe(elm);
    });
}
