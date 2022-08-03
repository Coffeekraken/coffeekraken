"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
/**
 * @name                innerWidth
 * @namespace            node.blessed.utils
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBd0IsVUFBVSxDQUFDLFNBQXdCOztJQUN6RCxJQUFJLENBQUMsQ0FBQyxTQUFTLFlBQVksaUJBQVMsQ0FBQyxHQUFHLENBQUM7UUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3JELElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtRQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUNMLFNBQVMsQ0FBQyxLQUFLO1FBQ2YsQ0FBQyxDQUFBLE1BQUEsU0FBUyxDQUFDLE9BQU8sMENBQUUsSUFBSSxLQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUEsTUFBQSxTQUFTLENBQUMsT0FBTywwQ0FBRSxLQUFLLEtBQUksQ0FBQyxDQUFDLENBQ2hDLENBQUM7QUFDSixDQUFDO0FBUkQsNkJBUUMifQ==