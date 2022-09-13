// @ts-nocheck
import __SType from '@coffeekraken/s-type';
/**
 * @name              ofType
 * @namespace            shared.is
 * @type              Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
 * if the value pass the test or not...
 *
 * @param       {Mixed}        value          The value to check
 * @param       {String}       typeString      The argument type definition string to use for the test
 * @param       {Object}        [settings={}]         Some settings to configure your type checking
 * @return      {Boolean|Object}                    true if the value pass the test, an object with two sub-objects describing the issue. 1 names "expected" and the othet names "received"
 *
 * @param     {Boolean}       [verbose=false]       Specify if you want to get back just "false", or an object describing the issue
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __isOfType } from '@coffeekraken/sugar/is';
 * __isOfType(true, 'Boolean'); // => true
 * __isOfType(12, 'String|Number'); // => true
 * __isOfType(['hello',true], 'Array<String>'); // => { expected: { type: 'Array<String>' }, received: { type: 'Array<String|Boolean>' }}
 * __isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isOfType(value, typeString, settings = {}) {
    settings = Object.assign({ verbose: false }, settings);
    const typeInstance = new __SType(typeString, settings);
    const res = typeInstance.is(value);
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDL0QsUUFBUSxtQkFDSixPQUFPLEVBQUUsS0FBSyxJQUNYLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sR0FBRyxHQUFZLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=