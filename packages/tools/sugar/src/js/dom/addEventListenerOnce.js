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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lck9uY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRFdmVudExpc3RlbmVyT25jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzRUFBaUQ7SUFDakQsd0VBQW9EO0lBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUNILFNBQVMsb0JBQW9CLENBQzNCLElBQUksRUFDSixVQUFVLEVBQ1YsUUFBZSxFQUNmLFVBQWtCO1FBSnBCLGlCQXFDQztRQWxDQyx5QkFBQSxFQUFBLGVBQWU7UUFDZiwyQkFBQSxFQUFBLGtCQUFrQjtRQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFBRSxVQUFVLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxRCxJQUFNLGFBQWEsR0FBRyxJQUFJLG1CQUFVLENBQUM7WUFDbkMsRUFBRSxFQUFFLHNCQUFzQjtTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdkIsYUFBYSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDMUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7Z0JBQzNCLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO1lBQzNCLElBQU0sT0FBTyxHQUFHLDBCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXRFLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRztnQkFDdkIsT0FBTyxTQUFBO2FBQ1IsQ0FBQztZQUVGLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBSztnQkFDM0IsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO29CQUM5QyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQy9CO2dCQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxrQkFBZSxvQkFBb0IsQ0FBQyJ9