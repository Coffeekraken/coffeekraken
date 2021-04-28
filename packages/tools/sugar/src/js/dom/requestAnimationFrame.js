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
     * @namespace            js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsa0JBQWUsTUFBTSxDQUFDLHFCQUFxQjtRQUN6QyxNQUFNLENBQUMsMkJBQTJCO1FBQ2xDLE1BQU0sQ0FBQyx3QkFBd0I7UUFDL0IsTUFBTSxDQUFDLHNCQUFzQjtRQUM3QixNQUFNLENBQUMsdUJBQXVCLENBQUMifQ==