/**
 * @name            join
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to to join an array of values with a separator
 *
 * @param       {String[]}        value            The value to count
 * @param       {String}        separator        The separator to use
 * @return      {String}                    The joined value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function join(value: string[], separator: string): string {
    return value.join(separator);
}
