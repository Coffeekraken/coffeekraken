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
    exports.default = requestFullscreen;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kb20vcmVxdWVzdEZ1bGxzY3JlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsaUJBQWlCLENBQUMsR0FBRztRQUM1QixJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxHQUFHLENBQUMsb0JBQW9CLEVBQUU7WUFDbkMsT0FBTyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUNuQzthQUFNLElBQUksR0FBRyxDQUFDLHVCQUF1QixFQUFFO1lBQ3RDLE9BQU8sR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDdEM7YUFBTSxJQUFJLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRTtZQUNsQyxPQUFPLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUNELGtCQUFlLGlCQUFpQixDQUFDIn0=