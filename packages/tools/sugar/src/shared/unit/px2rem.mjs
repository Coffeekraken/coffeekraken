// @ts-nocheck
/**
 * @name                    px2rem
 * @namespace            js.unit
 * @type                    Function
 * @stable
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @return        {Number}                        The pixel value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHgycmVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC91bml0L3B4MnJlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsTUFBTSxDQUFDLEVBQUU7SUFDaEIsT0FBTyxDQUNMLEVBQUU7UUFDRixVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FDMUUsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLE1BQU0sQ0FBQyJ9