import __fs from 'fs';
import __glob from 'glob';
import __unique from '../../shared/array/unique.js';
import __listDependenciesFromString from '../../shared/dependencies/listDependenciesFromString.js';
import __isGlob from '../../shared/is/isGlob.js';
export default function __listDependenciesFromFiles(glob, settings) {
    var _a;
    if (!Array.isArray(glob))
        glob = [glob];
    const files = __glob.sync(glob
        .map((g) => {
        if (!__isGlob(g)) {
            return `${g}/**/*.{js,ts,jsx,tsx}`;
        }
        return g;
    })
        .join(','), {
        cwd: (_a = settings === null || settings === void 0 ? void 0 : settings.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
        nodir: true,
        absolute: true,
    });
    let dependencies = [];
    for (let [i, filePath] of files.entries()) {
        const content = __fs.readFileSync(filePath).toString();
        const fileDependencies = __listDependenciesFromString(content, settings);
        dependencies = [...dependencies, ...fileDependencies];
    }
    return __unique(dependencies);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sOEJBQThCLENBQUM7QUFDcEQsT0FBTyw0QkFBNEIsTUFBTSx5REFBeUQsQ0FBQztBQUNuRyxPQUFPLFFBQVEsTUFBTSwyQkFBMkIsQ0FBQztBQW9DakQsTUFBTSxDQUFDLE9BQU8sVUFBVSwyQkFBMkIsQ0FDL0MsSUFBdUIsRUFDdkIsUUFBNkM7O0lBRTdDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQ3JCLElBQUk7U0FDQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZCxPQUFPLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztTQUN0QztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNkO1FBQ0ksR0FBRyxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsbUNBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxLQUFLLEVBQUUsSUFBSTtRQUNYLFFBQVEsRUFBRSxJQUFJO0tBQ2pCLENBQ0osQ0FBQztJQUVGLElBQUksWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUVoQyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkQsTUFBTSxnQkFBZ0IsR0FBRyw0QkFBNEIsQ0FDakQsT0FBTyxFQUNQLFFBQVEsQ0FDWCxDQUFDO1FBQ0YsWUFBWSxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQsT0FBTyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsQ0FBQyJ9