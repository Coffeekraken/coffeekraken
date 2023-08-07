// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
export const definition = {
    description: 'Validate an positive number',
    type: 'Boolean',
};
export default function positive(value, validatorValue, settings) {
    var _a, _b;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.positive,
        cast: true,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string' && typeof value !== 'number') {
        return {
            valid: false,
            message: finalSettings.i18n.default,
        };
    }
    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }
    if (typeof value === 'string' && finalSettings.cast) {
        value = Number(value);
    }
    if (isNaN(value)) {
        valid = false;
    }
    else {
        valid = value >= 0;
    }
    if (!valid) {
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.default;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUEyQ3pELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsNkJBQTZCO0lBQzFDLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FDNUIsS0FBVSxFQUNWLGNBQXVCLEVBQ3ZCLFFBQThDOztJQUU5QyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQStCLFdBQVcsQ0FDekQ7UUFDSSxJQUFJLEVBQUUsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSwwQ0FBRSxRQUFRO1FBQzlCLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN4RCxPQUFPO1lBQ0gsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPO1NBQ3RDLENBQUM7S0FDTDtJQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDakQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDakQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6QjtJQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2QsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUNqQjtTQUFNO1FBQ0gsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7S0FDdEI7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsT0FBTyxDQUFDO0tBQ3pDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUMifQ==