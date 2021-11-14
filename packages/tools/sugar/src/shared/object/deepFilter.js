// @ts-nocheck
import __isPlainObject from '../is/plainObject';
function processObj(object, filter, settings) {
    const newObj = {}, keys = Object.keys(object);
    // loop on the object keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];
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
                    ? processObj(Object.assign({}, value), filter, settings)
                    : processObj(value, filter, settings);
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
function deepFilter(object, filter, settings) {
    settings = Object.assign({ cloneFirst: true }, (settings !== null && settings !== void 0 ? settings : {}));
    return processObj(settings.cloneFirst ? Object.assign({}, object) : object, filter, settings);
}
export default deepFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcEZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBbURoRCxTQUFTLFVBQVUsQ0FBQyxNQUFXLEVBQUUsTUFBeUIsRUFBRSxRQUFRO0lBQ2hFLE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFDYixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUvQiwwQkFBMEI7SUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQiwyQ0FBMkM7UUFDM0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ2YsR0FBRztZQUNILEtBQUs7WUFDTCxRQUFRLEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQztTQUNuQyxDQUFDLENBQUM7UUFFSCxrQ0FBa0M7UUFDbEMsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2QsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxVQUFVO29CQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO29CQUMxQixDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNSLE1BQU07b0JBQ04sUUFBUSxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDdkI7U0FDSjthQUFNLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUMxQixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxVQUFVO29CQUM3QixDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM3QztpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1NBQ0o7UUFDRCxrQ0FBa0M7YUFDN0IsSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO1lBQ3BCLFNBQVM7U0FDWjtLQUNKO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUNmLE1BQVcsRUFDWCxNQUF5QixFQUN6QixRQUF1QztJQUV2QyxRQUFRLG1CQUNKLFVBQVUsRUFBRSxJQUFJLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUNGLE9BQU8sVUFBVSxDQUNiLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQ3hELE1BQU0sRUFDTixRQUFRLENBQ1gsQ0FBQztBQUNOLENBQUM7QUFDRCxlQUFlLFVBQVUsQ0FBQyJ9