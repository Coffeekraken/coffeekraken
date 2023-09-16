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
const depcheck_1 = __importDefault(require("depcheck"));
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
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
            const packageJson = JSON.parse(fs_2.default.readFileSync(`${packageRoot}/package.json`).toString());
            // unused dependencies
            if (finalParams.unused) {
                const depcheckResult = yield (0, depcheck_1.default)(packageRoot, {
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
                    (0, fs_1.__writeJsonSync)(`${packageRoot}/package.json`, packageJson);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGtGQUEwRDtBQUMxRCwrQ0FBeUQ7QUFDekQsdURBQXlEO0FBQ3pELHlEQUdxQztBQUNyQyxtREFBNEQ7QUFDNUQsa0VBQTJDO0FBQzNDLHdEQUFrQztBQUNsQywyREFBNEM7QUFDNUMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFFMUIsK0NBQWlEO0FBRWpELHNKQUF1SDtBQUN2SCwwSUFBaUg7QUFDakgsc0hBQTZGO0FBQzdGLHNIQUE2RjtBQUM3Riw0R0FBbUY7QUFFbkYsd0RBQWtDO0FBaUZsQyxNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUFNMUM7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBQSwyQkFBaUIsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFDSSxVQUFrQixJQUFBLHVCQUFnQixHQUFFLEVBQ3BDLFFBQXFDO1FBRXJDLEtBQUssQ0FDRCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLHNDQUEyQixDQUFDLFFBQVEsRUFBRSxFQUN0QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUFZLENBQ1IsS0FBZSxFQUNmLFdBQW1DO1FBRW5DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7WUFDM0IsYUFBYTtZQUNiLElBQUksVUFBVSxHQUlWLEVBQUUsQ0FBQztZQUVQLHVCQUF1QjtZQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7O2dCQUMxQixNQUFN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