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
    exports.default = exitFullscreen;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZG9tL2V4aXRGdWxsc2NyZWVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILFNBQVMsY0FBYztRQUNyQixJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM3QixPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7WUFDdkMsT0FBTyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUN2QzthQUFNLElBQUksUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQzFDLE9BQU8sUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=