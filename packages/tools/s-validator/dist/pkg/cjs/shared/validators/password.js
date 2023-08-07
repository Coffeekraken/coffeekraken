"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
exports.definition = {
    description: 'Validate a password string',
    type: 'String',
};
function password(value, level, settings) {
    var _a, _b;
    let message, valid = false;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: (_a = settings === null || settings === void 0 ? void 0 : settings.i18n) === null || _a === void 0 ? void 0 : _a.password,
        trim: true,
        weakReg: /.*/,
        mediumReg: /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
        strongReg: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
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
    let validLevels = [];
    if (finalSettings.weakReg.test(value)) {
        if (value) {
            validLevels.push('weak');
        }
        if (level === 'weak') {
            valid = true;
        }
    }
    if (finalSettings.mediumReg.test(value)) {
        if (value) {
            validLevels.push('medium');
        }
        if (level === 'medium') {
            valid = true;
        }
    }
    if (finalSettings.strongReg.test(value)) {
        if (value) {
            validLevels.push('strong');
        }
        if (level === 'strong') {
            valid = true;
        }
    }
    if (!valid) {
        message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b[level];
    }
    return {
        valid,
        message,
        metas: {
            levels: ['weak', 'medium', 'strong'],
            validLevels,
        },
    };
}
exports.default = password;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUErQzVDLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLFdBQVcsRUFBRSw0QkFBNEI7SUFDekMsSUFBSSxFQUFFLFFBQVE7Q0FDakIsQ0FBQztBQUVGLFNBQXdCLFFBQVEsQ0FDNUIsS0FBVSxFQUNWLEtBQW1DLEVBQ25DLFFBQThDOztJQUU5QyxJQUFJLE9BQU8sRUFDUCxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRWxCLE1BQU0sYUFBYSxHQUErQixJQUFBLG9CQUFXLEVBQ3pEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsUUFBUTtRQUM5QixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxJQUFJO1FBQ2IsU0FBUyxFQUNMLG9IQUFvSDtRQUN4SCxTQUFTLEVBQ0wsOERBQThEO0tBQ3JFLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTztTQUN0QyxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELElBQUksV0FBVyxHQUFxQyxFQUFFLENBQUM7SUFFdkQsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLEtBQUssRUFBRTtZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7WUFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtLQUNKO0lBQ0QsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQyxJQUFJLEtBQUssRUFBRTtZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtLQUNKO0lBQ0QsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQyxJQUFJLEtBQUssRUFBRTtZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtLQUNKO0lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFHLEtBQUssQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO1FBQ1AsS0FBSyxFQUFFO1lBQ0gsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7WUFDcEMsV0FBVztTQUNkO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF2RUQsMkJBdUVDIn0=