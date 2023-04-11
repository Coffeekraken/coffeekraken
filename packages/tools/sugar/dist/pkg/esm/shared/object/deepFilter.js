// @ts-nocheck
import __isPlainObject from '../is/isPlainObject';
function processValue(key, value, filter, settings) {
    const newObj = {}, keys = Object.keys(object);
    if (settings.array && Array.isArray(value)) {
        for (let [i, item] of value.entries()) {
            processValue(i, item);
        }
    }
    else if (__isPlainObject(value)) {
        for (let [k, v] of Object.entries(value)) {
            processValue(k, v);
        }
    }
    else {
        // pass the property in the filter function
        const res = filter({
            key,
            value,
        });
    }
    // loop on the object keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        let value = object[key];
        if (__isPlainObject(value)) {
            processValue(value, filter, settings);
        }
        else if (settings.array && Array.isArray(value)) {
        }
        // pass the property in the filter function
        const res = filter({
            key,
            value,
            isObject: __isPlainObject(value),
        });
        // true mean: we keep this totally
        if (res === true) {
            if (__isPlainObject(value)) {
                (newObj[key] = settings.cloneFirst
                    ? Object.assign({}, value)
                    : value),
                    filter,
                    settings;
            }
            else {
                newObj[key] = value;
            }
        }
        else if (res === undefined) {
            if (__isPlainObject(value)) {
                newObj[key] = settings.cloneFirst
                    ? processValue(Object.assign({}, value), filter, settings)
                    : processValue(value, filter, settings);
            }
            else {
                newObj[key] = value;
            }
        }
        // false mean: we do not keep this
        else if (res === false) {
            continue;
        }
    }
    return newObj;
}
export default function __deepFilter(object, filter, settings) {
    settings = Object.assign({ cloneFirst: true }, (settings !== null && settings !== void 0 ? settings : {}));
    return processValue(settings.cloneFirst ? Object.assign({}, object) : object, filter, settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQXlEbEQsU0FBUyxZQUFZLENBQ2pCLEdBQVEsRUFDUixLQUFVLEVBQ1YsTUFBeUIsRUFDekIsUUFBNkI7SUFFN0IsTUFBTSxNQUFNLEdBQUcsRUFBRSxFQUNiLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRS9CLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hDLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QjtLQUNKO1NBQU0sSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0QjtLQUNKO1NBQU07UUFDSCwyQ0FBMkM7UUFDM0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ2YsR0FBRztZQUNILEtBQUs7U0FDUixDQUFDLENBQUM7S0FDTjtJQUVELDBCQUEwQjtJQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7U0FDbEQ7UUFFRCwyQ0FBMkM7UUFDM0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ2YsR0FBRztZQUNILEtBQUs7WUFDTCxRQUFRLEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQztTQUNuQyxDQUFDLENBQUM7UUFFSCxrQ0FBa0M7UUFDbEMsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2QsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxVQUFVO29CQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO29CQUMxQixDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNSLE1BQU07b0JBQ04sUUFBUSxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDdkI7U0FDSjthQUFNLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUMxQixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxVQUFVO29CQUM3QixDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7b0JBQzFELENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUMvQztpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1NBQ0o7UUFDRCxrQ0FBa0M7YUFDN0IsSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO1lBQ3BCLFNBQVM7U0FDWjtLQUNKO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUNoQyxNQUFXLEVBQ1gsTUFBeUIsRUFDekIsUUFBdUM7SUFFdkMsUUFBUSxtQkFDSixVQUFVLEVBQUUsSUFBSSxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFDRixPQUFPLFlBQVksQ0FDZixRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUN4RCxNQUFNLEVBQ04sUUFBUSxDQUNYLENBQUM7QUFDTixDQUFDIn0=