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
    const addEventListenerOnce_1 = __importDefault(require("./addEventListenerOnce"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name      removeClassOnAnimationEnd
     * @namespace            js.dom
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
        return new s_promise_1.default(({ resolve }) => {
            // listen for animation end on the element just once
            addEventListenerOnce_1.default($elm, 'animationend', (e) => {
                if (!Array.isArray(cls))
                    cls = [cls];
                // remove the cls
                cls.forEach((_cls) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQ2xhc3NPbkFuaW1hdGlvbkVuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vcmVtb3ZlQ2xhc3NPbkFuaW1hdGlvbkVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrRkFBNEQ7SUFDNUQsd0VBQWlEO0lBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsR0FBRztRQUMxQyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDZCxvREFBb0Q7WUFDcEQsOEJBQXNCLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLGlCQUFpQjtnQkFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsc0JBQXNCO2dCQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSwyQkFBMkI7U0FDaEMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLHlCQUF5QixDQUFDIn0=