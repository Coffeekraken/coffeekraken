"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plainObject_1 = __importDefault(require("../is/plainObject"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const classInstance_1 = __importDefault(require("../is/classInstance"));
/**
 * @name            deepMap
 * @namespace           sugar.js.object
 * @type            Function
 * @stable
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMap(objectOrArray, processor, settings = {}, _path = []) {
    settings = deepMerge_1.default({
        classInstances: false,
        array: true,
        privateProps: false,
        cloneFirst: true
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    const newObject = isArray
        ? []
        : settings.cloneFirst
            ? Object.assign({}, objectOrArray)
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if (plainObject_1.default(objectOrArray[prop]) ||
            (classInstance_1.default(objectOrArray[prop]) && settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = deepMap(objectOrArray[prop], processor, settings, [
                ..._path,
                prop
            ]);
            if (isArray) {
                newObject.push(res);
            }
            else {
                newObject[prop] = res;
            }
            return;
        }
        const res = processor({
            objectOrArray,
            prop,
            value: objectOrArray[prop],
            path: [..._path, prop].join('.')
        });
        if (res === -1)
            return;
        if (isArray)
            newObject.push(res);
        else
            newObject[prop] = res;
    });
    return newObject;
}
exports.default = deepMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsb0VBQWdEO0FBQ2hELG9FQUE4QztBQUM5Qyx3RUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQ2xFLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLGNBQWMsRUFBRSxLQUFLO1FBQ3JCLEtBQUssRUFBRSxJQUFJO1FBQ1gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLElBQUk7S0FDakIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFN0MsTUFBTSxTQUFTLEdBQUcsT0FBTztRQUN2QixDQUFDLENBQUMsRUFBRTtRQUNKLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVTtZQUNyQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFFbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU87UUFFdkQsSUFDRSxxQkFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLHVCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUM7WUFDbkUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDdEQ7WUFDQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7Z0JBQzVELEdBQUcsS0FBSztnQkFDUixJQUFJO2FBQ0wsQ0FBQyxDQUFDO1lBRUgsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTztTQUNSO1FBRUQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3BCLGFBQWE7WUFDYixJQUFJO1lBQ0osS0FBSyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDMUIsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ3ZCLElBQUksT0FBTztZQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O1lBQzVCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=