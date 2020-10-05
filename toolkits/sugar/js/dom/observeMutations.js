"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = observeMutations;

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name      observeMutations
 * @namespace           sugar.js.dom
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
function observeMutations($target, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = _objectSpread({
    attributes: true,
    childList: false,
    subtree: false
  }, settings);
  var mutationObserver;
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
  }, {
    id: 'observeMutations'
  }).on('finally', () => {
    mutationObserver && mutationObserver.disconnect();
  });
}

module.exports = exports.default;