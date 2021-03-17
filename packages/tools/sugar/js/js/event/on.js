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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZXZlbnQvb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0VBQWlEO0lBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7UUFDeEIsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CO1lBQzdCLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLG1CQUFVLENBQUM7Z0JBQzFDLEVBQUUsRUFBRSxvQkFBb0I7YUFDekIsQ0FBQyxDQUFDO1FBQ0wseUJBQXlCO1FBQ3pCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLGtDQUFrQztRQUNsQyxPQUFPO1lBQ0wsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLEVBQUUsQ0FBQyJ9