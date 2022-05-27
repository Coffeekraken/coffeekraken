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
import __SPackageAddReadmeParamsInterface from './interface/SPackageAddReadmeParamsInterface';
import __SPackageAddDefaultScriptsParamsInterface from './interface/SPackageApplyDefaultPackageJsonParamsInterface';
import __SPackageCheckDependenciesParamsInterface from './interface/SPackageCheckDependenciesParamsInterface';
import __childProcess from 'child_process';
import __glob from 'glob';
import __SClass from '@coffeekraken/s-class';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import { cruise, IReporterOutput } from 'dependency-cruiser';

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
 * @param           {ISPackageCtorSettings}          [settings={}]           Some settings to configure your builder instance
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
    rootDir: string;
}

export interface ISPackageCtorSettings extends ISBuilderCtorSettings {
    package: Partial<ISPackageSettings>;
}

export interface ISPackageInstallParams {
    manager: 'npm' | 'yarn';
    dependencies: any;
}
export interface ISPackageInstallResult {}

export interface ISPackageCheckDependenciesParams {
    dirs: string[];
    installMissing: boolean | undefined;
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
     * @name            packageSettings
     * @type            ISPackageSettings
     * @get
     *
     * Access the package settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get packageSettings(): ISPackageSettings {
        return (<any>this)._settings.package;
    }

    /**
     * @name        rootDir
     * @type        String
     * @default     process.cwd()
     *
     * Store the package root directory
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    rootDir: string = process.cwd();

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
        rootDir: string = process.cwd(),
        settings?: Partial<ISPackageCtorSettings>,
    ) {
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
        this.rootDir = rootDir;
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
                    browser: Record<string, string>;
                    default: Record<string, string>;
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
                            .readFileSync(`${this.rootDir}/package.json`)
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
                    `${this.rootDir}/package.json`,
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
                const finalParams: ISPackageExportsParams = __SPackageExportsParamsInterface.apply(
                    params,
                );

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[exports]</yellow> Searching for exportable files...`,
                });

                const files = __glob.sync(finalParams.glob[0], {
                    cwd: this.rootDir,
                });

                if (finalParams.watch) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[exports]</yellow> Watching for exportable files changes...`,
                    });

                    const watcher = __chokidar.watch(finalParams.glob, {
                        cwd: this.rootDir,
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
                const finalParams: ISPackageInstallParams = __SPackageInstallParamsInterface.apply(
                    params,
                );

                const packageRoot = __packageRoot();

                if (__fs.existsSync(`${packageRoot}/package.json`)) {
                    const json = JSON.parse(
                        __fs
                            .readFileSync(`${packageRoot}/package.json`)
                            .toString(),
                    );

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
    ): Promise<ISPackageCheckDependenciesResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISPackageCheckDependenciesParams = __SPackageCheckDependenciesParamsInterface.apply(
                    params,
                );

                const missingModules: string[] = [];

                const packageRoot = __packageRoot();

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

                const ARRAY_OF_FILES_AND_DIRS_TO_CRUISE: string[] = finalParams.dirs.map(
                    (d) => __path.relative(packageRoot, d),
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

                if (
                    missingModules.length &&
                    finalParams.installMissing !== false
                ) {
                    if (
                        finalParams.installMissing === undefined &&
                        (await emit('ask', {
                            type: 'confirm',
                            message: `${missingModules.length} package(s) is/are missing. Would you like to install is/them?`,
                            default: true,
                        }))
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
                    }
                }

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[checkDependencies]</green> Dependencies have been checked <green>successfully</green>`,
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
     * @name            addReadme
     * @type            Function
     * @async
     *
     * This method allows you to add a readme to your package with informations about the coffeekraken
     * version used, etc...
     *
     * @param       {Partial<ISPackageAddReadmeParams>}          [params={}]         Some params for your add readme process
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the rename
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    addReadme(
        params: Partial<ISPackageAddReadmeParams>,
    ): Promise<ISPackageAddReadmeResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISPackageAddReadmeParams = __SPackageAddReadmeParamsInterface.apply(
                    params,
                );

                const packageRoot = __packageRoot();

                if (
                    __fs.existsSync(finalParams.path) &&
                    !(await emit('ask', {
                        type: 'confirm',
                        message:
                            'A README file already exists. Would you like to override it?',
                        default: true,
                    }))
                ) {
                    return resolve();
                }

                // Adding README
                emit('log', {
                    value: `<yellow>[addReadme]</yellow> Adding the <cyan>README.md</cyan> file to the package`,
                });

                // build source README.md file
                const builder = new __SMarkdownBuilder();
                const result = await builder.build({
                    inPath: __path.resolve(
                        __packageRoot(__dirname()),
                        'src/md/README.md',
                    ),
                    outPath: finalParams.path,
                });

                emit('log', {
                    value: `<green>[addReadme]</green> <cyan>README.md</cyan> added <green>successfully</green>`,
                });

                resolve({
                    file: __SFile.new(finalParams.path),
                });
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
                const finalParams: ISPackageAddDefaultPackageJsonParams = __SPackageAddDefaultScriptsParamsInterface.apply(
                    params,
                );

                const packageRoot = __packageRoot();

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
