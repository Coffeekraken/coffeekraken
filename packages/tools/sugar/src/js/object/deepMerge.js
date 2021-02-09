"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
// @shared
const copy_to_1 = __importDefault(require("copy-to"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const unique_1 = __importDefault(require("../array/unique"));
/**
 * @name                deepMerge
 * @namespace           sugar.js.object
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLFVBQVU7QUFDVixzREFBK0I7QUFDL0Isb0VBQWdEO0FBQ2hELDZEQUF1QztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsR0FBRyxJQUFJO0lBQ3hCLE1BQU0sUUFBUSxHQUFHO1FBQ2YsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsSUFBSTtLQUNiLENBQUM7SUFFRixTQUFTLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUztRQUNoQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsSUFBSSxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxpQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDeEMsaUJBQWlCO1lBQ2pCLElBQ0UsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDN0I7Z0JBQ0EsTUFBTSxRQUFRLEdBQUcsZ0JBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsU0FBUzthQUNWO1lBRUQsa0JBQWtCO2lCQUNiLElBQ0gsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO2dCQUN4QixxQkFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIscUJBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDL0I7Z0JBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELFNBQVM7YUFDVjtZQUNELGlCQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6RCxJQUNFLENBQUMsb0JBQW9CLENBQUMsS0FBSztRQUN6QixPQUFPLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7UUFDbEQsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO1lBQzFCLE9BQU8sb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxFQUNuRDtRQUNBLElBQUksb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVM7WUFDMUMsUUFBUSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFDOUMsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssU0FBUztZQUMzQyxRQUFRLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDWjtJQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzVDO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUNELGtCQUFlLFNBQVMsQ0FBQyJ9