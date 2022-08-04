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
    // get global node modules directory path
    return __childProcess
        .execSync(`npm root --location=global`)
        .toString()
        .trim();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU87SUFDVix5Q0FBeUM7SUFDekMsT0FBTyxjQUFjO1NBQ2hCLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQztTQUN0QyxRQUFRLEVBQUU7U0FDVixJQUFJLEVBQUUsQ0FBQztBQUNoQixDQUFDIn0=