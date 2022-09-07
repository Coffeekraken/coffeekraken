// @ts-nocheck

/**
 * @name      whenRemoved
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Resolve a promise when the passed node has been removed from the dom
 *
 * @feature       Detect when the element has been removed from the dom
 * @feature       Possibility to pass a check function to check if the attribute suits your needs
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$elm 				The HTMLElement on which to monitor
 * @return 		(Promise<HTMLElement>) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenRemoved } from '@coffeekraken/sugar/dom'
 * __whenRemoved(myCoolHTMLElement).then((value) => {
 * 		// the element has been removed
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenRemoved($elm) {
    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.removedNodes.forEach(function (removedNode) {
                    if (removedNode === $elm) {
                        resolve($elm);
                        observer.disconnect();
                    }
                });
            });
        });
        observer.observe($elm.parentElement, {
            subtree: false,
            childList: true,
        });
    });
}
