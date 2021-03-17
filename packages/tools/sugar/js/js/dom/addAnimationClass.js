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
        define(["require", "exports", "./removeClassOnAnimationEnd"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var removeClassOnAnimationEnd_1 = __importDefault(require("./removeClassOnAnimationEnd"));
    /**
     * @name        addAnimationClass
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Add a class that trigger an animation and remove it at the end
     *
     * @param    {HTMLElement}    $elm    The element to take care of
     * @param    {String|Array}    cls    The class or classes (Array) to apply
     * @return    {Promise}               A promise that will be resolved once the class have been removed and the animation finished
     *
     * @todo        interface
     * @todo        doc
     * @todo        tests
     *
     * @example    js
     * import addAnimationClass from '@coffeekraken/sugar/js/dom/addAnimationClass'
     * addAnimationClass(myElm, 'my-cool-class').then($elm => {
     *    // do something at the animation end...
     * });
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function addAnimationClass($elm, cls) {
        // make sure the cls argument is an Array
        if (!Array.isArray(cls))
            cls = [cls];
        // add the class to the element
        cls.forEach(function (_cls) {
            $elm.classList.add(_cls);
        });
        // remove the class at the end of the animation
        return removeClassOnAnimationEnd_1.default($elm, cls);
    }
    exports.default = addAnimationClass;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQW5pbWF0aW9uQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZG9tL2FkZEFuaW1hdGlvbkNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBGQUF3RTtJQUN4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsR0FBRztRQUNsQyx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsK0JBQStCO1FBQy9CLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCwrQ0FBK0M7UUFDL0MsT0FBTyxtQ0FBNkIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNELGtCQUFlLGlCQUFpQixDQUFDIn0=