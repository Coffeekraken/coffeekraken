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
export default function sort(value: any): any {
    if (Array.isArray(value)) {
        return value.sort((a, b) => a.localeCompare(b));
    }
    if (__isPlainObject(value)) {
        return __sortObject(value, (a, b) => a.key.localeCompare(b.key));
    }
    return value;
}
