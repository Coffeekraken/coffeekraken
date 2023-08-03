// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import __en from '../i18n/en.js';
export const definition = {
    description: 'Make sure a value has been provided',
    type: 'Boolean',
};
export default function required(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.required,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }
    valid = value !== undefined && value !== null && value !== '';
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.default;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLekQsT0FBTyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBb0NqQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLHFDQUFxQztJQUNsRCxJQUFJLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRLENBQzVCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUEyQzs7SUFFM0MsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUE0QixXQUFXLENBQ3REO1FBQ0ksSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRO1FBQ25CLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ2pELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUM7SUFFOUQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE9BQU8sQ0FBQztLQUN6QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=