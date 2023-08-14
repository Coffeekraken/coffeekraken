// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __isUrl } from '@coffeekraken/sugar/is';
export const definition = {
    description: 'Make sure the provided value is a valid url',
    type: 'Boolean',
};
export default function url(value, validatorValue, settings) {
    var _a, _b, _c;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.url,
        trim: true,
        secure: false,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }
    valid = __isUrl(value);
    if (!valid) {
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.default;
    }
    if (valid && finalSettings.secure) {
        if (!value.match(/^https:\/\//)) {
            valid = false;
            message = (_c = finalSettings.i18n) === null || _c === void 0 ? void 0 : _c.secure;
        }
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBdUNqRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLDZDQUE2QztJQUMxRCxJQUFJLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxHQUFHLENBQ3ZCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUF5Qzs7SUFFekMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUEwQixXQUFXLENBQ3BEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsR0FBRztRQUN6QixJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxLQUFLO0tBQ2hCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtRQUNqRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCO0lBRUQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsT0FBTyxDQUFDO0tBQ3pDO0lBRUQsSUFBSSxLQUFLLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM3QixLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2QsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQyJ9