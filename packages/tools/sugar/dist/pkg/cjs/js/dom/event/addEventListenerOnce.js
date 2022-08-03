"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const addEventListener_1 = __importDefault(require("./addEventListener"));
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
 * import addEventListenerOnce from '@coffeekraken/sugar/js/dom/addEventListenerOnce'
 * addEventListenerOnce(myElm, 'click', (e) => {
 *     // do something on click
 * });
 * addEventListenerOnce(myElm, 'click').on('click', (e) => {
 *
 * });
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function addEventListenerOnce($elm, eventNames, callback = null, useCapture = false) {
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
        const promise = (0, addEventListener_1.default)($elm, eventName, null, useCapture);
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
exports.default = addEventListenerOnce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCwwRUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILFNBQVMsb0JBQW9CLENBQ3pCLElBQWlCLEVBQ2pCLFVBQTZCLEVBQzdCLFFBQVEsR0FBRyxJQUFJLEVBQ2YsVUFBVSxHQUFHLEtBQUs7SUFFbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQUUsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFMUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxtQkFBVSxDQUFDO1FBQ2pDLEVBQUUsRUFBRSxzQkFBc0I7S0FDN0IsQ0FBQyxDQUFDO0lBRUgsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXZCLGFBQWEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUM3QixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDN0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzdCLE1BQU0sT0FBTyxHQUFHLElBQUEsMEJBQWtCLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFdEUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHO1lBQ3JCLE9BQU87U0FDVixDQUFDO1FBRUYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7Z0JBQzVDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNqQztZQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQztBQUNELGtCQUFlLG9CQUFvQixDQUFDIn0=