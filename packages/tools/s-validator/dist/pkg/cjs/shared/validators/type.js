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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCwrQ0FBc0U7QUFDdEUsdURBQXlEO0FBeUM1QyxRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsMEJBQTBCO0lBQ3ZDLElBQUksRUFBRSxRQUFRO0lBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDeEUsQ0FBQztBQUVGLFNBQXdCLE1BQU0sQ0FDMUIsS0FBVSxFQUNWLElBQVksRUFDWixRQUEwQzs7SUFFMUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUEyQixJQUFBLG9CQUFXLEVBQ3JEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsSUFBSTtLQUM3QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ3hCLEtBQUssT0FBTztZQUNSLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixLQUFLLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO1lBQzFDLE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixLQUFLLEdBQUcsSUFBQSxnQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxLQUFLLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO1lBQ2xDLE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxLQUFLLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO1lBQ2xDLE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxLQUFLLEdBQUcsSUFBQSxvQkFBZSxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLE1BQU07S0FDYjtJQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxPQUFPLENBQUMsT0FBTyxDQUN6QyxPQUFPLEVBQ1AsYUFBYSxDQUFDLElBQUksQ0FDckIsQ0FBQztLQUNMO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUE5Q0QseUJBOENDIn0=