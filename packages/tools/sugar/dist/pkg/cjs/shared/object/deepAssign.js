"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_1 = __importDefault(require("../array/unique"));
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
const clone_1 = __importDefault(require("./clone"));
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
function __deepAssign(referenceObj, ...objects) {
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
                const newArray = (0, unique_1.default)([...refObj[key], ...mixWithObj[key]]);
                refObj[key] = newArray;
                continue;
            }
            // merging objects
            if (settings.object === true &&
                (0, isPlainObject_1.default)(refObj[key]) &&
                (0, isPlainObject_1.default)(mixWithObj[key])) {
                refObj[key] = merge(refObj[key], mixWithObj[key]);
                continue;
            }
            if ((0, isPlainObject_1.default)(mixWithObj[key]) && settings.cloneChilds) {
                refObj[key] = (0, clone_1.default)(mixWithObj[key], {
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
exports.default = __deepAssign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXVDO0FBQ3ZDLHdFQUFrRDtBQUNsRCxvREFBOEI7QUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILFNBQXdCLFlBQVksQ0FBQyxZQUFZLEVBQUUsR0FBRyxPQUFPO0lBQ3pELDZCQUE2QjtJQUM3QixxQ0FBcUM7SUFDckMsTUFBTTtJQUNOLHVCQUF1QjtJQUV2QixNQUFNLFFBQVEsR0FBRztRQUNiLEtBQUssRUFBRSxJQUFJO1FBQ1gsTUFBTSxFQUFFLElBQUk7UUFDWixXQUFXLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVU7UUFDN0IscUJBQXFCO1FBQ3JCLGdEQUFnRDtRQUNoRCw0Q0FBNEM7UUFDNUMseUNBQXlDO1FBQ3pDLHFDQUFxQztRQUNyQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsaUJBQWlCO1lBQ2pCLElBQ0ksUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDaEM7Z0JBQ0UsTUFBTSxRQUFRLEdBQUcsSUFBQSxnQkFBUSxFQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO2dCQUN2QixTQUFTO2FBQ1o7WUFFRCxrQkFBa0I7WUFDbEIsSUFDSSxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUk7Z0JBQ3hCLElBQUEsdUJBQWUsRUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLElBQUEsdUJBQWUsRUFBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDbEM7Z0JBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELFNBQVM7YUFDWjtZQUVELElBQUksSUFBQSx1QkFBZSxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQzFELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFBLGVBQU8sRUFBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ25DLElBQUksRUFBRSxJQUFJO2lCQUNiLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILGlCQUFpQjtnQkFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQztTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9ELElBQ0ksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1FBQ3ZCLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztRQUNwRCxDQUFDLG9CQUFvQixDQUFDLE1BQU07WUFDeEIsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLEVBQ3ZEO1FBQ0UsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssU0FBUztZQUN4QyxRQUFRLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQ3pDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNqQjtJQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNuQztJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUF4RUQsK0JBd0VDIn0=