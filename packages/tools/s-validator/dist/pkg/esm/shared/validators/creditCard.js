// @ts-nocheck
import { __isCreditCard } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
export const definition = {
    description: 'Validate a credit card string',
    type: 'Boolean',
};
export default function creditCard(value, validatorValue, settings) {
    var _a, _b;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.creditCard,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        return {
            valid: false,
            message: finalSettings.i18n.default,
        };
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = __isCreditCard(value);
    if (!valid) {
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.default;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBd0N6RCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLCtCQUErQjtJQUM1QyxJQUFJLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQzlCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUFnRDs7SUFFaEQsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUFpQyxXQUFXLENBQzNEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsVUFBVTtRQUNoQyxJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTztTQUN0QyxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE9BQU8sQ0FBQztLQUN6QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=