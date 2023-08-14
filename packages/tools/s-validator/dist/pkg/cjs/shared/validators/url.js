"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
const is_1 = require("@coffeekraken/sugar/is");
exports.definition = {
    description: 'Make sure the provided value is a valid url',
    type: 'Boolean',
};
function url(value, validatorValue, settings) {
    var _a, _b, _c;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.url,
        trim: true,
        secure: false,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }
    valid = (0, is_1.__isUrl)(value);
    if (!valid) {
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.default;
    }
    if (valid && finalSettings.secure) {
        if (!value.match(/^https:\/\//)) {
            valid = false;
            message = (_c = finalSettings.i18n) === null || _c === void 0 ? void 0 : _c.secure;
        }
    }
    return {
        valid,
        message,
    };
}
exports.default = url;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUFNekQsK0NBQWlEO0FBdUNwQyxRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsNkNBQTZDO0lBQzFELElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFFRixTQUF3QixHQUFHLENBQ3ZCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUF5Qzs7SUFFekMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUEwQixJQUFBLG9CQUFXLEVBQ3BEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsR0FBRztRQUN6QixJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxLQUFLO0tBQ2hCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtRQUNqRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCO0lBRUQsS0FBSyxHQUFHLElBQUEsWUFBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXZCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxPQUFPLENBQUM7S0FDekM7SUFFRCxJQUFJLEtBQUssSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzdCLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUM7U0FDeEM7S0FDSjtJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBckNELHNCQXFDQyJ9