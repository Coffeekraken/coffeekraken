"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const hotkey_1 = __importDefault(require("../keyboard/hotkey"));
/**
 * @name                          escapeStack
 * @namespace           sugar.node.blessed
 * @type                          Function
 * @status              wip
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
    const promise = new s_promise_1.default(({ resolve, reject, emit }) => { }, {
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
exports.default = escapeStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlU3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlc2NhcGVTdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsZ0VBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUM1QixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFFNUIsU0FBUyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUk7SUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRSxDQUFDLEVBQUU7UUFDaEUsRUFBRSxFQUFFLGFBQWE7S0FDbEIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUNwQixlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFRLENBQUMsUUFBUSxFQUFFO1lBQ2pCLHNCQUFzQixFQUFFLEtBQUs7U0FDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNyQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUFFLE9BQU87WUFDMUMsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksUUFBUSxFQUFFO1FBQ1osT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDakM7SUFFRCxrQ0FBa0M7SUFDbEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRS9CLGdCQUFnQjtJQUNoQixPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDekIsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUMsQ0FBQztJQUVILHFCQUFxQjtJQUNyQixPQUFPLE9BQU8sQ0FBQztJQUVmLG1FQUFtRTtJQUNuRSxtRUFBbUU7SUFDbkUsSUFBSTtJQUNKLDJFQUEyRTtJQUMzRSw2QkFBNkI7SUFFN0IsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUU1Qiw4Q0FBOEM7SUFDOUMsMENBQTBDO0lBQzFDLGdCQUFnQjtJQUNoQixRQUFRO0lBQ1IsaUNBQWlDO0lBQ2pDLHNFQUFzRTtJQUN0RSwwRUFBMEU7SUFDMUUsMEJBQTBCO0lBQzFCLCtDQUErQztJQUMvQyxZQUFZO0lBQ1osV0FBVztJQUNYLHVFQUF1RTtJQUN2RSxRQUFRO0lBQ1IsUUFBUTtJQUNSLElBQUk7SUFFSixPQUFPO0FBQ1QsQ0FBQztBQUNELGtCQUFlLFdBQVcsQ0FBQyJ9