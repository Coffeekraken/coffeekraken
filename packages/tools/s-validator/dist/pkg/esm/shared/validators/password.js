// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
export const definition = {
    description: 'Validate a password string',
    type: 'String',
};
export default function password(value, level, settings) {
    var _a;
    let message, valid = false;
    const finalSettings = __deepMerge({
        i18n: __en.password,
        trim: true,
        weakReg: /.*/,
        mediumReg: /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
        strongReg: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof value !== 'string') {
        throw new Error(`Sorry but the "password" validation only works with string`);
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
        message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a[level];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUE0QzlCLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsNEJBQTRCO0lBQ3pDLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FDNUIsS0FBVSxFQUNWLEtBQW1DLEVBQ25DLFFBQThDOztJQUU5QyxJQUFJLE9BQU8sRUFDUCxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRWxCLE1BQU0sYUFBYSxHQUErQixXQUFXLENBQ3pEO1FBQ0ksSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRO1FBQ25CLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLElBQUk7UUFDYixTQUFTLEVBQUUsb0hBQW9IO1FBQy9ILFNBQVMsRUFBRSw4REFBOEQ7S0FDNUUsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUNYLDREQUE0RCxDQUMvRCxDQUFDO0tBQ0w7SUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QjtJQUVELElBQUksV0FBVyxHQUFxQyxFQUFFLENBQUM7SUFFdkQsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLEtBQUssRUFBRTtZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7WUFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtLQUNKO0lBQ0QsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQyxJQUFJLEtBQUssRUFBRTtZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtLQUNKO0lBQ0QsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQyxJQUFJLEtBQUssRUFBRTtZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtLQUNKO0lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxJQUFJLDBDQUFHLEtBQUssQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsT0FBTztRQUNILEtBQUs7UUFDTCxPQUFPO1FBQ1AsS0FBSyxFQUFFO1lBQ0gsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7WUFDcEMsV0FBVztTQUNkO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==