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
     * @name      requestFullscreen
     * @namespace            js.dom
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
    exports.default = requestFullscreen;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0RnVsbHNjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHO1FBQzVCLElBQUksR0FBRyxDQUFDLGlCQUFpQixFQUFFO1lBQ3pCLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDaEM7YUFBTSxJQUFJLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtZQUNuQyxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ25DO2FBQU0sSUFBSSxHQUFHLENBQUMsdUJBQXVCLEVBQUU7WUFDdEMsT0FBTyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUN0QzthQUFNLElBQUksR0FBRyxDQUFDLG1CQUFtQixFQUFFO1lBQ2xDLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==