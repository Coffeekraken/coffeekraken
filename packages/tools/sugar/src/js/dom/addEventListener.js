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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vYWRkRXZlbnRMaXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUNHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FDdkIsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEdBQUcsSUFBSSxFQUNmLFVBQVUsR0FBRyxLQUFLO1FBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUM1QixVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFELElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVU7WUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFDO2FBQy9ELElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFNBQVM7WUFBRSxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRTFFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV2QixNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQUM7WUFDN0IsRUFBRSxFQUFFLGtCQUFrQjtTQUN2QixDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUMvQixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksUUFBUTtvQkFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztZQUVGLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRztnQkFDdkIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsVUFBVTthQUNYLENBQUM7WUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=