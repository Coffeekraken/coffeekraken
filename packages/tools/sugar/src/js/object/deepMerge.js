// @ts-nocheck
// @shared
import __copyTo from 'copy-to';
import __isPlainObject from '../is/plainObject';
import __unique from '../array/unique';
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
        __copyTo(firstObj).override(newObj);
        for (const key of Object.keys(secondObj)) {
            // merging arrays
            if (settings.array === true &&
                Array.isArray(firstObj[key]) &&
                Array.isArray(secondObj[key])) {
                const newArray = __unique([...firstObj[key], ...secondObj[key]]);
                newObj[key] = newArray;
                continue;
            }
            // merging objects
            else if (settings.object === true &&
                __isPlainObject(firstObj[key]) &&
                __isPlainObject(secondObj[key])) {
                newObj[key] = merge(firstObj[key], secondObj[key]);
                continue;
            }
            __copyTo(secondObj).pick(key).toCover(newObj);
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
export default deepMerge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBQ1YsT0FBTyxRQUFRLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxHQUFHLElBQUk7SUFDeEIsTUFBTSxRQUFRLEdBQUc7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxJQUFJO0tBQ2IsQ0FBQztJQUVGLFNBQVMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVM7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVE7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hDLGlCQUFpQjtZQUNqQixJQUNFLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQzdCO2dCQUNBLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsU0FBUzthQUNWO1lBRUQsa0JBQWtCO2lCQUNiLElBQ0gsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO2dCQUN4QixlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQy9CO2dCQUNBLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxTQUFTO2FBQ1Y7WUFDRCxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6RCxJQUNFLENBQUMsb0JBQW9CLENBQUMsS0FBSztRQUN6QixPQUFPLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7UUFDbEQsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO1lBQzFCLE9BQU8sb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxFQUNuRDtRQUNBLElBQUksb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVM7WUFDMUMsUUFBUSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFDOUMsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssU0FBUztZQUMzQyxRQUFRLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDWjtJQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzVDO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=