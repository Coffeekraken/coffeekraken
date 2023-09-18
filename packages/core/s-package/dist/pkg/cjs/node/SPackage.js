"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const child_process_1 = __importDefault(require("child_process"));
const chokidar_1 = __importDefault(require("chokidar"));
const dependency_cruiser_1 = require("dependency-cruiser");
const fs_2 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_2 = __importDefault(require("path"));
const fs_3 = require("@coffeekraken/sugar/fs");
const SPackageApplyDefaultPackageJsonParamsInterface_js_1 = __importDefault(require("./interface/SPackageApplyDefaultPackageJsonParamsInterface.js"));
const SPackageCheckDependenciesParamsInterface_js_1 = __importDefault(require("./interface/SPackageCheckDependenciesParamsInterface.js"));
const SPackageExportsParamsInterface_js_1 = __importDefault(require("./interface/SPackageExportsParamsInterface.js"));
const SPackageInstallParamsInterface_js_1 = __importDefault(require("./interface/SPackageInstallParamsInterface.js"));
const SPackageSettingsInterface_js_1 = __importDefault(require("./interface/SPackageSettingsInterface.js"));
const dependencies_1 = require("@coffeekraken/sugar/dependencies");
class SPackage extends s_class_1.default {
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
        return (0, package_1.__packageJsonSync)(this._rootDir);
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
    constructor(rootDir = (0, path_1.__packageRootDir)(), settings) {
        super((0, object_1.__deepMerge)(
        // @ts-ignore
        SPackageSettingsInterface_js_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
                json = (0, object_1.__deepMerge)(json, {
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
                currentPackageJson = JSON.parse(fs_2.default
                    .readFileSync(`${this._rootDir}/package.json`)
                    .toString());
                if (!currentPackageJson.exports) {
                    currentPackageJson.exports = {};
                }
            }
            catch (e) {
                console.log('Error', e);
            }
            const newPackageJson = (0, object_1.__deepMerge)(currentPackageJson, json);
            console.log(`<yellow>[exports]</yellow> Updating <cyan>package.json</cyan> file with new exports`);
            JSON.stringify(json, null, 4)
                .split('\n')
                .forEach((line) => {
                console.log(line);
            });
            // writing new file
            fs_2.default.writeFileSync(`${this._rootDir}/package.json`, JSON.stringify(newPackageJson, null, 4));
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
            const finalParams = SPackageExportsParamsInterface_js_1.default.apply(params);
            // check if the "autoExports" exists and is at "false" to avoid exporting
            if (this.packageJson.autoExports === false) {
                console.log(`<magenta>[exports]</magenta> The package "<yellow>${this.packageJson.name}</yellow>" is marked as "<cyan>autoExports</cyan>:<red>false</red>" and will not generate the exports property automatically`);
                return resolve();
            }
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[exports]</yellow> Searching for exportable files...`);
            const files = glob_1.default.sync(finalParams.glob[0], {
                cwd: this._rootDir,
            });
            if (finalParams.watch) {
                (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<yellow>[exports]</yellow> Watching for exportable files changes...`);
                const watcher = chokidar_1.default.watch(finalParams.glob, {
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
            const finalParams = SPackageInstallParamsInterface_js_1.default.apply(params);
            const packageRoot = this._rootDir;
            if (fs_2.default.existsSync(`${packageRoot}/package.json`)) {
                const json = JSON.parse(fs_2.default.readFileSync(`${packageRoot}/package.json`).toString());
                if (Array.isArray(finalParams.dependencies)) {
                    console.log(`<yellow>[install]</yellow> Adding default dependencies: <magenta>${finalParams.dependencies.join('<white>,</white> ')}</magenta>`);
                }
                else {
                    console.log(`<yellow>[install]</yellow> Adding default dependencies: <magenta>${Object.keys((_a = finalParams.dependencies) !== null && _a !== void 0 ? _a : {}).join('<white>,</white> ')}</magenta>`);
                    json.dependencies = Object.assign(Object.assign({}, json.dependencies), ((_b = finalParams.dependencies) !== null && _b !== void 0 ? _b : {}));
                    fs_2.default.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 4));
                }
                console.log(`<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${finalParams.manager}</cyan>...`);
                const res = child_process_1.default.spawnSync(`${finalParams.manager} ${finalParams.manager === 'yarn' ? 'add' : 'install'} ${Array.isArray(finalParams.dependencies)
                    ? finalParams.dependencies.join(' ')
                    : ''}`, [], {
                    shell: true,
                    cwd: packageRoot,
                    stdio: 'inherit',
                });
                if (res.status) {
                    return reject(res.stdout.toString());
                }
            }
            if (fs_2.default.existsSync(`${packageRoot}/composer.json`)) {
                console.log(`<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`);
                child_process_1.default.execSync('composer install', {
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
            var _a, _b, _c, _d, _e, _f;
            // @ts-ignore
            const finalParams = SPackageCheckDependenciesParamsInterface_js_1.default.apply(params !== null && params !== void 0 ? params : {});
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
            if (!fs_2.default.existsSync(`${packageRoot}/package.json`)) {
                console.error(`<red>[checkDependencies]</red> No <cyan>package.json</cyan> file found in the root of your package`);
                return reject();
            }
            const packageJson = this.packageJson;
            // unused dependencies
            if (finalParams.unused) {
                const dependencies = (0, dependencies_1.__listDependenciesFromFiles)(finalParams.dirs, {
                    cwd: packageRoot,
                });
                const unusedDependencies = [];
                for (let [dependency, version] of Object.entries((_a = packageJson.dependencies) !== null && _a !== void 0 ? _a : {})) {
                    if (!dependencies.includes(dependency)) {
                        unusedDependencies.push(dependency);
                    }
                }
                result.unusedPackages = unusedDependencies;
                // ask if want to install missing packages
                if ((_b = result.unusedPackages) === null || _b === void 0 ? void 0 : _b.length) {
                    result.unusedPackages.forEach((packageName) => {
                        console.log(`<red>[checkDependencies]</red> Unused package "<magenta>${packageName}</magenta>"`);
                    });
                    if (finalParams.allYes ||
                        finalParams.installMissing === true ||
                        (finalParams.installMissing === undefined &&
                            (yield ((_c = console.ask) === null || _c === void 0 ? void 0 : _c.call(console, {
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
                    (0, fs_1.__writeJsonSync)(`${packageRoot}/package.json`, packageJson);
                }
            }
            // missing
            if (finalParams.missing) {
                const ARRAY_OF_FILES_AND_DIRS_TO_CRUISE = finalParams.dirs.map((d) => {
                    return path_2.default.join(packageRoot, d.replace(`${process.cwd()}/`, ''));
                });
                console.log(`<yellow>[checkDependencies]</yellow> Checking dependencies in these directories:`);
                ARRAY_OF_FILES_AND_DIRS_TO_CRUISE.forEach((dirPath) => {
                    console.log(`<yellow>[checkDependencies]</yellow> - <cyan>${dirPath}</cyan>`);
                });
                const cruiseResult = (0, dependency_cruiser_1.cruise)(ARRAY_OF_FILES_AND_DIRS_TO_CRUISE, {
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
                        if (!((_d = packageJson.dependencies) === null || _d === void 0 ? void 0 : _d[moduleName]) &&
                            !((_e = packageJson.devDependencies) === null || _e === void 0 ? void 0 : _e[moduleName])) {
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
                    (0, fs_1.__writeJsonSync)(`${packageRoot}/package.json`, packageJson);
                }
                // set the missing packages in the result
                result.missingPackages = missingPackages;
                // ask if want to install missing packages
                if (missingPackages.length) {
                    if (finalParams.allYes ||
                        finalParams.installMissing === true ||
                        (finalParams.installMissing === undefined &&
                            (yield ((_f = console.ask) === null || _f === void 0 ? void 0 : _f.call(console, {
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
                        if (packageJson.name === '@coffeekraken/s-dashboard') {
                            process.exit();
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
            const finalParams = SPackageInstallParamsInterface_js_1.default.apply(params);
            if (!finalParams.name) {
                finalParams.name = yield ((_a = console.ask) === null || _a === void 0 ? void 0 : _a.call(console, {
                    type: 'input',
                    message: 'Please enter the new name for your package',
                    pattern: '^[a-zA-Z0-9_@/-]+$',
                }));
            }
            // rename package
            console.log(`<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`);
            (0, package_1.__renamePackageSync)(finalParams.name);
            if (finalParams.folder) {
                const folderName = finalParams.name.split('/').pop();
                console.log(`<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`);
                const newPath = `${process
                    .cwd()
                    .split('/')
                    .slice(0, -1)
                    .join('/')}/${folderName}`;
                fs_2.default.renameSync(process.cwd(), newPath);
                (0, fs_3.__chdir)(newPath);
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
            const finalParams = SPackageApplyDefaultPackageJsonParamsInterface_js_1.default.apply(params);
            const packageRoot = (0, path_1.__packageRootDir)();
            if (!fs_2.default.existsSync(`${packageRoot}/package.json`)) {
                throw new Error(`[applyDefaultPackageJson] No package.json file found in the package root`);
            }
            // Adding README
            console.log(`<yellow>[applyDefaultPackageJson]</yellow> Applying <cyan>config.package.defaultPackageJson</cyan> to the package.json file`);
            let json = JSON.parse(fs_2.default.readFileSync(`${packageRoot}/package.json`).toString());
            json = (0, object_1.__deepMerge)(json, (_a = s_sugar_config_1.default.get('package.defaultPackageJson')) !== null && _a !== void 0 ? _a : {});
            fs_2.default.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 2));
            console.log(`<green>[applyDefaultPackageJson]</green> <cyan>config.package.defaultPackageJson</cyan> applied <green>successfully</green>`);
            resolve();
        }));
    }
}
exports.default = SPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGtGQUEwRDtBQUMxRCwrQ0FBeUQ7QUFDekQsdURBQXlEO0FBQ3pELHlEQUdxQztBQUNyQyxtREFBNEQ7QUFDNUQsa0VBQTJDO0FBQzNDLHdEQUFrQztBQUNsQywyREFBNEM7QUFDNUMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFFMUIsK0NBQWlEO0FBRWpELHNKQUF1SDtBQUN2SCwwSUFBaUg7QUFDakgsc0hBQTZGO0FBQzdGLHNIQUE2RjtBQUM3Riw0R0FBbUY7QUFFbkYsbUVBQStFO0FBaUYvRSxNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUFNMUM7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBQSwyQkFBaUIsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFDSSxVQUFrQixJQUFBLHVCQUFnQixHQUFFLEVBQ3BDLFFBQXFDO1FBRXJDLEtBQUssQ0FDRCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLHNDQUEyQixDQUFDLFFBQVEsRUFBRSxFQUN0QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUFZLENBQ1IsS0FBZSxFQUNmLFdBQW1DO1FBRW5DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7WUFDM0IsYUFBYTtZQUNiLElBQUksVUFBVSxHQUlWLEVBQUUsQ0FBQztZQUVQLHVCQUF1QjtZQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7O2dCQUMxQixNQUFN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