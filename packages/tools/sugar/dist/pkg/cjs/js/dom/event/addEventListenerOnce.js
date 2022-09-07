"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name        addEventListenerOnce
 * @namespace            js.dom.event
 * @type      Function
 * @platform          js
 * @status          beta
 *
 * Add an event listener that will be trigerred only once
 *
 * @feature       All the features of the `sugar.js.dom.addEventListener` functions
 * @feature       Remove automatically the listener after 1 event
 *
 * @param    {HTMLElement}    $elm    The element to add the event listener on
 * @param    {String}    event    The event to listen for
 * @param    {Function}    [callback=null]    The callback function to call on event
 * @param    {Boolean}    [useCapture=false]    A Boolean value that specifies whether the event should be executed in the capturing or in the bubbling phase
 * @return    {Promise}                   A promise that will be resolved once the event has been called
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __addEventListenerOnce } from '@coffeekraken/sugar/dom'
 *  __addEventListenerOnce(myElm, 'click', (e) => {
 *     // do something on click
 * });
 *  __addEventListenerOnce(myElm, 'click').on('click', (e) => {
 *
 * });
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __addEventListenerOnce($elm, eventNames, callback = null, useCapture = false) {
    if (!Array.isArray(eventNames))
        eventNames = [eventNames];
    const globalPromise = new s_promise_1.default({
        id: 'addEventListenerOnce',
    });
    const eventsStack = {};
    globalPromise.on('finally', () => {
        eventNames.forEach((eventName) => {
            eventsStack[eventName].promise.cancel();
        });
    });
    eventNames.forEach((eventName) => {
        const promise = (0, dom_1.__addEventListener)($elm, eventName, null, useCapture);
        eventsStack[eventName] = {
            promise,
        };
        promise.on(eventNames, (event) => {
            if (callback && typeof callback === 'function') {
                callback.apply(this, [event]);
            }
            globalPromise.emit(eventName, event);
            promise.cancel();
        });
    });
    return globalPromise;
}
exports.default = __addEventListenerOnce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCxpREFBNkQ7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILFNBQXdCLHNCQUFzQixDQUMxQyxJQUFpQixFQUNqQixVQUE2QixFQUM3QixRQUFRLEdBQUcsSUFBSSxFQUNmLFVBQVUsR0FBRyxLQUFLO0lBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUFFLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTFELE1BQU0sYUFBYSxHQUFHLElBQUksbUJBQVUsQ0FBQztRQUNqQyxFQUFFLEVBQUUsc0JBQXNCO0tBQzdCLENBQUMsQ0FBQztJQUVILE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUV2QixhQUFhLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDN0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdCLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFBLHdCQUFrQixFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXRFLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRztZQUNyQixPQUFPO1NBQ1YsQ0FBQztRQUVGLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO2dCQUM1QyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDakM7WUFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFyQ0QseUNBcUNDIn0=