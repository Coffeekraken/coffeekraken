"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
function __deepClean(objectOrArray, settings) {
    settings = Object.assign({ array: true, clone: false, cleaner(value) {
            if (value === undefined || value === null || value === '') {
                return false;
            }
            if ((0, isPlainObject_1.default)(value) && !Object.keys(value).length) {
                return false;
            }
            return true;
        } }, (settings !== null && settings !== void 0 ? settings : {}));
    let workingObj;
    if (settings.clone) {
        workingObj = Array.isArray(objectOrArray)
            ? [...objectOrArray]
            : Object.assign({}, objectOrArray);
    }
    else {
        workingObj = objectOrArray;
    }
    if (settings.array && Array.isArray(objectOrArray)) {
        for (let [i, v] of objectOrArray.entries()) {
            if ((0, isPlainObject_1.default)(v) || Array.isArray(v)) {
                workingObj[i] = __deepClean(v, settings);
            }
            if (!settings.cleaner(workingObj[i])) {
                workingObj.splice(workingObj.indexOf(v), 1);
            }
        }
    }
    else if ((0, isPlainObject_1.default)(objectOrArray)) {
        for (let [k, v] of Object.entries(objectOrArray)) {
            if ((0, isPlainObject_1.default)(v) || Array.isArray(v)) {
                workingObj[k] = __deepClean(v, settings);
            }
            if (!settings.cleaner(workingObj[k])) {
                delete workingObj[k];
            }
        }
    }
    return workingObj;
}
exports.default = __deepClean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFrRDtBQTZDbEQsU0FBd0IsV0FBVyxDQUMvQixhQUFrQixFQUNsQixRQUE2QjtJQUU3QixRQUFRLG1CQUNKLEtBQUssRUFBRSxJQUFJLEVBQ1gsS0FBSyxFQUFFLEtBQUssRUFDWixPQUFPLENBQUMsS0FBSztZQUNULElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsSUFBSSxJQUFBLHVCQUFlLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDdEQsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLElBQ0UsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksVUFBVSxDQUFDO0lBQ2YsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2hCLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDMUM7U0FBTTtRQUNILFVBQVUsR0FBRyxhQUFhLENBQUM7S0FDOUI7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNoRCxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBQSx1QkFBZSxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMvQztTQUNKO0tBQ0o7U0FBTSxJQUFJLElBQUEsdUJBQWUsRUFBQyxhQUFhLENBQUMsRUFBRTtRQUN2QyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM5QyxJQUFJLElBQUEsdUJBQWUsRUFBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN4QyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM1QztZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QjtTQUNKO0tBQ0o7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBakRELDhCQWlEQyJ9