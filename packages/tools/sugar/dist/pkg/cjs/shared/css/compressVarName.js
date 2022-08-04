"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const md5_1 = __importDefault(require("../crypt/md5"));
/**
 * @name            compressVarName
 * @namespace       shared.css
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function allows you to compress a css variable name only when the environment is production
 *
 * @param       {String}         name       The name to compress
 * @return      {String}                The compressed variable name
 *
 * @example         js
 * import compressVarName from '@coffeekraken/sugar/shared/css/compressVarName';
 * compressVarName('--something-long-that-you-want-to-compress');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLHVEQUFpQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQXdCLGVBQWUsQ0FBQyxJQUFJO0lBQ3hDLElBQUksQ0FBQyxlQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxNQUFNLEdBQUcsR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLHNDQUFzQyxDQUFDO0lBQ3BELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ04sTUFBTSxVQUFVLEdBQUcsR0FBRztTQUNqQixLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ1QsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM3QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxPQUFPLE1BQU0sR0FBRyxHQUFHLFVBQVUsRUFBRSxDQUFDO0FBQ3BDLENBQUM7QUFmRCxrQ0FlQyJ9