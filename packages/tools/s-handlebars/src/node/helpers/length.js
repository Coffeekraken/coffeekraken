import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
/**
 * @name            length
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get back either an array length, an object keys length or a string length
 *
 * @param       {Any}        value            The value to count
 * @return      {Number}                           The passed value length
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function length(value) {
    if (typeof value === 'string')
        return value.length;
    if (Array.isArray(value))
        return value.length;
    if (__isPlainObject(value))
        return Object.keys(value).length;
    return 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVuZ3RoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGVuZ3RoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBRXhFOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUFDLEtBQVU7SUFDckMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ25ELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDOUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3RCxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUMifQ==