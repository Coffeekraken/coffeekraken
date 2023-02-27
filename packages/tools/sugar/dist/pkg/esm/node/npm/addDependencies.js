var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQW1DdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlLENBQ25DLFlBQW9DLEVBQ3BDLFFBQThDO0lBRTlDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxRQUFRLG1CQUNKLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQ2YsUUFBUSxDQUNkLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQy9DLGVBQWUsR0FBRyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBRXZFLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFO2dCQUM5QixXQUFXLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxXQUFXLENBQUMsZUFBZSxtQ0FDcEIsV0FBVyxDQUFDLGVBQWUsR0FDM0IsWUFBWSxDQUNsQixDQUFDO2FBQ0w7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQzNCLFdBQVcsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2FBQzNDO2lCQUFNO2dCQUNILFdBQVcsQ0FBQyxZQUFZLG1DQUNqQixXQUFXLENBQUMsWUFBWSxHQUN4QixZQUFZLENBQ2xCLENBQUM7YUFDTDtTQUNKO1FBRUQscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxhQUFhLENBQ2QsZUFBZSxFQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDdkMsQ0FBQztRQUVGLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9