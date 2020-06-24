"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = observeMutations;

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      observeMutations
 * @namespace           js.dom
 * @type      Function
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
 * @example  	js
 * import observeMutations from '@coffeekraken/sugar/js/dom/observeMutations'
 * const promise = observeMutations(myElement).then(mutation => {
 *    // do something with the mutation
 * });
 * // stop listening for mutations
 * promise.cancel();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function observeMutations($target, settings = {}) {
  settings = {
    attributes: true,
    childList: false,
    subtree: false,
    ...settings
  };
  let mutationObserver;
  return new _SPromise.default((resolve, reject, trigger, cancel) => {
    // create a new observer
    mutationObserver = new MutationObserver(mutations => {
      // loop on mutations
      mutations.forEach(mutation => {
        // trigger the then stack
        trigger('then', mutation);
      });
    });
    mutationObserver.observe($target, settings);
  }).on('cancel,finally', () => {
    mutationObserver && mutationObserver.disconnect();
  }).start();
}

module.exports = exports.default;