// @ts-nocheck
import __writeFileSync from './writeFileSync';
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import __packageTmpDir from '../path/packageTmpDir';
function writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), 'files', (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
export default writeTmpFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVUbXBGaWxlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlVG1wRmlsZVN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sZUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBRTlDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFFBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRCxPQUFPLGVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQWlDcEQsU0FBUyxnQkFBZ0IsQ0FDckIsSUFBSSxFQUNKLFdBQStDLEVBQUU7O0lBRWpELFFBQVEsbUJBQ0osSUFBSSxFQUFFLFNBQVMsSUFDWixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ3JCLGVBQWUsRUFBRSxFQUNqQixPQUFPLEVBQ1AsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQ3ZDLENBQUM7SUFDRixlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=