// @ts-nocheck
import __writeFileSync from './writeFileSync';
import __packageTmpDir from '../path/packageTmpDir';
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import __replacePathTokens from '../path/replacePathTokens';
function writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    path = __replacePathTokens(path);
    __writeFileSync(path, data);
    return path;
}
export default writeTmpFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVUbXBGaWxlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlVG1wRmlsZVN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sZUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFFBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRCxPQUFPLG1CQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBb0M1RCxTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUErQyxFQUFFOztJQUU3RSxRQUFRLG1CQUNKLElBQUksRUFBRSxTQUFTLElBQ1osUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFFLENBQUM7SUFDcEYsSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==