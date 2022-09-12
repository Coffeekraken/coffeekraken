import { __replaceTokens } from '@coffeekraken/sugar/string';
import __argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
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
export default function replaceTokens(command, params) {
    const sugarCommand = process.argv[1].split('/').pop();
    command = command.replace('[arguments]', params ? __argsToString(params) : '');
    command = __replaceTokens(command);
    // @ts-ignore
    if (!command.match(/^sugar\s/))
        return command;
    return command.replace(/^sugar/, sugarCommand !== null && sugarCommand !== void 0 ? sugarCommand : 'sugar');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RTs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLE9BQWUsRUFBRSxNQUFZO0lBQy9ELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3RELE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUNyQixhQUFhLEVBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDdkMsQ0FBQztJQUNGLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsYUFBYTtJQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBQy9DLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsWUFBWSxhQUFaLFlBQVksY0FBWixZQUFZLEdBQUksT0FBTyxDQUFDLENBQUM7QUFDOUQsQ0FBQyJ9