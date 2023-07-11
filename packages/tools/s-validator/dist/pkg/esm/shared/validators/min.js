// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import __en from '../i18n/en.js';
export const definition = {
    description: 'Validate string, array, object and number using the "min" rule',
    type: 'String|Array|Object|Number',
};
export default function min(value, n, settings) {
    var _a, _b, _c, _d;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.min,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    switch (true) {
        case typeof value === 'string':
            if (finalSettings.trim) {
                value = value.trim();
            }
            valid = value.length >= n;
            message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string.replace('%n', n);
            break;
        case typeof value === 'number':
            valid = value >= n;
            message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.number.replace('%n', n);
            break;
        case Array.isArray(value):
            valid = value.length >= n;
            message = (_c = finalSettings.i18n) === null || _c === void 0 ? void 0 : _c.array.replace('%n', n);
            break;
        case typeof value === 'object':
            valid = Object.keys(value).length >= n;
            message = (_d = finalSettings.i18n) === null || _d === void 0 ? void 0 : _d.object.replace('%n', n);
            break;
        default:
            throw new Error(`Sorry but the "min" validation only works with string, number, array or object values.`);
            break;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLekQsT0FBTyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBOENqQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUNQLGdFQUFnRTtJQUNwRSxJQUFJLEVBQUUsNEJBQTRCO0NBQ3JDLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLEdBQUcsQ0FDdkIsS0FBVSxFQUNWLENBQVMsRUFDVCxRQUEwQzs7SUFFMUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUEyQixXQUFXLENBQ3JEO1FBQ0ksSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLFFBQVEsSUFBSSxFQUFFO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtnQkFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtZQUNELEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ25CLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU07UUFDVixLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDdkMsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTTtRQUNWO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FDWCx3RkFBd0YsQ0FDM0YsQ0FBQztZQUNGLE1BQU07S0FDYjtJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=