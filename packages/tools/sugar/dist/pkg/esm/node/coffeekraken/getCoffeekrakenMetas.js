import __fs from 'fs';
import __path from 'path';
import __parseSemverString from '../../shared/semver/parseSemverString';
import __dirname from '../fs/dirname';
import __readJsonSync from '../fs/readJsonSync';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxtQkFFTixNQUFNLHVDQUF1QyxDQUFDO0FBQy9DLE9BQU8sU0FBUyxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQTBCaEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0I7SUFDeEMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDbEMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzFCLGNBQWMsQ0FDakIsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUVBQWlFLENBQ3BFLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUU3QyxPQUFPO1FBQ0gsT0FBTyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDN0MsQ0FBQztBQUNOLENBQUMifQ==