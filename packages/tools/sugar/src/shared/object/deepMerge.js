"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const copy_to_1 = __importDefault(require("copy-to"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const unique_1 = __importDefault(require("../array/unique"));
/**
 * @name                deepMerge
 * @namespace            js.object
 * @type                Function
 * @stable
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * - object (true) {Boolean}: Specify if you want to merge the objects
 * - array (false) {Boolean}: Specify if you want to merge the arrays
 * @return          {Object}                              The merged object result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMerge(...args) {
    const settings = {
        array: false,
        object: true
    };
    function merge(firstObj, secondObj) {
        const newObj = {};
        if (!firstObj && secondObj)
            return secondObj;
        if (!secondObj && firstObj)
            return firstObj;
        if (!firstObj && !secondObj)
            return {};
        copy_to_1.default(firstObj).override(newObj);
        for (const key of Object.keys(secondObj)) {
            // merging arrays
            if (settings.array === true &&
                Array.isArray(firstObj[key]) &&
                Array.isArray(secondObj[key])) {
                const newArray = unique_1.default([...firstObj[key], ...secondObj[key]]);
                newObj[key] = newArray;
                continue;
            }
            // merging objects
            else if (settings.object === true &&
                plainObject_1.default(firstObj[key]) &&
                plainObject_1.default(secondObj[key])) {
                newObj[key] = merge(firstObj[key], secondObj[key]);
                continue;
            }
            copy_to_1.default(secondObj).pick(key).toCover(newObj);
        }
        return newObj;
    }
    const potentialSettingsObj = args[args.length - 1] || {};
    if ((potentialSettingsObj.array &&
        typeof potentialSettingsObj.array === 'boolean') ||
        (potentialSettingsObj.object &&
            typeof potentialSettingsObj.object === 'boolean')) {
        if (potentialSettingsObj.array !== undefined)
            settings.array = potentialSettingsObj.array;
        if (potentialSettingsObj.object !== undefined)
            settings.object = potentialSettingsObj.object;
        args.pop();
    }
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i] || {};
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
exports.default = deepMerge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUErQjtBQUMvQixvRUFBZ0Q7QUFDaEQsNkRBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxHQUFHLElBQUk7SUFDeEIsTUFBTSxRQUFRLEdBQUc7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxJQUFJO0tBQ2IsQ0FBQztJQUVGLFNBQVMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVM7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVE7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLGlCQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN4QyxpQkFBaUI7WUFDakIsSUFDRSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUk7Z0JBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUM3QjtnQkFDQSxNQUFNLFFBQVEsR0FBRyxnQkFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO2dCQUN2QixTQUFTO2FBQ1Y7WUFFRCxrQkFBa0I7aUJBQ2IsSUFDSCxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUk7Z0JBQ3hCLHFCQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixxQkFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUMvQjtnQkFDQSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsU0FBUzthQUNWO1lBQ0QsaUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pELElBQ0UsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1FBQ3pCLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztRQUNsRCxDQUFDLG9CQUFvQixDQUFDLE1BQU07WUFDMUIsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLEVBQ25EO1FBQ0EsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssU0FBUztZQUMxQyxRQUFRLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztRQUM5QyxJQUFJLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQzNDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1FBQ2hELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNaO0lBRUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=