// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import { __uniqid } from '@coffeekraken/sugar/string';

import { __closestNotVisible, __isVisible } from '@coffeekraken/sugar/dom';

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
 * @feature       Callback support
 *
 * @param 		{HTMLElement} 				$elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element is visible
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element is visible
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenVisible } from '@coffeekraken/sugar/js/dom/whenVisible'
 * __whenVisible(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @since         1.0.0
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

        const _cb = () => {
            if (isSelfVisible) {
                // "once" settings support
                if (finalSettings.once) {
                    selfObserver?.disconnect?.();

                    // remove the event listeners
                    $elm.removeEventListener('transitionend', _eventCb);
                    $elm.removeEventListener('animationstart', _eventCb);
                    $elm.removeEventListener('animationend', _eventCb);
                }
            }

            if (areParentsVisible) {
                // "once" settings support
                if (finalSettings.once) {
                    parentObserver?.disconnect?.();
                    // remove the event listeners
                    if (closestNotVisible) {
                        closestNotVisible.removeEventListener(
                            'transitionend',
                            _eventCb,
                        );
                        closestNotVisible.removeEventListener(
                            'animationstart',
                            _eventCb,
                        );
                        closestNotVisible.removeEventListener(
                            'animationend',
                            _eventCb,
                        );
                    }
                }
            }

            if (isSelfVisible && areParentsVisible) {
                // prevent from triggering multiple times the callback
                // for this listener if already visible
                if ($elm._whenVisibleStatus[id]) {
                    return;
                }

                // set the listener status on the element
                $elm._whenVisibleStatus[id] = true;

                // process callbacks
                whenVisible?.($elm);

                // event
                emit('visible', $elm);

                if (finalSettings.once) {
                    resolve($elm);
                }
            } else {
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
            }
        };

        // function called on each transitionend, start, etc...
        const _eventCb = (e) => {
            // update status
            isSelfVisible = __isVisible($elm);
            if (closestNotVisible) {
                areParentsVisible = __isVisible(closestNotVisible);
            }

            // callback
            _cb($elm);
        };

        // check if element itself is not visible
        if (!__isVisible($elm)) {
            selfObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // check that is the style whos changed
                    if (
                        mutation.attributeName === 'style' ||
                        mutation.attributeName === 'class'
                    ) {
                        // check if is visible
                        if (__isVisible(mutation.target)) {
                            // update
                            isSelfVisible = true;
                            // callback
                            _cb($elm);
                        }
                    }
                });
            });
            selfObserver.observe($elm, { attributes: true });

            // listen for animationstart to check if the element is visible
            $elm.addEventListener('animationstart', _eventCb);
            $elm.addEventListener('animationend', _eventCb);
            $elm.addEventListener('transitionend', _eventCb);
        } else {
            isSelfVisible = true;
        }

        // get the closest not visible element
        // if found, we monitor it to check when it is visible
        closestNotVisible = __closestNotVisible($elm);
        if (closestNotVisible) {
            parentObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // check that is the style whos changed
                    if (
                        mutation.attributeName === 'style' ||
                        mutation.attributeName === 'class'
                    ) {
                        // check if is visible
                        if (__isVisible(mutation.target)) {
                            // update
                            areParentsVisible = true;
                            // callback
                            _cb($elm);
                        }
                    }
                });
            });
            parentObserver.observe(closestNotVisible, { attributes: true });

            // listen for animationstart to check if the element is visible
            closestNotVisible.addEventListener('animationstart', _eventCb);
            closestNotVisible.addEventListener('animationend', _eventCb);
            closestNotVisible.addEventListener('transitionend', _eventCb);
        } else {
            areParentsVisible = true;
        }

        // callback
        _cb($elm);
    });
}
