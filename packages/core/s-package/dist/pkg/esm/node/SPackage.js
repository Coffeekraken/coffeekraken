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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageJsonSync, __renamePackageSync, } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __childProcess from 'child_process';
import __chokidar from 'chokidar';
import { cruise } from 'dependency-cruiser';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import { __chdir } from '@coffeekraken/sugar/fs';
import __SPackageAddDefaultScriptsParamsInterface from './interface/SPackageApplyDefaultPackageJsonParamsInterface.js';
import __SPackageCheckDependenciesParamsInterface from './interface/SPackageCheckDependenciesParamsInterface.js';
import __SPackageExportsParamsInterface from './interface/SPackageExportsParamsInterface.js';
import __SPackageInstallParamsInterface from './interface/SPackageInstallParamsInterface.js';
import __SPackageSettingsInterface from './interface/SPackageSettingsInterface.js';
import { __listDependenciesFromFiles } from '@coffeekraken/sugar/dependencies';
export default class SPackage extends __SClass {
    /**
     * @name            packageJson
     * @type            Object
     * @get
     *
     * Store the package.json content
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get packageJson() {
        return __packageJsonSync(this._rootDir);
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
    constructor(rootDir = __packageRootDir(), settings) {
        super(__deepMerge(
        // @ts-ignore
        __SPackageSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        this._rootDir = rootDir;
    }
    _exportFiles(files, finalParams) {
        return new Promise((resolve) => {
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
            console.log(`<yellow>[exports]</yellow> Generating new exports object map...`);
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
                if (!currentPackageJson.exports) {
                    currentPackageJson.exports = {};
                }
            }
            catch (e) {
                console.log('Error', e);
            }
            const newPackageJson = __deepMerge(currentPackageJson, json);
            console.log(`<yellow>[exports]</yellow> Updating <cyan>package.json</cyan> file with new exports`);
            JSON.stringify(json, null, 4)
                .split('\n')
                .forEach((line) => {
                console.log(line);
            });
            // writing new file
            __fs.writeFileSync(`${this._rootDir}/package.json`, JSON.stringify(newPackageJson, null, 4));
            resolve();
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
     * @return      {Promise}                                                          An Promise instance that need to be resolved at the end of the exports
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    exports(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // @ts-ignore
            const finalParams = __SPackageExportsParamsInterface.apply(params);
            // check if the "autoExports" exists and is at "false" to avoid exporting
            if (this.packageJson.autoExports === false) {
                console.log(`<magenta>[exports]</magenta> The package "<yellow>${this.packageJson.name}</yellow>" is marked as "<cyan>autoExports</cyan>:<red>false</red>" and will not generate the exports property automatically`);
                return resolve();
            }
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[exports]</yellow> Searching for exportable files...`);
            const files = __glob.sync(finalParams.glob[0], {
                cwd: this._rootDir,
            });
            if (finalParams.watch) {
                (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<yellow>[exports]</yellow> Watching for exportable files changes...`);
                const watcher = __chokidar.watch(finalParams.glob, {
                    cwd: this._rootDir,
                    ignoreInitial: true,
                });
                const watcherHandler = (filePath) => {
                    if (!files.includes(filePath)) {
                        files.push(filePath);
                    }
                    const pro = this._exportFiles(files, finalParams);
                };
                watcher.on('add', watcherHandler.bind(this));
                watcher.on('change', watcherHandler.bind(this));
            }
            // export files
            if (!finalParams.watch ||
                (finalParams.watch && finalParams.buildInitial)) {
                yield this._exportFiles(files, finalParams);
            }
            // resolve is not watch
            !finalParams.watch && resolve();
        }));
    }
    /**
     * @name            install
     * @type            Function
     * @async
     *
     * This method allows you to install dependencies in a package
     *
     * @param       {Partial<ISPackageInstallParams>}          [params={}]         Some params for your install
     * @return      {Promise}                                                          An Promise instance that need to be resolved at the end of the install
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    install(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // @ts-ignore
            const finalParams = __SPackageInstallParamsInterface.apply(params);
            const packageRoot = this._rootDir;
            if (__fs.existsSync(`${packageRoot}/package.json`)) {
                const json = JSON.parse(__fs.readFileSync(`${packageRoot}/package.json`).toString());
                if (Array.isArray(finalParams.dependencies)) {
                    console.log(`<yellow>[install]</yellow> Adding default dependencies: <magenta>${finalParams.dependencies.join('<white>,</white> ')}</magenta>`);
                }
                else {
                    console.log(`<yellow>[install]</yellow> Adding default dependencies: <magenta>${Object.keys((_a = finalParams.dependencies) !== null && _a !== void 0 ? _a : {}).join('<white>,</white> ')}</magenta>`);
                    json.dependencies = Object.assign(Object.assign({}, json.dependencies), ((_b = finalParams.dependencies) !== null && _b !== void 0 ? _b : {}));
                    __fs.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 4));
                }
                console.log(`<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${finalParams.manager}</cyan>...`);
                const res = __childProcess.spawnSync(`${finalParams.manager} ${finalParams.manager === 'yarn' ? 'add' : 'install'} ${Array.isArray(finalParams.dependencies)
                    ? finalParams.dependencies.join(' ')
                    : ''}`, [], {
                    shell: true,
                    cwd: packageRoot,
                });
                if (res.status) {
                    return reject(res.stdout.toString());
                }
            }
            if (__fs.existsSync(`${packageRoot}/composer.json`)) {
                console.log(`<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`);
                __childProcess.execSync('composer install', {
                    cwd: packageRoot,
                });
            }
            console.log(`<green>[install]</green> Dependencies have been installed <green>successfully</green>`);
            resolve({
                installedPackages: Array.isArray(finalParams.dependencies)
                    ? finalParams.dependencies
                    : Object.keys((_c = finalParams.dependencies) !== null && _c !== void 0 ? _c : {}),
            });
        }));
    }
    /**
     * @name            checkDependencies
     * @type            Function
     * @async
     *
     * This method allows you to check unused, missing dependencies in a package
     *
     * @param       {Partial<ISPackageCheckDependenciesParams>}          [params={}]         Some params for your check
     * @return      {Promise}                                                          An Promise instance that need to be resolved at the end of the check
     *
     * @see         https://www.npmjs.com/package/dependency-cruiser
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    checkDependencies(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            // @ts-ignore
            const finalParams = __SPackageCheckDependenciesParamsInterface.apply(params !== null && params !== void 0 ? params : {});
            let result = {
                missingPackages: [],
                unusedPackages: [],
                installedPackages: [],
                removedPackages: [],
                ok: false,
            };
            let needJsonWrite = false;
            const missingPackages = [];
            const packageRoot = this._rootDir;
            console.log(`<yellow>[checkDependencies]</yellow> Checking <cyan>${this.packageJson.name}</cyan> package...`);
            if (!__fs.existsSync(`${packageRoot}/package.json`)) {
                console.error(`<red>[checkDependencies]</red> No <cyan>package.json</cyan> file found in the root of your package`);
                return reject();
            }
            const packageJson = this.packageJson;
            // unused dependencies
            if (finalParams.unused) {
                const dependencies = __listDependenciesFromFiles(finalParams.dirs, {
                    cwd: packageRoot,
                });
                const unusedDependencies = [];
                for (let [dependency, version] of Object.entries(packageJson.dependencies)) {
                    if (!dependencies.includes(dependency)) {
                        unusedDependencies.push(dependency);
                    }
                }
                result.unusedPackages = unusedDependencies;
                // ask if want to install missing packages
                if ((_a = result.unusedPackages) === null || _a === void 0 ? void 0 : _a.length) {
                    result.unusedPackages.forEach((packageName) => {
                        console.log(`<red>[checkDependencies]</red> Unused package "<magenta>${packageName}</magenta>"`);
                    });
                    if (finalParams.allYes ||
                        finalParams.installMissing === true ||
                        (finalParams.installMissing === undefined &&
                            (yield ((_b = console.ask) === null || _b === void 0 ? void 0 : _b.call(console, {
                                type: 'confirm',
                                message: `${result.unusedPackages.length} package${result.unusedPackages.length > 1 ? 's' : ''} listed above ${result.unusedPackages.length > 1
                                    ? 'are'
                                    : 'is'} are unused. Would you like to remove ${result.unusedPackages.length > 1
                                    ? 'them'
                                    : 'it'}?`,
                                default: true,
                            }))))) {
                        console.log(`<yellow>[checkDependencies]</yellow> Removing unused packages...`);
                        // remove from package.json
                        result.unusedPackages.forEach((packageName) => {
                            packageJson.dependencies &&
                                delete packageJson.dependencies[packageName];
                        });
                        result.removedPackages = result.unusedPackages;
                        needJsonWrite = true;
                    }
                }
                // rewrite json
                if (needJsonWrite) {
                    __writeJsonSync(`${packageRoot}/package.json`, packageJson);
                }
            }
            // missing
            if (finalParams.missing) {
                const ARRAY_OF_FILES_AND_DIRS_TO_CRUISE = finalParams.dirs.map((d) => {
                    return __path.join(packageRoot, d.replace(`${process.cwd()}/`, ''));
                });
                console.log(`<yellow>[checkDependencies]</yellow> Checking dependencies in these directories:`);
                ARRAY_OF_FILES_AND_DIRS_TO_CRUISE.forEach((dirPath) => {
                    console.log(`<yellow>[checkDependencies]</yellow> - <cyan>${dirPath}</cyan>`);
                });
                const cruiseResult = cruise(ARRAY_OF_FILES_AND_DIRS_TO_CRUISE, {
                    doNotFollow: {
                        path: '(node_modules|packages/.*/dist)',
                    },
                });
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
                        if (!((_c = packageJson.dependencies) === null || _c === void 0 ? void 0 : _c[moduleName])) {
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
                            if (addedFromPackagesMap) {
                                console.log(`<yellow>[checkDependencies]</yellow> Missing package <magenta>${moduleName}</magenta> added from packages map`);
                                needJsonWrite = true;
                                continue;
                            }
                            if (!missingPackages.includes(moduleName)) {
                                console.log(`<red>[checkDependencies]</red> Missing package "<magenta>${moduleName}</magenta>" in package.json used in "<cyan>${module.source}</cyan>"`);
                                missingPackages.push(moduleName);
                            }
                        }
                    }
                }
                // rewrite json
                if (needJsonWrite) {
                    __writeJsonSync(`${packageRoot}/package.json`, packageJson);
                }
                // set the missing packages in the result
                result.missingPackages = missingPackages;
                // ask if want to install missing packages
                if (missingPackages.length) {
                    if (finalParams.allYes ||
                        finalParams.installMissing === true ||
                        (finalParams.installMissing === undefined &&
                            (yield ((_d = console.ask) === null || _d === void 0 ? void 0 : _d.call(console, {
                                type: 'confirm',
                                message: `${missingPackages.length} package${missingPackages.length > 1 ? 's' : ''} (${missingPackages.join(',')}) ${missingPackages.length > 1 ? 'are' : 'is'} missing. Would you like to install ${missingPackages.length > 1 ? 'them' : 'it'}?`,
                                default: true,
                            }))))) {
                        console.log(`<yellow>[checkDependencies]</yellow> Installing missing packages...`);
                        try {
                            yield this.install({
                                dependencies: missingPackages,
                            });
                        }
                        catch (e) {
                            return reject(e);
                        }
                        result.installedPackages = missingPackages;
                    }
                }
            }
            // check if the module is now ok, meaning that it can have some missing modules
            // or unused ones, but they have been installed or removed
            result.ok =
                result.missingPackages.length ===
                    result.installedPackages.length &&
                    result.unusedPackages.length === result.removedPackages.length;
            console.log(`<green>[checkDependencies]</green> Dependencies have been checked <green>successfully</green>`);
            resolve(result);
        }));
    }
    /**
     * @name            rename
     * @type            Function
     * @async
     *
     * This method allows you to rename a package (folder, package.json, composer.json, etc...)
     *
     * @param       {Partial<ISPackageRenameParams>}          [params={}]         Some params for your rename
     * @return      {Promise}                                                          An Promise instance that need to be resolved at the end of the rename
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    rename(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // @ts-ignore
            const finalParams = __SPackageInstallParamsInterface.apply(params);
            if (!finalParams.name) {
                finalParams.name = yield ((_a = console.ask) === null || _a === void 0 ? void 0 : _a.call(console, {
                    type: 'input',
                    message: 'Please enter the new name for your package',
                    pattern: '^[a-zA-Z0-9_@/-]+$',
                }));
            }
            // rename package
            console.log(`<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`);
            __renamePackageSync(finalParams.name);
            if (finalParams.folder) {
                const folderName = finalParams.name.split('/').pop();
                console.log(`<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`);
                const newPath = `${process
                    .cwd()
                    .split('/')
                    .slice(0, -1)
                    .join('/')}/${folderName}`;
                __fs.renameSync(process.cwd(), newPath);
                __chdir(newPath);
            }
            resolve();
        }));
    }
    /**
     * @name            applyDefaultPackageJson
     * @type            Function
     * @async
     *
     * This method allows you to apply the default package.json to your package.
     *
     * @param       {Partial<ISPackageAddDefaultPackageJsonParams>}          [params={}]         Some params for your add default package json process
     * @return      {Promise}                                                          An Promise instance that need to be resolved at the end of the rename
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    applyDefaultPackageJson(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // @ts-ignore
            const finalParams = __SPackageAddDefaultScriptsParamsInterface.apply(params);
            const packageRoot = __packageRootDir();
            if (!__fs.existsSync(`${packageRoot}/package.json`)) {
                throw new Error(`[applyDefaultPackageJson] No package.json file found in the package root`);
            }
            // Adding README
            console.log(`<yellow>[applyDefaultPackageJson]</yellow> Applying <cyan>config.package.defaultPackageJson</cyan> to the package.json file`);
            let json = JSON.parse(__fs.readFileSync(`${packageRoot}/package.json`).toString());
            json = __deepMerge(json, (_a = __SSugarConfig.get('package.defaultPackageJson')) !== null && _a !== void 0 ? _a : {});
            __fs.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 2));
            console.log(`<green>[applyDefaultPackageJson]</green> <cyan>config.package.defaultPackageJson</cyan> applied <green>successfully</green>`);
            resolve();
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUNILGlCQUFpQixFQUNqQixtQkFBbUIsR0FDdEIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTywwQ0FBMEMsTUFBTSwrREFBK0QsQ0FBQztBQUN2SCxPQUFPLDBDQUEwQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ2pILE9BQU8sZ0NBQWdDLE1BQU0sK0NBQStDLENBQUM7QUFDN0YsT0FBTyxnQ0FBZ0MsTUFBTSwrQ0FBK0MsQ0FBQztBQUM3RixPQUFPLDJCQUEyQixNQUFNLDBDQUEwQyxDQUFDO0FBRW5GLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBaUYvRSxNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVMsU0FBUSxRQUFRO0lBTTFDOzs7Ozs7Ozs7T0FTRztJQUNILElBQVcsV0FBVztRQUNs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