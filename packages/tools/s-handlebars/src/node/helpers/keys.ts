/**
 * @name            keys
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get the keys of an object
 *
 * @param       {Object}        object            The object to get keys from
 * @return      {String[]}                         The object keys
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function keys(object: any): string[] {
    return Object.keys(object);
}
