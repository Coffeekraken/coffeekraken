"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const en_1 = __importDefault(require("../i18n/en"));
const isoDate_1 = __importDefault(require("@coffeekraken/sugar/shared/is/isoDate"));
exports.definition = {
    description: 'Validate an iso date string',
    type: 'String',
};
function isoDate(value, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, deepMerge_1.default)({
        i18n: en_1.default.isoDate,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "isoDate" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = (0, isoDate_1.default)(value);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
exports.default = isoDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCw0RkFBc0U7QUFLdEUsb0RBQThCO0FBQzlCLG9GQUFnRTtBQXNDbkQsUUFBQSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLDZCQUE2QjtJQUMxQyxJQUFJLEVBQUUsUUFBUTtDQUNqQixDQUFDO0FBRUYsU0FBd0IsT0FBTyxDQUMzQixLQUFVLEVBQ1YsUUFBNkM7O0lBRTdDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBOEIsSUFBQSxtQkFBVyxFQUN4RDtRQUNJLElBQUksRUFBRSxZQUFJLENBQUMsT0FBTztRQUNsQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FDWCwyREFBMkQsQ0FDOUQsQ0FBQztLQUNMO0lBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxLQUFLLEdBQUcsSUFBQSxpQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUM7S0FDeEM7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQWxDRCwwQkFrQ0MifQ==