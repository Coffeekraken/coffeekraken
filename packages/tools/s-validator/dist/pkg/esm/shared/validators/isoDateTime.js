// @ts-nocheck
import { __isIsoDateTime } from '@coffeekraken/sugar/is';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sWUFBWSxDQUFDO0FBMEM5QixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLDZCQUE2QjtJQUMxQyxJQUFJLEVBQUUsUUFBUTtDQUNqQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLEtBQVUsRUFDVixRQUFpRDs7SUFFakQsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUFrQyxXQUFXLENBQzVEO1FBQ0ksSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO1FBQ3RCLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUNYLCtEQUErRCxDQUNsRSxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQztLQUN4QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=