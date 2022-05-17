import __toString from '@coffeekraken/sugar/shared/string/toString';

/**
 * @name            toString
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to apply the `toString` coffeekraken function on the passed value
 *
 * @param       {Any}        value            The value to convert to string
 * @return      {String}                           The converted value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function toString(value: string[]): string {
    return __toString(value);
}
