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
    description: 'Validate string, array, object and number using the "max" rule',
    type: 'String|Array|Object|Number',
};
function max(value, n, settings) {
    var _a, _b, _c, _d;
    let message, valid;
    const finalSettings = (0, deepMerge_1.default)({
        i18n: en_1.default.max,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    switch (true) {
        case typeof value === 'string':
            if (finalSettings.trim) {
                value = value.trim();
            }
            valid = value.length <= n;
            message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string.replace('%n', n);
            break;
        case typeof value === 'number':
            valid = value <= n;
            message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.number.replace('%n', n);
            break;
        case Array.isArray(value):
            valid = value.length <= n;
            message = (_c = finalSettings.i18n) === null || _c === void 0 ? void 0 : _c.array.replace('%n', n);
            break;
        case typeof value === 'object':
            valid = Object.keys(value).length <= n;
            message = (_d = finalSettings.i18n) === null || _d === void 0 ? void 0 : _d.object.replace('%n', n);
            break;
        default:
            throw new Error(`Sorry but the "max" validation only works with string, number, array or object values.`);
            break;
    }
    return {
        valid,
        message,
    };
}
exports.default = max;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCw0RkFBc0U7QUFLdEUsb0RBQThCO0FBOENqQixRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQ1AsZ0VBQWdFO0lBQ3BFLElBQUksRUFBRSw0QkFBNEI7Q0FDckMsQ0FBQztBQUVGLFNBQXdCLEdBQUcsQ0FDdkIsS0FBVSxFQUNWLENBQVMsRUFDVCxRQUF5Qzs7SUFFekMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUEwQixJQUFBLG1CQUFXLEVBQ3BEO1FBQ0ksSUFBSSxFQUFFLFlBQUksQ0FBQyxHQUFHO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLFFBQVEsSUFBSSxFQUFFO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtnQkFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtZQUNELEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ25CLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU07UUFDVixLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDdkMsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTTtRQUNWO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FDWCx3RkFBd0YsQ0FDM0YsQ0FBQztZQUNGLE1BQU07S0FDYjtJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBOUNELHNCQThDQyJ9