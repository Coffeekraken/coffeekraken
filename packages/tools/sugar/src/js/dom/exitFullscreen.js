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
     * @namespace            js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGl0RnVsbHNjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxTQUFTLGNBQWM7UUFDckIsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0IsT0FBTyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQ3ZDLE9BQU8sUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDdkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUMxQyxPQUFPLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUNELGtCQUFlLGNBQWMsQ0FBQyJ9