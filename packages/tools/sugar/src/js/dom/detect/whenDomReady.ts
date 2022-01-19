// @ts-nocheck

/**
 * @name      whenDomReady
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status      beta
 *
 * Wait that the dom is ready before resolving the promise
 *
 * @param 		{Function} 		[cb=null] 			An optional callback that will be called when the dom is ready
 * @return 		{Promise} 					A promise that will be resolved when the dom is ready
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import whenDomReady from '@coffeekraken/sugar/js/dom/detect/whenDomReady'
 * // using callback
 * whenDomReady(() => {
 * 		// do something
 * });
 * // using promise
 * whenDomReady().then(() => {
 * 		// do something
 * });
 *
 * @see             https://www.jstips.co/en/javascript/detect-document-ready-in-pure-js/
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function whenDomReady(cb = null) {
    return new Promise((resolve, reject) => {
        if (document.readyState === 'complete') {
            cb?.();
            resolve();
        } else {
            document.onreadystatechange = () => {
                if (document.readyState === 'complete') {
                    cb?.();
                    resolve();
                }
            };
        }
    });
}
