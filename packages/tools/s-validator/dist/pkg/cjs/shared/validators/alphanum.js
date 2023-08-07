"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
exports.definition = {
    description: 'Validate an alphanum string',
    type: 'Boolean',
};
function alphanum(value, validatorValue, settings) {
    var _a;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: settings.i18n.alphanum,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        return {
            valid: false,
            message: finalSettings.i18n.default,
        };
    }
    if (finalSettings.trim) {
        value = value.trim();
    }
    valid = value.match(/^[a-z0-9]+$/i);
    if (!valid) {
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.default;
    }
    return {
        valid,
        message,
    };
}
exports.default = alphanum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUEwQzVDLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLFdBQVcsRUFBRSw2QkFBNkI7SUFDMUMsSUFBSSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQUVGLFNBQXdCLFFBQVEsQ0FDNUIsS0FBVSxFQUNWLGNBQXVCLEVBQ3ZCLFFBQThDOztJQUU5QyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQStCLElBQUEsb0JBQVcsRUFDekQ7UUFDSSxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRO1FBQzVCLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixPQUFPO1lBQ0gsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPO1NBQ3RDLENBQUM7S0FDTDtJQUVELElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtRQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCO0lBRUQsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFcEMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE9BQU8sQ0FBQztLQUN6QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBcENELDJCQW9DQyJ9