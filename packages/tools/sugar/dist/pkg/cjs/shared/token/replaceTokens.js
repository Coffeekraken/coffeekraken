"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const currentModuleSystem_1 = __importDefault(require("../module/currentModuleSystem"));
/**
 * @name            replaceTokens
 * @namespace       shared.token
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function replace these tokens in the passed string:
 * - `%moduleSystem` - Either "esm" or "cjs"
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @snippet         (tokens) __replaceTokens($1)
 * __replaceTokens($1)
 *
 * @example         js
 * import replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
 * replaceTokens('Current module system is %moduleSystem');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function replaceTokens(string) {
    string = string.replace(/\%moduleSystem/g, (0, currentModuleSystem_1.default)());
    return string;
}
exports.default = replaceTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0ZBQWtFO0FBRWxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsYUFBYSxDQUFDLE1BQWM7SUFDaEQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsSUFBQSw2QkFBcUIsR0FBRSxDQUFDLENBQUM7SUFDcEUsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUhELGdDQUdDIn0=