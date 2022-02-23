/**
 * @name            includes
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to check if the passed value exists in the second value.
 * Second value can be a string or an array.
 *
 * @param       {String}        value           The value to check
 * @param       {String|Array}          in      The value in which to check
 * @return      {Boolean}                       true if exists, false if not
 * 
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function(value: string, inValue: string | string[]): boolean {
    return inValue.includes(value);
}
