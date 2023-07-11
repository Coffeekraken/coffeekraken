import __fs from 'fs';
import __glob from 'glob-all';
import __unique from '../../shared/array/unique.js';
import __packageRootDir from '../path/packageRootDir.js';
export default function listNodeModulesPackages(settings) {
    const finalSettings = Object.assign({ pathes: [`${__packageRootDir()}/node_modules`], monorepo: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.monorepo) {
        finalSettings.pathes.push(`${__packageRootDir(process.cwd(), {
            highest: true,
        })}/node_modules`);
    }
    const finalPaths = [];
    finalSettings.pathes.forEach((path) => {
        finalPaths.push(`${path}/*/package.json`);
        finalPaths.push(`${path}/*/*/package.json`);
    });
    finalSettings.pathes = __unique(finalSettings.pathes);
    const finalPackagesList = {};
    __glob.sync(finalPaths).forEach((path) => {
        let packageJson;
        try {
            packageJson = JSON.parse(__fs.readFileSync(path, 'utf8'));
        }
        catch (e) {
            console.log(path.toUpperCase());
            console.log(e);
        }
        if (packageJson) {
            if (!finalPackagesList[packageJson.name]) {
                finalPackagesList[packageJson.name] = packageJson;
            }
        }
    });
    return finalPackagesList;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFDOUIsT0FBTyxRQUFRLE1BQU0sOEJBQThCLENBQUM7QUFDcEQsT0FBTyxnQkFBZ0IsTUFBTSwyQkFBMkIsQ0FBQztBQThCekQsTUFBTSxDQUFDLE9BQU8sVUFBVSx1QkFBdUIsQ0FDM0MsUUFBb0Q7SUFFcEQsTUFBTSxhQUFhLEdBQUcsZ0JBQ2xCLE1BQU0sRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLEVBQzlDLFFBQVEsRUFBRSxLQUFLLElBQ1osQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtRQUN4QixhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDckIsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDL0IsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxlQUFlLENBQ3BCLENBQUM7S0FDTDtJQUVELE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztJQUVoQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksbUJBQW1CLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILGFBQWEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV0RCxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JDLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUk7WUFDQSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzdEO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEI7UUFDRCxJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7YUFDckQ7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxpQkFBaUIsQ0FBQztBQUM3QixDQUFDIn0=