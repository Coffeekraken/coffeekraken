// @ts-nocheck
// import { decycle } from 'json-cyclic';
import __stringify from 'fast-safe-stringify';
/**
 * @name            stringify
 * @namespace            js.json
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function do the same as the ```JSON.stringify``` one but add some features.
 *
 * @feature       2.0.0         Remove circular dependencies by default
 *
 * @param         {Object}        obj       The object to stringify
 * @param         {Function}    [replacer=null]       A function that alters the behavior of the stringification process.
 * @param         {Number}      [space=null]      The number of spaces you want tp use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import stringify from '@coffeekraken/sugar/js/json/stringify';
 * stringify({
 *    hello: 'world'
 * }); // => {"hello":"world"}
 *
 * @see         https://www.npmjs.com/package/fast-safe-stringify
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function stringify(obj, replacer = null, space = null) {
    return __stringify(obj, replacer, space);
}
export default stringify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaW5naWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCx5Q0FBeUM7QUFDekMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxJQUFJLEVBQUUsS0FBSyxHQUFHLElBQUk7SUFDakQsT0FBTyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==