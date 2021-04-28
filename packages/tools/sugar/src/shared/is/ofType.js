// @ts-nocheck
import __SType from '@coffeekraken/s-type';
/**
 * @name              ofType
 * @namespace            js.is
 * @type              Function
 * @status              beta
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
 * import isOfType from '@coffeekraken/sugar/js/is/ofType';
 * ifOfType(true, 'Boolean'); // => true
 * isOfType(12, 'String|Number'); // => true
 * isOfType(['hello',true], 'Array<String>'); // => { expected: { type: 'Array<String>' }, received: { type: 'Array<String|Boolean>' }}
 * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ofType(value, typeString, settings = {}) {
    settings = Object.assign({ verbose: false }, settings);
    const typeInstance = new __SType(typeString, settings);
    const res = typeInstance.is(value);
    return res;
}
export default ofType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2ZUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzlDLFFBQVEsbUJBQ04sT0FBTyxFQUFFLEtBQUssSUFDWCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2RCxNQUFNLEdBQUcsR0FBWSxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUNELGVBQWUsTUFBTSxDQUFDIn0=