"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = when;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @name                              when
 * @namespace                         sugar.js.dom
 * @type                              Function
 *
 * Return a promise that will be resolved when the wanted status has been applied on the passed HTMLElement.
 * The status that can be requested are:
 * - attribute : Detect when a special attribute has been applied on the element
 * --- settings.attribute : Specify the attribute to check
 * --- settings.checkFn : An optional function to check the attribute. The promise is resolved when this function return true
 *
 * - inViewport : Detect when the element enter in the viewport
 * --- settings.offset : Specify an offset to detect the in viewport state
 *
 * - outOfViewport : Detect when the element exit the viewport
 * --- settings.offset : Specify an offset to detect the out viewport state
 *
 * - transitionEnd : Detect when the css transition is finished on the element
 * --- settings.callback : An optional callback function if you prefer instead of the promise
 *
 * - visible : Detect when the element become visible
 * --- settings.callback : An optional callback function if you prefer instead of the promise
 *
 * @param               {HTMLElement}                 $node               The HTMLElement to check
 * @param               {String}                      state               The state to check on the HTMLElement
 * @param               {Object}                      [settings={}]       The settings to configure the check process
 * @return              {Promise}                                         A promise that will be resolved when the state is detected
 *
 * @example             js
 * import when from '@coffeekraken/sugar/js/dom/when';
 * when(myCoolNode, 'inViewport').then(() => {
 *    // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function when($node, state, settings = {}) {
  return new Promise(async (resolve, reject) => {
    // check the state to detect
    let importPromise, args;

    switch (state) {
      case 'attribute':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(require('./whenAttribute')));
        args = [$node, settings.attribute, settings.checkFn];
        break;

      case 'inViewport':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(require('./whenInViewport')));
        args = [$node, settings.offset];
        break;

      case 'outOfViewport':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(require('./whenOutOfViewport')));
        args = [$node, settings.offset];
        break;

      case 'transitionEnd':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(require('./whenTransitionEnd')));
        args = [$node, settings.callback];
        break;

      case 'visible':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(require('./whenVisible')));
        args = [$node, settings.callback];
        break;

      default:
        resolve($node);
        return;
        break;
    } // wait until the module is loaded


    const module = await importPromise; // call the when... function

    module.default.apply(null, args).then(() => {
      // resolve the promise
      resolve($node);
    });
  });
}

;
module.exports = exports.default;