"use strict";
// @ts-nocheck
// @shared
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9qc29uL3N0cmluZ2lmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsb0VBQThDO0FBQzlDLDZDQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxrQkFBa0IsR0FBRyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDOUQsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsSUFBSTtLQUNqQixFQUNELGtCQUFrQixLQUFLLElBQUksSUFBSSxPQUFPLGtCQUFrQixLQUFLLFFBQVE7UUFDbkUsQ0FBQyxDQUFDLGtCQUFrQjtRQUNwQixDQUFDLENBQUMsUUFBUSxDQUNiLENBQUM7SUFDRixNQUFNLFFBQVEsR0FDWixPQUFPLGtCQUFrQixLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUV2RSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwQyxJQUFJLFFBQVEsQ0FBQyxVQUFVO1FBQUUsTUFBTSxHQUFHLHFCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==