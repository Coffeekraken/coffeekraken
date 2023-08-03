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
    description: 'Validate an number',
    type: 'Boolean',
};
function number(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: en_js_1.default.number,
        cast: true,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error(`Sorry but the "number" validation only works with string and number`);
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
        valid = true;
    }
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
    }
    return {
        valid,
        message,
    };
}
exports.default = number;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUFLekQsMERBQWlDO0FBc0NwQixRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsb0JBQW9CO0lBQ2pDLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFFRixTQUF3QixNQUFNLENBQzFCLEtBQVUsRUFDVixjQUF1QixFQUN2QixRQUE0Qzs7SUFFNUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUE2QixJQUFBLG9CQUFXLEVBQ3ZEO1FBQ0ksSUFBSSxFQUFFLGVBQUksQ0FBQyxNQUFNO1FBQ2pCLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN4RCxNQUFNLElBQUksS0FBSyxDQUNYLHFFQUFxRSxDQUN4RSxDQUFDO0tBQ0w7SUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ2pELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ2pELEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekI7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNkLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDakI7U0FBTTtRQUNILEtBQUssR0FBRyxJQUFJLENBQUM7S0FDaEI7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDO0tBQ3hDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUEzQ0QseUJBMkNDIn0=