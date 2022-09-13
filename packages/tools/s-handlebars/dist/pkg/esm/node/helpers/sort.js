import { __isPlainObject } from '@coffeekraken/sugar/is';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUVsRTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLElBQUksQ0FBQyxLQUFVO0lBQ25DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkQ7SUFDRCxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QixPQUFPLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNwRTtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==