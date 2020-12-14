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
     * @name      requestFullscreen
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Request fullscreen on the passed DOM element
     *
     * @param    {HTMLElement}    elm    The element on which to request the fullscreen
     * @return    {Promise}   Returns a Promise which is resolved once full-screen mode has been activated.
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import requestFullscreen from '@coffeekraken/sugar/js/dom/requestFullscreen'
     * requestFullscreen(myDomElm)
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function requestFullscreen(elm) {
        if (elm.requestFullscreen) {
            return elm.requestFullscreen();
        }
        else if (elm.mozRequestFullScreen) {
            return elm.mozRequestFullScreen();
        }
        else if (elm.webkitRequestFullscreen) {
            return elm.webkitRequestFullscreen();
        }
        else if (elm.msRequestFullscreen) {
            return elm.msRequestFullscreen();
        }
    }
    return requestFullscreen;
});
//# sourceMappingURL=module.js.map