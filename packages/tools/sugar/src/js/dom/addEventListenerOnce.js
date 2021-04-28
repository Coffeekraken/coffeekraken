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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lck9uY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL2FkZEV2ZW50TGlzdGVuZXJPbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFpRDtJQUNqRCwwRUFBb0Q7SUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyxvQkFBb0IsQ0FDM0IsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEdBQUcsSUFBSSxFQUNmLFVBQVUsR0FBRyxLQUFLO1FBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUFFLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTFELE1BQU0sYUFBYSxHQUFHLElBQUksbUJBQVUsQ0FBQztZQUNuQyxFQUFFLEVBQUUsc0JBQXNCO1NBQzNCLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV2QixhQUFhLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDL0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUMvQixXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxPQUFPLEdBQUcsMEJBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFdEUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHO2dCQUN2QixPQUFPO2FBQ1IsQ0FBQztZQUVGLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtvQkFDOUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUMvQjtnQkFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Qsa0JBQWUsb0JBQW9CLENBQUMifQ==