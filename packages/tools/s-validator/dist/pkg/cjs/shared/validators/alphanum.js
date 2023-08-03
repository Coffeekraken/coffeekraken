"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
const en_js_1 = __importDefault(require("../i18n/en.js"));
exports.definition = {
    description: 'Validate an alphanum string',
    type: 'Boolean',
};
function alphanum(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: en_js_1.default.alphanum,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "alphanum" validation only works with string`);
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = value.match(/^[a-z0-9]+$/i);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
exports.default = alphanum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUFLekQsMERBQWlDO0FBb0NwQixRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsNkJBQTZCO0lBQzFDLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFFRixTQUF3QixRQUFRLENBQzVCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUEyQzs7SUFFM0MsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUE0QixJQUFBLG9CQUFXLEVBQ3REO1FBQ0ksSUFBSSxFQUFFLGVBQUksQ0FBQyxRQUFRO1FBQ25CLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUNYLDREQUE0RCxDQUMvRCxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXBDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUM7S0FDeEM7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQW5DRCwyQkFtQ0MifQ==