// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-promise", "./addEventListener"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const addEventListener_1 = __importDefault(require("./addEventListener"));
    /**
     * @name        addEventListenerOnce
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Add an event listener that will be trigerred only once
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function addEventListenerOnce($elm, eventNames, callback = null, useCapture = false) {
        if (!Array.isArray(eventNames))
            eventNames = [eventNames];
        const globalPromise = new s_promise_1.default({
            id: 'addEventListenerOnce'
        });
        const eventsStack = {};
        globalPromise.on('finally', () => {
            eventNames.forEach((eventName) => {
                eventsStack[eventName].promise.cancel();
            });
        });
        eventNames.forEach((eventName) => {
            const promise = addEventListener_1.default($elm, eventName, null, useCapture);
            eventsStack[eventName] = {
                promise
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lck9uY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRFdmVudExpc3RlbmVyT25jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBaUQ7SUFDakQsMEVBQW9EO0lBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUNILFNBQVMsb0JBQW9CLENBQzNCLElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxHQUFHLElBQUksRUFDZixVQUFVLEdBQUcsS0FBSztRQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFBRSxVQUFVLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxRCxNQUFNLGFBQWEsR0FBRyxJQUFJLG1CQUFVLENBQUM7WUFDbkMsRUFBRSxFQUFFLHNCQUFzQjtTQUMzQixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdkIsYUFBYSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQy9CLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDL0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9CLE1BQU0sT0FBTyxHQUFHLDBCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXRFLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRztnQkFDdkIsT0FBTzthQUNSLENBQUM7WUFFRixPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUMvQixJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7b0JBQzlDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDL0I7Z0JBQ0QsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUNELGtCQUFlLG9CQUFvQixDQUFDIn0=