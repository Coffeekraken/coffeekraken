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
        define(["require", "exports", "../promise/SPromise", "./addEventListener"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
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
        var globalPromise = new SPromise_1.default({
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
    return addEventListenerOnce;
});
//# sourceMappingURL=addEventListenerOnce.js.map