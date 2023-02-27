import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLG1CQUVOLE1BQU0sd0NBQXdDLENBQUM7QUErQmhELE1BQU0sQ0FBQyxPQUFPLFVBQVUsb0JBQW9CO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2xDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzdCLGNBQWMsQ0FDakIsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUVBQWlFLENBQ3BFLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUU3QyxPQUFPO1FBQ0gsT0FBTyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDN0MsQ0FBQztBQUNOLENBQUMifQ==