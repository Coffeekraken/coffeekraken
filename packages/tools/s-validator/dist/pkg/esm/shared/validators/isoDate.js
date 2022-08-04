// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
import __isIsoDate from '@coffeekraken/sugar/shared/is/isoDate';
export const definition = {
    description: 'Validate an iso date string',
    type: 'String',
};
export default function isoDate(value, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.isoDate,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "isoDate" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = __isIsoDate(value);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUt0RSxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFDOUIsT0FBTyxXQUFXLE1BQU0sdUNBQXVDLENBQUM7QUFzQ2hFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsNkJBQTZCO0lBQzFDLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FDM0IsS0FBVSxFQUNWLFFBQTZDOztJQUU3QyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQThCLFdBQVcsQ0FDeEQ7UUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU87UUFDbEIsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ1gsMkRBQTJELENBQzlELENBQUM7S0FDTDtJQUVELElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtRQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCO0lBRUQsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzQixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDO0tBQ3hDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUMifQ==