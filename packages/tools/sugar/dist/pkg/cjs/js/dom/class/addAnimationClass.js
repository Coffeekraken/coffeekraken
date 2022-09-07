"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const removeClassOnAnimationEnd_1 = __importDefault(require("./removeClassOnAnimationEnd"));
/**
 * @name        addAnimationClass
 * @namespace            js.dom.class
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Add a class that trigger an animation and remove it at the end
 *
 * @param    {HTMLElement}    $elm    The element to take care of
 * @param    {String|Array}    cls    The class or classes (Array) to apply
 * @return    {Promise<HTMLElement>}               A promise that will be resolved once the class have been removed and the animation finished
 *
 * @todo        tests
 *
 * @example    js
 * import { __addAnimationClass } from '@coffeekraken/sugar/dom';
 *  __addAnimationClass(myElm, 'my-cool-class').then($elm => {
 *    // do something at the animation end...
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __addAnimationClass($elm, cls) {
    // make sure the cls argument is an Array
    if (!Array.isArray(cls))
        cls = [cls];
    // add the class to the element
    cls.forEach((_cls) => {
        $elm.classList.add(_cls);
    });
    // remove the class at the end of the animation
    return (0, removeClassOnAnimationEnd_1.default)($elm, cls);
}
exports.default = __addAnimationClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRGQUF3RTtBQUN4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUF3QixtQkFBbUIsQ0FDdkMsSUFBaUIsRUFDakIsR0FBc0I7SUFFdEIseUNBQXlDO0lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLCtCQUErQjtJQUMvQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDSCwrQ0FBK0M7SUFDL0MsT0FBTyxJQUFBLG1DQUE2QixFQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBWkQsc0NBWUMifQ==