/**
 * @name            replace
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to replace a string with another one in the passed string.
 *
 * @param       {String}        str            The string in which to replace the second passed one
 * @param       {String}        replace         The string to replace
 * @param       {String}        with            The string to replace with
 * @return      {String}        The resulting string
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function replace(str: string, repl: string, w: string): string {
    const res = str.replace(repl, w);
    return res;
}
