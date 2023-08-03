"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const en_js_1 = __importDefault(require("../i18n/en.js"));
exports.definition = {
    description: 'Validate an iso time string',
    type: 'Boolean',
};
function isoTime(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: en_js_1.default.isoTime,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "isoTime" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = (0, is_1.__isIsoTime)(value);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
exports.default = isoTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCwrQ0FBcUQ7QUFDckQsdURBQXlEO0FBS3pELDBEQUFpQztBQXNDcEIsUUFBQSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLDZCQUE2QjtJQUMxQyxJQUFJLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsU0FBd0IsT0FBTyxDQUMzQixLQUFVLEVBQ1YsY0FBdUIsRUFDdkIsUUFBNkM7O0lBRTdDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBOEIsSUFBQSxvQkFBVyxFQUN4RDtRQUNJLElBQUksRUFBRSxlQUFJLENBQUMsT0FBTztRQUNsQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FDWCwyREFBMkQsQ0FDOUQsQ0FBQztLQUNMO0lBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxLQUFLLEdBQUcsSUFBQSxnQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUM7S0FDeEM7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQW5DRCwwQkFtQ0MifQ==