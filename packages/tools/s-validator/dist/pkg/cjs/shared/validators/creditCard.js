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
    description: 'Validate a credit card string',
    type: 'Boolean',
};
function creditCard(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: en_js_1.default.creditCard,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "creditCard" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = (0, is_1.__isCreditCard)(value);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
exports.default = creditCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCwrQ0FBd0Q7QUFDeEQsdURBQXlEO0FBS3pELDBEQUFpQztBQW9DcEIsUUFBQSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLCtCQUErQjtJQUM1QyxJQUFJLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsU0FBd0IsVUFBVSxDQUM5QixLQUFVLEVBQ1YsY0FBdUIsRUFDdkIsUUFBMkM7O0lBRTNDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBNEIsSUFBQSxvQkFBVyxFQUN0RDtRQUNJLElBQUksRUFBRSxlQUFJLENBQUMsVUFBVTtRQUNyQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FDWCw4REFBOEQsQ0FDakUsQ0FBQztLQUNMO0lBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxLQUFLLEdBQUcsSUFBQSxtQkFBYyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUM7S0FDeEM7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQW5DRCw2QkFtQ0MifQ==