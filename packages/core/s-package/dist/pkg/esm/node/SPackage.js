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
import __depcheck from 'depcheck';
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
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
            const packageJson = JSON.parse(__fs.readFileSync(`${packageRoot}/package.json`).toString());
            // unused dependencies
            if (finalParams.unused) {
                const depcheckResult = yield __depcheck(packageRoot, {
                    specials: [],
                    ignorePatterns: [
                        'node_modules',
                        'dist',
                        'bower_components',
                        'vendor',
                    ],
                });
                if (((_a = depcheckResult.dependencies) === null || _a === void 0 ? void 0 : _a.length) ||
                    ((_b = depcheckResult.devDependencies) === null || _b === void 0 ? void 0 : _b.length)) {
                    result.unusedPackages = [
                        ...((_c = depcheckResult.dependencies) !== null && _c !== void 0 ? _c : []),
                        ...((_d = depcheckResult.devDependencies) !== null && _d !== void 0 ? _d : []),
                    ];
                }
                // ask if want to install missing packages
                if ((_e = result.unusedPackages) === null || _e === void 0 ? void 0 : _e.length) {
                    result.unusedPackages.forEach((packageName) => {
                        console.log(`<red>[checkDependencies]</red> Unused package "<magenta>${packageName}</magenta>"`);
                    });
                    if (finalParams.allYes ||
                        finalParams.installMissing === true ||
                        (finalParams.installMissing === undefined &&
                            (yield ((_f = console.ask) === null || _f === void 0 ? void 0 : _f.call(console, {
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
                            packageJson.devDependencies &&
                                delete packageJson.devDependencies[packageName];
                        });
                        result.removedPackages = [
                            ...((_g = depcheckResult.dependencies) !== null && _g !== void 0 ? _g : []),
                            ...((_h = depcheckResult.devDependencies) !== null && _h !== void 0 ? _h : []),
                        ];
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
                        if (!((_j = packageJson.dependencies) === null || _j === void 0 ? void 0 : _j[moduleName]) &&
                            !((_k = packageJson.devDependencies) === null || _k === void 0 ? void 0 : _k[moduleName])) {
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
                            (yield ((_l = console.ask) === null || _l === void 0 ? void 0 : _l.call(console, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUNILGlCQUFpQixFQUNqQixtQkFBbUIsR0FDdEIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTywwQ0FBMEMsTUFBTSwrREFBK0QsQ0FBQztBQUN2SCxPQUFPLDBDQUEwQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ2pILE9BQU8sZ0NBQWdDLE1BQU0sK0NBQStDLENBQUM7QUFDN0YsT0FBTyxnQ0FBZ0MsTUFBTSwrQ0FBK0MsQ0FBQztBQUM3RixPQUFPLDJCQUEyQixNQUFNLDBDQUEwQyxDQUFDO0FBRW5GLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQWlGbEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsUUFBUTtJQU0xQzs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFXLFdBQVc7UUFDbEIsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFDSSxVQUFrQixnQkFBZ0IsRUFBRSxFQUNwQyxRQUFxQztRQUVyQyxLQUFLLENBQ0QsV0FBVztRQUNQLGFBQWE7UUFDYiwyQkFBMkIsQ0FBQyxRQUFRLEVBQUUsRUFDdEMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsWUFBWSxDQUNSLEtBQWUsRUFDZixXQUFtQztRQUVuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O1lBQzNCLGFBQWE7WUFDYixJQUFJLFVBQVUsR0FJVixFQUFFLENBQUM7WUFFUCx1QkFBdUI7WUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFOztnQkFDMUIsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDO2dCQUU1QixLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDekMsV0FBVyxDQUFDLGlCQUFpQixDQUNoQyxFQUFFO29CQUNDLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNyQyxXQUFXLENBQUMsZUFBZSxDQUM5QixFQUFFO3dCQUNDLElBQ0ksQ0FBQyxDQUFBLE1BQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQywwQ0FBRyxNQUFNLENBQUMsQ0FBQTs0QkFDL0IsSUFBSSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQzs0QkFDbkMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUN2Qzs0QkFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dDQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDOzZCQUM3Qjs0QkFDRCxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUUsQ0FBQzt5QkFDakQ7cUJBQ0o7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQ1AsaUVBQWlFLENBQ3BFLENBQUM7WUFFRiwyQkFBMkI7WUFFM0IsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQzNDLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFDdkMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDO1lBRXhDLDhDQUE4QztZQUM5QyxnQ0FBZ0M7WUFDaEMsa0RBQWtEO1lBQ2xELElBQUk7WUFFSixJQUFJLElBQUksR0FBUSxFQUFFLENBQUM7WUFDbkIsSUFBSSxLQUFLLElBQUksT0FBTyxFQUFFO2dCQUNsQixJQUFJLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLDRCQUE0QjtvQkFDbEMsTUFBTSxFQUFFLDRCQUE0QjtvQkFDcEMsT0FBTyxFQUFFO3dCQUNMLElBQUksRUFBRTs0QkFDRixPQUFPLEVBQUUsZ0NBQWdDOzRCQUN6QyxNQUFNLEVBQUUsZ0NBQWdDO3lCQUMzQzt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsT0FBTyxFQUFFLDhCQUE4Qjs0QkFDdkMsTUFBTSxFQUFFLDhCQUE4Qjt5QkFDekM7cUJBQ0o7aUJBQ0osQ0FBQzthQUNMO2lCQUFNLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRTtnQkFDdkMsSUFBSSxHQUFHO29CQUNILElBQUksRUFBRSw0QkFBNEI7b0JBQ2xDLE1BQU0sRUFBRSw0QkFBNEI7b0JBQ3BDLE9BQU8sRUFBRTt3QkFDTCxJQUFJLEVBQUU7NEJBQ0YsT0FBTyxFQUFFLGtDQUFrQzs0QkFDM0MsTUFBTSxFQUFFLGtDQUFrQzt5QkFDN0M7d0JBQ0QsT0FBTyxFQUFFOzRCQUNMLE9BQU8sRUFBRSw4QkFBOEI7NEJBQ3ZDLE1BQU0sRUFBRSw4QkFBOEI7eUJBQ3pDO3FCQUNKO2lCQUNKLENBQUM7YUFDTDtpQkFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxTQUFTLEVBQUU7Z0JBQ3ZDLElBQUksR0FBRztvQkFDSCxJQUFJLEVBQUUsZ0NBQWdDO29CQUN0QyxNQUFNLEVBQUUsZ0NBQWdDO29CQUN4QyxPQUFPLEVBQUU7d0JBQ0wsSUFBSSxFQUFFOzRCQUNGLE9BQU8sRUFBRSxnQ0FBZ0M7NEJBQ3pDLE1BQU0sRUFBRSxnQ0FBZ0M7eUJBQzNDO3dCQUNELE9BQU8sRUFBRTs0QkFDTCxPQUFPLEVBQUUsa0NBQWtDOzRCQUMzQyxNQUFNLEVBQUUsa0NBQWtDO3lCQUM3QztxQkFDSjtpQkFDSixDQUFDO2FBQ0w7aUJBQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ3hDLElBQUksR0FBRztvQkFDSCxJQUFJLEVBQUUsNEJBQTRCO29CQUNsQyxNQUFNLEVBQUUsNEJBQTRCO29CQUNwQyxPQUFPLEVBQUU7d0JBQ0wsR0FBRyxFQUFFOzRCQUNELE9BQU8sRUFBRSw4QkFBOEI7NEJBQ3ZDLE1BQU0sRUFBRSw4QkFBOEI7eUJBQ3pDO3FCQUNKO2lCQUNKLENBQUM7YUFDTDtpQkFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDeEMsSUFBSSxHQUFHO29CQUNILElBQUksRUFBRSw4QkFBOEI7b0JBQ3BDLE1BQU0sRUFBRSw4QkFBOEI7b0JBQ3RDLE9BQU8sRUFBRTt3QkFDTCxHQUFHLEVBQUU7NEJBQ0QsT0FBTyxFQUFFLGdDQUFnQzs0QkFDekMsTUFBTSxFQUFFLGdDQUFnQzt5QkFDM0M7cUJBQ0o7aUJBQ0osQ0FBQzthQUNMO2lCQUFNLElBQUksU0FBUyxFQUFFO2dCQUNsQixJQUFJLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLGdDQUFnQztvQkFDdEMsTUFBTSxFQUFFLGdDQUFnQztvQkFDeEMsT0FBTyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDRCxPQUFPLEVBQUUsa0NBQWtDOzRCQUMzQyxNQUFNLEVBQUUsa0NBQWtDO3lCQUM3QztxQkFDSjtpQkFDSixDQUFDO2FBQ0w7WUFFRCwyREFBMkQ7WUFDM0QsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNuQixlQUFlLEdBQUcsS0FBSyxDQUFDO2lCQUMzQjthQUNKO1lBQ0QsSUFBSSxlQUFlLEVBQUU7Z0JBQ2pCLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFO29CQUNyQixPQUFPLEVBQUU7d0JBQ0wsWUFBWSxFQUFFOzRCQUNWLE9BQU8sRUFBRSw0QkFBNEI7NEJBQ3JDLE1BQU0sRUFBRSw0QkFBNEI7eUJBQ3ZDO3dCQUNELFVBQVUsRUFBRTs0QkFDUixPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxNQUFNLEVBQUUsMEJBQTBCO3lCQUNyQzt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sT0FBTyxFQUFFLHdCQUF3Qjs0QkFDakMsTUFBTSxFQUFFLHdCQUF3Qjt5QkFDbkM7cUJBQ0o7aUJBQ0osQ0FBQyxDQUFDO2FBQ047WUFFRCx3QkFBd0I7WUFDeEIsSUFBSSxrQkFBa0IsR0FBUSxFQUFFLENBQUM7WUFDakMsSUFBSTtnQkFDQSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUMzQixJQUFJO3FCQUNDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLGVBQWUsQ0FBQztxQkFDN0MsUUFBUSxFQUFFLENBQ2xCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtvQkFDN0Isa0JBQWtCLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztpQkFDbkM7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1lBRUQsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdELE9BQU8sQ0FBQyxHQUFHLENBQ1AscUZBQXFGLENBQ3hGLENBQUM7WUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFFUCxtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FDZCxHQUFHLElBQUksQ0FBQyxRQUFRLGVBQWUsRUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUMxQyxDQUFDO1lBRUYsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQ0gsTUFBOEI7UUFFOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxhQUFhO1lBQ2IsTUFBTSxXQUFXLEdBQ2IsZ0NBQWdDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5ELHlFQUF5RTtZQUN6RSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtnQkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FDUCxxREFBcUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDhIQUE4SCxDQUMzTSxDQUFDO2dCQUNGLE9BQU8sT0FBTyxFQUFFLENBQUM7YUFDcEI7WUFFRCxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLDhEQUE4RCxDQUNqRSxDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMzQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDckIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNuQixNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLHFFQUFxRSxDQUN4RSxDQUFDO2dCQUVGLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtvQkFDL0MsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRO29CQUNsQixhQUFhLEVBQUUsSUFBSTtpQkFDdEIsQ0FBQyxDQUFDO2dCQUNILE1BQU0sY0FBYyxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO29CQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDeEI7b0JBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQztnQkFDRixPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNuRDtZQUVELGVBQWU7WUFDZixJQUNJLENBQUMsV0FBVyxDQUFDLEtBQUs7Z0JBQ2xCLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQ2pEO2dCQUNFLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDL0M7WUFFRCx1QkFBdUI7WUFDdkIsQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3BDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUNILE1BQXVDO1FBRXZDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1lBQ3pDLGFBQWE7WUFDYixNQUFNLFdBQVcsR0FDYixnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUVsQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsV0FBVyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDOUQsQ0FBQztnQkFFRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUN6QyxPQUFPLENBQUMsR0FBRyxDQUNQLG9FQUFvRSxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDN0YsbUJBQW1CLENBQ3RCLFlBQVksQ0FDaEIsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxPQUFPLENBQUMsR0FBRyxDQUNQLG9FQUFvRSxNQUFNLENBQUMsSUFBSSxDQUMzRSxNQUFBLFdBQVcsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FDakMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUMxQyxDQUFDO29CQUNGLElBQUksQ0FBQyxZQUFZLG1DQUNWLElBQUksQ0FBQyxZQUFZLEdBQ2pCLENBQUMsTUFBQSxXQUFXLENBQUMsWUFBWSxtQ0FBSSxFQUFFLENBQUMsQ0FDdEMsQ0FBQztvQkFDRixJQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsV0FBVyxlQUFlLEVBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDaEMsQ0FBQztpQkFDTDtnQkFFRCxPQUFPLENBQUMsR0FBRyxDQUNQLGdHQUFnRyxXQUFXLENBQUMsT0FBTyxZQUFZLENBQ2xJLENBQUM7Z0JBRUYsTUFBTSxHQUFHLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FDaEMsR0FBRyxXQUFXLENBQUMsT0FBTyxJQUNsQixXQUFXLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUM3QyxJQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDcEMsQ0FBQyxDQUFDLEVBQ1YsRUFBRSxFQUNGLEVBQUUsRUFDRjtvQkFDSSxLQUFLLEVBQUUsSUFBSTtvQkFDWCxHQUFHLEVBQUUsV0FBVztpQkFDbkIsQ0FDSixDQUFDO2dCQUVGLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDWixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7aUJBQ3hDO2FBQ0o7WUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQ1AseUZBQXlGLENBQzVGLENBQUM7Z0JBQ0YsY0FBYyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDeEMsR0FBRyxFQUFFLFdBQVc7aUJBQ25CLENBQUMsQ0FBQzthQUNOO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCx1RkFBdUYsQ0FDMUYsQ0FBQztZQUNGLE9BQU8sQ0FBQztnQkFDSixpQkFBaUIsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7b0JBQ3RELENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWTtvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxXQUFXLENBQUMsWUFBWSxtQ0FBSSxFQUFFLENBQUM7YUFDcEQsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsaUJBQWlCLENBQ2IsTUFBa0Q7UUFFbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDekMsYUFBYTtZQUNiLE1BQU0sV0FBVyxHQUNiLDBDQUEwQyxDQUFDLEtBQUssQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FBQztZQUVuRSxJQUFJLE1BQU0sR0FBcUM7Z0JBQzNDLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixjQUFjLEVBQUUsRUFBRTtnQkFDbEIsaUJBQWlCLEVBQUUsRUFBRTtnQkFDckIsZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLEVBQUUsRUFBRSxLQUFLO2FBQ1osQ0FBQztZQUVGLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztZQUUxQixNQUFNLGVBQWUsR0FBYSxFQUFFLENBQUM7WUFFckMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUVsQyxPQUFPLENBQUMsR0FBRyxDQUNQLHVEQUF1RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksb0JBQW9CLENBQ25HLENBQUM7WUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsZUFBZSxDQUFDLEVBQUU7Z0JBQ2pELE9BQU8sQ0FBQyxLQUFLLENBQ1Qsb0dBQW9HLENBQ3ZHLENBQUM7Z0JBQ0YsT0FBTyxNQUFNLEVBQUUsQ0FBQzthQUNuQjtZQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxXQUFXLGVBQWUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUM5RCxDQUFDO1lBRUYsc0JBQXNCO1lBQ3RCLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDcEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxVQUFVLENBQUMsV0FBVyxFQUFFO29CQUNqRCxRQUFRLEVBQUUsRUFBRTtvQkFDWixjQUFjLEVBQUU7d0JBQ1osY0FBYzt3QkFDZCxNQUFNO3dCQUNOLGtCQUFrQjt3QkFDbEIsUUFBUTtxQkFDWDtpQkFDSixDQUFDLENBQUM7Z0JBQ0gsSUFDSSxDQUFBLE1BQUEsY0FBYyxDQUFDLFlBQVksMENBQUUsTUFBTTtxQkFDbkMsTUFBQSxjQUFjLENBQUMsZUFBZSwwQ0FBRSxNQUFNLENBQUEsRUFDeEM7b0JBQ0UsTUFBTSxDQUFDLGNBQWMsR0FBRzt3QkFDcEIsR0FBRyxDQUFDLE1BQUEsY0FBYyxDQUFDLFlBQVksbUNBQUksRUFBRSxDQUFDO3dCQUN0QyxHQUFHLENBQUMsTUFBQSxjQUFjLENBQUMsZUFBZSxtQ0FBSSxFQUFFLENBQUM7cUJBQzVDLENBQUM7aUJBQ0w7Z0JBRUQsMENBQTBDO2dCQUMxQyxJQUFJLE1BQUEsTUFBTSxDQUFDLGNBQWMsMENBQUUsTUFBTSxFQUFFO29CQUMvQixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO3dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUNQLDJEQUEyRCxXQUFXLGFBQWEsQ0FDdEYsQ0FBQztvQkFDTixDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUNJLFdBQVcsQ0FBQyxNQUFNO3dCQUNsQixXQUFXLENBQUMsY0FBYyxLQUFLLElBQUk7d0JBQ25DLENBQUMsV0FBVyxDQUFDLGNBQWMsS0FBSyxTQUFTOzRCQUNyQyxDQUFDLE1BQU0sQ0FBQSxNQUFBLE9BQU8sQ0FBQyxHQUFHLHdEQUFHO2dDQUNqQixJQUFJLEVBQUUsU0FBUztnQ0FDZixPQUFPLEVBQUUsR0FDTCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQzFCLFdBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzdDLGlCQUNJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUM7b0NBQzVCLENBQUMsQ0FBQyxLQUFLO29DQUNQLENBQUMsQ0FBQyxJQUNWLHlDQUNJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUM7b0NBQzVCLENBQUMsQ0FBQyxNQUFNO29DQUNSLENBQUMsQ0FBQyxJQUNWLEdBQUc7Z0NBQ0gsT0FBTyxFQUFFLElBQUk7NkJBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFDVjt3QkFDRSxPQUFPLENBQUMsR0FBRyxDQUNQLGtFQUFrRSxDQUNyRSxDQUFDO3dCQUVGLDJCQUEyQjt3QkFDM0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTs0QkFDMUMsV0FBVyxDQUFDLFlBQVk7Z0NBQ3BCLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDakQsV0FBVyxDQUFDLGVBQWU7Z0NBQ3ZCLE9BQU8sV0FBVyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDeEQsQ0FBQyxDQUFDLENBQUM7d0JBRUgsTUFBTSxDQUFDLGVBQWUsR0FBRzs0QkFDckIsR0FBRyxDQUFDLE1BQUEsY0FBYyxDQUFDLFlBQVksbUNBQUksRUFBRSxDQUFDOzRCQUN0QyxHQUFHLENBQUMsTUFBQSxjQUFjLENBQUMsZUFBZSxtQ0FBSSxFQUFFLENBQUM7eUJBQzVDLENBQUM7d0JBRUYsYUFBYSxHQUFHLElBQUksQ0FBQztxQkFDeEI7aUJBQ0o7Z0JBRUQsZUFBZTtnQkFDZixJQUFJLGFBQWEsRUFBRTtvQkFDZixlQUFlLENBQUMsR0FBRyxXQUFXLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDL0Q7YUFDSjtZQUVELFVBQVU7WUFDVixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JCLE1BQU0saUNBQWlDLEdBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3ZCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FDZCxXQUFXLEVBQ1gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUNyQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2dCQUVQLE9BQU8sQ0FBQyxHQUFHLENBQ1Asa0ZBQWtGLENBQ3JGLENBQUM7Z0JBQ0YsaUNBQWlDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQ1AsZ0RBQWdELE9BQU8sU0FBUyxDQUNuRSxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxpQ0FBaUMsRUFBRTtvQkFDM0QsV0FBVyxFQUFFO3dCQUNULElBQUksRUFBRSxpQ0FBaUM7cUJBQzFDO2lCQUNKLENBQUMsQ0FBQztnQkFFSCxLQUNJLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ1QsYUFBYTtnQkFDYixDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUN0QyxDQUFDLEVBQUUsRUFDTDtvQkFDRSxTQUFTO29CQUNULGFBQWE7b0JBQ2IsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTlDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO3dCQUFFLFNBQVM7b0JBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFBRSxTQUFTO29CQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNO3dCQUFFLFNBQVM7b0JBRTFDLHNCQUFzQjtvQkFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNqRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUUxQyxJQUFJLFVBQVUsQ0FBQyxVQUFVOzRCQUFFLFNBQVM7d0JBQ3BDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOzRCQUFFLFNBQVM7d0JBQzdDLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7d0JBQ25DLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDeEIsVUFBVSxHQUFHLFVBQVU7aUNBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUNBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7aUNBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNsQjs2QkFBTTs0QkFDSCxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDekM7d0JBRUQsbUVBQW1FO3dCQUNuRSxJQUNJLENBQUMsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxZQUFZLDBDQUFHLFVBQVUsQ0FBQyxDQUFBOzRCQUN2QyxDQUFDLENBQUEsTUFBQSxXQUFXLENBQUMsZUFBZSwwQ0FBRyxVQUFVLENBQUMsQ0FBQSxFQUM1Qzs0QkFDRSxJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQzs0QkFFakMscUJBQXFCOzRCQUNyQixLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDekMsV0FBVyxDQUFDLFdBQVcsQ0FDMUIsRUFBRTtnQ0FDQyxJQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29DQUNwQixVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDekM7b0NBQ0UsV0FBVyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7d0NBQ2hDLE9BQU8sQ0FBQztvQ0FDWixvQkFBb0IsR0FBRyxJQUFJLENBQUM7aUNBQy9CO3FDQUFNLElBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0NBQ3BCLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMzQztvQ0FDRSxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzt3Q0FDaEMsT0FBTyxDQUFDO29DQUNaLG9CQUFvQixHQUFHLElBQUksQ0FBQztpQ0FDL0I7cUNBQU0sSUFBSSxPQUFPLEtBQUssVUFBVSxFQUFFO29DQUMvQixXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzt3Q0FDaEMsT0FBTyxDQUFDO29DQUNaLG9CQUFvQixHQUFHLElBQUksQ0FBQztpQ0FDL0I7NkJBQ0o7NEJBRUQsSUFBSSxvQkFBb0IsRUFBRTtnQ0FDdEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxpRUFBaUUsVUFBVSxvQ0FBb0MsQ0FDbEgsQ0FBQztnQ0FDRixhQUFhLEdBQUcsSUFBSSxDQUFDO2dDQUNyQixTQUFTOzZCQUNaOzRCQUVELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dDQUN2QyxPQUFPLENBQUMsR0FBRyxDQUNQLDREQUE0RCxVQUFVLDhDQUE4QyxNQUFNLENBQUMsTUFBTSxVQUFVLENBQzlJLENBQUM7Z0NBQ0YsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs2QkFDcEM7eUJBQ0o7cUJBQ0o7aUJBQ0o7Z0JBRUQsZUFBZTtnQkFDZixJQUFJLGFBQWEsRUFBRTtvQkFDZixlQUFlLENBQUMsR0FBRyxXQUFXLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDL0Q7Z0JBRUQseUNBQXlDO2dCQUN6QyxNQUFNLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztnQkFFekMsMENBQTBDO2dCQUMxQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7b0JBQ3hCLElBQ0ksV0FBVyxDQUFDLE1BQU07d0JBQ2xCLFdBQVcsQ0FBQyxjQUFjLEtBQUssSUFBSTt3QkFDbkMsQ0FBQyxXQUFXLENBQUMsY0FBYyxLQUFLLFNBQVM7NEJBQ3JDLENBQUMsTUFBTSxDQUFBLE1BQUEsT0FBTyxDQUFDLEdBQUcsd0RBQUc7Z0NBQ2pCLElBQUksRUFBRSxTQUFTO2dDQUNmLE9BQU8sRUFBRSxHQUFHLGVBQWUsQ0FBQyxNQUFNLFdBQzlCLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ3ZDLEtBQUssZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FDMUIsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFDekMsdUNBQ0ksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFDMUMsR0FBRztnQ0FDSCxPQUFPLEVBQUUsSUFBSTs2QkFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUNWO3dCQUNFLE9BQU8sQ0FBQyxHQUFHLENBQ1AscUVBQXFFLENBQ3hFLENBQUM7d0JBQ0YsSUFBSTs0QkFDQSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ2YsWUFBWSxFQUFFLGVBQWU7NkJBQ2hDLENBQUMsQ0FBQzt5QkFDTjt3QkFBQyxPQUFPLENBQUMsRUFBRTs0QkFDUixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDcEI7d0JBRUQsTUFBTSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsQ0FBQztxQkFDOUM7aUJBQ0o7YUFDSjtZQUVELCtFQUErRTtZQUMvRSwwREFBMEQ7WUFDMUQsTUFBTSxDQUFDLEVBQUU7Z0JBQ0wsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNO29CQUN6QixNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTTtvQkFDbkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFFbkUsT0FBTyxDQUFDLEdBQUcsQ0FDUCwrRkFBK0YsQ0FDbEcsQ0FBQztZQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FDRixNQUFzQztRQUV0QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLGFBQWE7WUFDYixNQUFNLFdBQVcsR0FDYixnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ25CLFdBQVcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsT0FBTyxDQUFDLEdBQUcsd0RBQUc7b0JBQ25DLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSw0Q0FBNEM7b0JBQ3JELE9BQU8sRUFBRSxvQkFBb0I7aUJBQ2hDLENBQUMsQ0FBQSxDQUFDO2FBQ047WUFFRCxpQkFBaUI7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FDUCw4REFBOEQsV0FBVyxDQUFDLElBQUksVUFBVSxDQUMzRixDQUFDO1lBRUYsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRDLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDcEIsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQ1AsNkRBQTZELFVBQVUsVUFBVSxDQUNwRixDQUFDO2dCQUNGLE1BQU0sT0FBTyxHQUFHLEdBQUcsT0FBTztxQkFDckIsR0FBRyxFQUFFO3FCQUNMLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEI7WUFFRCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsdUJBQXVCLENBQ25CLE1BQXFEO1FBRXJELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsYUFBYTtZQUNiLE1BQU0sV0FBVyxHQUNiLDBDQUEwQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU3RCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1lBRXZDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxlQUFlLENBQUMsRUFBRTtnQkFDakQsTUFBTSxJQUFJLEtBQUssQ0FDWCwwRUFBMEUsQ0FDN0UsQ0FBQzthQUNMO1lBRUQsZ0JBQWdCO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsNkhBQTZILENBQ2hJLENBQUM7WUFFRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsV0FBVyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDOUQsQ0FBQztZQUNGLElBQUksR0FBRyxXQUFXLENBQ2QsSUFBSSxFQUNKLE1BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxtQ0FBSSxFQUFFLENBQ3pELENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsV0FBVyxlQUFlLEVBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDaEMsQ0FBQztZQUVGLE9BQU8sQ0FBQyxHQUFHLENBQ1AsNkhBQTZILENBQ2hJLENBQUM7WUFFRixPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==