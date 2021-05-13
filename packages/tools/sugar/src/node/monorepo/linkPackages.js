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
import __packageRoot from '../path/packageRoot';
export default function linkPackages(params = {}, settings = {}) {
    settings = Object.assign({ rootDir: process.cwd() }, settings);
    params = Object.assign({ individual: false }, params);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // make sure we are in a package
        if (!__fs.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
        }
        const topPackagePath = `${__packageRoot(process.cwd(), true)}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua1BhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlua1BhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxvREFBb0Q7QUFDcEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxDQUFDO0FBQ3pCLE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBcUNoRCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FDbEMsTUFBTSxHQUFHLEVBQUUsRUFDWCxRQUFRLEdBQUcsRUFBRTtJQUViLFFBQVEsbUJBQ04sT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFDbkIsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLG1CQUNKLFVBQVUsRUFBRSxLQUFLLElBQ2QsTUFBTSxDQUNWLENBQUM7SUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzNDLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLGVBQWUsQ0FBQyxFQUFFO1lBQ3hELE9BQU8sTUFBTSxDQUNYLHlDQUF5QyxRQUFRLENBQUMsT0FBTyxxRUFBcUUsQ0FDL0gsQ0FBQztTQUNIO1FBRUQsTUFBTSxjQUFjLEdBQUcsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDL0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsY0FBYyxlQUFlLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtRQUV4RixJQUFJLENBQUMsTUFBTSxDQUFDLFVB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