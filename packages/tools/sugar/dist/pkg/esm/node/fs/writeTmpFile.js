// @ts-nocheck
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import __packageTmpDir from '../path/packageTmpDir';
import __writeFileSync from './writeFileSync';
function writeTmpFile(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
export default writeTmpFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxlQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUFtQzlDLFNBQVMsWUFBWSxDQUNqQixJQUFJLEVBQ0osV0FBMkMsRUFBRTs7SUFFN0MsUUFBUSxtQkFDSixJQUFJLEVBQUUsU0FBUyxJQUNaLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDckIsZUFBZSxFQUFFLEVBQ2pCLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUN2QyxDQUFDO0lBQ0YsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxZQUFZLENBQUMifQ==