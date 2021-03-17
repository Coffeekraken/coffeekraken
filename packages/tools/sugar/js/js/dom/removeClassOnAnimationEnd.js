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
        define(["require", "exports", "./addEventListenerOnce", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var addEventListenerOnce_1 = __importDefault(require("./addEventListenerOnce"));
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name      removeClassOnAnimationEnd
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Remove some class on animation end
     *
     * @param    {HTMLElement}    elm    The element to take care of
     * @param    {String|Array}    class    The class or classes (Array) to remove
     * @return   {Promise}                  A promise that will be resolved once the class has been removed and the animation finished
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import removeClassOnAnimationEnd from '@coffeekraken/sugar/js/dom/removeClassOnAnimationEnd'
     * removeClassOnAnimationEnd(myCoolElm, 'my-class');
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function removeClassOnAnimationEnd($elm, cls) {
        return new s_promise_1.default(function (_a) {
            var resolve = _a.resolve;
            // listen for animation end on the element just once
            addEventListenerOnce_1.default($elm, 'animationend', function (e) {
                if (!Array.isArray(cls))
                    cls = [cls];
                // remove the cls
                cls.forEach(function (_cls) {
                    $elm.classList.remove(_cls);
                });
                // resolve the process
                resolve(e);
            });
        }, {
            id: 'removeClassOnAnimationEnd'
        });
    }
    exports.default = removeClassOnAnimationEnd;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQ2xhc3NPbkFuaW1hdGlvbkVuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vcmVtb3ZlQ2xhc3NPbkFuaW1hdGlvbkVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxnRkFBNEQ7SUFDNUQsc0VBQWlEO0lBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsR0FBRztRQUMxQyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsVUFBQyxFQUFXO2dCQUFULE9BQU8sYUFBQTtZQUNSLG9EQUFvRDtZQUNwRCw4QkFBc0IsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLFVBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO29CQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxpQkFBaUI7Z0JBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO29CQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FBQztnQkFDSCxzQkFBc0I7Z0JBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLDJCQUEyQjtTQUNoQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWUseUJBQXlCLENBQUMifQ==