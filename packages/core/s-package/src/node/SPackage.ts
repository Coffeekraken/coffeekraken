import __SClass from '@coffeekraken/s-class';
import __SFile from '@coffeekraken/s-file';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import {
    __packageJsonSync,
    __renamePackage,
} from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __childProcess from 'child_process';
import __chokidar from 'chokidar';
import { cruise } from 'dependency-cruiser';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __SPackageAddDefaultScriptsParamsInterface from './interface/SPackageApplyDefaultPackageJsonParamsInterface';
import __SPackageCheckDependenciesParamsInterface from './interface/SPackageCheckDependenciesParamsInterface';
import __SPackageExportsParamsInterface from './interface/SPackageExportsParamsInterface';
import __SPackageInstallParamsInterface from './interface/SPackageInstallParamsInterface';
import __SPackageSettingsInterface from './interface/SPackageSettingsInterface';

/**
 * @name                SPackage
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a package (with a package.json) file. It let you manage some of your package routine easily like exporting in your package.json the files specified in the
 * `package.config.ts` configuration file, renaming your package with ease (folder, package.json, etc...), and more...
 *
 * @feature            Rename your package easily (folder, package.json, etc...)
 * @feature             Export your packages files in the package.json easily depending on the `package.config.ts` configuration exported file(s)
 * @feature         Install your dependencies easily using the `config.package.manager` configuration
 *
 * @param           {ISPackageSettings}          [settings={}]           Some settings to configure your builder instance
 *
 * @example         js
 * import SPackage from '@coffeekraken/s-package';
 * const builder = new SPackage({
 *      package: {
 *          // settings here...
 *      }
 * });
 * await package.exports();
 *
 * @see         https://www.npmjs.com/package/dependency-cruiser
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISPackageSettings {
    manager: 'yarn' | 'npm';
}

export interface ISPackageInstallParams {
    manager: 'npm' | 'yarn';
    dependencies: Record<string, string> | string[];
}
export interface ISPackageInstallResult {}

export interface ISPackageCheckDependenciesParams {
    dirs: string[];
    installMissing: boolean | undefined;
    packagesMap: { [key: string]: string };
}
export interface ISPackageCheckDependenciesResult {}

export interface ISPackageAddReadmeParams {
    path: string;
}
export interface ISPackageAddReadmeResult {
    file: __SFile;
}

export interface ISPackageAddDefaultPackageJsonParams {}
export interface ISPackageAddDefaultPackageJsonResult {}

export interface ISPackageExportsParams {
    watch: boolean;
    buildInitial: boolean;
    glob: string[] | string;
    folderModuleMap: Record<string, string>;
    folderPlatformMap: Record<string, string>;
}
export interface ISPackageExportsResult {}

export default class SPackage extends __SClass {
    /**
     * Store the root package directory
     */
    private _rootDir: string;

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        rootDir: string = __packageRootDir(),
        settings?: Partial<ISPackageSettings>,
    ) {
        super(
            __deepMerge(
                // @ts-ignore
                __SPackageSettingsInterface.defaults(),
                settings ?? {},
            ),
        );
        this._rootDir = rootDir;
    }

    _exportFiles(
        files: string[],
        finalParams: ISPackageExportsParams,
    ): Promise<void> {
        return new __SPromise(
            ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                let mapedFiles: {
                    node: Record<string, string>;
                    js: Record<string, string>;
                    shared: Record<string, string>;
                } = {};

                // process each exports
                files.forEach((fileRelPath) => {
                    const relPath = fileRelPath;

                    for (let [folder, platform] of Object.entries(
                        finalParams.folderPlatformMap,
                    )) {
                        for (let [fold, module] of Object.entries(
                            finalParams.folderModuleMap,
                        )) {
                            if (
                                !mapedFiles[platform]?.[module] &&
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

                // console.log(mapedFiles);

                let hasShared = mapedFiles.shared !== undefined,
                    hasNode = mapedFiles.node !== undefined,
                    hasJs = mapedFiles.js !== undefined;

                // if (Object.keys(mapedFiles).length === 1) {
                //     exportsMap.exports['.'] =
                //         mapedFiles[Object.keys(mapedFiles)[0]];
                // }

                let json: any = {};
                if (hasJs && hasNode) {
                    json = {
                        main: 'dist/pkg/cjs/js/exports.js',
                        module: 'dist/pkg/esm/js/exports.js',
                        exports: {
                            node: {
                                require: './dist/pkg/cjs/node/exports.js',
                                import: './dist/pkg/esm/node/exports.js',
                            },
                            default: {
                                require: './dist/pkg/cjs/js/exports.js',
                                import: './dist/pkg/esm/js/exports.js',
                            },
                        },
                    };
                } else if (hasJs && !hasNode && hasShared) {
                    json = {
                        main: 'dist/pkg/cjs/js/exports.js',
                        module: 'dist/pkg/esm/js/exports.js',
                        exports: {
                            node: {
                                require: './dist/pkg/cjs/shared/exports.js',
                                import: './dist/pkg/esm/shared/exports.js',
                            },
                            default: {
                                require: './dist/pkg/cjs/js/exports.js',
                                import: './dist/pkg/esm/js/exports.js',
                            },
                        },
                    };
                } else if (!hasJs && hasNode && hasShared) {
                    json = {
                        main: 'dist/pkg/cjs/shared/exports.js',
                        module: 'dist/pkg/esm/shared/exports.js',
                        exports: {
                            node: {
                                require: './dist/pkg/cjs/node/exports.js',
                                import: './dist/pkg/esm/node/exports.js',
                            },
                            default: {
                                require: './dist/pkg/cjs/shared/exports.js',
                                import: './dist/pkg/esm/shared/exports.js',
                            },
                        },
                    };
                } else if (hasJs && !hasNode && !hasShared) {
                    json = {
                        main: 'dist/pkg/cjs/js/exports.js',
                        module: 'dist/pkg/esm/js/exports.js',
                        exports: {
                            '.': {
                                require: './dist/pkg/cjs/js/exports.js',
                                import: './dist/pkg/esm/js/exports.js',
                            },
                        },
                    };
                } else if (!hasJs && hasNode && !hasShared) {
                    json = {
                        main: 'dist/pkg/cjs/node/exports.js',
                        module: 'dist/pkg/esm/node/exports.js',
                        exports: {
                            '.': {
                                require: './dist/pkg/cjs/node/exports.js',
                                import: './dist/pkg/esm/node/exports.js',
                            },
                        },
                    };
                } else if (hasShared) {
                    json = {
                        main: 'dist/pkg/cjs/shared/exports.js',
                        module: 'dist/pkg/esm/shared/exports.js',
                        exports: {
                            '.': {
                                require: './dist/pkg/cjs/shared/exports.js',
                                import: './dist/pkg/esm/shared/exports.js',
                            },
                        },
                    };
                }

                // check if we can export the global folders js/node/shared
                let canExportGlobal = true;
                for (let [key, value] of Object.entries(json?.exports ?? {})) {
                    if (!key.match(/^\./)) {
                        canExportGlobal = false;
                    }
                }
                if (canExportGlobal) {
                    json = __deepMerge(json, {
                        exports: {
                            './shared/*': {
                                require: './dist/pkg/cjs/shared/*.js',
                                import: './dist/pkg/esm/shared/*.js',
                            },
                            './node/*': {
                                require: './dist/pkg/cjs/node/*.js',
                                import: './dist/pkg/esm/node/*.js',
                            },
                            './js/*': {
                                require: './dist/pkg/cjs/js/*.js',
                                import: './dist/pkg/esm/js/*.js',
                            },
                        },
                    });
                }

                // updading package json
                let currentPackageJson: any = {};
                try {
                    currentPackageJson = JSON.parse(
                        __fs
                            .readFileSync(`${this._rootDir}/package.json`)
                            .toString(),
                    );
                    currentPackageJson.exports = {};
                } catch (e) {}

                const newPackageJson = __deepMerge(currentPackageJson, json);

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[exports]</yellow> Updating <cyan>package.json</cyan> file with new exports`,
                });

                JSON.stringify(json, null, 4)
                    .split('\n')
                    .forEach((line) => {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: line,
                        });
                    });

                // writing new file
                __fs.writeFileSync(
                    `${this._rootDir}/package.json`,
                    JSON.stringify(newPackageJson, null, 4),
                );

                resolve();
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
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
                const finalParams: ISPackageExportsParams =
                    __SPackageExportsParamsInterface.apply(params);

                const packageJson = __packageJsonSync(this._rootDir);

                // check if the "autoExports" exists and is at "false" to avoid exporting
                if (packageJson.autoExports === false) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<magenta>[exports]</magenta> The package "<yellow>${packageJson.name}</yellow>" is marked as "<cyan>autoExports</cyan>:<red>false</red>" and will not generate the exports property automatically`,
                    });
                    return resolve();
                }

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[exports]</yellow> Searching for exportable files...`,
                });

                const files = __glob.sync(finalParams.glob[0], {
                    cwd: this._rootDir,
                });

                if (finalParams.watch) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[exports]</yellow> Watching for exportable files changes...`,
                    });

                    const watcher = __chokidar.watch(finalParams.glob, {
                        cwd: this._rootDir,
                        ignoreInitial: true,
                    });
                    const watcherHandler = (filePath: string) => {
                        if (!files.includes(filePath)) {
                            files.push(filePath);
                        }
                        const pro = this._exportFiles(files, finalParams);
                        pipe(pro);
                    };
                    watcher.on('add', watcherHandler.bind(this));
                    watcher.on('change', watcherHandler.bind(this));
                }

                // export files
                if (
                    !finalParams.watch ||
                    (finalParams.watch && finalParams.buildInitial)
                ) {
                    await pipe(this._exportFiles(files, finalParams));
                }

                // resolve is not watch
                !finalParams.watch && resolve();
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
            {
                eventEmitter: {
                    bind: this,
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
    install(
        params: Partial<ISPackageInstallParams>,
    ): Promise<ISPackageInstallResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISPackageInstallParams =
                    __SPackageInstallParamsInterface.apply(params);

                const packageRoot = this._rootDir;

                if (__fs.existsSync(`${packageRoot}/package.json`)) {
                    const json = JSON.parse(
                        __fs
                            .readFileSync(`${packageRoot}/package.json`)
                            .toString(),
                    );

                    if (Array.isArray(finalParams.dependencies)) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[install]</yellow> Adding default dependencies: <magenta>${finalParams.dependencies.join(
                                '<white>,</white> ',
                            )}</magenta>`,
                        });
                    } else {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[install]</yellow> Adding default dependencies: <magenta>${Object.keys(
                                finalParams.dependencies ?? {},
                            ).join('<white>,</white> ')}</magenta>`,
                        });
                        json.dependencies = {
                            ...json.dependencies,
                            ...(finalParams.dependencies ?? {}),
                        };
                        __fs.writeFileSync(
                            `${packageRoot}/package.json`,
                            JSON.stringify(json, null, 4),
                        );
                    }

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${finalParams.manager}</cyan>...`,
                    });
                    __childProcess.execSync(
                        `${finalParams.manager} ${
                            finalParams.manager === 'yarn'
                                ? 'add --quiet'
                                : 'install --no-warnings'
                        } ${
                            Array.isArray(finalParams.dependencies)
                                ? finalParams.dependencies.join(' ')
                                : ''
                        }`,
                        {
                            cwd: packageRoot,
                        },
                    );
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
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }

    /**
     * @name            checkDependencies
     * @type            Function
     * @async
     *
     * This method allows you to check unused, missing dependencies in a package
     *
     * @param       {Partial<ISPackageCheckDependenciesParams>}          [params={}]         Some params for your check
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the check
     *
     * @see         https://www.npmjs.com/package/dependency-cruiser
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    checkDependencies(
        params: Partial<ISPackageCheckDependenciesParams>,
    ): Promise<boolean> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISPackageCheckDependenciesParams =
                    __SPackageCheckDependenciesParamsInterface.apply(params);

                let result = true;

                let needJsonWrite = false;

                const missingModules: string[] = [];

                const packageRoot = this._rootDir;

                if (!__fs.existsSync(`${packageRoot}/package.json`)) {
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        value: `<red>[checkDependencies]</red> No <cyan>package.json</cyan> file found in the root of your package`,
                    });
                    return reject();
                }

                const packageJson = JSON.parse(
                    __fs.readFileSync(`${packageRoot}/package.json`).toString(),
                );

                const ARRAY_OF_FILES_AND_DIRS_TO_CRUISE: string[] =
                    finalParams.dirs.map((d) =>
                        __path.relative(packageRoot, d),
                    );

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[checkDependencies]</yellow> Checking dependencies in these directories:`,
                });
                ARRAY_OF_FILES_AND_DIRS_TO_CRUISE.forEach((dirPath) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[checkDependencies]</yellow> - <cyan>${dirPath}</cyan>`,
                    });
                });

                const cruiseResult = cruise(
                    ARRAY_OF_FILES_AND_DIRS_TO_CRUISE,
                    {},
                );

                for (
                    let i = 0;
                    // @ts-ignore
                    i < cruiseResult.output.modules.length;
                    i++
                ) {
                    // filter
                    // @ts-ignore
                    const module = cruiseResult.output.modules[i];
                    if (module.source.match(/^node_modules/)) continue;
                    if (!module.source.match(/^[a-zA-Z0-9@]+/)) continue;
                    if (!module.dependencies.length) continue;

                    // handle dependencies
                    for (let j = 0; j < module.dependencies.length; j++) {
                        const dependency = module.dependencies[j];

                        if (dependency.coreModule) continue;
                        if (dependency.module.match(/^\./)) continue;
                        let moduleName = dependency.module;
                        if (moduleName.match(/^@/)) {
                            moduleName = moduleName
                                .split('/')
                                .slice(0, 2)
                                .join('/');
                        } else {
                            moduleName = moduleName.split('/')[0];
                        }
                        // check if the dependency is well defines in the package.json file
                        if (
                            !packageJson.dependencies?.[moduleName] &&
                            !packageJson.devDependencies?.[moduleName]
                        ) {
                            let addedFromPackagesMap = false;

                            // check packages map
                            for (let [pattern, version] of Object.entries(
                                finalParams.packagesMap,
                            )) {
                                if (
                                    pattern.match(/^\^/) &&
                                    moduleName.startsWith(pattern.slice(1))
                                ) {
                                    packageJson.dependencies[moduleName] =
                                        version;
                                    addedFromPackagesMap = true;
                                } else if (
                                    pattern.match(/\$$/) &&
                                    moduleName.endsWith(pattern.slice(0, -1))
                                ) {
                                    packageJson.dependencies[moduleName] =
                                        version;
                                    addedFromPackagesMap = true;
                                } else if (pattern === moduleName) {
                                    packageJson.dependencies[moduleName] =
                                        version;
                                    addedFromPackagesMap = true;
                                }
                            }

                            //
                            if (addedFromPackagesMap) {
                                emit('log', {
                                    type: __SLog.TYPE_INFO,
                                    value: `<yellow>[checkDependencies]</yellow> <magenta>${moduleName}</magenta> added from packages map`,
                                });
                                needJsonWrite = true;
                                continue;
                            }

                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<red>[checkDependencies]</red> Missing module "<magenta>${moduleName}</magenta>" in package.json used in "<cyan>${module.source}</cyan>"`,
                            });
                            if (!missingModules.includes(moduleName)) {
                                missingModules.push(moduleName);
                            }
                        }
                    }
                }

                // rewrite json
                if (needJsonWrite) {
                    __writeJsonSync(`${packageRoot}/package.json`, packageJson);
                }

                if (
                    missingModules.length &&
                    finalParams.installMissing !== false
                ) {
                    if (
                        finalParams.installMissing === true ||
                        (finalParams.installMissing === undefined &&
                            (await emit('ask', {
                                type: 'confirm',
                                message: `${missingModules.length} package${
                                    missingModules.length > 1 ? 's' : ''
                                } ${
                                    missingModules.length > 1 ? 'are' : 'is'
                                } missing. Would you like to install ${
                                    missingModules.length > 1 ? 'them' : 'it'
                                }?`,
                                default: true,
                            })))
                    ) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[checkDependencies]</yellow> Installing missing modules...`,
                        });
                        await pipe(
                            this.install({
                                dependencies: missingModules,
                            }),
                        );
                    } else {
                        result = false;
                    }
                }

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[checkDependencies]</green> Dependencies have been checked <green>successfully</green>`,
                });

                resolve(result);
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
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
    rename(
        params: Partial<ISPackageRenameParams>,
    ): Promise<ISPackageInstallResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISPackageRenameParams =
                    __SPackageInstallParamsInterface.apply(params);

                if (!finalParams.name) {
                    finalParams.name = await emit('ask', {
                        type: 'input',
                        message: 'Please enter the new name for your package',
                        pattern: '^[a-zA-Z0-9_@/-]+$',
                    });
                }

                // if (finalParams.folder === undefined) {
                //     finalParams.folder = await emit('ask', {
                //         type: 'confirm',
                //         message: 'Do you want to rename the folder as well ?',
                //         default: true,
                //     });
                // }

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
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }

    /**
     * @name            applyDefaultPackageJson
     * @type            Function
     * @async
     *
     * This method allows you to apply the default package.json to your package.
     *
     * @param       {Partial<ISPackageAddDefaultPackageJsonParams>}          [params={}]         Some params for your add default package json process
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the rename
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    applyDefaultPackageJson(
        params: Partial<ISPackageAddDefaultPackageJsonParams>,
    ): Promise<ISPackageAddDefaultPackageJsonResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISPackageAddDefaultPackageJsonParams =
                    __SPackageAddDefaultScriptsParamsInterface.apply(params);

                const packageRoot = __packageRootDir();

                if (!__fs.existsSync(`${packageRoot}/package.json`)) {
                    throw new Error(
                        `[applyDefaultPackageJson] No package.json file found in the package root`,
                    );
                }

                // Adding README
                emit('log', {
                    value: `<yellow>[applyDefaultPackageJson]</yellow> Applying <cyan>config.package.defaultPackageJson</cyan> to the package.json file`,
                });

                let json = JSON.parse(
                    __fs.readFileSync(`${packageRoot}/package.json`).toString(),
                );
                json = __deepMerge(
                    json,
                    __SSugarConfig.get('package.defaultPackageJson') ?? {},
                );
                __fs.writeFileSync(
                    `${packageRoot}/package.json`,
                    JSON.stringify(json, null, 2),
                );

                emit('log', {
                    value: `<green>[applyDefaultPackageJson]</green> <cyan>config.package.defaultPackageJson</cyan> applied <green>successfully</green>`,
                });

                resolve({});
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }
}
