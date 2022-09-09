// @ts-nocheck
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import __packageTmpDir from '../path/packageTmpDir';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
export default function __writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), 'files', (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxlQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBaUN6RCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUN0QyxJQUFJLEVBQ0osV0FBK0MsRUFBRTs7SUFFakQsUUFBUSxtQkFDSixJQUFJLEVBQUUsU0FBUyxJQUNaLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDckIsZUFBZSxFQUFFLEVBQ2pCLE9BQU8sRUFDUCxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FDdkMsQ0FBQztJQUNGLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9