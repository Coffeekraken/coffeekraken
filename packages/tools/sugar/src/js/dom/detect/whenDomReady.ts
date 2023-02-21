// @ts-nocheck

/**
 * @name      whenDomReady
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status      stable
 *
 * Wait that the dom is ready before resolving the promise
 *
 * @return 		{Promise<void>} 					A promise that will be resolved when the dom is ready
 *
 * @todo      tests
 *
 * @example  	js
 * import { __whenDomReady } from '@coffeekraken/sugar/dom'
 * // using promise
 * __whenDomReady().then(() => {
 * 		// do something
 * });
 *
 * @see             https://www.jstips.co/en/javascript/detect-document-ready-in-pure-js/
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenDomReady(): Promise<void> {
    return new Promise((resolve) => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            document.onreadystatechange = () => {
                if (document.readyState === 'complete') {
                    resolve();
                }
            };
        }
    });
}
