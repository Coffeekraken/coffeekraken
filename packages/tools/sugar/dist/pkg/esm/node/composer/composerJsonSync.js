import __fs from 'fs';
import __composerPath from './composerPath.js';
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
 * @snippet         __composerJson($1)
 *
 * @example         js
 * import { __composerJson } from '@coffeekraken/sugar/composer`;
 * __composerJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function composerJsonSync(nameOrPath, settings) {
    if (nameOrPath.match(/^\//)) {
        if (!__fs.existsSync(`${nameOrPath}/composer.json`)) {
            return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLGNBQWMsTUFBTSxtQkFBbUIsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FDcEMsVUFBa0IsRUFDbEIsUUFBeUM7SUFFekMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2pELE9BQU87U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUM5RCxDQUFDO0tBQ0w7SUFFRCw2QkFBNkI7SUFDN0IsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxJQUFJLElBQUksRUFBRTtRQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNoRSxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQyJ9