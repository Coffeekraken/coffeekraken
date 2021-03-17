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
     * @name        emit
     * @namespace           sugar.js.event
     * @type          Function
     * @stable
     *
     * This function can ben used to emit an event globally.
     * You can subscribe to these events using the "sugar.js.event.subscribe" function
     *
     * @param         {String}        name          The event name you want to trigger to
     * @param         {Mixed}        value          The value you want to send alongside the event
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import emit from '@coffeekraken/sugar/js/event/emit';
     * emit('something', 'Hello world');
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function emit(name, value) {
        // check that the global SPromise exists
        if (!window._sugarEventSPromise)
            window._sugarEventSPromise = new s_promise_1.default({
                id: 'sugarEventSPromise'
            });
        // emit to the event
        window._sugarEventSPromise.emit(name, value);
    }
    exports.default = emit;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2V2ZW50L2VtaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0VBQWlEO0lBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUs7UUFDdkIsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CO1lBQzdCLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLG1CQUFVLENBQUM7Z0JBQzFDLEVBQUUsRUFBRSxvQkFBb0I7YUFDekIsQ0FBQyxDQUFDO1FBQ0wsb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxrQkFBZSxJQUFJLENBQUMifQ==