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
        define(["require", "exports", "./requestFullscreen", "./exitFullscreen"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var requestFullscreen_1 = __importDefault(require("./requestFullscreen"));
    var exitFullscreen_1 = __importDefault(require("./exitFullscreen"));
    /**
     * @name      toggleFullscreen
     * @namespace     sugar.js.dom
     * @type      Function
     * @stable
     *
     * Toggle the fullscreen mode
     *
     * @param    {HTMLElement}    elm    The element on which to request the fullscreen
     * @return    {Promise}   Returns a Promise which is resolved once full-screen mode has been des/activated.
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example   js
     * import toggleFullscreen from '@coffeekraken/sugar/js/dom/toggleFullscreen'
     * toggleFullscreen(myDomElm)
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function toggleFullscreen(elm) {
        var fullscreenElm = document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
        if (!fullscreenElm || fullscreenElm !== elm) {
            return requestFullscreen_1.default(elm);
        }
        else {
            return exitFullscreen_1.default();
        }
    }
    exports.default = toggleFullscreen;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlRnVsbHNjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RvbS90b2dnbGVGdWxsc2NyZWVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBFQUFvRDtJQUNwRCxvRUFBOEM7SUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsZ0JBQWdCLENBQUMsR0FBRztRQUMzQixJQUFNLGFBQWEsR0FDakIsUUFBUSxDQUFDLGlCQUFpQjtZQUMxQixRQUFRLENBQUMsb0JBQW9CO1lBQzdCLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsS0FBSyxHQUFHLEVBQUU7WUFDM0MsT0FBTywyQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsT0FBTyx3QkFBYyxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsZ0JBQWdCLENBQUMifQ==