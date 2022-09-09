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
import { __readJsonSync } from '@coffeekraken/sugar/fs';
import __chalk from 'chalk';
import _childProcess from 'child_process';
import __fs from 'fs';
import _path from 'path';
import __packageRootDir from '../path/packageRootDir';
import _findPackages from './findPackages';
export default function linkPackages(params = {}, settings = {}) {
    settings = Object.assign({ rootDir: process.cwd() }, settings);
    params = Object.assign({ individual: false }, params);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // make sure we are in a package
        if (!__fs.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
        }
        const topPackagePath = `${__packageRootDir(process.cwd(), {
            highest: true,
        })}`;
        const topPackageJson = __readJsonSync(`${topPackagePath}/package.json`); // eslint-disable-line
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
                        recursive: true,
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
                                recursive: true,
                            });
                        }
                        symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
                    }
                    const nameFolder = splitedName.length === 2
                        ? splitedName[1]
                        : splitedName[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxLQUFLLE1BQU0sTUFBTSxDQUFDO0FBQ3pCLE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFzQzNDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUNoQyxNQUFNLEdBQUcsRUFBRSxFQUNYLFFBQVEsR0FBRyxFQUFFO0lBRWIsUUFBUSxtQkFDSixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNuQixRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sbUJBQ0YsVUFBVSxFQUFFLEtBQUssSUFDZCxNQUFNLENBQ1osQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDekMsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sZUFBZSxDQUFDLEVBQUU7WUFDdEQsT0FBTyxNQUFNLENBQ1QseUNBQXlDLFFBQVEsQ0FBQyxPQUFPLHFFQUFxRSxDQUNqSSxDQUFDO1NBQ0w7UUFFRCxNQUFNLGNBQWMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0RCxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDLEVBQUUsQ0FBQztRQUNMLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxHQUFHLGNBQWMsZUFBZSxDQUFDLENB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