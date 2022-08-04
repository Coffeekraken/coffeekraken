// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
import __isCreditCard from '@coffeekraken/sugar/shared/is/creditCard';
export const definition = {
    description: 'Validate a credit card string',
    type: 'String',
};
export default function creditCard(value, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.creditCard,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "creditCard" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = __isCreditCard(value);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUt0RSxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFDOUIsT0FBTyxjQUFjLE1BQU0sMENBQTBDLENBQUM7QUFvQ3RFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsK0JBQStCO0lBQzVDLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FDOUIsS0FBVSxFQUNWLFFBQTJDOztJQUUzQyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQTRCLFdBQVcsQ0FDdEQ7UUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7UUFDckIsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ1gsOERBQThELENBQ2pFLENBQUM7S0FDTDtJQUVELElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtRQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCO0lBRUQsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU5QixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDO0tBQ3hDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUMifQ==