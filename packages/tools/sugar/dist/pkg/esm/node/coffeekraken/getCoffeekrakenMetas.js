import __dirname from '../fs/dirname';
import __readJsonSync from '../fs/readJsonSync';
import __packageRootDir from '../path/packageRootDir';
import __fs from 'fs';
import __path from 'path';
import __parseSemverString from '../../shared/version/parseSemverString';
export default function getCoffeekrakenMetas() {
    const packageJsonPath = __path.resolve(__packageRootDir(__dirname()), 'package.json');
    if (!__fs.existsSync(packageJsonPath)) {
        throw new Error(`Cannot find the package.json fule to get the coffeekraken metas`);
    }
    const json = __readJsonSync(packageJsonPath);
    return {
        version: __parseSemverString(json.version),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxtQkFFTixNQUFNLHdDQUF3QyxDQUFDO0FBK0JoRCxNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQjtJQUN4QyxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNsQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3QixjQUFjLENBQ2pCLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUNYLGlFQUFpRSxDQUNwRSxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFN0MsT0FBTztRQUNILE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQzdDLENBQUM7QUFDTixDQUFDIn0=