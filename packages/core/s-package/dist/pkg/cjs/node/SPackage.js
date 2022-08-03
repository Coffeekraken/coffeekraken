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
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const renamePackage_1 = __importDefault(require("@coffeekraken/sugar/node/package/renamePackage"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const child_process_1 = __importDefault(require("child_process"));
const chokidar_1 = __importDefault(require("chokidar"));
const dependency_cruiser_1 = require("dependency-cruiser");
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
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
    constructor(rootDir = (0, packageRoot_1.default)(), settings) {
        super((0, deepMerge_1.default)(
        // @ts-ignore
        SPackageSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        this._rootDir = rootDir;
    }
    _exportFiles(files, finalParams) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => {
            // @ts-ignore
            let mapedFiles = {};
            // process each exports
            files.forEach((fileRelPath) => {
                const relPath = fileRelPath;
                for (let [folder, platform] of Object.entries(finalParams.folderPlatformMap)) {
                    for (let [fold, module] of Object.entries(finalParams.folderModuleMap)) {
                        if (`/${relPath}`.includes(`/${fold}/`) &&
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
            // @ts-ignore
            const exportsMap = {};
            if (Object.keys(mapedFiles).length === 1) {
                if (!exportsMap.exports)
                    exportsMap.exports = {};
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
            }
            else if (mapedFiles.node) {
                if (mapedFiles.node.require) {
                    exportsMap.main = mapedFiles.node.require;
                }
                if (mapedFiles.node.import) {
                    exportsMap.module = mapedFiles.node.import;
                }
            }
            else if (mapedFiles.browser) {
                if (mapedFiles.browser.require) {
                    exportsMap.main = mapedFiles.browser.require;
                }
                if (mapedFiles.browser.import) {
                    exportsMap.module = mapedFiles.browser.import;
                }
            }
            // give access to all "src"
            exportsMap.exports['./shared/*'] = {
                require: './dist/pkg/cjs/shared/*.js',
                import: './dist/pkg/esm/shared/*.js',
            };
            exportsMap.exports['./node/*'] = {
                require: './dist/pkg/cjs/node/*.js',
                import: './dist/pkg/esm/node/*.js',
            };
            exportsMap.exports['./js/*'] = {
                require: './dist/pkg/cjs/js/*.js',
                import: './dist/pkg/esm/js/*.js',
            };
            // updading package json
            let currentPackageJson = {};
            try {
                currentPackageJson = JSON.parse(fs_1.default
                    .readFileSync(`${this._rootDir}/package.json`)
                    .toString());
            }
            catch (e) { }
            const newPackageJson = (0, deepMerge_1.default)(currentPackageJson, exportsMap);
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[exports]</yellow> Updating <cyan>package.json</cyan> file with new exports`,
            });
            JSON.stringify(exportsMap, null, 2)
                .split('\n')
                .forEach((line) => {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: line,
                });
            });
            // writing new file
            fs_1.default.writeFileSync(`${this._rootDir}/package.json`, JSON.stringify(newPackageJson, null, 4));
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
            if (fs_1.default.existsSync(`${packageRoot}/package.json`)) {
                const json = JSON.parse(fs_1.default
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
                    fs_1.default.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 4));
                }
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${finalParams.manager}</cyan>...`,
                });
                child_process_1.default.execSync(`${finalParams.manager} ${finalParams.manager === 'yarn' ? 'add' : 'install'} ${Array.isArray(finalParams.dependencies)
                    ? finalParams.dependencies.join(' ')
                    : ''}`, {
                    cwd: packageRoot,
                });
            }
            if (fs_1.default.existsSync(`${packageRoot}/composer.json`)) {
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
            if (!fs_1.default.existsSync(`${packageRoot}/package.json`)) {
                emit('log', {
                    type: s_log_1.default.TYPE_ERROR,
                    value: `<red>[checkDependencies]</red> No <cyan>package.json</cyan> file found in the root of your package`,
                });
                return reject();
            }
            const packageJson = JSON.parse(fs_1.default.readFileSync(`${packageRoot}/package.json`).toString());
            const ARRAY_OF_FILES_AND_DIRS_TO_CRUISE = finalParams.dirs.map((d) => path_1.default.relative(packageRoot, d));
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
                (0, writeJsonSync_1.default)(`${packageRoot}/package.json`, packageJson);
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
            (0, renamePackage_1.default)(finalParams.name);
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
                fs_1.default.renameSync(process.cwd(), newPath);
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
            const packageRoot = (0, packageRoot_1.default)();
            if (!fs_1.default.existsSync(`${packageRoot}/package.json`)) {
                throw new Error(`[applyDefaultPackageJson] No package.json file found in the package root`);
            }
            // Adding README
            emit('log', {
                value: `<yellow>[applyDefaultPackageJson]</yellow> Applying <cyan>config.package.defaultPackageJson</cyan> to the package.json file`,
            });
            let json = JSON.parse(fs_1.default.readFileSync(`${packageRoot}/package.json`).toString());
            json = (0, deepMerge_1.default)(json, (_a = s_sugar_config_1.default.get('package.defaultPackageJson')) !== null && _a !== void 0 ? _a : {});
            fs_1.default.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 2));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELDhGQUF3RTtBQUN4RSxtR0FBNkU7QUFDN0UsNEZBQXNFO0FBQ3RFLDRGQUFzRTtBQUN0RSxrRUFBMkM7QUFDM0Msd0RBQWtDO0FBQ2xDLDJEQUE0QztBQUM1Qyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixnSkFBb0g7QUFDcEgsb0lBQThHO0FBQzlHLGdIQUEwRjtBQUMxRixnSEFBMEY7QUFDMUYsc0dBQWdGO0FBcUVoRixNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUFNMUM7Ozs7Ozs7O09BUUc7SUFDSCxZQUNJLFVBQWtCLElBQUEscUJBQWEsR0FBRSxFQUNqQyxRQUFxQztRQUVyQyxLQUFLLENBQ0QsSUFBQSxtQkFBVztRQUNQLGFBQWE7UUFDYixtQ0FBMkIsQ0FBQyxRQUFRLEVBQUUsRUFDdEMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsWUFBWSxDQUNSLEtBQWUsRUFDZixXQUFtQztRQUVuQyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDaEMsYUFBYTtZQUNiLElBQUksVUFBVSxHQUlWLEVBQUUsQ0FBQztZQUVQLHVCQUF1QjtZQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzFCLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztnQkFFNUIsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEs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