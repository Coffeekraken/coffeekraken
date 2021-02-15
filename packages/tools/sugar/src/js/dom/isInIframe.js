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
     * @name      isInIframe
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Check if the page is loaded inside an iframe
     *
     * @return    {Boolean}    true if in iframe, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isInIframe from '@coffeekraken/sugar/js/dom/isInIframe'
     * if (isInIframe()) {
     *   // do something
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isInIframe() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    exports.default = isInIframe;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJbklmcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzSW5JZnJhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLFVBQVU7UUFDakIsSUFBSTtZQUNGLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ25DO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9