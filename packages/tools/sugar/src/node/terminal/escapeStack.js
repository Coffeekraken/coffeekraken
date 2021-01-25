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
    const promise = new SPromise_1.default(({ resolve, reject, emit }) => { }, {
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
    promise.on('finally', () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlU3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlc2NhcGVTdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLG1FQUE2QztBQUM3QyxnRUFBMEM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztBQUU1QixTQUFTLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSTtJQUNsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFFLENBQUMsRUFBRTtRQUNoRSxFQUFFLEVBQUUsYUFBYTtLQUNsQixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3BCLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsZ0JBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakIsc0JBQXNCLEVBQUUsS0FBSztTQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3JCLElBQUksZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQUUsT0FBTztZQUMxQyxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEUsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxRQUFRLEVBQUU7UUFDWixPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNqQztJQUVELGtDQUFrQztJQUNsQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFL0IsZ0JBQWdCO0lBQ2hCLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUN6QixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBRUgscUJBQXFCO0lBQ3JCLE9BQU8sT0FBTyxDQUFDO0lBRWYsbUVBQW1FO0lBQ25FLG1FQUFtRTtJQUNuRSxJQUFJO0lBQ0osMkVBQTJFO0lBQzNFLDZCQUE2QjtJQUU3QiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBRTVCLDhDQUE4QztJQUM5QywwQ0FBMEM7SUFDMUMsZ0JBQWdCO0lBQ2hCLFFBQVE7SUFDUixpQ0FBaUM7SUFDakMsc0VBQXNFO0lBQ3RFLDBFQUEwRTtJQUMxRSwwQkFBMEI7SUFDMUIsK0NBQStDO0lBQy9DLFlBQVk7SUFDWixXQUFXO0lBQ1gsdUVBQXVFO0lBQ3ZFLFFBQVE7SUFDUixRQUFRO0lBQ1IsSUFBSTtJQUVKLE9BQU87QUFDVCxDQUFDO0FBQ0QsaUJBQVMsV0FBVyxDQUFDIn0=