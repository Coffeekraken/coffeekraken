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
    description: 'Validate an negative number',
    type: 'number',
};
function negative(value, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, deepMerge_1.default)({
        i18n: en_1.default.negative,
        cast: true,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error(`Sorry but the "negative" validation only works with string and number`);
    }
    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }
    if (typeof value === 'string' && finalSettings.cast) {
        value = Number(value);
    }
    if (isNaN(value)) {
        valid = false;
    }
    else {
        valid = value < 0;
    }
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
exports.default = negative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCw0RkFBc0U7QUFDdEUsb0RBQThCO0FBMkNqQixRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsNkJBQTZCO0lBQzFDLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixTQUF3QixRQUFRLENBQzVCLEtBQVUsRUFDVixRQUE4Qzs7SUFFOUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUErQixJQUFBLG1CQUFXLEVBQ3pEO1FBQ0ksSUFBSSxFQUFFLFlBQUksQ0FBQyxRQUFRO1FBQ25CLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN4RCxNQUFNLElBQUksS0FBSyxDQUNYLHVFQUF1RSxDQUMxRSxDQUFDO0tBQ0w7SUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ2pELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ2pELEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekI7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNkLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDakI7U0FBTTtRQUNILEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQztLQUN4QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBMUNELDJCQTBDQyJ9