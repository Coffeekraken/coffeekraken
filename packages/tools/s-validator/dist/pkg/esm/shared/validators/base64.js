// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __isBase64 } from '@coffeekraken/sugar/is';
export const definition = {
    description: 'Validate a base64 string',
    type: 'Boolean',
};
export default function alphanum(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: settings.i18n.base64,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        return {
            valid: false,
            message: (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.default,
        };
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    const isBase64 = __isBase64(value);
    if (!isBase64) {
        message = finalSettings.i18n.default;
    }
    return {
        valid: isBase64,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBcUNwRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLDBCQUEwQjtJQUN2QyxJQUFJLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRLENBQzVCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUE0Qzs7SUFFNUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUE2QixXQUFXLENBQ3ZEO1FBQ0ksSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUMxQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsT0FBTztTQUN2QyxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVuQyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ1gsT0FBTyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3hDO0lBRUQsT0FBTztRQUNILEtBQUssRUFBRSxRQUFRO1FBQ2YsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=