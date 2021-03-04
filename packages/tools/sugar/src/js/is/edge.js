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
     * @name        isEdge
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Detect if is edge
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
     * @return    {Boolean}    true if is edge, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isEdge from '@coffeekraken/sugar/js/is/edge'
     * if (isEdge()) {
     *   // do something cool
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isEdge(ua) {
        if (ua === void 0) { ua = navigator.userAgent; }
        return ua.indexOf('Edg/') > -1;
    }
    exports.default = isEdge;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxNQUFNLENBQUMsRUFBd0I7UUFBeEIsbUJBQUEsRUFBQSxLQUFLLFNBQVMsQ0FBQyxTQUFTO1FBQ3RDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=