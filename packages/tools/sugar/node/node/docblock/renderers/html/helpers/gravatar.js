"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("../../../../crypt/md5"));
exports.default = {
    id: 'gravatar',
    args: {
        email: ''
    },
    helper: function gravatar({ email, settings }) {
        const hash = md5_1.default.encrypt(email);
        return `https://www.gravatar.com/avatar/${hash}`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbm9kZS9kb2NibG9jay9yZW5kZXJlcnMvaHRtbC9oZWxwZXJzL2dyYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQTBDO0FBRTFDLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFVBQVU7SUFDZCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsTUFBTSxFQUFFLFNBQVMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUMzQyxNQUFNLElBQUksR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sbUNBQW1DLElBQUksRUFBRSxDQUFDO0lBQ25ELENBQUM7Q0FDRixDQUFDIn0=