import __resolvePackagePath from 'resolve-package-path';
import __packageRootDir from '../path/packageRootDir.js';
export default function resolvePackagePath(pkg, settings) {
    var _a;
    const finalSettings = Object.assign({ nodeModulesDir: `${__packageRootDir()}/node_modules` }, (settings !== null && settings !== void 0 ? settings : {}));
    return (_a = __resolvePackagePath(pkg, finalSettings.nodeModulesDir)) === null || _a === void 0 ? void 0 : _a.replace(/\/package\.json$/, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxnQkFBZ0IsTUFBTSwyQkFBMkIsQ0FBQztBQThCekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsR0FBVyxFQUNYLFFBQStDOztJQUUvQyxNQUFNLGFBQWEsbUJBQ2YsY0FBYyxFQUFFLEdBQUcsZ0JBQWdCLEVBQUUsZUFBZSxJQUNqRCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBQ0YsT0FBTyxNQUFBLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLDBDQUFFLE9BQU8sQ0FDbkUsa0JBQWtCLEVBQ2xCLEVBQUUsQ0FDTCxDQUFDO0FBQ04sQ0FBQyJ9