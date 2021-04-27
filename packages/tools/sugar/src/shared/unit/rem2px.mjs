// @ts-nocheck
/**
 * @name                    rem2px
 * @namespace            js.unit
 * @type                    Function
 * @stable
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          rem           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import rem2px from '@coffeekraken/sugar/js/unit/rem2px';
 * rem2px(2);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rem2px(rem) {
    return (rem *
        parseFloat(getComputedStyle(document.documentElement).fontSize || '16px'));
}
export default rem2px;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtMnB4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC91bml0L3JlbTJweC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsTUFBTSxDQUFDLEdBQUc7SUFDakIsT0FBTyxDQUNMLEdBQUc7UUFDSCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FDMUUsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLE1BQU0sQ0FBQyJ9