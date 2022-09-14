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
        array: false,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXVDO0FBQ3ZDLHdFQUFrRDtBQUNsRCxvREFBOEI7QUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUF3QixZQUFZLENBQUMsWUFBWSxFQUFFLEdBQUcsT0FBTztJQUN6RCw2QkFBNkI7SUFDN0IscUNBQXFDO0lBQ3JDLE1BQU07SUFDTix1QkFBdUI7SUFFdkIsTUFBTSxRQUFRLEdBQUc7UUFDYixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxJQUFJO1FBQ1osV0FBVyxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLFNBQVMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVO1FBQzdCLHFCQUFxQjtRQUNyQixnREFBZ0Q7UUFDaEQsNENBQTRDO1FBQzVDLHlDQUF5QztRQUN6QyxxQ0FBcUM7UUFDckMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZDLGlCQUFpQjtZQUNqQixJQUNJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2hDO2dCQUNFLE1BQU0sUUFBUSxHQUFHLElBQUEsZ0JBQVEsRUFBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsU0FBUzthQUNaO1lBRUQsa0JBQWtCO1lBQ2xCLElBQ0ksUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO2dCQUN4QixJQUFBLHVCQUFlLEVBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixJQUFBLHVCQUFlLEVBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2xDO2dCQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxTQUFTO2FBQ1o7WUFFRCxJQUFJLElBQUEsdUJBQWUsRUFBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO2dCQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBQSxlQUFPLEVBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxJQUFJLEVBQUUsSUFBSTtpQkFDYixDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxpQkFBaUI7Z0JBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakM7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvRCxJQUNJLENBQUMsb0JBQW9CLENBQUMsS0FBSztRQUN2QixPQUFPLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7UUFDcEQsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO1lBQ3hCLE9BQU8sb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxFQUN2RDtRQUNFLElBQUksb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVM7WUFDeEMsUUFBUSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssU0FBUztZQUN6QyxRQUFRLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztRQUNsRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDakI7SUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDbkM7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBeEVELCtCQXdFQyJ9