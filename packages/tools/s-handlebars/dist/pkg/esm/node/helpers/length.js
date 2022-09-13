import { __isPlainObject } from '@coffeekraken/sugar/is';
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
 * @param       {Any}        value            The value to count
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FBQyxLQUFVO0lBQ3JDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNuRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzlDLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDN0QsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDIn0=