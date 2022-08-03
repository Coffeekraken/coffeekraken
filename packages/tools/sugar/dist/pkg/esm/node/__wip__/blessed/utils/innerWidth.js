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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLFNBQXdCOztJQUN6RCxJQUFJLENBQUMsQ0FBQyxTQUFTLFlBQVksU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1FBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQ0wsU0FBUyxDQUFDLEtBQUs7UUFDZixDQUFDLENBQUEsTUFBQSxTQUFTLENBQUMsT0FBTywwQ0FBRSxJQUFJLEtBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQSxNQUFBLFNBQVMsQ0FBQyxPQUFPLDBDQUFFLEtBQUssS0FBSSxDQUFDLENBQUMsQ0FDaEMsQ0FBQztBQUNKLENBQUMifQ==