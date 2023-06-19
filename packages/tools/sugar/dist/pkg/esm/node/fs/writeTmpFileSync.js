// @ts-nocheck
import __path from 'path';
import __uniqid from '../../node/string/uniqid';
import __packageTmpDir from '../path/packageTmpDir';
import __writeFileSync from './writeFileSync';
export default function __writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__packageTmpDir(), 'files', (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, data);
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sMEJBQTBCLENBQUM7QUFDaEQsT0FBTyxlQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUFtQzlDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsa0JBQWtCLENBQ3RDLElBQUksRUFDSixXQUErQyxFQUFFOztJQUVqRCxRQUFRLG1CQUNKLElBQUksRUFBRSxTQUFTLElBQ1osUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNyQixlQUFlLEVBQUUsRUFDakIsT0FBTyxFQUNQLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUN2QyxDQUFDO0lBQ0YsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=