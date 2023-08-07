"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
const is_1 = require("@coffeekraken/sugar/is");
exports.definition = {
    description: 'Validate a base64 string',
    type: 'Boolean',
};
function alphanum(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: settings.i18n.base64,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        return {
            valid: false,
            message: (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.default,
        };
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    const isBase64 = (0, is_1.__isBase64)(value);
    if (!isBase64) {
        message = finalSettings.i18n.default;
    }
    return {
        valid: isBase64,
        message,
    };
}
exports.default = alphanum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUFNekQsK0NBQW9EO0FBcUN2QyxRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsMEJBQTBCO0lBQ3ZDLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFFRixTQUF3QixRQUFRLENBQzVCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUE0Qzs7SUFFNUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUE2QixJQUFBLG9CQUFXLEVBQ3ZEO1FBQ0ksSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUMxQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsT0FBTztTQUN2QyxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELE1BQU0sUUFBUSxHQUFHLElBQUEsZUFBVSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRW5DLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDWCxPQUFPLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDeEM7SUFFRCxPQUFPO1FBQ0gsS0FBSyxFQUFFLFFBQVE7UUFDZixPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFwQ0QsMkJBb0NDIn0=