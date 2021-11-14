// @ts-nocheck
/**
 * @name                    rem2px
 * @namespace            js.unit
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status        beta
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtMnB4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVtMnB4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxHQUFHO0lBQ2YsT0FBTyxDQUNILEdBQUc7UUFDSCxVQUFVLENBQ04sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQ2hFLENBQ0osQ0FBQztBQUNOLENBQUM7QUFDRCxlQUFlLE1BQU0sQ0FBQyJ9