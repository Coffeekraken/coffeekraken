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
    return isInIframe;
});
//# sourceMappingURL=module.js.map