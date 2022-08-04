import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __sortObject from '@coffeekraken/sugar/shared/object/sort';
/**
 * @name            sort
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to sort either an array directly, of an object that will be sorted by his keys
 *
 * @param       {Any|Array}        value            The value to sort
 * @return      {Number}                           The sorted value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function sort(value) {
    if (Array.isArray(value)) {
        return value.sort((a, b) => a.localeCompare(b));
    }
    if (__isPlainObject(value)) {
        return __sortObject(value, (a, b) => a.key.localeCompare(b.key));
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBRWxFOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSSxDQUFDLEtBQVU7SUFDbkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDtJQUNELElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3BFO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9