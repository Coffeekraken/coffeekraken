"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
function __deepClean(objectOrArray, cleaner, settings) {
    settings = (0, deepMerge_1.default)({
        array: true,
        cloneFirst: false,
    }, settings !== null && settings !== void 0 ? settings : {});
    let workingObj;
    if (settings.cloneFirst) {
        workingObj = Array.isArray(objectOrArray)
            ? [...objectOrArray]
            : Object.assign({}, objectOrArray);
    }
    else {
        workingObj = objectOrArray;
    }
    if (!cleaner) {
        cleaner = function (value) {
            if (value === undefined || value === null || value === '') {
                return false;
            }
            if ((0, is_1.__isPlainObject)(value) && !Object.keys(value).length) {
                return false;
            }
            return true;
        };
    }
    if (settings.array && Array.isArray(objectOrArray)) {
        for (let [i, v] of objectOrArray.entries()) {
            if ((0, is_1.__isPlainObject)(v) || Array.isArray(v)) {
                workingObj[i] = __deepClean(v, cleaner, settings);
            }
            if (!cleaner(workingObj[i])) {
                workingObj.splice(workingObj.indexOf(v), 1);
            }
        }
    }
    else if ((0, is_1.__isPlainObject)(objectOrArray)) {
        for (let [k, v] of Object.entries(objectOrArray)) {
            if ((0, is_1.__isPlainObject)(v) || Array.isArray(v)) {
                workingObj[k] = __deepClean(v, cleaner, settings);
            }
            if (!cleaner(workingObj[k])) {
                delete workingObj[k];
            }
        }
    }
    return workingObj;
    // return __deepMap(objectOrArray, cleaner, settings);
}
exports.default = __deepClean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUF5RDtBQUN6RCxvRUFBOEM7QUE2QzlDLFNBQXdCLFdBQVcsQ0FDL0IsYUFBa0IsRUFDbEIsT0FBa0IsRUFDbEIsUUFBNkI7SUFFN0IsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxLQUFLO0tBQ3BCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxVQUFVLENBQUM7SUFDZixJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDckIsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUMxQztTQUFNO1FBQ0gsVUFBVSxHQUFHLGFBQWEsQ0FBQztLQUM5QjtJQUVELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDVixPQUFPLEdBQUcsVUFBVSxLQUFLO1lBQ3JCLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsSUFBSSxJQUFBLG9CQUFlLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDdEQsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUM7S0FDTDtJQUVELElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ2hELEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFBLG9CQUFlLEVBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDeEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9DO1NBQ0o7S0FDSjtTQUFNLElBQUksSUFBQSxvQkFBZSxFQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3ZDLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzlDLElBQUksSUFBQSxvQkFBZSxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNyRDtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0o7S0FDSjtJQUVELE9BQU8sVUFBVSxDQUFDO0lBRWxCLHNEQUFzRDtBQUMxRCxDQUFDO0FBekRELDhCQXlEQyJ9