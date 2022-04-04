import type { ISBuilderCtorSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob/src/node/exports';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __chokidar from 'chokidar';
import __renamePackage from '@coffeekraken/sugar/node/package/renamePackage';
import __fs from 'fs';
import __path from 'path';
import __ts from 'typescript';
import __SPackageExportsParamsInterface from './interface/SPackageExportsParamsInterface';
import __SPackageInstallParamsInterface from './interface/SPackageInstallParamsInterface';
import __childProcess from 'child_process';
import __glob from 'glob';
import __SClass from '@coffeekraken/s-class';

/**
 * @name                SMonorepo
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a monorepo with some features like executing a command on all packages, list all the packages, upgrade each package's package.json, etc...
 *
 *
 *
 * @param           {ISMonorepoCtorSettings}          [settings={}]           Some settings to configure your builder instance
 *
 * @example         js
 * import SPackage from '@coffeekraken/s-postcss-builder';
 * const builder = new SPackage({
 *      package: {
 *          // settings here...
 *      }
 * });
 * await builder.build({
 *      input: 'my-cool-file.css',
 *      output: 'my/cool/file-output.css'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISMonorepoSettings {
    manager: 'yarn' | 'npm';
}

export interface ISMonorepoCtorSettings {
    monorepo: Partial<ISMonorepoSettings>;
}

export interface ISPackageExportsParams {
    glob: string[] | string;
    inDir: string;
    folderModuleMap: Record<string, string>;
    folderPlatformMap: Record<string, string>;
}

export default class SPackage extends __SClass {
    /**
     * @name            monorepoSettings
     * @type            ISMonorepoSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get monorepoSettings(): ISMonorepoSettings {
        return (<any>this)._settings.monorepo;
    }

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISMonorepoCtorSettings>) {
        super(
            __deepMerge(
                {
                    package: {
                        ...__SSugarConfig.get('package'),
                    },
                },
                settings ?? {},
            ),
        );
    }

    /**
     * @name            exports
     * @type            Function
     * @async
     *
     * This method allows you to search for "exportable" files defined in params and export them in the package.json file.
     *
     * @param       {Partial<ISPackageExportsParams>}          [params={}]         Some params for your exports
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the exports
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    exports(params: ISPackageExportsParams): Promise<ISPackageExportsResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISPackageExportsParams = __SPackageExportsParamsInterface.apply(
                    params,
                );

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[exports]</yellow> Searching for exportable files...`,
                });

                const files = __glob.sync(finalParams.glob[0], {
                    cwd: finalParams.inDir,
                });

                const packageRoot = __packageRoot();

                // @ts-ignore
                let mapedFiles: {
                    node: Record<string, string>;
                    browser: Record<string, string>;
                    default: Record<string, string>;
                } = {};

                // process each exports
                files.forEach((fileRelPath) => {
                    const relPath = `${finalParams.inDir}/${fileRelPath}`.replace(
                        `${packageRoot}/`,
                        '',
                    );

                    for (let [folder, platform] of Object.entries(
                        finalParams.folderPlatformMap,
                    )) {
                        for (let [fold, module] of Object.entries(
                            finalParams.folderModuleMap,
                        )) {
                            if (
                                `/${relPath}`.includes(`/${fold}/`) &&
                                `/${relPath}`.includes(`/${folder}/`)
                            ) {
                                if (!mapedFiles[platform]) {
                                    mapedFiles[platform] = {};
                                }
                                mapedFiles[platform][module] = `./${relPath}`;
                            }
                        }
                    }
                });

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[exports]</yellow> Generating new exports object map...`,
                });

                // @ts-ignore
                const exportsMap: {
                    main: string;
                    module: string;
                    exports: Record<string, string>;
                } = {};

                if (Object.keys(mapedFiles).length === 1) {
                    if (!exportsMap.exports) exportsMap.exports = {};
                    exportsMap.exports['.'] =
                        mapedFiles[Object.keys(mapedFiles)[0]];
                }
                if (mapedFiles.default) {
                    if (mapedFiles.default.require) {
                        exportsMap.main = mapedFiles.default.require;
                    }
                    if (mapedFiles.default.import) {
                        exportsMap.module = mapedFiles.default.import;
                    }
                } else if (mapedFiles.node) {
                    if (mapedFiles.node.require) {
                        exportsMap.main = mapedFiles.node.require;
                    }
                    if (mapedFiles.node.import) {
                        exportsMap.module = mapedFiles.node.import;
                    }
                } else if (mapedFiles.browser) {
                    if (mapedFiles.browser.require) {
                        exportsMap.main = mapedFiles.browser.require;
                    }
                    if (mapedFiles.browser.import) {
                        exportsMap.module = mapedFiles.browser.import;
                    }
                }

                // updading package json
                let currentPackageJson = {};
                try {
                    currentPackageJson = JSON.parse(
                        __fs
                            .readFileSync(`${packageRoot}/package.json`)
                            .toString(),
                    );
                } catch (e) {}

                const newPackageJson = {
                    ...currentPackageJson,
                    ...exportsMap,
                };

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[exports]</yellow> Updating <cyan>package.json</cyan> file with new exports`,
                });

                JSON.stringify(exportsMap, null, 2)
                    .split('\n')
                    .forEach((line) => {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: line,
                        });
                    });

                // writing new file
                __fs.writeFileSync(
                    `${packageRoot}/package.json`,
                    JSON.stringify(newPackageJson, null, 4),
                );

                resolve();
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }

    /**
     * @name            install
     * @type            Function
     * @async
     *
     * This method allows you to install dependencies in a package
     *
     * @param       {Partial<ISPackageInstallParams>}          [params={}]         Some params for your install
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the install
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    install(params: ISPackageInstallParams): Promise<ISPackageInstallResult> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            // @ts-ignore
            const finalParams: ISPackageInstallParams = __SPackageInstallParamsInterface.apply(
                params,
            );

            const packageRoot = __packageRoot();

            if (__fs.existsSync(`${packageRoot}/package.json`)) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${finalParams.manager}</cyan>...`,
                });
                __childProcess.execSync(`${finalParams.manager} install`, {
                    cwd: packageRoot,
                });
            }

            if (__fs.existsSync(`${packageRoot}/composer.json`)) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`,
                });
                __childProcess.execSync('composer install', {
                    cwd: packageRoot,
                });
            }

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[install]</green> Dependencies have been installed <green>successfully</green>`,
            });

            resolve();
        });
    }

    /**
     * @name            rename
     * @type            Function
     * @async
     *
     * This method allows you to rename a package (folder, package.json, composer.json, etc...)
     *
     * @param       {Partial<ISPackageRenameParams>}          [params={}]         Some params for your rename
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the rename
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    rename(params: ISPackageRenameParams): Promise<ISPackageInstallResult> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            // @ts-ignore
            const finalParams: ISPackageRenameParams = __SPackageInstallParamsInterface.apply(
                params,
            );

            if (!finalParams.name) {
                finalParams.name = await emit('ask', {
                    type: 'input',
                    message: 'Please enter the new name for your package',
                    pattern: '^[a-zA-Z0-9_@/-]+$',
                });
            }

            if (finalParams.folder === undefined) {
                finalParams.folder = await emit('ask', {
                    type: 'confirm',
                    message: 'Do you want to rename the folder as well ?',
                    default: true,
                });
            }

            // rename package
            emit('log', {
                value: `<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`,
            });

            __renamePackage(finalParams.name);

            if (finalParams.folder) {
                const folderName = finalParams.name.split('/').pop();
                emit('log', {
                    value: `<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`,
                });
                const newPath = `${process
                    .cwd()
                    .split('/')
                    .slice(0, -1)
                    .join('/')}/${folderName}`;
                __fs.renameSync(process.cwd(), newPath);
                process.chdir(newPath);
                emit('chdir', newPath);
            }

            resolve();
        });
    }
}
