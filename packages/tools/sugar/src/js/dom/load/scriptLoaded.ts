// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

/**
 * @name      scriptLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform      js
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import scriptLoaded from '@coffeekraken/sugar/js/dom/scriptLoaded'
 * scriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function loadScript($script: HTMLScriptElement, cb = null): __SPromise<HTMLScriptElement> {
  return new __SPromise(
    ({ resolve, reject, emit }) => {
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
    },
    {
      id: 'scriptLoaded'
    }
  ).on('finally', () => {
    $script.onload = null;
    $script.onreadystatechange = null;
    $script.onerror = null;
  });
}
export default loadScript;
