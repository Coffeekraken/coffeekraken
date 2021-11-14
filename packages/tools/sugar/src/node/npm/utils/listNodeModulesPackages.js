import __packageRootDir from '../../path/packageRootDir';
import __glob from 'glob-all';
import __fs from 'fs';
import __unique from '../../../shared/array/unique';
export default function listNodeModulesPackages(settings) {
    const finalSettings = Object.assign({ pathes: [`${__packageRootDir()}/node_modules`], monorepo: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.monorepo) {
        finalSettings.pathes.push(`${__packageRootDir(process.cwd(), true)}/node_modules`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdE5vZGVNb2R1bGVzUGFja2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0Tm9kZU1vZHVsZXNQYWNrYWdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFnQixNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sTUFBTSxNQUFNLFVBQVUsQ0FBQztBQUM5QixPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxRQUFRLE1BQU0sOEJBQThCLENBQUM7QUE0QnBELE1BQU0sQ0FBQyxPQUFPLFVBQVUsdUJBQXVCLENBQzNDLFFBQW9EO0lBRXBELE1BQU0sYUFBYSxHQUFHLGdCQUNsQixNQUFNLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxFQUM5QyxRQUFRLEVBQUUsS0FBSyxJQUNaLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7UUFDeEIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3JCLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQzFELENBQUM7S0FDTDtJQUVELE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztJQUVoQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksbUJBQW1CLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILGFBQWEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV0RCxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JDLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUk7WUFDQSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzdEO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEI7UUFDRCxJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7YUFDckQ7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxpQkFBaUIsQ0FBQztBQUM3QixDQUFDIn0=