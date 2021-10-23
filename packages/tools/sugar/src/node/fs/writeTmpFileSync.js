// @ts-nocheck
import __writeFileSync from './writeFileSync';
import __require from '../esm/require';
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
function writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    const __packageTmpDir = __require('../path/packageTmpDir').default;
    let path = __path.resolve(__packageTmpDir(), (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
export default writeTmpFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVUbXBGaWxlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlVG1wRmlsZVN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sZUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sU0FBUyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFFBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQWtDbEQsU0FBUyxnQkFBZ0IsQ0FDckIsSUFBSSxFQUNKLFdBQStDLEVBQUU7O0lBRWpELFFBQVEsbUJBQ0osSUFBSSxFQUFFLFNBQVMsSUFDWixRQUFRLENBQ2QsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUVuRSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNyQixlQUFlLEVBQUUsRUFDakIsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQ3ZDLENBQUM7SUFDRixlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=