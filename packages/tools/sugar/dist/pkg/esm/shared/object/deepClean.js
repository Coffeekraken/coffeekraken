// @ts-nocheck
import { __isPlainObject } from '@coffeekraken/sugar/is';
import __deepMerge from '../object/deepMerge';
export default function __deepClean(objectOrArray, cleaner, settings) {
    settings = __deepMerge({
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
            if (__isPlainObject(value) && !Object.keys(value).length) {
                return false;
            }
            return true;
        };
    }
    if (settings.array && Array.isArray(objectOrArray)) {
        for (let [i, v] of objectOrArray.entries()) {
            if (__isPlainObject(v) || Array.isArray(v)) {
                workingObj[i] = __deepClean(v, cleaner, settings);
            }
            if (!cleaner(workingObj[i])) {
                workingObj.splice(workingObj.indexOf(v), 1);
            }
        }
    }
    else if (__isPlainObject(objectOrArray)) {
        for (let [k, v] of Object.entries(objectOrArray)) {
            if (__isPlainObject(v) || Array.isArray(v)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUE2QzlDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixhQUFrQixFQUNsQixPQUFrQixFQUNsQixRQUE2QjtJQUU3QixRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLEtBQUssRUFBRSxJQUFJO1FBQ1gsVUFBVSxFQUFFLEtBQUs7S0FDcEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLFVBQVUsQ0FBQztJQUNmLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNyQixVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0tBQzFDO1NBQU07UUFDSCxVQUFVLEdBQUcsYUFBYSxDQUFDO0tBQzlCO0lBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLE9BQU8sR0FBRyxVQUFVLEtBQUs7WUFDckIsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtnQkFDdkQsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUN0RCxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztLQUNMO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDaEQsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN4QyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN4QyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDckQ7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDL0M7U0FDSjtLQUNKO1NBQU0sSUFBSSxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDdkMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDeEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekIsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7U0FDSjtLQUNKO0lBRUQsT0FBTyxVQUFVLENBQUM7SUFFbEIsc0RBQXNEO0FBQzFELENBQUMifQ==