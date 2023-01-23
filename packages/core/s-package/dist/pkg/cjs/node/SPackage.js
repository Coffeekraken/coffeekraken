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
            catch (e) { }
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
            // @ts-ignore
            const finalParams = SPackageInstallParamsInterface_1.default.apply(params);
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
            console.log(`<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`);
            (0, package_1.__renamePackage)(finalParams.name);
            if (finalParams.folder) {
                const folderName = finalParams.name.split('/').pop();
                console.log(`<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`);
                const newPath = `${process
                    .cwd()
                    .split('/')
                    .slice(0, -1)
                    .join('/')}/${folderName}`;
                fs_2.default.renameSync(process.cwd(), newPath);
                process.chdir(newPath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGtGQUEwRDtBQUMxRCwrQ0FBeUQ7QUFDekQsdURBQXlEO0FBQ3pELHlEQUdxQztBQUNyQyxtREFBNEQ7QUFDNUQsa0VBQTJDO0FBQzNDLHdEQUFrQztBQUNsQywyREFBNEM7QUFDNUMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsZ0pBQW9IO0FBQ3BILG9JQUE4RztBQUM5RyxnSEFBMEY7QUFDMUYsZ0hBQTBGO0FBQzFGLHNHQUFnRjtBQXFFaEYsTUFBcUIsUUFBUyxTQUFRLGlCQUFRO0lBTTFDOzs7Ozs7OztPQVFHO0lBQ0gsWUFDSSxVQUFrQixJQUFBLHVCQUFnQixHQUFFLEVBQ3BDLFFBQXFDO1FBRXJDLEtBQUssQ0FDRCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLG1DQUEyQixDQUFDLFFBQVEsRUFBRSxFQUN0QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUFZLENBQ1IsS0FBZSxFQUNmLFdBQW1DO1FBRW5DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7WUFDM0IsYUFBYTtZQUNiLElBQUksVUFBVSxHQUlWLEVBQUUsQ0FBQztZQUVQLHVCQUF1QjtZQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7O2dCQUMxQixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUM7Z0JBRTVCLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUN6QyxXQUFXLENBQUMsaUJBQWlCLENBQ2hDLEVBQUU7b0JBQ0Ms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