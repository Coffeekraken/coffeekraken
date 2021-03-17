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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdEZ1bGxzY3JlZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kb20vZXhpdEZ1bGxzY3JlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsU0FBUyxjQUFjO1FBQ3JCLElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQzdCLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtZQUN2QyxPQUFPLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7WUFDMUMsT0FBTyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMxQztJQUNILENBQUM7SUFDRCxrQkFBZSxjQUFjLENBQUMifQ==