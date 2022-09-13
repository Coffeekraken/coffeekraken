// @ts-nocheck
import { __isCreditCard } from '@coffeekraken/sugar/is';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sWUFBWSxDQUFDO0FBd0M5QixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLCtCQUErQjtJQUM1QyxJQUFJLEVBQUUsUUFBUTtDQUNqQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQzlCLEtBQVUsRUFDVixRQUEyQzs7SUFFM0MsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUE0QixXQUFXLENBQ3REO1FBQ0ksSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO1FBQ3JCLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUNYLDhEQUE4RCxDQUNqRSxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQztLQUN4QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=