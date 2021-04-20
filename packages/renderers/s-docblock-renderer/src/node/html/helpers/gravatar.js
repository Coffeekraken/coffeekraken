"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmF2YXRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtFQUF5RDtBQUV6RCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxVQUFVO0lBQ2QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELE1BQU0sRUFBRSxTQUFTLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7UUFDM0MsTUFBTSxJQUFJLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxPQUFPLG1DQUFtQyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0NBQ0YsQ0FBQyJ9