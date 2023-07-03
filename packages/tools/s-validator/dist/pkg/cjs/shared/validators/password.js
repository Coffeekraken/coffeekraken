"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
// @ts-nocheck
const object_1 = require("@coffeekraken/sugar/object");
const en_1 = __importDefault(require("../i18n/en"));
exports.definition = {
    description: 'Validate a password string',
    type: 'String',
};
function password(value, level, settings) {
    var _a;
    let message, valid = false;
    const finalSettings = (0, object_1.__deepMerge)({
        i18n: en_1.default.password,
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
exports.default = password;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCx1REFBeUQ7QUFDekQsb0RBQThCO0FBNENqQixRQUFBLFVBQVUsR0FBRztJQUN0QixXQUFXLEVBQUUsNEJBQTRCO0lBQ3pDLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixTQUF3QixRQUFRLENBQzVCLEtBQVUsRUFDVixLQUFtQyxFQUNuQyxRQUE4Qzs7SUFFOUMsSUFBSSxPQUFPLEVBQ1AsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUVsQixNQUFNLGFBQWEsR0FBK0IsSUFBQSxvQkFBVyxFQUN6RDtRQUNJLElBQUksRUFBRSxZQUFJLENBQUMsUUFBUTtRQUNuQixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxJQUFJO1FBQ2IsU0FBUyxFQUNMLG9IQUFvSDtRQUN4SCxTQUFTLEVBQ0wsOERBQThEO0tBQ3JFLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FDWCw0REFBNEQsQ0FDL0QsQ0FBQztLQUNMO0lBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFFRCxJQUFJLFdBQVcsR0FBcUMsRUFBRSxDQUFDO0lBRXZELElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkMsSUFBSSxLQUFLLEVBQUU7WUFDUCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQ2xCLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7S0FDSjtJQUNELElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsSUFBSSxLQUFLLEVBQUU7WUFDUCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ3BCLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7S0FDSjtJQUNELElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckMsSUFBSSxLQUFLLEVBQUU7WUFDUCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ3BCLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7S0FDSjtJQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsSUFBSSwwQ0FBRyxLQUFLLENBQUMsQ0FBQztLQUN6QztJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztRQUNQLEtBQUssRUFBRTtZQUNILE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO1lBQ3BDLFdBQVc7U0FDZDtLQUNKLENBQUM7QUFDTixDQUFDO0FBdEVELDJCQXNFQyJ9