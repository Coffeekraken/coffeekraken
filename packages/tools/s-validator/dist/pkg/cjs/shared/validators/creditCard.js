"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
exports.definition = {
    description: 'Validate a credit card string',
    type: 'Boolean',
};
function creditCard(value, validatorValue, settings) {
    var _a, _b;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
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
    valid = (0, is_1.__isCreditCard)(value);
    if (!valid) {
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.default;
    }
    return {
        valid,
        message,
    };
}
exports.default = creditCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCwrQ0FBd0Q7QUFDeEQsdURBQXlEO0FBd0M1QyxRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsK0JBQStCO0lBQzVDLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFFRixTQUF3QixVQUFVLENBQzlCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUFnRDs7SUFFaEQsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUFpQyxJQUFBLG9CQUFXLEVBQzNEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsVUFBVTtRQUNoQyxJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTztTQUN0QyxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELEtBQUssR0FBRyxJQUFBLG1CQUFjLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE9BQU8sQ0FBQztLQUN6QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBcENELDZCQW9DQyJ9