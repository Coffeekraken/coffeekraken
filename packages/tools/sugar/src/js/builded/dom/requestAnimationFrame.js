// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name      requestAnimationFrame
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Proxy for the window.requestAnimationFrame function
     *
     * @param       {Function}      cb          The function to call when it's time to update your animation for the next repaint
     * @return      {Integer}                   A long integer value, the request id, that uniquely identifies the entry in the callback list
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * @import requestAnimationFrame from '@coffeekraken/sugar/js/dom/requestAnimationFrame';
     * requestAnimationFrame(function() {
     *    // do something...
     * });
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZG9tL3JlcXVlc3RBbmltYXRpb25GcmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxrQkFBZSxNQUFNLENBQUMscUJBQXFCO1FBQ3pDLE1BQU0sQ0FBQywyQkFBMkI7UUFDbEMsTUFBTSxDQUFDLHdCQUF3QjtRQUMvQixNQUFNLENBQUMsc0JBQXNCO1FBQzdCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyJ9