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
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
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
function deepMap(object, processor, settings = {}, _path = []) {
    settings = deepMerge_1.default({
        deepFirst: false,
        classInstances: false,
        array: true,
        privateProps: false,
        cloneFirst: true
    }, settings);
    if (settings.cloneFirst) {
        object = Object.assign({}, object);
    }
    Object.keys(object).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/)) {
            delete object[prop];
            return;
        }
        // const descriptor = Object.getOwnPropertyDescriptor(object, prop);
        // if (
        //   descriptor.get &&
        //   typeof descriptor.get === 'function' &&
        //   !descriptor.set
        // ) {
        //   return;
        // }
        if (!settings.deepFirst) {
            if (plainObject_1.default(object[prop]) ||
                (classInstance_1.default(object[prop]) && settings.classInstances) ||
                (Array.isArray(object[prop]) && settings.array)) {
                object[prop] = deepMap(object[prop], processor, settings, [
                    ..._path,
                    prop
                ]);
                // if (!settings.classInstances) return;
            }
            const res = processor({
                object,
                prop,
                value: object[prop],
                path: [..._path, prop].join('.')
            });
            if (res === -1)
                delete object[prop];
            else
                object[prop] = res;
        }
        else {
            const res = processor({
                object,
                prop,
                value: object[prop],
                path: [..._path, prop].join('.')
            });
            if (res === -1)
                delete object[prop];
            else
                object[prop] = res;
            if (plainObject_1.default(object[prop]) ||
                (classInstance_1.default(object[prop]) && settings.classInstances) ||
                (Array.isArray(object[prop]) && settings.array)) {
                object[prop] = deepMap(object[prop], processor, settings, [
                    ..._path,
                    prop
                ]);
                // if (!settings.classInstances) return;
            }
        }
    });
    return object;
}
exports.default = deepMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsb0VBQWdEO0FBQ2hELG9FQUE4QztBQUM5Qyx3RUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQzNELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLGNBQWMsRUFBRSxLQUFLO1FBQ3JCLEtBQUssRUFBRSxJQUFJO1FBQ1gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLElBQUk7S0FDakIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDcEM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsT0FBTztTQUNSO1FBRUQsb0VBQW9FO1FBQ3BFLE9BQU87UUFDUCxzQkFBc0I7UUFDdEIsNENBQTRDO1FBQzVDLG9CQUFvQjtRQUNwQixNQUFNO1FBQ04sWUFBWTtRQUNaLElBQUk7UUFFSixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUN2QixJQUNFLHFCQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLHVCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUM7Z0JBQzVELENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQy9DO2dCQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7b0JBQ3hELEdBQUcsS0FBSztvQkFDUixJQUFJO2lCQUNMLENBQUMsQ0FBQztnQkFDSCx3Q0FBd0M7YUFDekM7WUFFRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Z0JBQ3BCLE1BQU07Z0JBQ04sSUFBSTtnQkFDSixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDbkIsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFDSCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Z0JBQ3BCLE1BQU07Z0JBQ04sSUFBSTtnQkFDSixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDbkIsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFDSCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLElBQ0UscUJBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUMsdUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQztnQkFDNUQsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDL0M7Z0JBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtvQkFDeEQsR0FBRyxLQUFLO29CQUNSLElBQUk7aUJBQ0wsQ0FBQyxDQUFDO2dCQUNILHdDQUF3QzthQUN6QztTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=