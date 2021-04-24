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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nyb2xsVG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxTQUFTLFNBQVM7UUFDaEIsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDN0UsQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9