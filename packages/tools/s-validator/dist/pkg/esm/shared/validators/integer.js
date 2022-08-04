// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
export const definition = {
    description: 'Validate an integer',
    type: 'number',
};
export default function integer(value, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.integer,
        cast: true,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error(`Sorry but the "integer" validation only works with string and number`);
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
        valid = Number.isInteger(value);
    }
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUt0RSxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUF3QzlCLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUscUJBQXFCO0lBQ2xDLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FDM0IsS0FBVSxFQUNWLFFBQTZDOztJQUU3QyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQThCLFdBQVcsQ0FDeEQ7UUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU87UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3hELE1BQU0sSUFBSSxLQUFLLENBQ1gsc0VBQXNFLENBQ3pFLENBQUM7S0FDTDtJQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDakQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDakQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6QjtJQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2QsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUNqQjtTQUFNO1FBQ0gsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDO0tBQ3hDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUMifQ==