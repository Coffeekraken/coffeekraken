"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const en_1 = __importDefault(require("../i18n/en"));
exports.definition = {
    description: 'Validate a string using a regex pattern',
    type: 'String',
};
function pattern(value, pattern, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, deepMerge_1.default)({
        i18n: en_1.default.pattern,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "pattern" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    const reg = new RegExp(pattern);
    valid = reg.test(value);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string.replace('%pattern', pattern);
    }
    return {
        valid,
        message,
    };
}
exports.default = pattern;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCw0RkFBc0U7QUFLdEUsb0RBQThCO0FBd0NqQixRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUseUNBQXlDO0lBQ3RELElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixTQUF3QixPQUFPLENBQzNCLEtBQVUsRUFDVixPQUFlLEVBQ2YsUUFBNkM7O0lBRTdDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBOEIsSUFBQSxtQkFBVyxFQUN4RDtRQUNJLElBQUksRUFBRSxZQUFJLENBQUMsT0FBTztRQUNsQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FDWCwyREFBMkQsQ0FDOUQsQ0FBQztLQUNMO0lBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV4QixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDckU7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQXBDRCwwQkFvQ0MifQ==