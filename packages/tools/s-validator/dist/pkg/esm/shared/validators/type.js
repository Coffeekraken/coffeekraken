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
        case 'checkbox':
        case 'select':
            valid = __isPlainObject(value) && value.id;
            console.log('VALUID', value);
            break;
        case 'image':
            valid = __isPlainObject(value) && value.url;
            break;
        case 'video':
            valid =
                __isPlainObject(value) &&
                    value.sources &&
                    (value.sources.webm || value.sources.mp4 || value.sources.ogg);
            break;
        case 'datetime':
            valid =
                __isPlainObject(value) &&
                    value.iso &&
                    value.value &&
                    value.format;
            break;
        case 'link':
            valid = __isPlainObject(value) && value.text && value.url;
            break;
        case 'color':
            valid =
                __isPlainObject(value) &&
                    (value.format === 'hex' ||
                        value.format === 'hexa' ||
                        value.format === 'hsl' ||
                        value.format === 'hsla' ||
                        value.format === 'rgb' ||
                        value.format === 'rgba') &&
                    value.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQXlDekQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHO0lBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7SUFDdkMsSUFBSSxFQUFFLFFBQVE7SUFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztDQUN4RSxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQzFCLEtBQVUsRUFDVixJQUFZLEVBQ1osUUFBMEM7O0lBRTFDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBMkIsV0FBVyxDQUNyRDtRQUNJLElBQUksRUFBRSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLDBDQUFFLElBQUk7S0FDN0IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUN4QixLQUFLLE9BQU87WUFDUixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsS0FBSyxHQUFHLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQztZQUMxQyxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUNsQyxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUNsQyxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixNQUFNO1FBQ1YsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxRQUFRO1lBQ1QsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdCLE1BQU07UUFDVixLQUFLLE9BQU87WUFDUixLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDNUMsTUFBTTtRQUNWLEtBQUssT0FBTztZQUNSLEtBQUs7Z0JBQ0QsZUFBZSxDQUFDLEtBQUssQ0FBQztvQkFDdEIsS0FBSyxDQUFDLE9BQU87b0JBQ2IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLE1BQU07UUFDVixLQUFLLFVBQVU7WUFDWCxLQUFLO2dCQUNELGVBQWUsQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxHQUFHO29CQUNULEtBQUssQ0FBQyxLQUFLO29CQUNYLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDakIsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzFELE1BQU07UUFDVixLQUFLLE9BQU87WUFDUixLQUFLO2dCQUNELGVBQWUsQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLO3dCQUNuQixLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU07d0JBQ3ZCLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSzt3QkFDdEIsS0FBSyxDQUFDLE1BQU0sS0FBSyxNQUFNO3dCQUN2QixLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUs7d0JBQ3RCLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDO29CQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2hCLE1BQU07S0FDYjtJQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxPQUFPLENBQUMsT0FBTyxDQUN6QyxPQUFPLEVBQ1AsYUFBYSxDQUFDLElBQUksQ0FDckIsQ0FBQztLQUNMO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUMifQ==