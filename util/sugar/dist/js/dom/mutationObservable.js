"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mutationObservable;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

require("rxjs/add/operator/share");

var _Observable = require("rxjs/Observable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      mutationObservable
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Observe mutations on an HTMLElement and get them through the observable subscription
 *
 * @param 		{HTMLElement} 					target 		The element to observe
 * @param 		{MutationObserverInit} 			settings 	The mutation observer settings
 * @return 		{Observable} 								The rxjs mutation observable
 *
 * @example  	js
 * import mutationObservable from '@coffeekraken/sugar/js/dom/mutationObservable'
 * mutationObservable(myCoolHTMLElement).subscribe((mutation) => {
 * 		// do something with the mutation
 * });
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const selectorsStack = []; // save nodes that's have a mutation observer on it

const nodesStack = new Map();

function mutationObservable(target, settings = {}) {
  // detect if already exist
  let currentObservers = nodesStack.get(target);

  if (currentObservers) {
    // loop on current observers
    for (let i = 0; i < currentObservers.length; i++) {
      const obs = currentObservers[i];

      if ((0, _isEqual2.default)(obs.settings, settings)) {
        // return the same observer
        return obs.observable;
      }
    }
  } else {
    currentObservers = [];
  } // we don't have any observer for now
  // so create it


  const observable = new _Observable.Observable(observer => {
    // create a new observer
    const mutationObserver = new MutationObserver(mutations => {
      // loop on mutations
      mutations.forEach(mutation => {
        // push mutation
        observer.next(mutation);
      });
    });
    mutationObserver.observe(target, settings); // unsubscribe routine

    return () => {
      mutationObserver.disconnect();
    };
  }); // save the new observable into the stack

  const obs = {
    settings,
    observable
  }; // add the observer into the stack

  currentObservers.push(obs); // save into the stack

  nodesStack.set(target, currentObservers); // return the observable

  return observable;
}

module.exports = exports.default;