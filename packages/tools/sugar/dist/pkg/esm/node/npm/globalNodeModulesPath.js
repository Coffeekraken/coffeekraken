import __childProcess from 'child_process';
/**
 * @name            globalNodeModulesPath
 * @namespace       node.npm
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function returns you the path to the global node modules folder
 *
 * @return      {String}            The path to the global node modules folder
 *
 * @example         js
 * import globalNodeModulesPath from '@coffeekraken/sugar/node/npm/globalNodeModulesPath';
 * globalNodeModulesPath();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function () {
    return __childProcess
        .execSync(`npm root --global`, {
        stdio: 'pipe',
    })
        .toString()
        .trim()
        .split('\n')
        .slice(-1)[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU87SUFDVixPQUFPLGNBQWM7U0FDaEIsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzNCLEtBQUssRUFBRSxNQUFNO0tBQ2hCLENBQUM7U0FDRCxRQUFRLEVBQUU7U0FDVixJQUFJLEVBQUU7U0FDTixLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9