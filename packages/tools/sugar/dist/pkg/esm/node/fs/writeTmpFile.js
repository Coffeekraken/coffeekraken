// @ts-nocheck
import __path from 'path';
import __uniqid from '../../node/string/uniqid.js';
import __packageTmpDir from '../path/packageTmpDir.js';
import __writeFileSync from './writeFileSync.js';
export default function __writeTmpFile(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDbkQsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxlQUFlLE1BQU0sb0JBQW9CLENBQUM7QUFzQ2pELE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUNsQyxJQUFJLEVBQ0osV0FBMkMsRUFBRTs7SUFFN0MsUUFBUSxtQkFDSixJQUFJLEVBQUUsU0FBUyxJQUNaLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDckIsZUFBZSxFQUFFLEVBQ2pCLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUN2QyxDQUFDO0lBQ0YsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=