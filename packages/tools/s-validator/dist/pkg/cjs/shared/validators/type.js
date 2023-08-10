"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
exports.definition = {
    description: 'Validate a specific type',
    type: 'String',
    values: ['string', 'number', 'boolean', 'integer', 'array', 'object'],
};
function number(value, type, settings) {
    var _a, _b;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
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
            valid = (0, is_1.__isInteger)(value);
            break;
        case 'number':
            valid = typeof value === 'number';
            break;
        case 'string':
            valid = typeof value === 'string';
            break;
        case 'object':
            valid = (0, is_1.__isPlainObject)(value);
            break;
        case 'checkbox':
        case 'select':
            valid = (0, is_1.__isPlainObject)(value) && value.id;
            console.log('VALUID', value);
            break;
        case 'image':
            valid = (0, is_1.__isPlainObject)(value) && value.url;
            break;
        case 'video':
            valid =
                (0, is_1.__isPlainObject)(value) &&
                    value.sources &&
                    (value.sources.webm || value.sources.mp4 || value.sources.ogg);
            break;
        case 'datetime':
            valid =
                (0, is_1.__isPlainObject)(value) &&
                    value.iso &&
                    value.value &&
                    value.format;
            break;
        case 'link':
            valid = (0, is_1.__isPlainObject)(value) && value.text && value.url;
            break;
        case 'color':
            valid =
                (0, is_1.__isPlainObject)(value) &&
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
exports.default = number;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCwrQ0FBc0U7QUFDdEUsdURBQXlEO0FBeUM1QyxRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsMEJBQTBCO0lBQ3ZDLElBQUksRUFBRSxRQUFRO0lBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDeEUsQ0FBQztBQUVGLFNBQXdCLE1BQU0sQ0FDMUIsS0FBVSxFQUNWLElBQVksRUFDWixRQUEwQzs7SUFFMUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUEyQixJQUFBLG9CQUFXLEVBQ3JEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsSUFBSTtLQUM3QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ3hCLEtBQUssT0FBTztZQUNSLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixLQUFLLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO1lBQzFDLE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixLQUFLLEdBQUcsSUFBQSxnQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxLQUFLLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO1lBQ2xDLE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxLQUFLLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO1lBQ2xDLE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxLQUFLLEdBQUcsSUFBQSxvQkFBZSxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLE1BQU07UUFDVixLQUFLLFVBQVUsQ0FBQztRQUNoQixLQUFLLFFBQVE7WUFDVCxLQUFLLEdBQUcsSUFBQSxvQkFBZSxFQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0IsTUFBTTtRQUNWLEtBQUssT0FBTztZQUNSLEtBQUssR0FBRyxJQUFBLG9CQUFlLEVBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUM1QyxNQUFNO1FBQ1YsS0FBSyxPQUFPO1lBQ1IsS0FBSztnQkFDRCxJQUFBLG9CQUFlLEVBQUMsS0FBSyxDQUFDO29CQUN0QixLQUFLLENBQUMsT0FBTztvQkFDYixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkUsTUFBTTtRQUNWLEtBQUssVUFBVTtZQUNYLEtBQUs7Z0JBQ0QsSUFBQSxvQkFBZSxFQUFDLEtBQUssQ0FBQztvQkFDdEIsS0FBSyxDQUFDLEdBQUc7b0JBQ1QsS0FBSyxDQUFDLEtBQUs7b0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNqQixNQUFNO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsS0FBSyxHQUFHLElBQUEsb0JBQWUsRUFBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDMUQsTUFBTTtRQUNWLEtBQUssT0FBTztZQUNSLEtBQUs7Z0JBQ0QsSUFBQSxvQkFBZSxFQUFDLEtBQUssQ0FBQztvQkFDdEIsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUs7d0JBQ25CLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTTt3QkFDdkIsS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLO3dCQUN0QixLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU07d0JBQ3ZCLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSzt3QkFDdEIsS0FBSyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7b0JBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDaEIsTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE9BQU8sQ0FBQyxPQUFPLENBQ3pDLE9BQU8sRUFDUCxhQUFhLENBQUMsSUFBSSxDQUNyQixDQUFDO0tBQ0w7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQWpGRCx5QkFpRkMifQ==