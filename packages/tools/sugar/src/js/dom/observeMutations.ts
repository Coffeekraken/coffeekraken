// @ts-nocheck

import __SPromise from '../promise/SPromise';

/**
 * @name      observeMutations
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Observe mutations on an HTMLElement and get them through the observable subscription.
 * You can pass the mutation observer settings through the second argument. By default, here's his values:
 * - attributes: true,
 * - childList: false,
 * - subtree: false
 *
 * @param 		{HTMLElement} 					$target 		          The element to observe
 * @param 		{MutationObserverInit} 			[settings={}] 	The mutation observer settings
 * @return 		{SPromise} 								                The SPromise instance on which you can register your callbacks, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import observeMutations from '@coffeekraken/sugar/js/dom/observeMutations'
 * const promise = observeMutations(myElement).then(mutation => {
 *    // do something with the mutation
 * });
 * // stop listening for mutations
 * promise.cancel();
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function observeMutations($target, settings = {}) {
  settings = {
    attributes: true,
    childList: false,
    subtree: false,
    ...settings
  };

  let mutationObserver;

  return new __SPromise(
    (resolve, reject, trigger, cancel) => {
      // create a new observer
      mutationObserver = new MutationObserver((mutations) => {
        // loop on mutations
        mutations.forEach((mutation) => {
          // trigger the then stack
          trigger('then', mutation);
        });
      });
      mutationObserver.observe($target, settings);
    },
    {
      id: 'observeMutations'
    }
  ).on('finally', () => {
    mutationObserver && mutationObserver.disconnect();
  });
}
export = observeMutations;