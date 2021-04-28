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
     * @name        emit
     * @namespace            js.event
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9ldmVudC9lbWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLO1FBQ3ZCLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQjtZQUM3QixNQUFNLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxtQkFBVSxDQUFDO2dCQUMxQyxFQUFFLEVBQUUsb0JBQW9CO2FBQ3pCLENBQUMsQ0FBQztRQUNMLG9CQUFvQjtRQUNwQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=