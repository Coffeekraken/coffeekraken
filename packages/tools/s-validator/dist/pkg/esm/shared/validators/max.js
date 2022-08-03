// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
export const definition = {
    description: 'Validate string, array, object and number using the "max" rule',
    type: 'String|Array|Object|Number',
};
export default function max(value, n, settings) {
    var _a, _b, _c, _d;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.max,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    switch (true) {
        case typeof value === 'string':
            if (finalSettings.trim) {
                value = value.trim();
            }
            valid = value.length <= n;
            message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string.replace('%n', n);
            break;
        case typeof value === 'number':
            valid = value <= n;
            message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.number.replace('%n', n);
            break;
        case Array.isArray(value):
            valid = value.length <= n;
            message = (_c = finalSettings.i18n) === null || _c === void 0 ? void 0 : _c.array.replace('%n', n);
            break;
        case typeof value === 'object':
            valid = Object.keys(value).length <= n;
            message = (_d = finalSettings.i18n) === null || _d === void 0 ? void 0 : _d.object.replace('%n', n);
            break;
        default:
            throw new Error(`Sorry but the "max" validation only works with string, number, array or object values.`);
            break;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUt0RSxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUE4QzlCLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQ1AsZ0VBQWdFO0lBQ3BFLElBQUksRUFBRSw0QkFBNEI7Q0FDckMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsR0FBRyxDQUN2QixLQUFVLEVBQ1YsQ0FBUyxFQUNULFFBQXlDOztJQUV6QyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQTBCLFdBQVcsQ0FDcEQ7UUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7UUFDZCxJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsUUFBUSxJQUFJLEVBQUU7UUFDVixLQUFLLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFDMUIsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO2dCQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQzFCLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU07UUFDVixLQUFLLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFDMUIsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDbkIsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTTtRQUNWLEtBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDckIsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQzFCLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU07UUFDVixLQUFLLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFDMUIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUN2QyxPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNO1FBQ1Y7WUFDSSxNQUFNLElBQUksS0FBSyxDQUNYLHdGQUF3RixDQUMzRixDQUFDO1lBQ0YsTUFBTTtLQUNiO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUMifQ==