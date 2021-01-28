"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plainObject_1 = __importDefault(require("../is/plainObject"));
const unique_1 = __importDefault(require("../array/unique"));
const clone_1 = __importDefault(require("./clone"));
/**
 * @name            deepAssign
 * @namespace       sugar.js.object
 * @type            Function
 *
 * This function take as first parameter the object you want to assign others to,
 * then others objects you want to assign to the first.
 * The difference with the ```deepMerge``` function is that this one keep the first
 * passed object as reference and update it directly. The ```deepMerge``` one create a new
 * object with the merging result
 *
 * @param       {Object}          referenceObj          The object you want to assign the others in
 * @param       {Object}          ...objects            Some objects you want to assign in the first one
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
function deepAssign(referenceObj, ...objects) {
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
                const newArray = unique_1.default([...refObj[key], ...mixWithObj[key]]);
                refObj[key] = newArray;
                continue;
            }
            // merging objects
            if (settings.object === true &&
                plainObject_1.default(refObj[key]) &&
                plainObject_1.default(mixWithObj[key])) {
                refObj[key] = merge(refObj[key], mixWithObj[key]);
                continue;
            }
            if (plainObject_1.default(mixWithObj[key]) && settings.cloneChilds) {
                refObj[key] = clone_1.default(mixWithObj[key], {
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
exports.default = deepAssign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcEFzc2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBBc3NpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvRUFBZ0Q7QUFDaEQsNkRBQXVDO0FBQ3ZDLG9EQUE4QjtBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxPQUFPO0lBQ3pELDZCQUE2QjtJQUM3QixxQ0FBcUM7SUFDckMsTUFBTTtJQUNOLHVCQUF1QjtJQUV2QixNQUFNLFFBQVEsR0FBRztRQUNmLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLElBQUk7UUFDWixXQUFXLEVBQUUsSUFBSTtLQUNsQixDQUFDO0lBRUYsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVU7UUFDL0IscUJBQXFCO1FBQ3JCLGdEQUFnRDtRQUNoRCw0Q0FBNEM7UUFDNUMseUNBQXlDO1FBQ3pDLHFDQUFxQztRQUNyQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDekMsaUJBQWlCO1lBQ2pCLElBQ0UsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDOUI7Z0JBQ0EsTUFBTSxRQUFRLEdBQUcsZ0JBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsU0FBUzthQUNWO1lBRUQsa0JBQWtCO1lBQ2xCLElBQ0UsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO2dCQUN4QixxQkFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIscUJBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDaEM7Z0JBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELFNBQVM7YUFDVjtZQUVELElBQUkscUJBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO2dCQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDckMsSUFBSSxFQUFFLElBQUk7aUJBQ1gsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsaUJBQWlCO2dCQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0QsSUFDRSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7UUFDekIsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQ2xELENBQUMsb0JBQW9CLENBQUMsTUFBTTtZQUMxQixPQUFPLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsRUFDbkQ7UUFDQSxJQUFJLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTO1lBQzFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1FBQzlDLElBQUksb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVM7WUFDM0MsUUFBUSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ2Y7SUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN2QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDakM7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBeEVELDZCQXdFQyJ9