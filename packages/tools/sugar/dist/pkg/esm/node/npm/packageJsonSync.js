import __fs from 'fs';
import __packagePathSync from './packagePathSync';
/**
 * @name                packageJsonSync
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
 * @snippet         __packageJsonSync()
 *
 * @example         js
 * import { __packageJsonSync } from '@coffeekraken/sugar/npm`;
 * __packageJsonSync('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function packageJsonSync(name, settings) {
    const path = __packagePathSync(name, settings);
    if (path) {
        const json = JSON.parse(__fs.readFileSync(`${path}/package.json`, 'utf8').toString());
        return json;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLGlCQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FDbkMsSUFBWSxFQUNaLFFBQXdDO0lBRXhDLE1BQU0sSUFBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxJQUFJLElBQUksRUFBRTtRQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDL0QsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDIn0=