// @ts-nocheck

// import _ensureDirSync from '../fs/ensureDirSync';
import _path from 'path';
import _findPackages from './findPackages';
import _childProcess from 'child_process';
import __fs from 'fs';
import __chalk from 'chalk';
import __packageRootDir from '../path/packageRootDir';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';

/**
 * @name            linkPackages
 * @namespace            node.monorepo
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function simply check all the packages available in the monorepo
 * and link then together using symbolic links in each node_modules folders
 *
 * @param       {Object}        [settings={}]         A settings object to configure your linking process
 * @return      {SPromise}                           A promise that will be resolved once the process is finished
 *
 * @setting     {String}      [rootDir=process.cwd()]       Specify the root directory from where to start the process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import linkPackages from '@coffeekraken/sugar/node/monorepo/linkPackages';
 * await linkPackages();
 *
 * @since       2.0.0
 * @author      Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
interface ILinkPackagesResolveRejectFn {
    (value: any): void;
}
interface ILinkPackagesEmitFn {
    (stack: string, value: any): any;
}
interface ILinkPackagesCancelFn {
    (value: any): any;
}
export default function linkPackages(
    params = {},
    settings = {},
): Promise<null> {
    settings = {
        rootDir: process.cwd(),
        ...settings,
    };
    params = {
        individual: false,
        ...params,
    };

    return new Promise(async (resolve, reject) => {
        // make sure we are in a package
        if (!__fs.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(
                `Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`,
            );
        }

        const topPackagePath = `${__packageRootDir(process.cwd(), true)}`;
        const topPackageJson = __readJsonSync(`${topPackagePath}/package.json`); // eslint-disable-line

        if (!params.individual) {
            // logs
            console.log(
                `\n${__chalk.yellow(topPackageJson.name)} ${
                    topPackageJson.license
                } (${__chalk.cyan(topPackageJson.version)})`,
            );
        }

        // search for packages of the monorepo
        const packagesObj = await _findPackages(settings.rootDir);
        // loop on each packages
        Object.keys(packagesObj).forEach((packagePath) => {
            // get json
            const packageJson = packagesObj[packagePath];

            if (params.individual) {
                // logs
                console.log(
                    `\n${__chalk.yellow(packageJson.name)} ${
                        packageJson.license
                    } (${__chalk.cyan(packageJson.version)})`,
                );
            }

            if (!params.individual) {
                const topPackageNodeModulesPath = `${topPackagePath}/node_modules`;
                const topPackageContainerPath = `${topPackageNodeModulesPath}${
                    packageJson.name.split('/').length >= 2
                        ? '/' + packageJson.name.split('/')[0]
                        : ''
                }`;
                const symlinkFolderName =
                    packageJson.name.split('/').length >= 2
                        ? packageJson.name.split('/')[1]
                        : packageJson.name;

                if (!__fs.existsSync(topPackageContainerPath)) {
                    __fs.mkdirSync(topPackageContainerPath, {
                        recursive: true,
                    });
                }

                const relPathToDestinationModule = _path.relative(
                    topPackageContainerPath,
                    packagePath,
                );

                _childProcess.execSync(
                    `cd ${topPackageContainerPath} && rm -rf ${symlinkFolderName} && ln -s ${relPathToDestinationModule} ${symlinkFolderName}`,
                );

                // logs
                console.log(
                    `- Symlinked package ${__chalk.green(packageJson.name)} ${
                        packageJson.license
                    } (${__chalk.cyan(packageJson.version)})`,
                );
            } else {
                // loop again in the packagesObj to create symlink in every
                // node_modules packages folders
                Object.keys(packagesObj).forEach((path) => {
                    if (packagePath === path) return; // avoid linking itself
                    const json = packagesObj[path];
                    if (
                        (packageJson.dependencies &&
                            Object.keys(packageJson.dependencies).includes(
                                json.name,
                            )) ||
                        (packageJson.devDependencies &&
                            Object.keys(packageJson.devDependencies).includes(
                                json.name,
                            ))
                    ) {
                    } else return;
                    const currentModulePath = `${settings.rootDir}/${packagePath}`;
                    const destinationModulePath = `${settings.rootDir}/${path}`;
                    const nodeModulesPath = `${currentModulePath}/node_modules`;
                    let symlinkFolderPath = nodeModulesPath;
                    const splitedName = json.name.split('/');
                    const groupFolder =
                        splitedName.length === 2 ? splitedName[0] : null;
                    if (groupFolder) {
                        if (
                            !__fs.existsSync(
                                `${nodeModulesPath}/${groupFolder}`,
                            )
                        ) {
                            __fs.mkdirSync(
                                `${nodeModulesPath}/${groupFolder}`,
                                {
                                    recursive: true,
                                },
                            );
                        }
                        symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
                    }
                    const nameFolder =
                        splitedName.length === 2
                            ? splitedName[1]
                            : splitedName[0];
                    const relPathToDestinationModule = _path.relative(
                        symlinkFolderPath,
                        destinationModulePath,
                    );
                    _childProcess.execSync(
                        `cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`,
                    );
                    // logs
                    console.log(
                        `- Symlinked package ${__chalk.green(json.name)} ${
                            json.license
                        } (${__chalk.cyan(json.version)})`,
                    );
                });
            }
        });
        // resolvee
        resolve();
    });
}
