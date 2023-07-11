var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fs from 'fs';
import __packageJsonSync from '../package/packageJsonSync.js';
import __packageRootDir from '../path/packageRootDir.js';
export default function addDependencies(dependencies, settings) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ cwd: process.cwd() }, settings);
        const packageJson = __packageJsonSync(settings.cwd), packageJsonPath = `${__packageRootDir(settings.cwd)}/package.json`;
        if (settings.dev) {
            if (!packageJson.devDependencies) {
                packageJson.devDependencies = dependencies;
            }
            else {
                packageJson.devDependencies = Object.assign(Object.assign({}, packageJson.devDependencies), dependencies);
            }
        }
        else {
            if (!packageJson.dependencies) {
                packageJson.dependencies = dependencies;
            }
            else {
                packageJson.dependencies = Object.assign(Object.assign({}, packageJson.dependencies), dependencies);
            }
        }
        // save the file back
        __fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
        resolve(packageJson);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGlCQUFpQixNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFtQ3pELE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUNuQyxZQUFvQyxFQUNwQyxRQUE4QztJQUU5QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsUUFBUSxtQkFDSixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNmLFFBQVEsQ0FDZCxDQUFDO1FBRUYsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUMvQyxlQUFlLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUV2RSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRTtnQkFDOUIsV0FBVyxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0gsV0FBVyxDQUFDLGVBQWUsbUNBQ3BCLFdBQVcsQ0FBQyxlQUFlLEdBQzNCLFlBQVksQ0FDbEIsQ0FBQzthQUNMO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFO2dCQUMzQixXQUFXLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQzthQUMzQztpQkFBTTtnQkFDSCxXQUFXLENBQUMsWUFBWSxtQ0FDakIsV0FBVyxDQUFDLFlBQVksR0FDeEIsWUFBWSxDQUNsQixDQUFDO2FBQ0w7U0FDSjtRQUVELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsYUFBYSxDQUNkLGVBQWUsRUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ3ZDLENBQUM7UUFFRixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==