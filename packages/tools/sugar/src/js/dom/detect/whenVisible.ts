// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import { __uniqid } from '@coffeekraken/sugar/string';

/**
 * @name      whenVisible
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status          stable
 *
 * Monitor an HTMLElement to be notified when it is visible
 *
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$elm 		The element to monitor
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element is visible
 *
 * @snippet         __whenVisible($1)
 * __whenVisible($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenVisible } from '@coffeekraken/sugar/js/dom/whenVisible'
 * __whenVisible(myCoolHTMLElement).then(($elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWhenVisibleSettings {
    whenVisible?: Function;
    whenInvisible?: Function;
    once?: boolean;
}

export default function __whenVisible(
    $elm: HTMLElement,
    settings?: Partial<IWhenVisibleSettings>,
): Promise<HTMLElement> {
    const pro = new __SPromise(({ resolve, reject, emit }) => {
        const finalSettings: IWhenVisibleSettings = {
            whenVisible: null,
            whenInvisible: null,
            once: true,
            ...(settings ?? {}),
        };

        // store status for all listeners
        if (!$elm._whenVisibleStatus) {
            $elm._whenVisibleStatus = {};
        }

        // variables
        let isSelfVisible = false,
            areParentsVisible = false,
            closestNotVisible = null,
            selfObserver = null,
            parentObserver = null;

        // generate a uniqid for this listener
        const id = __uniqid();

        var observer = new IntersectionObserver(function (entries) {
            if (entries[0]['intersectionRatio'] == 0) {
                // prevent from triggering multiple times the callback
                // for this listener if already invisible
                if (!$elm._whenVisibleStatus[id]) {
                    return;
                }

                // set the listener status on the element
                $elm._whenVisibleStatus[id] = false;

                // process callbacks
                finalSettings.whenInvisible?.($elm);

                // event
                emit('invisible', $elm);
            } else {
                // "once" settings support
                if (finalSettings.once) {
                    observer.disconnect();
                }

                // prevent from triggering multiple times the callback
                // for this listener if already visible
                if ($elm._whenVisibleStatus[id]) {
                    return;
                }

                // set the listener status on the element
                $elm._whenVisibleStatus[id] = true;

                // process callbacks
                finalSettings.whenVisible?.($elm);

                // event
                emit('visible', $elm);

                // resolve the promise only if the "once"
                // setting is true
                if (finalSettings.once) {
                    resolve($elm);
                }
            }
        });

        observer.observe($elm);

        pro.on('cancel', () => {
            observer?.disconnect();
        });

        return pro;
    });
}
