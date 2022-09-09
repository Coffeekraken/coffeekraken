"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = __importDefault(require("child_process"));
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
const findPackages_1 = __importDefault(require("./findPackages"));
function linkPackages(params = {}, settings = {}) {
    settings = Object.assign({ rootDir: process.cwd() }, settings);
    params = Object.assign({ individual: false }, params);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // make sure we are in a package
        if (!fs_2.default.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
        }
        const topPackagePath = `${(0, packageRootDir_1.default)(process.cwd(), {
            highest: true,
        })}`;
        const topPackageJson = (0, fs_1.__readJsonSync)(`${topPackagePath}/package.json`); // eslint-disable-line
        if (!params.individual) {
            // logs
            console.log(`\n${chalk_1.default.yellow(topPackageJson.name)} ${topPackageJson.license} (${chalk_1.default.cyan(topPackageJson.version)})`);
        }
        // search for packages of the monorepo
        const packagesObj = yield (0, findPackages_1.default)(settings.rootDir);
        // loop on each packages
        Object.keys(packagesObj).forEach((packagePath) => {
            // get json
            const packageJson = packagesObj[packagePath];
            if (params.individual) {
                // logs
                console.log(`\n${chalk_1.default.yellow(packageJson.name)} ${packageJson.license} (${chalk_1.default.cyan(packageJson.version)})`);
            }
            if (!params.individual) {
                const topPackageNodeModulesPath = `${topPackagePath}/node_modules`;
                const topPackageContainerPath = `${topPackageNodeModulesPath}${packageJson.name.split('/').length >= 2
                    ? '/' + packageJson.name.split('/')[0]
                    : ''}`;
                const symlinkFolderName = packageJson.name.split('/').length >= 2
                    ? packageJson.name.split('/')[1]
                    : packageJson.name;
                if (!fs_2.default.existsSync(topPackageContainerPath)) {
                    fs_2.default.mkdirSync(topPackageContainerPath, {
                        recursive: true,
                    });
                }
                const relPathToDestinationModule = path_1.default.relative(topPackageContainerPath, packagePath);
                child_process_1.default.execSync(`cd ${topPackageContainerPath} && rm -rf ${symlinkFolderName} && ln -s ${relPathToDestinationModule} ${symlinkFolderName}`);
                // logs
                console.log(`- Symlinked package ${chalk_1.default.green(packageJson.name)} ${packageJson.license} (${chalk_1.default.cyan(packageJson.version)})`);
            }
            else {
                // loop again in the packagesObj to create symlink in every
                // node_modules packages folders
                Object.keys(packagesObj).forEach((path) => {
                    if (packagePath === path)
                        return; // avoid linking itself
                    const json = packagesObj[path];
                    if ((packageJson.dependencies &&
                        Object.keys(packageJson.dependencies).includes(json.name)) ||
                        (packageJson.devDependencies &&
                            Object.keys(packageJson.devDependencies).includes(json.name))) {
                    }
                    else
                        return;
                    const currentModulePath = `${settings.rootDir}/${packagePath}`;
                    const destinationModulePath = `${settings.rootDir}/${path}`;
                    const nodeModulesPath = `${currentModulePath}/node_modules`;
                    let symlinkFolderPath = nodeModulesPath;
                    const splitedName = json.name.split('/');
                    const groupFolder = splitedName.length === 2 ? splitedName[0] : null;
                    if (groupFolder) {
                        if (!fs_2.default.existsSync(`${nodeModulesPath}/${groupFolder}`)) {
                            fs_2.default.mkdirSync(`${nodeModulesPath}/${groupFolder}`, {
                                recursive: true,
                            });
                        }
                        symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
                    }
                    const nameFolder = splitedName.length === 2
                        ? splitedName[1]
                        : splitedName[0];
                    const relPathToDestinationModule = path_1.default.relative(symlinkFolderPath, destinationModulePath);
                    child_process_1.default.execSync(`cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`);
                    // logs
                    console.log(`- Symlinked package ${chalk_1.default.green(json.name)} ${json.license} (${chalk_1.default.cyan(json.version)})`);
                });
            }
        });
        // resolvee
        resolve();
    }));
}
exports.default = linkPackages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLCtDQUF3RDtBQUN4RCxrREFBNEI7QUFDNUIsa0VBQTBDO0FBQzFDLDRDQUFzQjtBQUN0QixnREFBeUI7QUFDekIsNEVBQXNEO0FBQ3RELGtFQUEyQztBQXNDM0MsU0FBd0IsWUFBWSxDQUNoQyxNQUFNLEdBQUcsRUFBRSxFQUNYLFFBQVEsR0FBRyxFQUFFO0lBRWIsUUFBUSxtQkFDSixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNuQixRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sbUJBQ0YsVUFBVSxFQUFFLEtBQUssSUFDZCxNQUFNLENBQ1osQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDekMsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sZUFBZSxDQUFDLEVBQUU7WUFDdEQsT0FBTyxNQUFNLENBQ1QseUNBQXlDLFFBQVEsQ0FBQyxPQUFPLHFFQUFxRSxDQUNqSSxDQUFDO1NBQ0w7UUFFRCxNQUFNLGNBQWMsR0FBRyxHQUFHLElBQUEsd0JBQWdCLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RELE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUMsRUFBRSxDQUFDO1FBQ0wsTUFBTSxjQUFjLEdBQUcsSUFBQSxtQkFBYyxFQUFDLEdBQUcsY0FBYyxlQUFlLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtRQUUvRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUNwQixPQUFPO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FDUCxLQUFLLGVBQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUNwQyxjQUFjLENBQUMsT0FDbkIsS0FBSyxlQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUMvQyxDQUFDO1NBQ0w7UUFFRCxzQ0FBc0M7UUFDdEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHNCQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELHdCQUF3QjtRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzdDLFdBQVc7WUFDWCxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFN0MsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO2dCQUNuQixPQUFPO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQ1AsS0FBSyxlQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFDakMsV0FBVyxDQUFDLE9BQ2hCLEtBQUssZUFBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDNUMsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLE1BQU0seUJBQXlCLEdBQUcsR0FBRyxjQUFjLGVBQWUsQ0FBQztnQkFDbkUsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLHlCQUF5QixHQUN4RCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLENBQUMsQ0FBQyxFQUNWLEVBQUUsQ0FBQztnQkFDSCxNQUFNLGlCQUFpQixHQUNuQixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBRTNCLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7b0JBQzNDLFlBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUU7d0JBQ3BDLFNBQVMsRUFBRSxJQUFJO3FCQUNsQixDQUFDLENBQUM7aUJBQ047Z0JBRUQsTUFBTSwwQkFBMEIsR0FBRyxjQUFLLENBQUMsUUFBUSxDQUM3Qyx1QkFBdUIsRUFDdkIsV0FBVyxDQUNkLENBQUM7Z0JBRUYsdUJBQWEsQ0FBQyxRQUFRLENBQ2xCLE1BQU0sdUJBQXVCLGNBQWMsaUJBQWlCLGFBQWEsMEJBQTBCLElBQUksaUJBQWlCLEVBQUUsQ0FDN0gsQ0FBQztnQkFFRixPQUFPO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQ1AsdUJBQXVCLGVBQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUNsRCxXQUFXLENBQUMsT0FDaEIsS0FBSyxlQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUM1QyxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsMkRBQTJEO2dCQUMzRCxnQ0FBZ0M7Z0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ3RDLElBQUksV0FBVyxLQUFLLElBQUk7d0JBQUUsT0FBTyxDQUFDLHVCQUF1QjtvQkFDekQsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQixJQUNJLENBQUMsV0FBVyxDQUFDLFlBQVk7d0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FDMUMsSUFBSSxDQUFDLElBQUksQ0FDWixDQUFDO3dCQUNOLENBQUMsV0FBVyxDQUFDLGVBQWU7NEJBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FDN0MsSUFBSSxDQUFDLElBQUksQ0FDWixDQUFDLEVBQ1I7cUJBQ0Q7O3dCQUFNLE9BQU87b0JBQ2QsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksV0FBVyxFQUFFLENBQUM7b0JBQy9ELE1BQU0scUJBQXFCLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUM1RCxNQUFNLGVBQWUsR0FBRyxHQUFHLGlCQUFpQixlQUFlLENBQUM7b0JBQzVELElBQUksaUJBQWlCLEdBQUcsZUFBZSxDQUFDO29CQUN4QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDekMsTUFBTSxXQUFXLEdBQ2IsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNyRCxJQUFJLFdBQVcsRUFBRTt3QkFDYixJQUNJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FDWixHQUFHLGVBQWUsSUFBSSxXQUFXLEVBQUUsQ0FDdEMsRUFDSDs0QkFDRSxZQUFJLENBQUMsU0FBUyxDQUNWLEdBQUcsZUFBZSxJQUFJLFdBQVcsRUFBRSxFQUNuQztnQ0FDSSxTQUFTLEVBQUUsSUFBSTs2QkFDbEIsQ0FDSixDQUFDO3lCQUNMO3dCQUNELGlCQUFpQixHQUFHLEdBQUcsaUJBQWlCLElBQUksV0FBVyxFQUFFLENBQUM7cUJBQzdEO29CQUNELE1BQU0sVUFBVSxHQUNaLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ2hCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sMEJBQTBCLEdBQUcsY0FBSyxDQUFDLFFBQVEsQ0FDN0MsaUJBQWlCLEVBQ2pCLHFCQUFxQixDQUN4QixDQUFDO29CQUNGLHVCQUFhLENBQUMsUUFBUSxDQUNsQixNQUFNLGlCQUFpQixjQUFjLFVBQVUsYUFBYSwwQkFBMEIsSUFBSSxVQUFVLEVBQUUsQ0FDekcsQ0FBQztvQkFDRixPQUFPO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQ1AsdUJBQXVCLGVBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUMzQyxJQUFJLENBQUMsT0FDVCxLQUFLLGVBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3JDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsV0FBVztRQUNYLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFsSkQsK0JBa0pDIn0=