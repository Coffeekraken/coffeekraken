// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import __en from '../i18n/en.js';
export const definition = {
    description: 'Validate string, array, object and number using the "max" rule',
    type: 'Number',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLekQsT0FBTyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBOENqQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUNQLGdFQUFnRTtJQUNwRSxJQUFJLEVBQUUsUUFBUTtDQUNqQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxHQUFHLENBQ3ZCLEtBQVUsRUFDVixDQUFTLEVBQ1QsUUFBeUM7O0lBRXpDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBMEIsV0FBVyxDQUNwRDtRQUNJLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRztRQUNkLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixRQUFRLElBQUksRUFBRTtRQUNWLEtBQUssT0FBTyxLQUFLLEtBQUssUUFBUTtZQUMxQixJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7WUFDRCxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDMUIsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTTtRQUNWLEtBQUssT0FBTyxLQUFLLEtBQUssUUFBUTtZQUMxQixLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUNuQixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNO1FBQ1YsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDMUIsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTTtRQUNWLEtBQUssT0FBTyxLQUFLLEtBQUssUUFBUTtZQUMxQixLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU07UUFDVjtZQUNJLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0ZBQXdGLENBQzNGLENBQUM7WUFDRixNQUFNO0tBQ2I7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQyJ9