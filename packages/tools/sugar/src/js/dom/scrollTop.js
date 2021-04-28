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
     * @name      scrollTop
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Return the amount of scroll top that the user as made in the page
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import scrollTop from '@coffeekraken/sugar/js/dom/scrollTop';
     * scrollTop();
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
     */
    function scrollTop() {
        return window.pageYOffset || document.scrollTop || document.body.scrollTop;
    }
    exports.default = scrollTop;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9zY3JvbGxUb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILFNBQVMsU0FBUztRQUNoQixPQUFPLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM3RSxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=