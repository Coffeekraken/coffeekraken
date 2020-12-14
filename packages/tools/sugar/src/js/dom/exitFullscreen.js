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
     * @name      exitFullscreen
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Exit the fullscreen mode
     *
     * @return    {Promise}    Returns a Promise which is resolved once full-screen mode has been desactivated.
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import exitFullscreen from '@coffeekraken/sugar/js/dom/exitFullscreen'
     * exitFullscreen()
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function exitFullscreen() {
        if (document.cancelFullScreen) {
            return document.cancelFullScreen();
        }
        else if (document.mozCancelFullScreen) {
            return document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            return document.webkitCancelFullScreen();
        }
    }
    return exitFullscreen;
});
//# sourceMappingURL=module.js.map