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
     * import on from '@coffeekraken/sugar/js/event/on';
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
            window._sugarEventSPromise = new s_promise_1.default({
                id: 'sugarEventSPromise'
            });
        // subscribe to the event
        window._sugarEventSPromise.on(name, callback);
        // return the unsubscribe function
        return function () {
            window._sugarEventSPromise.off(name, callback);
        };
    }
    exports.default = on;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9ldmVudC9vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzRUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtRQUN4Qix3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7WUFDN0IsTUFBTSxDQUFDLG1CQUFtQixHQUFHLElBQUksbUJBQVUsQ0FBQztnQkFDMUMsRUFBRSxFQUFFLG9CQUFvQjthQUN6QixDQUFDLENBQUM7UUFDTCx5QkFBeUI7UUFDekIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsa0NBQWtDO1FBQ2xDLE9BQU87WUFDTCxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWUsRUFBRSxDQUFDIn0=