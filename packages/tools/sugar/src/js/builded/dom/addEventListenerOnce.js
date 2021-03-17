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
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    var addEventListener_1 = __importDefault(require("./addEventListener"));
    /**
     * @name        addEventListenerOnce
     * @namespace           sugar.js.dom
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
    function addEventListenerOnce($elm, eventNames, callback, useCapture) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (useCapture === void 0) { useCapture = false; }
        if (!Array.isArray(eventNames))
            eventNames = [eventNames];
        var globalPromise = new s_promise_1.default({
            id: 'addEventListenerOnce'
        });
        var eventsStack = {};
        globalPromise.on('finally', function () {
            eventNames.forEach(function (eventName) {
                eventsStack[eventName].promise.cancel();
            });
        });
        eventNames.forEach(function (eventName) {
            var promise = addEventListener_1.default($elm, eventName, null, useCapture);
            eventsStack[eventName] = {
                promise: promise
            };
            promise.on(eventNames, function (event) {
                if (callback && typeof callback === 'function') {
                    callback.apply(_this, [event]);
                }
                globalPromise.emit(eventName, event);
                promise.cancel();
            });
        });
        return globalPromise;
    }
    exports.default = addEventListenerOnce;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lck9uY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kb20vYWRkRXZlbnRMaXN0ZW5lck9uY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0VBQWlEO0lBQ2pELHdFQUFvRDtJQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCxTQUFTLG9CQUFvQixDQUMzQixJQUFJLEVBQ0osVUFBVSxFQUNWLFFBQWUsRUFDZixVQUFrQjtRQUpwQixpQkFxQ0M7UUFsQ0MseUJBQUEsRUFBQSxlQUFlO1FBQ2YsMkJBQUEsRUFBQSxrQkFBa0I7UUFFbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQUUsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUQsSUFBTSxhQUFhLEdBQUcsSUFBSSxtQkFBVSxDQUFDO1lBQ25DLEVBQUUsRUFBRSxzQkFBc0I7U0FDM0IsQ0FBQyxDQUFDO1FBRUgsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLGFBQWEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO1lBQzFCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO2dCQUMzQixXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUztZQUMzQixJQUFNLE9BQU8sR0FBRywwQkFBa0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUV0RSxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUc7Z0JBQ3ZCLE9BQU8sU0FBQTthQUNSLENBQUM7WUFFRixPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUs7Z0JBQzNCLElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtvQkFDOUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUMvQjtnQkFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Qsa0JBQWUsb0JBQW9CLENBQUMifQ==