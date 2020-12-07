"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const hotkey_1 = __importDefault(require("../keyboard/hotkey"));
/**
 * @name                          escapeStack
 * @namespace           sugar.node.blessed
 * @type                          Function
 * @wip
 *
 * This function allows you to register a callback to know when it's time to "close" or do whatever you want on escape click.
 * The principle is that when you register a callback, the system will save the "index" at which you have registered this callback
 * and increase this "index" for the next callback registration. When you press escape key, the "index" will decrease and the callback(s)
 * registered at the new index will be called.
 *
 * @param         {Function}          callback        The function you want to call on escape click
 * @param         {Number}            [index=null]    Optionally the index under which you want to register your callback. If not specified, will be automatically setted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @example       js
 * import escapeStack from '@coffeekraken/sugar/node/terminal/escapeStack';
 * escapeStack(() => {
 *    // do something
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const escapeStackStack = [];
let hotkeyInitiated = false;
function escapeStack(callback = null) {
    const promise = new SPromise_1.default((resolve, reject, trigger, cancel) => { }, {
        id: 'escapeStack'
    });
    if (!hotkeyInitiated) {
        hotkeyInitiated = true;
        hotkey_1.default('escape', {
            disableWhenEditingForm: false
        }).on('press', (key) => {
            if (escapeStackStack.length === 0)
                return;
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
}
module.exports = escapeStack;
//# sourceMappingURL=escapeStack.js.map