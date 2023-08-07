"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
exports.definition = {
    description: 'Validate string, array, object and number using the "min" rule',
    type: 'Number',
};
function min(value, n, settings) {
    var _a, _b, _c, _d, _e;
    let message, valid;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.min,
        trim: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    switch (true) {
        case typeof value === 'string':
            if (finalSettings.trim) {
                value = value.trim();
            }
            valid = value.length >= n;
            message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.string.replace('%n', n);
            break;
        case typeof value === 'number':
            valid = value >= n;
            message = (_c = finalSettings.i18n) === null || _c === void 0 ? void 0 : _c.number.replace('%n', n);
            break;
        case Array.isArray(value):
            valid = value.length >= n;
            message = (_d = finalSettings.i18n) === null || _d === void 0 ? void 0 : _d.array.replace('%n', n);
            break;
        case typeof value === 'object':
            valid = Object.keys(value).length >= n;
            message = (_e = finalSettings.i18n) === null || _e === void 0 ? void 0 : _e.object.replace('%n', n);
            break;
        default:
            return {
                valid: false,
                message: finalSettings.i18n.string,
            };
            break;
    }
    return {
        valid,
        message,
    };
}
exports.default = min;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUFtRDVDLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLFdBQVcsRUFDUCxnRUFBZ0U7SUFDcEUsSUFBSSxFQUFFLFFBQVE7Q0FDakIsQ0FBQztBQUVGLFNBQXdCLEdBQUcsQ0FDdkIsS0FBVSxFQUNWLENBQVMsRUFDVCxRQUEwQzs7SUFFMUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBRW5CLE1BQU0sYUFBYSxHQUEyQixJQUFBLG9CQUFXLEVBQ3JEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsR0FBRztRQUN6QixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsUUFBUSxJQUFJLEVBQUU7UUFDVixLQUFLLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFDMUIsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO2dCQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQzFCLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU07UUFDVixLQUFLLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFDMUIsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDbkIsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTTtRQUNWLEtBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDckIsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQzFCLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU07UUFDVixLQUFLLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFDMUIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUN2QyxPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNO1FBQ1Y7WUFDSSxPQUFPO2dCQUNILEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU07YUFDckMsQ0FBQztZQUNGLE1BQU07S0FDYjtJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBL0NELHNCQStDQyJ9