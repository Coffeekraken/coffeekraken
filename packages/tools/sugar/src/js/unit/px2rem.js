// @ts-nocheck
// @shared
/**
 * @name                    px2rem
 * @namespace           sugar.js.unit
 * @type                    Function
 * @stable
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import px2rem from '@coffeekraken/sugar/js/unit/px2rem';
 * px2rem(36);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function px2rem(px) {
    return (px /
        parseFloat(getComputedStyle(document.documentElement).fontSize || '16px'));
}
export default px2rem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHgycmVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHgycmVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsTUFBTSxDQUFDLEVBQUU7SUFDaEIsT0FBTyxDQUNMLEVBQUU7UUFDRixVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FDMUUsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLE1BQU0sQ0FBQyJ9