// @ts-nocheck
import __writeFileSync from './writeFileSync';
import __require from '../esm/require';
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
function writeTmpFile(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    const __packageTmpDir = __require('../path/packageTmpDir').default;
    let path = __path.resolve(__packageTmpDir(), (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
export default writeTmpFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVUbXBGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVUbXBGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFvQ2xELFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxXQUEyQyxFQUFFOztJQUNyRSxRQUFRLG1CQUNKLElBQUksRUFBRSxTQUFTLElBQ1osUUFBUSxDQUNkLENBQUM7SUFFRixNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFFbkUsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDckIsZUFBZSxFQUFFLEVBQ2pCLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUN2QyxDQUFDO0lBQ0YsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxZQUFZLENBQUMifQ==