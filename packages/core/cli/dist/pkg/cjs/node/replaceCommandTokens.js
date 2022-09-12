"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@coffeekraken/sugar/cli");
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name           replaceTokens
 * @type            Function
 * @static
 *
 * Replace tokens in a passed command like:
 * - ^sugar: Replaced by either "sugar" or "sugard" depending on the environment
 * - Support all the tokens supported by the "replaceTokens" function of the sugar package
 *
 * @param        {String} command The command to replace tokens in
 * @return       {String} The command with the replaced tokens
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com>
 */
function replaceTokens(command, params) {
    const sugarCommand = process.argv[1].split('/').pop();
    command = command.replace('[arguments]', params ? (0, cli_1.__argsToString)(params) : '');
    command = (0, string_1.__replaceTokens)(command);
    // @ts-ignore
    if (!command.match(/^sugar\s/))
        return command;
    return command.replace(/^sugar/, sugarCommand !== null && sugarCommand !== void 0 ? sugarCommand : 'sugar');
}
exports.default = replaceTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQXlEO0FBQ3pELHVEQUE2RDtBQUU3RDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILFNBQXdCLGFBQWEsQ0FBQyxPQUFlLEVBQUUsTUFBWTtJQUMvRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0RCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDckIsYUFBYSxFQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBQSxvQkFBYyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3ZDLENBQUM7SUFDRixPQUFPLEdBQUcsSUFBQSx3QkFBZSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLGFBQWE7SUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFBRSxPQUFPLE9BQU8sQ0FBQztJQUMvQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksYUFBWixZQUFZLGNBQVosWUFBWSxHQUFJLE9BQU8sQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFWRCxnQ0FVQyJ9