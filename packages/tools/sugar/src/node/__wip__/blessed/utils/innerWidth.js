// @ts-nocheck
import __blessed from 'blessed';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function innerWidth(component) {
    var _a, _b;
    if (!(component instanceof __blessed.box))
        return -1;
    if (!component && !component.parent)
        return -1;
    return (component.width -
        (((_a = component.padding) === null || _a === void 0 ? void 0 : _a.left) || 0) -
        (((_b = component.padding) === null || _b === void 0 ? void 0 : _b.right) || 0));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJXaWR0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlubmVyV2lkdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsU0FBd0I7O0lBQ3pELElBQUksQ0FBQyxDQUFDLFNBQVMsWUFBWSxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07UUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sQ0FDTCxTQUFTLENBQUMsS0FBSztRQUNmLENBQUMsQ0FBQSxNQUFBLFNBQVMsQ0FBQyxPQUFPLDBDQUFFLElBQUksS0FBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFBLE1BQUEsU0FBUyxDQUFDLE9BQU8sMENBQUUsS0FBSyxLQUFJLENBQUMsQ0FBQyxDQUNoQyxDQUFDO0FBQ0osQ0FBQyJ9