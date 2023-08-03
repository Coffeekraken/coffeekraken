// @ts-nocheck
import { __isInteger, __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __en from '../i18n/en.js';
export const definition = {
    description: 'Validate a specific type',
    type: 'String',
    values: ['string', 'number', 'boolean', 'integer', 'array', 'object'],
};
export default function number(value, type, settings) {
    var _a;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: __en.type,
    }, settings !== null && settings !== void 0 ? settings : {});
    switch (type.toLowerCase()) {
        case 'array':
            valid = Array.isArray(value);
            break;
        case 'boolean':
            valid = value === true || value === false;
            break;
        case 'integer':
            valid = __isInteger(value);
            break;
        case 'number':
            valid = typeof value === 'number';
            break;
        case 'string':
            valid = typeof value === 'string';
            break;
        case 'object':
            valid = __isPlainObject(value);
            break;
    }
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string.replace('%type', finalSettings.type);
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUt6RCxPQUFPLElBQUksTUFBTSxlQUFlLENBQUM7QUFxQ2pDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsMEJBQTBCO0lBQ3ZDLElBQUksRUFBRSxRQUFRO0lBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDeEUsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUMxQixLQUFVLEVBQ1YsSUFBWSxFQUNaLFFBQTBDOztJQUUxQyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQTJCLFdBQVcsQ0FDckQ7UUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7S0FDbEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUN4QixLQUFLLE9BQU87WUFDUixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsS0FBSyxHQUFHLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQztZQUMxQyxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUNsQyxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUNsQyxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDeEMsT0FBTyxFQUNQLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLENBQUM7S0FDTDtJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=