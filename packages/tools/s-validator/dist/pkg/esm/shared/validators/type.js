// @ts-nocheck
import { __isInteger, __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
export const definition = {
    description: 'Validate a specific type',
    type: 'String',
    values: ['string', 'number', 'boolean', 'integer', 'array', 'object'],
};
export default function number(value, type, settings) {
    var _a, _b;
    let message, valid;
    const finalSettings = __deepMerge({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.type,
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
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.default.replace('%type', finalSettings.type);
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQXlDekQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHO0lBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7SUFDdkMsSUFBSSxFQUFFLFFBQVE7SUFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztDQUN4RSxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQzFCLEtBQVUsRUFDVixJQUFZLEVBQ1osUUFBMEM7O0lBRTFDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBMkIsV0FBVyxDQUNyRDtRQUNJLElBQUksRUFBRSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLDBDQUFFLElBQUk7S0FDN0IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUN4QixLQUFLLE9BQU87WUFDUixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsS0FBSyxHQUFHLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQztZQUMxQyxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUNsQyxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUNsQyxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsT0FBTyxDQUFDLE9BQU8sQ0FDekMsT0FBTyxFQUNQLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLENBQUM7S0FDTDtJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=