// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
export const definition = {
    description: 'Validate a hexadecimal string',
    type: 'String',
};
export default function hex(value, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.hex,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "hex" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = value.match(/^#[a-zA-Z0-9]{3,6}$/);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUF5QzlCLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsK0JBQStCO0lBQzVDLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLEdBQUcsQ0FDdkIsS0FBVSxFQUNWLFFBQXlDOztJQUV6QyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQTBCLFdBQVcsQ0FDcEQ7UUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7UUFDZCxJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FDWCx1REFBdUQsQ0FDMUQsQ0FBQztLQUNMO0lBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRTNDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUM7S0FDeEM7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQyJ9