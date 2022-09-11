import __fs from 'fs';
import __packagePath from './packagePath';
/**
 * @name                packageJson
 * @namespace            node.npm
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * package.json JSON content
 *
 * @param       {String}        name        the package name wanted
 * @param       {IPackageJson}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The package.json content
 *
 * @example         js
 * import packageJson from '@coffeekraken/sugar/node/npm/packageJson`;
 * packagrJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function packageJson(name, settings) {
    const path = __packagePath(name, settings);
    if (path) {
        const json = JSON.parse(__fs.readFileSync(`${path}/package.json`, 'utf8').toString());
        return json;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLFFBQXdDO0lBRXhDLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsSUFBSSxJQUFJLEVBQUU7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQy9ELENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQyJ9