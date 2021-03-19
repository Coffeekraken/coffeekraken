"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const json_cyclic_1 = require("json-cyclic");
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
    settings = deepMerge_1.default({
        space: null,
        decircular: true
    }, replacerOrSettings !== null && typeof replacerOrSettings === 'object'
        ? replacerOrSettings
        : settings);
    const replacer = typeof replacerOrSettings === 'function' ? replacerOrSettings : null;
    let newObj = Object.assign({}, obj);
    if (settings.decircular)
        newObj = json_cyclic_1.decycle(newObj);
    return JSON.stringify(newObj, replacer, settings.space);
}
exports.default = stringify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaW5naWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyw2Q0FBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLEdBQUcsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzlELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLEtBQUssRUFBRSxJQUFJO1FBQ1gsVUFBVSxFQUFFLElBQUk7S0FDakIsRUFDRCxrQkFBa0IsS0FBSyxJQUFJLElBQUksT0FBTyxrQkFBa0IsS0FBSyxRQUFRO1FBQ25FLENBQUMsQ0FBQyxrQkFBa0I7UUFDcEIsQ0FBQyxDQUFDLFFBQVEsQ0FDYixDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQ1osT0FBTyxrQkFBa0IsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFdkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEMsSUFBSSxRQUFRLENBQUMsVUFBVTtRQUFFLE1BQU0sR0FBRyxxQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=