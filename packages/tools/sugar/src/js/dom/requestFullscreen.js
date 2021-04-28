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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL3JlcXVlc3RGdWxsc2NyZWVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQUc7UUFDNUIsSUFBSSxHQUFHLENBQUMsaUJBQWlCLEVBQUU7WUFDekIsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUNoQzthQUFNLElBQUksR0FBRyxDQUFDLG9CQUFvQixFQUFFO1lBQ25DLE9BQU8sR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDbkM7YUFBTSxJQUFJLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRTtZQUN0QyxPQUFPLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxHQUFHLENBQUMsbUJBQW1CLEVBQUU7WUFDbEMsT0FBTyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFDRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9