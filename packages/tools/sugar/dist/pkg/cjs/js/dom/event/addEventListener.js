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
 @since           2.0.0
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
exports.default = __addEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsU0FBd0Isa0JBQWtCLENBQ3RDLElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxHQUFHLElBQUksRUFDZixVQUFVLEdBQUcsS0FBSztJQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDMUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUU1RCxJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVO1FBQUUsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMvRCxJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxTQUFTO1FBQUUsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUUxRSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFFdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDO1FBQzNCLEVBQUUsRUFBRSxrQkFBa0I7S0FDekIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM3QixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUNwQixTQUFTLEVBQ1QsS0FBSyxDQUFDLFFBQVEsRUFDZCxLQUFLLENBQUMsVUFBVSxDQUNuQixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUM3QixNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0IsSUFBSSxRQUFRO2dCQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUM7UUFFRixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUc7WUFDckIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixVQUFVO1NBQ2IsQ0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBMUNELHFDQTBDQyJ9