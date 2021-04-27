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
        define(["require", "exports", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name        addEventListener
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Add an event listener on an element and return the function to remove the event listener
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
     * import addEventListener from '@coffeekraken/sugar/js/dom/addEventListener'
     * const listener = addEventListener($myCoolElm, 'click', (event) => {
     *    // event.type; // => click
     * });
     * // remove the event listener
     * listener.cancel();
     *
     * // listen for more than one event at a time
     * addEventListener($myCoolElm, 'click,mouseover,mouseout', (event) => {
     *    // do something depending on the event.type property
     * }).on('mouseover', (event) => {
     *    // do something when the event is the mouseover one
     * });
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function addEventListener($elm, eventNames, callback = null, useCapture = false) {
        if (!Array.isArray(eventNames))
            eventNames = eventNames.split(',').map((e) => e.trim());
        if (callback && typeof callback === 'function')
            callback = callback;
        else if (callback && typeof callback === 'boolean')
            useCapture = callback;
        const eventsStack = {};
        const promise = new s_promise_1.default({
            id: 'addEventListener'
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
                useCapture
            };
            $elm.addEventListener(eventName, internalCallback, useCapture);
        });
        return promise;
    }
    exports.default = addEventListener;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZEV2ZW50TGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQWlEO0lBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1DRztJQUNILFNBQVMsZ0JBQWdCLENBQ3ZCLElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxHQUFHLElBQUksRUFDZixVQUFVLEdBQUcsS0FBSztRQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDNUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUUxRCxJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVO1lBQUUsUUFBUSxHQUFHLFFBQVEsQ0FBQzthQUMvRCxJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxTQUFTO1lBQUUsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUUxRSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDO1lBQzdCLEVBQUUsRUFBRSxrQkFBa0I7U0FDdkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3BCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDL0IsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNqQyxJQUFJLFFBQVE7b0JBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUM7WUFFRixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUc7Z0JBQ3ZCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFVBQVU7YUFDWCxDQUFDO1lBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9