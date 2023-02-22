import __fs from 'fs';
import __composerPath from './composerPath';
/**
 * @name                composerJsonSync
 * @namespace            node.npm
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * composer.json JSON content
 *
 * @param       {String}        [nameOrPath=process.cwd()]        the package name or path wanted
 * @param       {IPackageJson}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The package.json content
 *
 * @example         js
 * import { __packageJson } from '@coffeekraken/sugar/composer`;
 * __packageJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function composerJsonSync(nameOrPath, settings) {
    if (nameOrPath.match(/^\//)) {
        if (!__fs.existsSync(`${nameOrPath}/composer.json`)) {
            throw new Error(`<red>[composerJsonSync]</red> The passed "${nameOrPath}" folder directory does not contain any composer.json file...`);
        }
        return JSON.parse(__fs.readFileSync(`${nameOrPath}/composer.json`).toString());
    }
    // get package path from name
    const path = __composerPath(nameOrPath, settings);
    if (path) {
        const json = JSON.parse(__fs.readFileSync(`${path}/composer.json`, 'utf8').toString());
        return json;
    }
    return {};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQ3BDLFVBQWtCLEVBQ2xCLFFBQXlDO0lBRXpDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsZ0JBQWdCLENBQUMsRUFBRTtZQUNqRCxNQUFNLElBQUksS0FBSyxDQUNYLDZDQUE2QyxVQUFVLCtEQUErRCxDQUN6SCxDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFVBQVUsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDOUQsQ0FBQztLQUNMO0lBRUQsNkJBQTZCO0lBQzdCLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEQsSUFBSSxJQUFJLEVBQUU7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDaEUsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUMifQ==