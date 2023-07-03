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
const SPackageApplyDefaultPackageJsonParamsInterface_1 = __importDefault(require("./interface/SPackageApplyDefaultPackageJsonParamsInterface"));
const SPackageCheckDependenciesParamsInterface_1 = __importDefault(require("./interface/SPackageCheckDependenciesParamsInterface"));
const SPackageExportsParamsInterface_1 = __importDefault(require("./interface/SPackageExportsParamsInterface"));
const SPackageInstallParamsInterface_1 = __importDefault(require("./interface/SPackageInstallParamsInterface"));
const SPackageSettingsInterface_1 = __importDefault(require("./interface/SPackageSettingsInterface"));
class SPackage extends s_class_1.default {
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
        SPackageSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
            const finalParams = SPackageExportsParamsInterface_1.default.apply(params);
            const packageJson = (0, package_1.__packageJsonSync)(this._rootDir);
            // check if the "autoExports" exists and is at "false" to avoid exporting
            if (packageJson.autoExports === false) {
                console.log(`<magenta>[exports]</magenta> The package "<yellow>${packageJson.name}</yellow>" is marked as "<cyan>autoExports</cyan>:<red>false</red>" and will not generate the exports property automatically`);
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // @ts-ignore
            const finalParams = SPackageInstallParamsInterface_1.default.apply(params);
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
                child_process_1.default.execSync(`${finalParams.manager} ${finalParams.manager === 'yarn'
                    ? 'add --quiet'
                    : 'install --no-warnings'} ${Array.isArray(finalParams.dependencies)
                    ? finalParams.dependencies.join(' ')
                    : ''}`, {
                    cwd: packageRoot,
                });
            }
            if (fs_2.default.existsSync(`${packageRoot}/composer.json`)) {
                console.log(`<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`);
                child_process_1.default.execSync('composer install', {
                    cwd: packageRoot,
                });
            }
            console.log(`<green>[install]</green> Dependencies have been installed <green>successfully</green>`);
            resolve();
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
            var _a, _b, _c;
            // @ts-ignore
            const finalParams = SPackageCheckDependenciesParamsInterface_1.default.apply(params);
            let result = true;
            let needJsonWrite = false;
            const missingModules = [];
            const packageRoot = this._rootDir;
            if (!fs_2.default.existsSync(`${packageRoot}/package.json`)) {
                console.error(`<red>[checkDependencies]</red> No <cyan>package.json</cyan> file found in the root of your package`);
                return reject();
            }
            const packageJson = JSON.parse(fs_2.default.readFileSync(`${packageRoot}/package.json`).toString());
            const ARRAY_OF_FILES_AND_DIRS_TO_CRUISE = finalParams.dirs.map((d) => path_2.default.relative(packageRoot, d));
            console.log(`<yellow>[checkDependencies]</yellow> Checking dependencies in these directories:`);
            ARRAY_OF_FILES_AND_DIRS_TO_CRUISE.forEach((dirPath) => {
                console.log(`<yellow>[checkDependencies]</yellow> - <cyan>${dirPath}</cyan>`);
            });
            const cruiseResult = (0, dependency_cruiser_1.cruise)(ARRAY_OF_FILES_AND_DIRS_TO_CRUISE, {});
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
                                packageJson.dependencies[moduleName] = version;
                                addedFromPackagesMap = true;
                            }
                            else if (pattern.match(/\$$/) &&
                                moduleName.endsWith(pattern.slice(0, -1))) {
                                packageJson.dependencies[moduleName] = version;
                                addedFromPackagesMap = true;
                            }
                            else if (pattern === moduleName) {
                                packageJson.dependencies[moduleName] = version;
                                addedFromPackagesMap = true;
                            }
                        }
                        //
                        if (addedFromPackagesMap) {
                            console.log(`<yellow>[checkDependencies]</yellow> <magenta>${moduleName}</magenta> added from packages map`);
                            needJsonWrite = true;
                            continue;
                        }
                        console.log(`<red>[checkDependencies]</red> Missing module "<magenta>${moduleName}</magenta>" in package.json used in "<cyan>${module.source}</cyan>"`);
                        if (!missingModules.includes(moduleName)) {
                            missingModules.push(moduleName);
                        }
                    }
                }
            }
            // rewrite json
            if (needJsonWrite) {
                (0, fs_1.__writeJsonSync)(`${packageRoot}/package.json`, packageJson);
            }
            if (missingModules.length && finalParams.installMissing !== false) {
                if (finalParams.installMissing === true ||
                    (finalParams.installMissing === undefined &&
                        (yield ((_c = console.ask) === null || _c === void 0 ? void 0 : _c.call(console, 'ask', {
                            type: 'confirm',
                            message: `${missingModules.length} package${missingModules.length > 1 ? 's' : ''} ${missingModules.length > 1 ? 'are' : 'is'} missing. Would you like to install ${missingModules.length > 1 ? 'them' : 'it'}?`,
                            default: true,
                        }))))) {
                    console.log(`<yellow>[checkDependencies]</yellow> Installing missing modules...`);
                    yield this.install({
                        dependencies: missingModules,
                    });
                }
                else {
                    result = false;
                }
            }
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
            const finalParams = SPackageInstallParamsInterface_1.default.apply(params);
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
            const finalParams = SPackageApplyDefaultPackageJsonParamsInterface_1.default.apply(params);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGtGQUEwRDtBQUMxRCwrQ0FBeUQ7QUFDekQsdURBQXlEO0FBQ3pELHlEQUdxQztBQUNyQyxtREFBNEQ7QUFDNUQsa0VBQTJDO0FBQzNDLHdEQUFrQztBQUNsQywyREFBNEM7QUFDNUMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFFMUIsK0NBQWlEO0FBRWpELGdKQUFvSDtBQUNwSCxvSUFBOEc7QUFDOUcsZ0hBQTBGO0FBQzFGLGdIQUEwRjtBQUMxRixzR0FBZ0Y7QUFxRWhGLE1BQXFCLFFBQVMsU0FBUSxpQkFBUTtJQU0xQzs7Ozs7Ozs7T0FRRztJQUNILFlBQ0ksVUFBa0IsSUFBQSx1QkFBZ0IsR0FBRSxFQUNwQyxRQUFxQztRQUVyQyxLQUFLLENBQ0QsSUFBQSxvQkFBVztRQUNQLGFBQWE7UUFDYixtQ0FBMkIsQ0FBQyxRQUFRLEVBQUUsRUFDdEMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsWUFBWSxDQUNSLEtBQWUsRUFDZixXQUFtQztRQUVuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O1lBQzNCLGFBQWE7WUFDYixJQUFJLFVBQVUsR0FJVixFQUFFLENBQUM7WUFFUCx1QkFBdUI7WUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFOztnQkFDMUIsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDO2dCQUU1QixLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDekMsV0FBVyxDQUFDLGlCQUFpQixDQUNo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