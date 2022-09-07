var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __renamePackage from '@coffeekraken/sugar/node/package/renamePackage';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
export default class SPackage extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(rootDir = __packageRoot(), settings) {
        super(__deepMerge(
        // @ts-ignore
        __SPackageSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        this._rootDir = rootDir;
    }
    _exportFiles(files, finalParams) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => {
            var _a;
            // @ts-ignore
            let mapedFiles = {};
            // process each exports
            files.forEach((fileRelPath) => {
                var _a;
                const relPath = fileRelPath;
                for (let [folder, platform] of Object.entries(finalParams.folderPlatformMap)) {
                    for (let [fold, module] of Object.entries(finalParams.folderModuleMap)) {
                        if (!((_a = mapedFiles[platform]) === null || _a === void 0 ? void 0 : _a[module]) &&
                            `/${relPath}`.includes(`/${fold}/`) &&
                            `/${relPath}`.includes(`/${folder}/`)) {
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
            let hasShared = mapedFiles.shared !== undefined, hasNode = mapedFiles.node !== undefined, hasJs = mapedFiles.js !== undefined;
            // if (Object.keys(mapedFiles).length === 1) {
            //     exportsMap.exports['.'] =
            //         mapedFiles[Object.keys(mapedFiles)[0]];
            // }
            let json = {};
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
            }
            else if (hasJs && !hasNode && hasShared) {
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
            }
            else if (!hasJs && hasNode && hasShared) {
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
            }
            else if (hasJs && !hasNode && !hasShared) {
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
            }
            else if (!hasJs && hasNode && !hasShared) {
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
            }
            else if (hasShared) {
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
            for (let [key, value] of Object.entries((_a = json === null || json === void 0 ? void 0 : json.exports) !== null && _a !== void 0 ? _a : {})) {
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
            let currentPackageJson = {};
            try {
                currentPackageJson = JSON.parse(__fs
                    .readFileSync(`${this._rootDir}/package.json`)
                    .toString());
                currentPackageJson.exports = {};
            }
            catch (e) { }
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
            __fs.writeFileSync(`${this._rootDir}/package.json`, JSON.stringify(newPackageJson, null, 4));
            resolve();
        }, {
            eventEmitter: {
                bind: this,
            },
        });
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
    exports(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SPackageExportsParamsInterface.apply(params);
            const packageJson = __packageJson(this._rootDir);
            // check if the "autoExports" exists and is at "false" to avoid exporting
            if (packageJson.autoExports === false) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<magenta>[exports]</magenta> This package "<yellow>${packageJson.name}</yellow>" is marked as "<cyan>autoExports</cyan>:<yellow>false</yellow> and will not generate the exports property automatically`,
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
                const watcherHandler = (filePath) => {
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
            if (!finalParams.watch ||
                (finalParams.watch && finalParams.buildInitial)) {
                yield pipe(this._exportFiles(files, finalParams));
            }
            // resolve is not watch
            !finalParams.watch && resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        }, {
            eventEmitter: {
                bind: this,
            },
        });
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
    install(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // @ts-ignore
            const finalParams = __SPackageInstallParamsInterface.apply(params);
            const packageRoot = this._rootDir;
            if (__fs.existsSync(`${packageRoot}/package.json`)) {
                const json = JSON.parse(__fs
                    .readFileSync(`${packageRoot}/package.json`)
                    .toString());
                if (Array.isArray(finalParams.dependencies)) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[install]</yellow> Adding default dependencies: <magenta>${finalParams.dependencies.join('<white>,</white> ')}</magenta>`,
                    });
                }
                else {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[install]</yellow> Adding default dependencies: <magenta>${Object.keys((_a = finalParams.dependencies) !== null && _a !== void 0 ? _a : {}).join('<white>,</white> ')}</magenta>`,
                    });
                    json.dependencies = Object.assign(Object.assign({}, json.dependencies), ((_b = finalParams.dependencies) !== null && _b !== void 0 ? _b : {}));
                    __fs.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 4));
                }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${finalParams.manager}</cyan>...`,
                });
                __childProcess.execSync(`${finalParams.manager} ${finalParams.manager === 'yarn'
                    ? 'add --quiet'
                    : 'install --no-warnings'} ${Array.isArray(finalParams.dependencies)
                    ? finalParams.dependencies.join(' ')
                    : ''}`, {
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
        }), {
            eventEmitter: {
                bind: this,
            },
        });
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
    checkDependencies(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // @ts-ignore
            const finalParams = __SPackageCheckDependenciesParamsInterface.apply(params);
            let result = true;
            let needJsonWrite = false;
            const missingModules = [];
            const packageRoot = this._rootDir;
            if (!__fs.existsSync(`${packageRoot}/package.json`)) {
                emit('log', {
                    type: __SLog.TYPE_ERROR,
                    value: `<red>[checkDependencies]</red> No <cyan>package.json</cyan> file found in the root of your package`,
                });
                return reject();
            }
            const packageJson = JSON.parse(__fs.readFileSync(`${packageRoot}/package.json`).toString());
            const ARRAY_OF_FILES_AND_DIRS_TO_CRUISE = finalParams.dirs.map((d) => __path.relative(packageRoot, d));
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
            const cruiseResult = cruise(ARRAY_OF_FILES_AND_DIRS_TO_CRUISE, {});
            for (let i = 0; 
            // @ts-ignore
            i < cruiseResult.output.modules.length; i++) {
                // filter
                // @ts-ignore
                const module = cruiseResult.output.modules[i];
                if (module.source.match(/^node_modules/))
                    continue;
                if (!module.source.match(/^[a-zA-Z0-9@]+/))
                    continue;
                if (!module.dependencies.length)
                    continue;
                // handle dependencies
                for (let j = 0; j < module.dependencies.length; j++) {
                    const dependency = module.dependencies[j];
                    if (dependency.coreModule)
                        continue;
                    if (dependency.module.match(/^\./))
                        continue;
                    let moduleName = dependency.module;
                    if (moduleName.match(/^@/)) {
                        moduleName = moduleName
                            .split('/')
                            .slice(0, 2)
                            .join('/');
                    }
                    else {
                        moduleName = moduleName.split('/')[0];
                    }
                    // check if the dependency is well defines in the package.json file
                    if (!((_a = packageJson.dependencies) === null || _a === void 0 ? void 0 : _a[moduleName]) &&
                        !((_b = packageJson.devDependencies) === null || _b === void 0 ? void 0 : _b[moduleName])) {
                        let addedFromPackagesMap = false;
                        // check packages map
                        for (let [pattern, version] of Object.entries(finalParams.packagesMap)) {
                            if (pattern.match(/^\^/) &&
                                moduleName.startsWith(pattern.slice(1))) {
                                packageJson.dependencies[moduleName] =
                                    version;
                                addedFromPackagesMap = true;
                            }
                            else if (pattern.match(/\$$/) &&
                                moduleName.endsWith(pattern.slice(0, -1))) {
                                packageJson.dependencies[moduleName] =
                                    version;
                                addedFromPackagesMap = true;
                            }
                            else if (pattern === moduleName) {
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
            if (missingModules.length &&
                finalParams.installMissing !== false) {
                if (finalParams.installMissing === true ||
                    (finalParams.installMissing === undefined &&
                        (yield emit('ask', {
                            type: 'confirm',
                            message: `${missingModules.length} package${missingModules.length > 1 ? 's' : ''} ${missingModules.length > 1 ? 'are' : 'is'} missing. Would you like to install ${missingModules.length > 1 ? 'them' : 'it'}?`,
                            default: true,
                        })))) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[checkDependencies]</yellow> Installing missing modules...`,
                    });
                    yield pipe(this.install({
                        dependencies: missingModules,
                    }));
                }
                else {
                    result = false;
                }
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[checkDependencies]</green> Dependencies have been checked <green>successfully</green>`,
            });
            resolve(result);
        }), {
            eventEmitter: {
                bind: this,
            },
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
    rename(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SPackageInstallParamsInterface.apply(params);
            if (!finalParams.name) {
                finalParams.name = yield emit('ask', {
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
        }), {
            eventEmitter: {
                bind: this,
            },
        });
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
    applyDefaultPackageJson(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // @ts-ignore
            const finalParams = __SPackageAddDefaultScriptsParamsInterface.apply(params);
            const packageRoot = __packageRoot();
            if (!__fs.existsSync(`${packageRoot}/package.json`)) {
                throw new Error(`[applyDefaultPackageJson] No package.json file found in the package root`);
            }
            // Adding README
            emit('log', {
                value: `<yellow>[applyDefaultPackageJson]</yellow> Applying <cyan>config.package.defaultPackageJson</cyan> to the package.json file`,
            });
            let json = JSON.parse(__fs.readFileSync(`${packageRoot}/package.json`).toString());
            json = __deepMerge(json, (_a = __SSugarConfig.get('package.defaultPackageJson')) !== null && _a !== void 0 ? _a : {});
            __fs.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 2));
            emit('log', {
                value: `<green>[applyDefaultPackageJson]</green> <cyan>config.package.defaultPackageJson</cyan> applied <green>successfully</green>`,
            });
            resolve({});
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sMENBQTBDLE1BQU0sNERBQTRELENBQUM7QUFDcEgsT0FBTywwQ0FBMEMsTUFBTSxzREFBc0QsQ0FBQztBQUM5RyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQXFFaEYsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsUUFBUTtJQU0xQzs7Ozs7Ozs7T0FRRztJQUNILFlBQ0ksVUFBa0IsYUFBYSxFQUFFLEVBQ2pDLFFBQXFDO1FBRXJDLEtBQUssQ0FDRCxXQUFXO1FBQ1AsYUFB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