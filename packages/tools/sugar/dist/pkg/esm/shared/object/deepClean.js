// @ts-nocheck
import __isPlainObject from '../is/isPlainObject.js';
export default function __deepClean(objectOrArray, settings) {
    settings = Object.assign({ array: true, clone: false, cleaner(value) {
            if (value === undefined || value === null || value === '') {
                return false;
            }
            if (__isPlainObject(value) && !Object.keys(value).length) {
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
            if (__isPlainObject(v) || Array.isArray(v)) {
                workingObj[i] = __deepClean(v, settings);
            }
            if (!settings.cleaner(workingObj[i])) {
                workingObj.splice(workingObj.indexOf(v), 1);
            }
        }
    }
    else if (__isPlainObject(objectOrArray)) {
        for (let [k, v] of Object.entries(objectOrArray)) {
            if (__isPlainObject(v) || Array.isArray(v)) {
                workingObj[k] = __deepClean(v, settings);
            }
            if (!settings.cleaner(workingObj[k])) {
                delete workingObj[k];
            }
        }
    }
    return workingObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQTZDckQsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLGFBQWtCLEVBQ2xCLFFBQTZCO0lBRTdCLFFBQVEsbUJBQ0osS0FBSyxFQUFFLElBQUksRUFDWCxLQUFLLEVBQUUsS0FBSyxFQUNaLE9BQU8sQ0FBQyxLQUFLO1lBQ1QsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtnQkFDdkQsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUN0RCxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsSUFDRSxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxVQUFVLENBQUM7SUFDZixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDaEIsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUMxQztTQUFNO1FBQ0gsVUFBVSxHQUFHLGFBQWEsQ0FBQztLQUM5QjtJQUVELElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ2hELEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDeEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9DO1NBQ0o7S0FDSjtTQUFNLElBQUksZUFBZSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3ZDLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzlDLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0o7S0FDSjtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUMifQ==