// @ts-nocheck
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
export default function __writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), 'files', (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWlDekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsSUFBSSxFQUNKLFdBQStDLEVBQUU7O0lBRWpELFFBQVEsbUJBQ0osSUFBSSxFQUFFLFNBQVMsSUFDWixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ3JCLGVBQWUsRUFBRSxFQUNqQixPQUFPLEVBQ1AsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQ3ZDLENBQUM7SUFDRixlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==