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
        define(["require", "exports", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name        on
     * @namespace           sugar.js.event
     * @type          Function
     * @stable
     *
     * This function allows you to subscribe to global events triggered by the "sugar.js.event.dispatch" function
     * It use under the hood an SPromise instance
     *
     * @param         {String}        name          The event name you want to subscribe to
     * @param         {Function}      callback      The callback function you want to call
     * @return        {Function}                    Return an "unsubscribe" function callable when you want to stop executing the callback
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * const on = require('@coffeekraken/sugar/js/event/on');
     * on('something', () => {
     *    // do something
     * });
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function on(name, callback) {
        // check that the global SPromise exists
        if (!window._sugarEventSPromise)
            window._sugarEventSPromise = new SPromise_1.default({
                id: 'sugarEventSPromise'
            });
        // subscribe to the event
        window._sugarEventSPromise.on(name, callback);
        // return the unsubscribe function
        return function () {
            window._sugarEventSPromise.off(name, callback);
        };
    }
    return on;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLGlFQUE2QztJQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRO1FBQ3hCLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQjtZQUM3QixNQUFNLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxrQkFBVSxDQUFDO2dCQUMxQyxFQUFFLEVBQUUsb0JBQW9CO2FBQ3pCLENBQUMsQ0FBQztRQUNMLHlCQUF5QjtRQUN6QixNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxrQ0FBa0M7UUFDbEMsT0FBTztZQUNMLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFTLEVBQUUsQ0FBQyJ9