// @ts-nocheck

/**
 * @name      whenScriptLoaded
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect when a script has been fully loaded
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param    {HTMLScriptElement}    $script    The script element to detect the loading state
 * @param       {Function}      [cb=null]     A callback if you prefer
 * @return    {Promise}    The promise that will be resolved when the script is fully loaded
 *
 * @snippet         __whenScriptLoaded($1)
 * __whenScriptLoaded($1).then(\$script => {
 *      $2
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __whenScriptLoaded } from '@coffeekraken/sugar/dom'
 * __whenScriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenScriptLoaded(
    $script: HTMLScriptElement,
    cb = null,
): Promise<HTMLScriptElement> {
    const promise = new Promise((resolve, reject) => {
        let done = false;

        $script.onload = handleLoad;
        $script.onreadystatechange = handleReadyStateChange;
        $script.onerror = handleError;

        function handleLoad() {
            if (!done) {
                done = true;
                if (cb) cb($script);
                resolve($script);
            }
        }

        function handleReadyStateChange() {
            let state;
            if (!done) {
                state = $script.readyState;
                if (state === 'complete') {
                    handleLoad();
                }
            }
        }
        function handleError(e) {
            if (!done) {
                done = true;
                reject(new Error(e));
            }
        }
    });
    promise.finally(() => {
        $script.onload = null;
        $script.onreadystatechange = null;
        $script.onerror = null;
    });

    return promise;
}
