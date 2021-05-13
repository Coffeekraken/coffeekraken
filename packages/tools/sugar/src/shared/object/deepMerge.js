// @ts-nocheck
import __copyTo from 'copy-to';
import __isPlainObject from '../is/plainObject';
import __unique from '../array/unique';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsU0FBUyxDQUFDLEdBQUcsSUFBSTtJQUN4QixNQUFNLFFBQVEsR0FBRztRQUNmLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDYixDQUFDO0lBRUYsU0FBUyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVM7UUFDaEMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUztZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDeEMsaUJBQWlCO1lBQ2pCLElBQ0UsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDN0I7Z0JBQ0EsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO2dCQUN2QixTQUFTO2FBQ1Y7WUFFRCxrQkFBa0I7aUJBQ2IsSUFDSCxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUk7Z0JBQ3hCLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDL0I7Z0JBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELFNBQVM7YUFDVjtZQUNELFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pELElBQ0UsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1FBQ3pCLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztRQUNsRCxDQUFDLG9CQUFvQixDQUFDLE1BQU07WUFDMUIsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLEVBQ25EO1FBQ0EsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssU0FBUztZQUMxQyxRQUFRLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztRQUM5QyxJQUFJLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQzNDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1FBQ2hELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNaO0lBRUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==