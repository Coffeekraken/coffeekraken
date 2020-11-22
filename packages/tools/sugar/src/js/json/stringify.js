import __deepMerge from '../object/deepMerge';
import { decycle } from 'json-cyclic';
/**
 * @name            stringify
 * @namespace       sugar.js.json
 * @type            Function
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
 * @example         js
 * import stringify from '@coffeekraken/sugar/js/json/stringify';
 * stringify({
 *    hello: 'world'
 * }); // => {"hello":"world"}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function stringify(obj, replacerOrSettings = null, settings = {}) {
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
