// @ts-nocheck

import __isVisible from '../is/visible';
import __closestNotVisible from '../query/closestNotVisible';

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
 * import __whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'
 * __whenVisible(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenVisible(
    $elm: HTMLElement,
    cb: Function = null,
): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
        // variables
        let isSelfVisible = false,
            areParentsVisible = false,
            closestNotVisible = null,
            selfObserver = null,
            parentObserver = null;

        const _cb = () => {
            if (isSelfVisible) {
                selfObserver?.disconnect?.();
                // remove the event listeners
                $elm.removeEventListener('transitionend', _eventCb);
                $elm.removeEventListener('animationstart', _eventCb);
                $elm.removeEventListener('animationend', _eventCb);
            }

            if (areParentsVisible) {
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

            if (isSelfVisible && areParentsVisible) {
                // process callbacks
                cb?.($elm);
                resolve($elm);
                // remove the event listeners
                $elm.removeEventListener('transitionend', _eventCb);
                $elm.removeEventListener('animationstart', _eventCb);
                $elm.removeEventListener('animationend', _eventCb);
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
                            // stop observe
                            selfObserver.disconnect();
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
                            // stop observe
                            parentObserver.disconnect();
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
