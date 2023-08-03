// @ts-nocheck
import { __isEmail } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __en from '../i18n/en.js';
export const definition = {
    description: 'Validate an email string',
    type: 'Boolean',
};
export default function email(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.email,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "email" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = __isEmail(value);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBS3pELE9BQU8sSUFBSSxNQUFNLGVBQWUsQ0FBQztBQW9DakMsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHO0lBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7SUFDdkMsSUFBSSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUN6QixLQUFVLEVBQ1YsY0FBdUIsRUFDdkIsUUFBMkM7O0lBRTNDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBNEIsV0FBVyxDQUN0RDtRQUNJLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztRQUNoQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FDWCx5REFBeUQsQ0FDNUQsQ0FBQztLQUNMO0lBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXpCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUM7S0FDeEM7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQyJ9