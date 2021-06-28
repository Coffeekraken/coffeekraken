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
// import _ensureDirSync from '../fs/ensureDirSync';
import _path from 'path';
import _findPackages from './findPackages';
import _childProcess from 'child_process';
import __fs from 'fs';
import __chalk from 'chalk';
import __packageRootDir from '../path/packageRootDir';
export default function linkPackages(params = {}, settings = {}) {
    settings = Object.assign({ rootDir: process.cwd() }, settings);
    params = Object.assign({ individual: false }, params);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // make sure we are in a package
        if (!__fs.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
        }
        const topPackagePath = `${__packageRootDir(process.cwd(), true)}`;
        const topPackageJson = require(`${topPackagePath}/package.json`); // eslint-disable-line
        if (!params.individual) {
            // logs
            console.log(`\n${__chalk.yellow(topPackageJson.name)} ${topPackageJson.license} (${__chalk.cyan(topPackageJson.version)})`);
        }
        // search for packages of the monorepo
        const packagesObj = yield _findPackages(settings.rootDir);
        // loop on each packages
        Object.keys(packagesObj).forEach((packagePath) => {
            // get json
            const packageJson = packagesObj[packagePath];
            if (params.individual) {
                // logs
                console.log(`\n${__chalk.yellow(packageJson.name)} ${packageJson.license} (${__chalk.cyan(packageJson.version)})`);
            }
            if (!params.individual) {
                const topPackageNodeModulesPath = `${topPackagePath}/node_modules`;
                const topPackageContainerPath = `${topPackageNodeModulesPath}${packageJson.name.split('/').length >= 2
                    ? '/' + packageJson.name.split('/')[0]
                    : ''}`;
                const symlinkFolderName = packageJson.name.split('/').length >= 2
                    ? packageJson.name.split('/')[1]
                    : packageJson.name;
                if (!__fs.existsSync(topPackageContainerPath)) {
                    __fs.mkdirSync(topPackageContainerPath, {
                        recursive: true
                    });
                }
                const relPathToDestinationModule = _path.relative(topPackageContainerPath, packagePath);
                _childProcess.execSync(`cd ${topPackageContainerPath} && rm -rf ${symlinkFolderName} && ln -s ${relPathToDestinationModule} ${symlinkFolderName}`);
                // logs
                console.log(`- Symlinked package ${__chalk.green(packageJson.name)} ${packageJson.license} (${__chalk.cyan(packageJson.version)})`);
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
                        if (!__fs.existsSync(`${nodeModulesPath}/${groupFolder}`)) {
                            __fs.mkdirSync(`${nodeModulesPath}/${groupFolder}`, {
                                recursive: true
                            });
                        }
                        symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
                    }
                    const nameFolder = splitedName.length === 2 ? splitedName[1] : splitedName[0];
                    const relPathToDestinationModule = _path.relative(symlinkFolderPath, destinationModulePath);
                    _childProcess.execSync(`cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`);
                    // logs
                    console.log(`- Symlinked package ${__chalk.green(json.name)} ${json.license} (${__chalk.cyan(json.version)})`);
                });
            }
        });
        // resolvee
        resolve();
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua1BhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlua1BhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxvREFBb0Q7QUFDcEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxDQUFDO0FBQ3pCLE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUF1Q3RELE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUNsQyxNQUFNLEdBQUcsRUFBRSxFQUNYLFFBQVEsR0FBRyxFQUFFO0lBRWIsUUFBUSxtQkFDTixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNuQixRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sbUJBQ0osVUFBVSxFQUFFLEtBQUssSUFDZCxNQUFNLENBQ1YsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDM0MsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sZUFBZSxDQUFDLEVBQUU7WUFDeEQsT0FBTyxNQUFNLENBQ1gseUNBQXlDLFFBQVEsQ0FBQyxPQUFPLHFFQUFxRSxDQUMvSCxDQUFDO1NBQ0g7UUFFRCxNQUFNLGNBQWMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xFLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLGNBQWMsZUFBZSxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFFeEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDdEIsT0FBTztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQ1QsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFDdEMsY0FBYyxDQUFDLE9BQ2pCLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDN0MsQ0FBQztTQUNIO1FBRUQsc0NBQXNDO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLE1BQU0sYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCx3QkFBd0I7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUMvQyxXQUFXO1lBQ1gsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTdDLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtnQkFDckIsT0FBTztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUNULEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQ25DLFdBQVcsQ0FBQyxPQUNkLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDMUMsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RCLE1BQU0seUJBQXlCLEdBQUcsR0FBRyxjQUFjLGVBQWUsQ0FBQztnQkFDbkUsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLHlCQUF5QixHQUMxRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDckMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLENBQUMsQ0FBQyxFQUNOLEVBQUUsQ0FBQztnQkFDSCxNQUFNLGlCQUFpQixHQUNyQixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDckMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUU7d0JBQ3RDLFNBQVMsRUFBRSxJQUFJO3FCQUNoQixDQUFDLENBQUM7aUJBQ0o7Z0JBRUQsTUFBTSwwQkFBMEIsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUMvQyx1QkFBdUIsRUFDdkIsV0FBVyxDQUNaLENBQUM7Z0JBRUYsYUFBYSxDQUFDLFFBQVEsQ0FDcEIsTUFBTSx1QkFBdUIsY0FBYyxpQkFBaUIsYUFBYSwwQkFBMEIsSUFBSSxpQkFBaUIsRUFBRSxDQUMzSCxDQUFDO2dCQUVGLE9BQU87Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FDVCx1QkFBdUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQ3BELFdBQVcsQ0FBQyxPQUNkLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDMUMsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLDJEQUEyRDtnQkFDM0QsZ0NBQWdDO2dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUN4QyxJQUFJLFdBQVcsS0FBSyxJQUFJO3dCQUFFLE9BQU8sQ0FBQyx1QkFBdUI7b0JBQ3pELE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0IsSUFDRSxDQUFDLFdBQVcsQ0FBQyxZQUFZO3dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM1RCxDQUFDLFdBQVcsQ0FBQyxlQUFlOzRCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQy9EO3FCQUNEOzt3QkFBTSxPQUFPO29CQUNkLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO29CQUMvRCxNQUFNLHFCQUFxQixHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDNUQsTUFBTSxlQUFlLEdBQUcsR0FBRyxpQkFBaUIsZUFBZSxDQUFDO29CQUM1RCxJQUFJLGlCQUFpQixHQUFHLGVBQWUsQ0FBQztvQkFDeEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDckUsSUFBSSxXQUFXLEVBQUU7d0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxlQUFlLElBQUksV0FBVyxFQUFFLENBQUMsRUFBRTs0QkFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGVBQWUsSUFBSSxXQUFXLEVBQUUsRUFBRTtnQ0FDbEQsU0FBUyxFQUFFLElBQUk7NkJBQ2hCLENBQUMsQ0FBQzt5QkFDSjt3QkFDRCxpQkFBaUIsR0FBRyxHQUFHLGlCQUFpQixJQUFJLFdBQVcsRUFBRSxDQUFDO3FCQUMzRDtvQkFDRCxNQUFNLFVBQVUsR0FDZCxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdELE1BQU0sMEJBQTBCLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FDL0MsaUJBQWlCLEVBQ2pCLHFCQUFxQixDQUN0QixDQUFDO29CQUNGLGFBQWEsQ0FBQyxRQUFRLENBQ3BCLE1BQU0saUJBQWlCLGNBQWMsVUFBVSxhQUFhLDBCQUEwQixJQUFJLFVBQVUsRUFBRSxDQUN2RyxDQUFDO29CQUNGLE9BQU87b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FDVCx1QkFBdUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQzdDLElBQUksQ0FBQyxPQUNQLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkMsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxXQUFXO1FBQ1gsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9