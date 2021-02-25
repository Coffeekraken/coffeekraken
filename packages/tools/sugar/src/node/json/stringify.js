// @ts-nocheck
// @shared
import __deepMerge from '../object/deepMerge';
import { decycle } from 'json-cyclic';
/**
 * @name            stringify
 * @namespace       sugar.js.json
 * @type            Function
 * @status              beta
 *
 * This function do the same as the ```JSON.stringify``` one but add some features.
 *
 * @feature       2.0.0         Remove circular dependencies by default
 *
 * @param         {Object}        obj       The object to stringify
 * @param         {Function}    [replacerOrSettings=null]       A function that alters the behavior of the stringification process. You can also pass the settings object here
 * @param         {Object}      [settings={}]         An object of settings to configure your process:
 * - space (null) {Number}: A String or Number object that's used to insert white space into the output JSON string
 * - decircular (true) {Boolean}: Specify if you want to remove circular dependencies or not
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
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function stringify(obj, replacerOrSettings = null, settings = {}) {
    settings = __deepMerge({
        space: null,
        decircular: true
    }, replacerOrSettings !== null && typeof replacerOrSettings === 'object'
        ? replacerOrSettings
        : settings);
    const replacer = typeof replacerOrSettings === 'function' ? replacerOrSettings : null;
    let newObj = Object.assign({}, obj);
    if (settings.decircular)
        newObj = decycle(newObj);
    return JSON.stringify(newObj, replacer, settings.space);
}
export default stringify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaW5naWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxrQkFBa0IsR0FBRyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDOUQsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxJQUFJO0tBQ2pCLEVBQ0Qsa0JBQWtCLEtBQUssSUFBSSxJQUFJLE9BQU8sa0JBQWtCLEtBQUssUUFBUTtRQUNuRSxDQUFDLENBQUMsa0JBQWtCO1FBQ3BCLENBQUMsQ0FBQyxRQUFRLENBQ2IsQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUNaLE9BQU8sa0JBQWtCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBRXZFLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLElBQUksUUFBUSxDQUFDLFVBQVU7UUFBRSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==