"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
exports.definition = {
    description: 'Make sure a value has been provided',
    type: 'Boolean',
};
function required(value, validatorValue, settings) {
    var _a, _b;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.required,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }
    valid = value !== undefined && value !== null && value !== '';
    if (!valid) {
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.default;
    }
    return {
        valid,
        message,
    };
}
exports.default = required;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUEwQzVDLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLFdBQVcsRUFBRSxxQ0FBcUM7SUFDbEQsSUFBSSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQUVGLFNBQXdCLFFBQVEsQ0FDNUIsS0FBVSxFQUNWLGNBQXVCLEVBQ3ZCLFFBQThDOztJQUU5QyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQStCLElBQUEsb0JBQVcsRUFDekQ7UUFDSSxJQUFJLEVBQUUsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSwwQ0FBRSxRQUFRO1FBQzlCLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ2pELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUM7SUFFOUQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE9BQU8sQ0FBQztLQUN6QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBN0JELDJCQTZCQyJ9