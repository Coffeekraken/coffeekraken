import __isPlainObject from '../is/plainObject';
import __camelCase from '../string/camelCase';
export default function camelCaseProps(object, settings) {
    const finalSettings = Object.assign({ deep: true }, (settings !== null && settings !== void 0 ? settings : {}));
    for (let [key, value] of Object.entries(object)) {
        const newKey = __camelCase(key);
        // treat deep
        if (__isPlainObject(value) && finalSettings.deep) {
            object[newKey] = camelCaseProps(object[key], finalSettings);
        }
        else {
            object[newKey] = value;
        }
        // delete old key if needed
        if (newKey !== key) {
            delete object[key];
        }
    }
    return object;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBZ0M5QyxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FDbEMsTUFBVyxFQUNYLFFBQTJDO0lBRTNDLE1BQU0sYUFBYSxtQkFDZixJQUFJLEVBQUUsSUFBSSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM3QyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEMsYUFBYTtRQUNiLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDL0Q7YUFBTTtZQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFFRCwyQkFBMkI7UUFDM0IsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ2hCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO0tBQ0o7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=