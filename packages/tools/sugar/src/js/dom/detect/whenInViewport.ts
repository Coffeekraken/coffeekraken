// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __uniqid from '../../string/uniqid.js';

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
 * @return 		(SPromise<HTMLElement>) 											The promise that will be resolved when the element is in the viewport
 *
 * @snippet         __whenInViewport($1)
 * __whenInViewport($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenInViewport } from '@coffeekraken/sugar/dom'
 * const promise = __whenInViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 * // when you want to stop listening
 * promise.cancel();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWhenInViewportSettings {
    offset: string;
    whenIn: Function;
    whenOut: Function;
    once: boolean;
}

export default function __whenInViewport(
    $elm: HTMLElement,
    settings: Partials<IWhenInViewportSettings> = {},
): Promise<HTMLElement> {
    settings = {
        offset: '10px',
        once: true,
        whenIn: null,
        whenOut: null,
        ...settings,
    };

    let observer;

    // generate a uniqid for this listener
    const id = __uniqid();

    const pro = new __SPromise(({ resolve, emit }) => {
        const options = {
            root: null, // relative to document viewport
            rootMargin: settings.offset, // margin around root. Values are similar to css property. Unitless values not allowed
            threshold: 0, // visible amount of item shown in relation to root
        };

        // store status for all listeners
        if (!$elm._whenInViewportStatus) {
            $elm._whenInViewportStatus = {};
        }

        function onChange(changes) {
            changes.forEach((change) => {
                if (change.intersectionRatio === 0) {
                    // prevent from triggering multiple times the callback
                    // for this listener if already invisible
                    if (!$elm._whenInViewportStatus[id]) {
                        return;
                    }

                    // set the listener status on the element
                    $elm._whenInViewportStatus[id] = false;

                    // process callbacks
                    settings.whenOut?.($elm);

                    // event
                    emit('out', $elm);
                } else {
                    // "once" settings support
                    if (settings.once) {
                        observer.disconnect();
                    }

                    // prevent from triggering multiple times the callback
                    // for this listener if already visible
                    if ($elm._whenInViewportStatus[id]) {
                        return;
                    }

                    // set the listener status on the element
                    $elm._whenInViewportStatus[id] = true;

                    // process callbacks
                    settings.whenIn?.($elm);

                    // event
                    emit('in', $elm);

                    // resolve the promise only if the "once"
                    // setting is true
                    if (settings.once) {
                        resolve($elm);
                    }
                }
            });
        }

        observer = new IntersectionObserver(onChange, options);
        observer.observe($elm);
    });

    pro.on('cancel', () => {
        observer?.disconnect();
    });

    return pro;
}
