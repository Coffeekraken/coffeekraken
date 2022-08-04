"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classInstance_1 = __importDefault(require("../is/classInstance"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name            deepMap
 * @namespace            shared.object
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 * - classInstances (false) {Boolean}: Specify if you want the objects to be processed the same as other values
 * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
 * - array (true) {Boolean}: Specify if we have to treat array like simple value to process of treat them as an object and continue our map down
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
 * deepMap({
 *    hello: 'world'
 * }, ({object, prop, value, path}) => {
 *    return '~ ' + value;
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function deepMap(objectOrArray, processor, settings = {}, _path = []) {
    settings = (0, deepMerge_1.default)({
        classInstances: false,
        array: true,
        privateProps: false,
        cloneFirst: true,
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : settings.cloneFirst
            ? Object.assign({}, objectOrArray)
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if ((0, plainObject_1.default)(objectOrArray[prop]) ||
            ((0, classInstance_1.default)(objectOrArray[prop]) &&
                settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = deepMap(objectOrArray[prop], processor, settings, [
                ..._path,
                prop,
            ]);
            if (isArray) {
                newObject.push(res);
            }
            else {
                if (prop === '...' && (0, plainObject_1.default)(res)) {
                    newObject = Object.assign(Object.assign({}, newObject), res);
                }
                else {
                    newObject[prop] = res;
                }
            }
            return;
        }
        const res = processor({
            object: objectOrArray,
            prop,
            value: objectOrArray[prop],
            path: [..._path, prop].join('.'),
        });
        if (res === -1) {
            delete objectOrArray[prop];
            return;
        }
        if (isArray)
            newObject.push(res);
        else {
            if (prop === '...' && (0, plainObject_1.default)(res)) {
                // console.log('DEFEF', res);
                newObject = Object.assign(Object.assign({}, newObject), res);
            }
            else {
                newObject[prop] = res;
            }
        }
    });
    return newObject;
}
exports.default = deepMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFvRDtBQUNwRCxvRUFBZ0Q7QUFDaEQsb0VBQThDO0FBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQ2hFLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksY0FBYyxFQUFFLEtBQUs7UUFDckIsS0FBSyxFQUFFLElBQUk7UUFDWCxZQUFZLEVBQUUsS0FBSztRQUNuQixVQUFVLEVBQUUsSUFBSTtLQUNuQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUU3QyxJQUFJLFNBQVMsR0FBRyxPQUFPO1FBQ25CLENBQUMsQ0FBQyxFQUFFO1FBQ0osQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVO1lBQ3JCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUM7WUFDbEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUVwQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUV2RCxJQUNJLElBQUEscUJBQWUsRUFBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFBLHVCQUFpQixFQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUM1QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUN4RDtZQUNFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtnQkFDMUQsR0FBRyxLQUFLO2dCQUNSLElBQUk7YUFDUCxDQUFDLENBQUM7WUFFSCxJQUFJLE9BQU8sRUFBRTtnQkFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNILElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFBLHFCQUFlLEVBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3hDLFNBQVMsbUNBQ0YsU0FBUyxHQUNULEdBQUcsQ0FDVCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ3pCO2FBQ0o7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDbEIsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSTtZQUNKLEtBQUssRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDWixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU87WUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUEscUJBQWUsRUFBQyxHQUFHLENBQUMsRUFBRTtnQkFDeEMsNkJBQTZCO2dCQUM3QixTQUFTLG1DQUNGLFNBQVMsR0FDVCxHQUFHLENBQ1QsQ0FBQzthQUNMO2lCQUFNO2dCQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUNELGtCQUFlLE9BQU8sQ0FBQyJ9