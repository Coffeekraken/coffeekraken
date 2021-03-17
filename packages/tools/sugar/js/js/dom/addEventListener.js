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
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name        addEventListener
     * @namespace           sugar.js.dom
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
    function addEventListener($elm, eventNames, callback, useCapture) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (useCapture === void 0) { useCapture = false; }
        if (!Array.isArray(eventNames))
            eventNames = eventNames.split(',').map(function (e) { return e.trim(); });
        if (callback && typeof callback === 'function')
            callback = callback;
        else if (callback && typeof callback === 'boolean')
            useCapture = callback;
        var eventsStack = {};
        var promise = new s_promise_1.default({
            id: 'addEventListener'
        }).on('finally', function () {
            eventNames.forEach(function (eventName) {
                var stack = eventsStack[eventName];
                $elm.removeEventListener(eventName, stack.callback, stack.useCapture);
            });
        });
        eventNames.forEach(function (eventName) {
            var internalCallback = function (event) {
                if (callback)
                    callback.apply(_this, [event]);
                promise.emit(eventName, event);
            };
            eventsStack[eventName] = {
                callback: internalCallback,
                useCapture: useCapture
            };
            $elm.addEventListener(eventName, internalCallback, useCapture);
        });
        return promise;
    }
    exports.default = addEventListener;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vYWRkRXZlbnRMaXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzRUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUNHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FDdkIsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFlLEVBQ2YsVUFBa0I7UUFKcEIsaUJBc0NDO1FBbkNDLHlCQUFBLEVBQUEsZUFBZTtRQUNmLDJCQUFBLEVBQUEsa0JBQWtCO1FBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUM1QixVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQVIsQ0FBUSxDQUFDLENBQUM7UUFFMUQsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVTtZQUFFLFFBQVEsR0FBRyxRQUFRLENBQUM7YUFDL0QsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssU0FBUztZQUFFLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFFMUUsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLElBQU0sT0FBTyxHQUFHLElBQUksbUJBQVUsQ0FBQztZQUM3QixFQUFFLEVBQUUsa0JBQWtCO1NBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO1lBQ2YsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7Z0JBQzNCLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDM0IsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEtBQUs7Z0JBQzdCLElBQUksUUFBUTtvQkFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztZQUVGLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRztnQkFDdkIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsVUFBVSxZQUFBO2FBQ1gsQ0FBQztZQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0Qsa0JBQWUsZ0JBQWdCLENBQUMifQ==