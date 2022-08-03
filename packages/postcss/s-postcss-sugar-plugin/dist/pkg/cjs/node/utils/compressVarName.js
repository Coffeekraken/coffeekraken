"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
function compressVarName(name) {
    if (!s_env_1.default.is('production')) {
        return name;
    }
    const md5 = md5_1.default.encrypt(name);
    const dict = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const sum = md5.split('').reduce((a, b) => {
        return a + dict.indexOf(b);
    }, 0);
    const compressed = md5
        .split('')
        .filter((char, i) => !(i % 5))
        .join('');
    return `--s${sum}${compressed}`;
}
exports.default = compressVarName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLCtFQUF5RDtBQUV6RCxTQUF3QixlQUFlLENBQUMsSUFBSTtJQUN4QyxJQUFJLENBQUMsZUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxNQUFNLElBQUksR0FBRyxzQ0FBc0MsQ0FBQztJQUNwRCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNOLE1BQU0sVUFBVSxHQUFHLEdBQUc7U0FDakIsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNULE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsT0FBTyxNQUFNLEdBQUcsR0FBRyxVQUFVLEVBQUUsQ0FBQztBQUNwQyxDQUFDO0FBZkQsa0NBZUMifQ==