"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replaceTokens_1 = __importDefault(require("../../shared/token/replaceTokens"));
/**
 * @name            replaceTokens
 * @namespace       js.token
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take as input a string and replace some tokens using these functions:
 * -
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @example         js
 * import replaceTokens from '@coffeekraken/sugar/js/token/replaceTokens';
 * replaceTokens('Current module system is %moduleSystem');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function replaceTokens(string) {
    string = (0, replaceTokens_1.default)(string);
    return string;
}
exports.default = replaceTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUZBQXFFO0FBRXJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBd0IsYUFBYSxDQUFDLE1BQWM7SUFDaEQsTUFBTSxHQUFHLElBQUEsdUJBQXFCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUhELGdDQUdDIn0=