import { __packageRootDir } from '@coffeekraken/sugar/path';
import __resolvePackagePath from 'resolve-package-path';
export default function resolvePackagePath(pkg, settings) {
    var _a;
    const finalSettings = Object.assign({ nodeModulesDir: `${__packageRootDir()}/node_modules` }, settings !== null && settings !== void 0 ? settings : {});
    return (_a = __resolvePackagePath(pkg, finalSettings.nodeModulesDir)) === null || _a === void 0 ? void 0 : _a.replace(/\/package\.json$/, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUE4QnhELE1BQU0sQ0FBQyxPQUFPLFVBQVUsa0JBQWtCLENBQ3RDLEdBQVcsRUFDWCxRQUErQzs7SUFFL0MsTUFBTSxhQUFhLG1CQUNmLGNBQWMsRUFBRSxHQUFHLGdCQUFnQixFQUFFLGVBQWUsSUFDakQsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNwQixDQUFBO0lBQ0QsT0FBTyxNQUFBLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRyxDQUFDIn0=