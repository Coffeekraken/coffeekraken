const __SPromise = require('../promise/SPromise');
const __hotkey = require('../keyboard/hotkey');

/**
 * @name                          escapeStack
 * @namespace           node.blessed
 * @type                          Function
 *
 * This function allows you to register a callback to know when it's time to "close" or do whatever you want on escape click.
 * The principle is that when you register a callback, the system will save the "index" at which you have registered this callback
 * and increase this "index" for the next callback registration. When you press escape key, the "index" will decrease and the callback(s)
 * registered at the new index will be called.
 *
 * @param         {Function}          callback        The function you want to call on escape click
 * @param         {Number}            [index=null]    Optionally the index under which you want to register your callback. If not specified, will be automatically setted
 *
 * @example       js
 * const escapeStack = require('@coffeekraken/sugar/node/terminal/escapeStack');
 * escapeStack(() => {
 *    // do something
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const escapeStackStack = [];
let hotkeyInitiated = false;
module.exports = function escapeStack(callback = null) {
  const promise = new __SPromise((resolve, reject, trigger, cancel) => {});

  if (!hotkeyInitiated) {
    hotkeyInitiated = true;
    __hotkey('escape', {
      disableWhenEditingForm: false
    }).on('press', (key) => {
      if (escapeStackStack.length === 0) return;
      const lastPromise = escapeStackStack[escapeStackStack.length - 1];
      lastPromise.resolve();
      escapeStackStack.splice(-1, 1);
    });
  }

  if (callback) {
    promise.on('resolve', callback);
  }

  // append the promise in the stack
  escapeStackStack.push(promise);

  // handle cancel
  promise.on('cancel,finally', () => {
    escapeStackStack.splice(escapeStackStack.indexOf(promise), 1);
  });

  // return the promise
  return promise;

  // if (!escapeStackCallbacks[escapeStackCurrentIndex.toString()]) {
  //   escapeStackCallbacks[escapeStackCurrentIndex.toString()] = [];
  // }
  // escapeStackCallbacks[escapeStackCurrentIndex.toString()].push(callback);
  // escapeStackCurrentIndex++;

  // if (!hotkeyInitiated) {
  //   hotkeyInitiated = true;

  //   __hotkey('escape').on('press', (key) => {
  //     if (escapeStackCurrentIndex <= 0) {
  //       return;
  //     }
  //     escapeStackCurrentIndex--;
  //     if (escapeStackCallbacks[escapeStackCurrentIndex.toString()]) {
  //       escapeStackCallbacks[escapeStackCurrentIndex.toString()].forEach(
  //         (callback) => {
  //           callback(escapeStackCurrentIndex);
  //         }
  //       );
  //       escapeStackCallbacks[escapeStackCurrentIndex.toString()] = [];
  //     }
  //   });
  // }

  return;
};
