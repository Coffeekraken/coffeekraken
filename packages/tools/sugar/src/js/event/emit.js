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
     * const emit = require('@coffeekraken/sugar/js/event/emit');
     * emit('something', 'Hello world');
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function emit(name, value) {
        // check that the global SPromise exists
        if (!window._sugarEventSPromise)
            window._sugarEventSPromise = new SPromise_1.default({
                id: 'sugarEventSPromise'
            });
        // emit to the event
        window._sugarEventSPromise.emit(name, value);
    }
    return emit;
});
//# sourceMappingURL=emit.js.map