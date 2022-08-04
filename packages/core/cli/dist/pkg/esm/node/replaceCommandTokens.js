import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLDhDQUE4QyxDQUFDO0FBQzNFLE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBRXpFOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhLENBQUMsT0FBZSxFQUFFLE1BQVk7SUFDL0QsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQ3JCLGFBQWEsRUFDYixNQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUN2QyxDQUFDO0lBQ0YsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxhQUFhO0lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUM7SUFDL0MsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxZQUFZLGFBQVosWUFBWSxjQUFaLFlBQVksR0FBSSxPQUFPLENBQUMsQ0FBQztBQUM5RCxDQUFDIn0=