"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
exports.definition = {
    description: 'Validate an integer',
    type: 'Boolean',
};
function integer(value, validatorValue, settings) {
    var _a, _b;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.integer,
        cast: true,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string' && typeof value !== 'number') {
        return {
            valid: false,
            message: finalSettings.i18n.default,
        };
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
        valid = Number.isInteger(value);
    }
    if (!valid) {
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.default;
    }
    return {
        valid,
        message,
    };
}
exports.default = integer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUEyQzVDLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLFdBQVcsRUFBRSxxQkFBcUI7SUFDbEMsSUFBSSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQUVGLFNBQXdCLE9BQU8sQ0FDM0IsS0FBVSxFQUNWLGNBQXVCLEVBQ3ZCLFFBQTZDOztJQUU3QyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQThCLElBQUEsb0JBQVcsRUFDeEQ7UUFDSSxJQUFJLEVBQUUsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSwwQ0FBRSxPQUFPO1FBQzdCLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN4RCxPQUFPO1lBQ0gsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPO1NBQ3RDLENBQUM7S0FDTDtJQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDakQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDakQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6QjtJQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2QsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUNqQjtTQUFNO1FBQ0gsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsT0FBTyxDQUFDO0tBQ3pDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUE1Q0QsMEJBNENDIn0=