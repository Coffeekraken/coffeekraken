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
 * @param       {Any}        value            The value to count
 * @return      {Number}                           The passed value length
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function length(value: any): number {
    if (typeof value === 'string') return value.length;
    if (Array.isArray(value)) return value.length;
    if (__isPlainObject(value)) return Object.keys(value).length;
    return 0;
}
