// @ts-nocheck
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import __packageTmpDir from '../path/packageTmpDir';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
export default function __writeTmpFile(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxlQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBbUN6RCxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FDbEMsSUFBSSxFQUNKLFdBQTJDLEVBQUU7O0lBRTdDLFFBQVEsbUJBQ0osSUFBSSxFQUFFLFNBQVMsSUFDWixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ3JCLGVBQWUsRUFBRSxFQUNqQixNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FDdkMsQ0FBQztJQUNGLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9