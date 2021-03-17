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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQ2xhc3NPbkFuaW1hdGlvbkVuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RvbS9yZW1vdmVDbGFzc09uQW5pbWF0aW9uRW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdGQUE0RDtJQUM1RCxzRUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLHlCQUF5QixDQUFDLElBQUksRUFBRSxHQUFHO1FBQzFDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixVQUFDLEVBQVc7Z0JBQVQsT0FBTyxhQUFBO1lBQ1Isb0RBQW9EO1lBQ3BELDhCQUFzQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsVUFBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLGlCQUFpQjtnQkFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7b0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDO2dCQUNILHNCQUFzQjtnQkFDdEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsMkJBQTJCO1NBQ2hDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFDRCxrQkFBZSx5QkFBeUIsQ0FBQyJ9