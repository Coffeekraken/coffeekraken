import __fs from 'fs';
import __path from 'path';
import __parseSemverString from '../../shared/semver/parseSemverString';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import __packageRoot from '../path/packageRoot';
export default function getCoffeekrakenMetas() {
    const packageJsonPath = __path.resolve(__packageRoot(__dirname()), 'package.json');
    if (!__fs.existsSync(packageJsonPath)) {
        throw new Error(`Cannot find the package.json fule to get the coffeekraken metas`);
    }
    const json = __readJsonSync(packageJsonPath);
    return {
        version: __parseSemverString(json.version),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxtQkFFTixNQUFNLHVDQUF1QyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkUsT0FBTyxhQUFhLE1BQU0scUJBQXFCLENBQUM7QUEwQmhELE1BQU0sQ0FBQyxPQUFPLFVBQVUsb0JBQW9CO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2xDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUMxQixjQUFjLENBQ2pCLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUNYLGlFQUFpRSxDQUNwRSxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFN0MsT0FBTztRQUNILE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQzdDLENBQUM7QUFDTixDQUFDIn0=