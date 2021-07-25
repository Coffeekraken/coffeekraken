// @ts-nocheck
import __writeFileSync from './writeFileSync';
import __packageTmpDir from '../path/packageTmpDir';
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import __replacePathTokens from '../path/replacePathTokens';
function writeTmpFile(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    path = __replacePathTokens(path);
    __writeFileSync(path, data);
    return path;
}
export default writeTmpFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVUbXBGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVUbXBGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLGVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxtQkFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQXNDNUQsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLFdBQTJDLEVBQUU7O0lBRXJFLFFBQVEsbUJBQ0osSUFBSSxFQUFFLFNBQVMsSUFDWixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUUsQ0FBQztJQUN0RixJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxZQUFZLENBQUMifQ==