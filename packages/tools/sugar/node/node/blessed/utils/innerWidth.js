"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
/**
 * @name                innerWidth
 * @namespace           sugar.node.blessed.utils
 * @type                Function
 *
 * This function simply returns you the actual inner width (width - left/right paddings)
 * of the passed component.
 * Returns -1 if the component or it's parent is not displayed...
 *
 * @param       {blessed.box}          component        The blessed component to get the inner width of
 * @return      {Integer}                           The actual inner with of the element
 *
 * @example         js
 * import innerWidth from '@coffeekraken/sugar/node/blessed/utils/innerWidth';
 * innerWidth(myBlessedComponent); // => 10
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function innerWidth(component) {
    var _a, _b;
    if (!(component instanceof blessed_1.default.box))
        return -1;
    if (!component && !component.parent)
        return -1;
    return (component.width -
        (((_a = component.padding) === null || _a === void 0 ? void 0 : _a.left) || 0) -
        (((_b = component.padding) === null || _b === void 0 ? void 0 : _b.right) || 0));
}
exports.default = innerWidth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJXaWR0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2JsZXNzZWQvdXRpbHMvaW5uZXJXaWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzREFBZ0M7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxTQUF3Qjs7SUFDekQsSUFBSSxDQUFDLENBQUMsU0FBUyxZQUFZLGlCQUFTLENBQUMsR0FBRyxDQUFDO1FBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07UUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sQ0FDTCxTQUFTLENBQUMsS0FBSztRQUNmLENBQUMsQ0FBQSxNQUFBLFNBQVMsQ0FBQyxPQUFPLDBDQUFFLElBQUksS0FBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFBLE1BQUEsU0FBUyxDQUFDLE9BQU8sMENBQUUsS0FBSyxLQUFJLENBQUMsQ0FBQyxDQUNoQyxDQUFDO0FBQ0osQ0FBQztBQVJELDZCQVFDIn0=