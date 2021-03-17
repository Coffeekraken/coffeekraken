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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQW5pbWF0aW9uQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kb20vYWRkQW5pbWF0aW9uQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMEZBQXdFO0lBQ3hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLGlCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHO1FBQ2xDLHlDQUF5QztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQywrQkFBK0I7UUFDL0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILCtDQUErQztRQUMvQyxPQUFPLG1DQUE2QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==