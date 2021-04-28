import __unique from '../array/unique';
import __isPlainObject from '../is/plainObject';
import __clone from './clone';
/**
 * @name            deepAssign
 * @namespace            js.object
 * @type            Function
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
 * @example         js
 * import deepAssign from '@coffeekraken/sugar/js/object/deepAssign';
 * const obj1 = { something: 'cool' };
 * const obj2 = { other: true };
 * const obj3 = deepAssign(obj1, obj2);
 * obj1 === obj3 // => true
 *
 * @see         https://www.npmjs.com/package/assign-deep
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function deepAssign(referenceObj, ...objects) {
    // objects.forEach((obj) => {
    //   __deepAssign(referenceObj, obj);
    // });
    // return referenceObj;
    const settings = {
        array: false,
        object: true,
        cloneChilds: true
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
                    deep: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcEFzc2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBBc3NpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsWUFBWSxFQUFFLEdBQUcsT0FBTztJQUN6RCw2QkFBNkI7SUFDN0IscUNBQXFDO0lBQ3JDLE1BQU07SUFDTix1QkFBdUI7SUFFdkIsTUFBTSxRQUFRLEdBQUc7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxJQUFJO1FBQ1osV0FBVyxFQUFFLElBQUk7S0FDbEIsQ0FBQztJQUVGLFNBQVMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVO1FBQy9CLHFCQUFxQjtRQUNyQixnREFBZ0Q7UUFDaEQsNENBQTRDO1FBQzVDLHlDQUF5QztRQUN6QyxxQ0FBcUM7UUFDckMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pDLGlCQUFpQjtZQUNqQixJQUNFLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQzlCO2dCQUNBLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsU0FBUzthQUNWO1lBRUQsa0JBQWtCO1lBQ2xCLElBQ0UsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO2dCQUN4QixlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2hDO2dCQUNBLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxTQUFTO2FBQ1Y7WUFFRCxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO2dCQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDckMsSUFBSSxFQUFFLElBQUk7aUJBQ1gsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsaUJBQWlCO2dCQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0QsSUFDRSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7UUFDekIsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQ2xELENBQUMsb0JBQW9CLENBQUMsTUFBTTtZQUMxQixPQUFPLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsRUFDbkQ7UUFDQSxJQUFJLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTO1lBQzFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1FBQzlDLElBQUksb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVM7WUFDM0MsUUFBUSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ2Y7SUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN2QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDakM7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIn0=