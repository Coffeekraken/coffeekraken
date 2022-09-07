"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name        addEventListener
 * @namespace            js.dom.event
 * @type      Function
 * @platform          js
 * @status          beta
 *
 * Add an event listener on an element and return the function to remove the event listener
 *
 * @feature       Returns an SPromise that you can use to remove the event listener using the `cancel` method
 * @feature       Can listen to multiple events at once
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to add the event listener
 * @param    {String}    eventNames    The event names to listen to. Can be a simple string like "click", multiple events like "click,focus", or an array of events like ['click','hover']
 * @param    {Function}    callback    The callback function to call on event. The passed event
 * @param    {Boolean}    [useCapture=false]    A Boolean value that specifies whether the event should be executed in the capturing or in the bubbling phase
 * @return    {SPromise}                An SPromise instance on which you can listen for events or simply "cancel" the listeneing process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __addEventListener } from '@coffeekraken/sugar/dom'
 * const listener = __addEventListener($myCoolElm, 'click', (event) => {
 *    // event.type; // => click
 * });
 * // remove the event listener
 * listener.cancel();
 *
 * // listen for more than one event at a time
 * __addEventListener($myCoolElm, 'click,mouseover,mouseout', (event) => {
 *    // do something depending on the event.type property
 * }).on('mouseover', (event) => {
 *    // do something when the event is the mouseover one
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __addEventListener($elm, eventNames, callback = null, useCapture = false) {
    if (!Array.isArray(eventNames))
        eventNames = eventNames.split(',').map((e) => e.trim());
    if (callback && typeof callback === 'function')
        callback = callback;
    else if (callback && typeof callback === 'boolean')
        useCapture = callback;
    const eventsStack = {};
    const promise = new s_promise_1.default({
        id: 'addEventListener',
    }).on('finally', () => {
        eventNames.forEach((eventName) => {
            const stack = eventsStack[eventName];
            $elm.removeEventListener(eventName, stack.callback, stack.useCapture);
        });
    });
    eventNames.forEach((eventName) => {
        const internalCallback = (event) => {
            if (callback)
                callback.apply(this, [event]);
            promise.emit(eventName, event);
        };
        eventsStack[eventName] = {
            callback: internalCallback,
            useCapture,
        };
        $elm.addEventListener(eventName, internalCallback, useCapture);
    });
    return promise;
}
exports.default = addEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FDdkIsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEdBQUcsSUFBSSxFQUNmLFVBQVUsR0FBRyxLQUFLO0lBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUMxQixVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTVELElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVU7UUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQy9ELElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFNBQVM7UUFBRSxVQUFVLEdBQUcsUUFBUSxDQUFDO0lBRTFFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUV2QixNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQUM7UUFDM0IsRUFBRSxFQUFFLGtCQUFrQjtLQUN6QixDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdCLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsbUJBQW1CLENBQ3BCLFNBQVMsRUFDVCxLQUFLLENBQUMsUUFBUSxFQUNkLEtBQUssQ0FBQyxVQUFVLENBQ25CLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzdCLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvQixJQUFJLFFBQVE7Z0JBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQztRQUVGLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRztZQUNyQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFVBQVU7U0FDYixDQUFDO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9