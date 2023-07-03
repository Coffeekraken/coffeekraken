import __unique from '../array/unique';
import __isPlainObject from '../is/isPlainObject';
import __clone from './clone';
/**
 * @name            deepAssign
 * @namespace            shared.object
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take as first parameter the object you want to assign others to,
 * then others objects you want to assign to the first.
 * The difference with the ```deepMerge``` function is that this one keep the first
 * passed object as reference and update it directly. The ```deepMerge``` one create a new
 * object with the merging result
 *
 * @param       {Object}          referenceObj          The object you want to assign the others in
 * @param       {Object}          ...objects            Some objects you want to assign in the first one
 * @return      {Object}                                Return the reference to the first passed object
 *
 * @snippet         __deepAssign($1, $2)
 *
 * @example         js
 * import { __deepAssign } from '@coffeekraken/sugar/object';
 * const obj1 = { something: 'cool' };
 * const obj2 = { other: true };
 * const obj3 = __deepAssign(obj1, obj2);
 * obj1 === obj3 // => true
 *
 * @see         https://www.npmjs.com/package/assign-deep
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __deepAssign(referenceObj, ...objects) {
    // objects.forEach((obj) => {
    //   __deepAssign(referenceObj, obj);
    // });
    // return referenceObj;
    const settings = {
        array: true,
        object: true,
        cloneChilds: true,
    };
    function merge(refObj, mixWithObj) {
        // const newObj = {};
        // if (!refObj && mixWithObj) return mixWithObj;
        // if (!mixWithObj && refObj) return refObj;
        // if (!refObj && !mixWithObj) return {};
        // __copyTo(refObj).override(newObj);
        for (const key of Object.keys(mixWithObj)) {
            // merging arrays
            if (settings.array === true &&
                Array.isArray(refObj[key]) &&
                Array.isArray(mixWithObj[key])) {
                const newArray = __unique([...refObj[key], ...mixWithObj[key]]);
                refObj[key] = newArray;
                continue;
            }
            // merging objects
            if (settings.object === true &&
                __isPlainObject(refObj[key]) &&
                __isPlainObject(mixWithObj[key])) {
                refObj[key] = merge(refObj[key], mixWithObj[key]);
                continue;
            }
            if (__isPlainObject(mixWithObj[key]) && settings.cloneChilds) {
                refObj[key] = __clone(mixWithObj[key], {
                    deep: true,
                });
            }
            else {
                // default values
                refObj[key] = mixWithObj[key];
            }
        }
        return refObj;
    }
    const potentialSettingsObj = objects[objects.length - 1] || {};
    if ((potentialSettingsObj.array &&
        typeof potentialSettingsObj.array === 'boolean') ||
        (potentialSettingsObj.object &&
            typeof potentialSettingsObj.object === 'boolean')) {
        if (potentialSettingsObj.array !== undefined)
            settings.array = potentialSettingsObj.array;
        if (potentialSettingsObj.object !== undefined)
            settings.object = potentialSettingsObj.object;
        objects.pop();
    }
    for (let i = 0; i < objects.length; i++) {
        const toMergeObj = objects[i] || {};
        merge(referenceObj, toMergeObj);
    }
    return referenceObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sZUFBZSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQUMsWUFBWSxFQUFFLEdBQUcsT0FBTztJQUN6RCw2QkFBNkI7SUFDN0IscUNBQXFDO0lBQ3JDLE1BQU07SUFDTix1QkFBdUI7SUFFdkIsTUFBTSxRQUFRLEdBQUc7UUFDYixLQUFLLEVBQUUsSUFBSTtRQUNYLE1BQU0sRUFBRSxJQUFJO1FBQ1osV0FBVyxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLFNBQVMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVO1FBQzdCLHFCQUFxQjtRQUNyQixnREFBZ0Q7UUFDaEQsNENBQTRDO1FBQzVDLHlDQUF5QztRQUN6QyxxQ0FBcUM7UUFDckMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZDLGlCQUFpQjtZQUNqQixJQUNJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2hDO2dCQUNFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsU0FBUzthQUNaO1lBRUQsa0JBQWtCO1lBQ2xCLElBQ0ksUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO2dCQUN4QixlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2xDO2dCQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxTQUFTO2FBQ1o7WUFFRCxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO2dCQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxFQUFFLElBQUk7aUJBQ2IsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsaUJBQWlCO2dCQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0QsSUFDSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7UUFDdkIsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQ3BELENBQUMsb0JBQW9CLENBQUMsTUFBTTtZQUN4QixPQUFPLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsRUFDdkQ7UUFDRSxJQUFJLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTO1lBQ3hDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1FBQ2hELElBQUksb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVM7WUFDekMsUUFBUSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7UUFDbEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ2pCO0lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ25DO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQyJ9