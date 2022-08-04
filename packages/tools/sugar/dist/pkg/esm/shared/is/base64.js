// @ts-nocheck
/**
 * @name        isBase64
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a base 64 string
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isBase64 from '@coffeekraken/sugar/shared/is/base64'
 * if (isBase64(true) {
 *   // do something
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isBase64(value) {
    if (typeof value !== 'string')
        return false;
    if (value === '' || value.trim() === '')
        return false;
    const reg = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return reg.test(value);
}
export default isBase64;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsUUFBUSxDQUFDLEtBQUs7SUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDdEQsTUFBTSxHQUFHLEdBQUcsa0VBQWtFLENBQUM7SUFDL0UsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFDRCxlQUFlLFFBQVEsQ0FBQyJ9