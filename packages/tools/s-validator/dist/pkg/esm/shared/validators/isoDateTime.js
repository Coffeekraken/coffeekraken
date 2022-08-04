// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
import __isIsoDateTime from '@coffeekraken/sugar/shared/is/isoDateTime';
export const definition = {
    description: 'Validate an iso date string',
    type: 'String',
};
export default function isoDateTime(value, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.isoDateTime,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "isoDateTime" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = __isIsoDateTime(value);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUt0RSxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFDOUIsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFzQ3hFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsNkJBQTZCO0lBQzFDLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsS0FBVSxFQUNWLFFBQWlEOztJQUVqRCxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQWtDLFdBQVcsQ0FDNUQ7UUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7UUFDdEIsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ1gsK0RBQStELENBQ2xFLENBQUM7S0FDTDtJQUVELElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtRQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCO0lBRUQsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUvQixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDO0tBQ3hDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUMifQ==