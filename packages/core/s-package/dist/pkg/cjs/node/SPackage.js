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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
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
        super((0, deepMerge_1.default)(
        // @ts-ignore
        SPackageSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        this._rootDir = rootDir;
    }
    _exportFiles(files, finalParams) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => {
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
                type: s_log_1.default.TYPE_INFO,
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
                json = (0, deepMerge_1.default)(json, {
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
                currentPackageJson.exports = {};
            }
            catch (e) { }
            const newPackageJson = (0, deepMerge_1.default)(currentPackageJson, json);
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[exports]</yellow> Updating <cyan>package.json</cyan> file with new exports`,
            });
            JSON.stringify(json, null, 4)
                .split('\n')
                .forEach((line) => {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: line,
                });
            });
            // writing new file
            fs_2.default.writeFileSync(`${this._rootDir}/package.json`, JSON.stringify(newPackageJson, null, 4));
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SPackageExportsParamsInterface_1.default.apply(params);
            const packageJson = (0, package_1.__packageJsonSync)(this._rootDir);
            // check if the "autoExports" exists and is at "false" to avoid exporting
            if (packageJson.autoExports === false) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<magenta>[exports]</magenta> This package "<yellow>${packageJson.name}</yellow>" is marked as "<cyan>autoExports</cyan>:<yellow>false</yellow> and will not generate the exports property automatically`,
                });
                return resolve();
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[exports]</yellow> Searching for exportable files...`,
            });
            const files = glob_1.default.sync(finalParams.glob[0], {
                cwd: this._rootDir,
            });
            if (finalParams.watch) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[exports]</yellow> Watching for exportable files changes...`,
                });
                const watcher = chokidar_1.default.watch(finalParams.glob, {
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // @ts-ignore
            const finalParams = SPackageInstallParamsInterface_1.default.apply(params);
            const packageRoot = this._rootDir;
            if (fs_2.default.existsSync(`${packageRoot}/package.json`)) {
                const json = JSON.parse(fs_2.default
                    .readFileSync(`${packageRoot}/package.json`)
                    .toString());
                if (Array.isArray(finalParams.dependencies)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[install]</yellow> Adding default dependencies: <magenta>${finalParams.dependencies.join('<white>,</white> ')}</magenta>`,
                    });
                }
                else {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[install]</yellow> Adding default dependencies: <magenta>${Object.keys((_a = finalParams.dependencies) !== null && _a !== void 0 ? _a : {}).join('<white>,</white> ')}</magenta>`,
                    });
                    json.dependencies = Object.assign(Object.assign({}, json.dependencies), ((_b = finalParams.dependencies) !== null && _b !== void 0 ? _b : {}));
                    fs_2.default.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 4));
                }
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${finalParams.manager}</cyan>...`,
                });
                child_process_1.default.execSync(`${finalParams.manager} ${finalParams.manager === 'yarn'
                    ? 'add --quiet'
                    : 'install --no-warnings'} ${Array.isArray(finalParams.dependencies)
                    ? finalParams.dependencies.join(' ')
                    : ''}`, {
                    cwd: packageRoot,
                });
            }
            if (fs_2.default.existsSync(`${packageRoot}/composer.json`)) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`,
                });
                child_process_1.default.execSync('composer install', {
                    cwd: packageRoot,
                });
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // @ts-ignore
            const finalParams = SPackageCheckDependenciesParamsInterface_1.default.apply(params);
            let result = true;
            let needJsonWrite = false;
            const missingModules = [];
            const packageRoot = this._rootDir;
            if (!fs_2.default.existsSync(`${packageRoot}/package.json`)) {
                emit('log', {
                    type: s_log_1.default.TYPE_ERROR,
                    value: `<red>[checkDependencies]</red> No <cyan>package.json</cyan> file found in the root of your package`,
                });
                return reject();
            }
            const packageJson = JSON.parse(fs_2.default.readFileSync(`${packageRoot}/package.json`).toString());
            const ARRAY_OF_FILES_AND_DIRS_TO_CRUISE = finalParams.dirs.map((d) => path_2.default.relative(packageRoot, d));
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[checkDependencies]</yellow> Checking dependencies in these directories:`,
            });
            ARRAY_OF_FILES_AND_DIRS_TO_CRUISE.forEach((dirPath) => {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[checkDependencies]</yellow> - <cyan>${dirPath}</cyan>`,
                });
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
                                type: s_log_1.default.TYPE_INFO,
                                value: `<yellow>[checkDependencies]</yellow> <magenta>${moduleName}</magenta> added from packages map`,
                            });
                            needJsonWrite = true;
                            continue;
                        }
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
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
                (0, fs_1.__writeJsonSync)(`${packageRoot}/package.json`, packageJson);
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
                        type: s_log_1.default.TYPE_INFO,
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
                type: s_log_1.default.TYPE_INFO,
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
            emit('log', {
                value: `<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`,
            });
            (0, package_1.__renamePackage)(finalParams.name);
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
                fs_2.default.renameSync(process.cwd(), newPath);
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // @ts-ignore
            const finalParams = SPackageApplyDefaultPackageJsonParamsInterface_1.default.apply(params);
            const packageRoot = (0, path_1.__packageRootDir)();
            if (!fs_2.default.existsSync(`${packageRoot}/package.json`)) {
                throw new Error(`[applyDefaultPackageJson] No package.json file found in the package root`);
            }
            // Adding README
            emit('log', {
                value: `<yellow>[applyDefaultPackageJson]</yellow> Applying <cyan>config.package.defaultPackageJson</cyan> to the package.json file`,
            });
            let json = JSON.parse(fs_2.default.readFileSync(`${packageRoot}/package.json`).toString());
            json = (0, deepMerge_1.default)(json, (_a = s_sugar_config_1.default.get('package.defaultPackageJson')) !== null && _a !== void 0 ? _a : {});
            fs_2.default.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 2));
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
exports.default = SPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELCtDQUF5RDtBQUN6RCx5REFHcUM7QUFDckMsbURBQTREO0FBQzVELDRGQUFzRTtBQUN0RSxrRUFBMkM7QUFDM0Msd0RBQWtDO0FBQ2xDLDJEQUE0QztBQUM1Qyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixnSkFBb0g7QUFDcEgsb0lBQThHO0FBQzlHLGdIQUEwRjtBQUMxRixnSEFBMEY7QUFDMUYsc0dBQWdGO0FBcUVoRixNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUFNMUM7Ozs7Ozs7O09BUUc7SUFDSCxZQUNJLFVBQWtCLElBQUEsdUJBQWdCLEdBQUUsRUFDcEMsUUFBcUM7UUFFckMsS0FBSyxDQUNELElBQUEsbUJBQVc7UUFDUCxhQUFhO1FBQ2IsbUNBQTJCLENBQUMsUUFBUSxFQUFFLEVBQ3RDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVELFlBQVksQ0FDUixLQUFlLEVBQ2YsV0FBbUM7UUFFbkMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUNoQyxhQUFhO1lBQ2IsSUFBSSxVQUFVLEdBSVYsRUFBRSxDQUFDO1lBRVAsdUJBQXVCO1lBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7Z0JBQzFCLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztnQkFFNUIsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLFFB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