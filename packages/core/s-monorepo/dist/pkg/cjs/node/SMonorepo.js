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
const s_code_formatter_1 = __importDefault(require("@coffeekraken/s-code-formatter"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_package_1 = __importDefault(require("@coffeekraken/s-package"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const s_vite_1 = __importDefault(require("@coffeekraken/s-vite"));
const fs_1 = require("@coffeekraken/sugar/fs");
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const formatDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/formatDuration"));
const child_process_1 = __importDefault(require("child_process"));
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SMonorepoDevParamsInterface_1 = __importDefault(require("./interface/SMonorepoDevParamsInterface"));
const SMonorepoExecParamsInterface_1 = __importDefault(require("./interface/SMonorepoExecParamsInterface"));
const SMonorepoListParamsInterface_1 = __importDefault(require("./interface/SMonorepoListParamsInterface"));
const SMonorepoPublishParamsInterface_1 = __importDefault(require("./interface/SMonorepoPublishParamsInterface"));
const SMonorepoSettingsInterface_1 = __importDefault(require("./interface/SMonorepoSettingsInterface"));
const SMonorepoUpgradeParamsInterface_1 = __importDefault(require("./interface/SMonorepoUpgradeParamsInterface"));
class SMonorepo extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(rootDir = (0, packageRoot_1.default)(process.cwd(), {
        highest: true,
    }), settings) {
        super((0, deepMerge_1.default)(
        // @ts-ignore
        SMonorepoSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        this._rootDir = rootDir;
    }
    /**
     * @name            checkDependencies
     * @type            Function
     * @async
     *
     * This method allows you to check dependencies of each packages of the monorepo
     *
     * @param       {Partial<ISMonorepoRunParams>}          [params={}]         Some params for your run process
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    checkDependencies() {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // get all the packages
            const packages = yield this.list({});
            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[check]</yellow> Checking dependencies for the package "<cyan>${packageObj.name}</cyan>"...`,
                });
                const pack = new s_package_1.default(packageObj.path);
                const result = yield pack.checkDependencies();
                if (result !== true) {
                    emit('log', {
                        type: s_log_1.default.TYPE_ERROR,
                        message: `<red>[check]</red> Your package has some dependencies issues`,
                    });
                    if (!(yield emit('ask', {
                        type: 'confirm',
                        message: 'Would you like to continue anyway?',
                        default: false,
                    }))) {
                        return reject(false);
                    }
                }
            }
            // all seems ok
            resolve(true);
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    /**
     * @name            exec
     * @type            Function
     * @async
     *
     * This method allows you to run a command in every packages of the monorepo
     *
     * @param       {Partial<ISMonorepoRunParams>}          [params={}]         Some params for your run process
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    exec(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoExecParamsInterface_1.default.apply(params);
            const results = [];
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[exec]</yellow> Searching for packages...`,
            });
            // get all the packages
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[exec]</yellow> Executing the command "<magenta>${finalParams.command}</magenta>" in these <cyan>${packages.length}</cyan> package(s)`,
            });
            const duration = new s_duration_1.default();
            let currentDuration = 0;
            for (let i = 0; i < packages.length; i++) {
                const pack = packages[i];
                emit('log', {
                    value: `<yellow>[exec]</yellow> Executing command "<yellow>${finalParams.command}</yellow>" in folder:`,
                });
                emit('log', {
                    value: `<yellow>[exec]</yellow> <cyan>${pack.relPath}</cyan>`,
                });
                const start = Date.now();
                const command = pipe((0, spawn_1.default)(finalParams.command, [], {
                    cwd: pack.path,
                }));
                const commandResult = yield command;
                results.push(commandResult);
                const end = Date.now();
                currentDuration += end - start;
                const average = currentDuration / i;
                const remaining = average * (packages.length - i);
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[exec]</green> Command executed <green>successfully</green> in <yellow>${commandResult.formatedDuration}</yellow>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[exec]</green> <magenta>${packages.length - (i + 1)}</magenta> folder(s), <cyan>~${(0, formatDuration_1.default)(remaining)}</cyan> remaining...`,
                });
                emit('log', {
                    value: ' ',
                });
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[success]</green> Command "<yellow>${finalParams.command}</yellow>" executed <green>successfully</green> in <cyan>${packages.length}</cyan> folder(s) in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            resolve(results);
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    /**
     * @name            list
     * @type            Function
     * @async
     *
     * This method allows you to list all the repo in the monorepo
     *
     * @param       {Partial<ISMonorepoListParams>}          [params={}]         Some params for your list process
     * @return      {SPromise<ISMonorepoListResult>}                                                          An SPromise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    list(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoListParamsInterface_1.default.apply(params);
            const result = [];
            const jsonResult = {};
            const rootPackageJson = (0, fs_1.__readJsonSync)(`${this._rootDir}/package.json`);
            const files = s_glob_1.default.resolve(`${finalParams.packagesGlob}/package.json`, {
                cwd: this._rootDir,
            });
            files.forEach((file) => {
                let version = 'unknown', name;
                const json = (0, fs_1.__readJsonSync)(file.path);
                version = json.version;
                name = json.name;
                // check if we want this package in the list
                if (finalParams.publish && json.private) {
                    return;
                }
                else if (finalParams.publish === false &&
                    json.private !== true) {
                    return;
                }
                result.push({
                    name,
                    version,
                    private: json.private,
                    relPath: path_1.default.dirname(file.relPath),
                    path: path_1.default.dirname(file.path),
                });
                jsonResult[name] = `^${version}`;
            });
            result.forEach((packageObj) => {
                if (!finalParams.json) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `${packageObj.private
                            ? '<magenta>[private]</magenta> '
                            : ''}<yellow>${packageObj.name}</yellow> (<${packageObj.version === rootPackageJson.version
                            ? 'green'
                            : 'red'}>${packageObj.version}</${packageObj.version === rootPackageJson.version
                            ? 'green'
                            : 'red'}>) <cyan>${packageObj.relPath}</cyan>`,
                    });
                }
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[list]</yellow> <cyan>${result.length}</cyan> packages found`,
            });
            if (finalParams.json) {
                const jsonStr = JSON.stringify(jsonResult, null, 4);
                (0, clipboard_1.__copy)(jsonStr);
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[list]</green> JSON copied into your clipboard`,
                });
            }
            resolve(finalParams.json ? jsonResult : result);
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    /**
     * @name            publish
     * @type            Function
     * @async
     *
     * This method allows you to publish all the repo in the monorepo
     *
     * @param       {Partial<ISMonorepoListParams>}          [params={}]         Some params for your list process
     * @return      {SPromise<ISMonorepoListResult>}                                                          An SPromise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    publish(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoPublishParamsInterface_1.default.apply(params);
            const result = {};
            const rootPackageJson = (0, fs_1.__readJsonSync)(`${this._rootDir}/package.json`);
            if (!finalParams.yes &&
                !(yield emit('ask', {
                    type: 'confirm',
                    message: `Is <magenta>${rootPackageJson.version}</magenta> the version you want to publish?`,
                    default: true,
                }))) {
                return reject(false);
            }
            // loop on all packages to publish them once at a time
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
                publish: true,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[publish]</yellow> <cyan>${packages.length}</cyan> packages found:`,
            });
            packages.forEach((packageObj) => {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[publish]</yellow> - <cyan>${packageObj.name}</cyan>`,
                });
            });
            if (!finalParams.yes &&
                !(yield emit('ask', {
                    type: 'confirm',
                    message: `Are these packages the ones you want to publish?`,
                    default: true,
                }))) {
                return reject(false);
            }
            if (!finalParams.yes &&
                !(yield emit('ask', {
                    type: 'confirm',
                    message: `Are you sure your packages are ready? Don't forget about <yellow>docmap</yellow>, <yellow>builds</yellow> etc...? Just asking...`,
                    default: true,
                }))) {
                return reject(false);
            }
            // upgrading monorepo
            try {
                yield pipe(this.upgrade());
            }
            catch (e) {
                return reject(e);
            }
            if (!finalParams.yes &&
                !(yield emit('ask', {
                    type: 'confirm',
                    message: 'All seems ok with your packages versions. Would you like to continue?',
                    default: true,
                }))) {
                return reject(false);
            }
            // check dependencies
            try {
                yield pipe(this.checkDependencies());
            }
            catch (e) {
                return reject(e);
            }
            if (!finalParams.yes &&
                !(yield emit('ask', {
                    type: 'confirm',
                    message: 'All seems ok with your packages dependencies. Would you like to continue?',
                    default: true,
                }))) {
                return reject(false);
            }
            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];
                try {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[publish]</yellow> Publishing your package "<cyan>${packageObj.name}</cyan>"...`,
                    });
                    child_process_1.default.execSync(`npm publish --access public`, {
                        cwd: packageObj.path,
                    });
                    // populate the result
                    result[packageObj.name] = {
                        published: true,
                    };
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[publish]</yellow> <cyan>${packages.length - i - 1}</cyan> / ${packages.length} remaining package(s)`,
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_SUCCESS,
                        value: `<green>[publish]</green> Your package "<cyan>${packageObj.name}</cyan>" has been published <green>successfully</green> in version <magenta>${rootPackageJson.version}</magenta>!`,
                    });
                }
                catch (e) {
                    emit('log', {
                        type: s_log_1.default.TYPE_ERROR,
                        // @ts-ignore
                        value: e.toString(),
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_WARNING,
                        value: `<red>[publish]</red> Something goes wrong when publishing the "<cyan>${packageObj.name}</cyan>"`,
                    });
                    // populate the result
                    result[packageObj.name] = {
                        published: false,
                        error: e,
                    };
                    if (!finalParams.yes &&
                        !(yield emit('ask', {
                            type: 'confirm',
                            message: 'Would you like to continue anyway?',
                        }))) {
                        return reject(false);
                    }
                }
            }
            resolve(result);
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    /**
     * @name            dev
     * @type            Function
     * @async
     *
     * This method allows you to launch the dev stack in the monorepo.
     * This mean principaly transpile the typescript files of each packages
     *
     * @param       {Partial<ISMonorepoDevParams>}          [params={}]         Some params for your dev process
     * @return      {SPromise<ISMonorepoListResult>}                                                          An SPromise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    dev(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoDevParamsInterface_1.default.apply(params);
            if (!finalParams.build &&
                !finalParams.test &&
                !finalParams.format) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: '<red>[dev]</red> You must at least make use of one of these development features. <magenta>build</magenta>, <magenta>format</magenta>, <magenta>test</magenta>',
                });
                return resolve();
            }
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
            });
            const srcRelDir = path_1.default.relative(this._rootDir, s_sugar_config_1.default.get('typescriptBuilder.inDir')), distRelDir = path_1.default.relative(this._rootDir, s_sugar_config_1.default.get('typescriptBuilder.outDir'));
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[dev]</yellow> Found <cyan>${packages.length}</cyan> package(s)`,
            });
            // tests
            if (finalParams.test) {
                const vite = new s_vite_1.default();
                pipe(vite.test({
                    watch: true,
                    dir: (0, packageRoot_1.default)(),
                }));
            }
            // code formatter
            if (finalParams.format) {
                const formatter = new s_code_formatter_1.default();
                pipe(formatter.format({
                    glob: `${s_sugar_config_1.default.get('monorepo.packagesGlob')}/src/**/*`,
                    inDir: (0, packageRoot_1.default)(),
                    watch: true,
                    formatInitial: finalParams.formatInitial,
                }));
            }
            if (finalParams.build) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[watch]</yellow> Watching for file changes...`,
                }, {
                    id: 'STypescriptBuilder',
                });
            }
            packages.forEach((packageObj) => {
                if (finalParams.build) {
                    // typescript compilation
                    const inDir = `${packageObj.path}/${srcRelDir}`, outDir = `${packageObj.path}/${distRelDir}`;
                    const builder = new s_typescript_builder_1.default();
                    pipe(builder.build({
                        silent: true,
                        inDir,
                        outDir,
                        packageRoot: packageObj.path,
                        buildInitial: finalParams.buildInitial,
                        watch: true,
                    }));
                    // exports
                    const pack = new s_package_1.default(packageObj.path);
                    pipe(pack.exports({
                        watch: true,
                        buildInitial: finalParams.buildInitial,
                    }));
                }
            });
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    /**
     * @name            upgrade
     * @type            Function
     * @async
     *
     * This method allows you to upgrade all the repo in the monorepo. This mean updating the
     * repositories package.json "version" field using the monorepo package.json version
     *
     * @param       {Partial<ISMonorepoUpgradeParams>}          [params={}]         Some params for your list process
     * @return      {SPromise<ISMonorepoUpgradeResult>}                                                          An SPromise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    upgrade(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoUpgradeParamsInterface_1.default.apply(params !== null && params !== void 0 ? params : {});
            const result = {};
            const rootPackageJson = (0, fs_1.__readJsonSync)(`${this._rootDir}/package.json`);
            const files = s_glob_1.default.resolve(`${finalParams.packagesGlob}/package.json`, {
                cwd: this._rootDir,
            });
            // get the packages as json list
            const packagesListJson = yield this.list({
                packagesGlob: finalParams.packagesGlob,
                json: true,
                publish: true,
            });
            // adding the root package
            packagesListJson[rootPackageJson.name] =
                rootPackageJson.version;
            files.push(s_file_1.default.new(`${this._rootDir}/package.json`));
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[upgrade]</yellow> Upgrading <cyan>${files.length}</cyan> packages with these informations:`,
            });
            finalParams.fields.forEach((field) => {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    margin: {
                        bottom: 1,
                    },
                    value: [
                        `- <yellow>${field}</yellow>: <cyan>${rootPackageJson[field]}</cyan>`,
                    ].join('\n'),
                });
            });
            files.forEach((file) => {
                let isUpgraded = false;
                const packageJson = (0, fs_1.__readJsonSync)(file);
                finalParams.files.forEach((fileName) => {
                    var _a;
                    if (!fileName.match(/\.json$/)) {
                        throw new Error(`Only json files are supported for the upgrade process for now...`);
                    }
                    const filePath = `${file.dirPath}/${fileName}`;
                    if (!fs_2.default.existsSync(filePath))
                        return;
                    const json = (0, fs_1.__readJsonSync)(filePath);
                    finalParams.fields.forEach((field) => {
                        if (json[field] === rootPackageJson[field]) {
                            emit('log', {
                                type: s_log_1.default.TYPE_INFO,
                                value: `<yellow>${json.name}</yellow> <cyan>${field}</cyan> field already up to date`,
                            });
                            return;
                        }
                        isUpgraded = true;
                        json[field] = rootPackageJson[field];
                    });
                    const packageNameColor = json.mainSugarEntryPackage
                        ? 'magenta'
                        : 'yellow';
                    // check if is a mainSugarEntryPoint
                    // if true, add all the monorepo packages as dependencies
                    if (json.mainSugarEntryPackage) {
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<${packageNameColor}>${json.name}</${packageNameColor}> Treat this package as a <magenta>main sugar entry</magenta> one.`,
                        });
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<${packageNameColor}>${json.name}</${packageNameColor}> Adding all the monorepo packages as dependencies.`,
                        });
                        json.dependencies = Object.assign(Object.assign({}, ((_a = json.dependencies) !== null && _a !== void 0 ? _a : {})), (packagesListJson !== null && packagesListJson !== void 0 ? packagesListJson : {}));
                        // delete current package name
                        delete json.dependencies[json.name];
                        // delete mono repo root package name
                        delete json.dependencies[rootPackageJson.name];
                    }
                    function updateDependencies(obj) {
                        var _a, _b;
                        // updating dependencies versions
                        for (let [packageName, packageVersion,] of Object.entries(obj)) {
                            if (packageName.startsWith(`${(_b = (_a = rootPackageJson === null || rootPackageJson === void 0 ? void 0 : rootPackageJson.name) === null || _a === void 0 ? void 0 : _a.split) === null || _b === void 0 ? void 0 : _b.call(_a, '/')[0]}/`) &&
                                obj[packageName] !==
                                    `^${rootPackageJson.version}`) {
                                isUpgraded = true;
                                obj[packageName] = `^${rootPackageJson.version}`;
                            }
                        }
                        return obj;
                    }
                    json.dependencies &&
                        updateDependencies(json.dependencies);
                    json.devDependencies &&
                        updateDependencies(json.devDependencies);
                    (0, fs_1.__writeJsonSync)(filePath, json);
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<green>✓</green> <${packageNameColor}>${json.name}</${packageNameColor}> <cyan>${fileName}</cyan> upgraded <green>successfully</green>`,
                    });
                });
                result[packageJson.name] = {
                    upgraded: isUpgraded,
                };
            });
            resolve(result);
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
exports.default = SMonorepo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHNGQUE4RDtBQUM5RCwwRUFBbUQ7QUFDbkQsa0VBQTJDO0FBQzNDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsOEZBQXNFO0FBQ3RFLGtFQUEyQztBQUUzQywrQ0FHZ0M7QUFDaEMsNkRBRXVDO0FBRXZDLDRGQUFzRTtBQUN0RSxtRkFBNkQ7QUFDN0QsNEZBQXNFO0FBQ3RFLG9HQUE4RTtBQUM5RSxrRUFBMkM7QUFDM0MsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQiwwR0FBb0Y7QUFDcEYsNEdBQXNGO0FBQ3RGLDRHQUFxRjtBQUNyRixrSEFBMkY7QUFDM0Ysd0dBQWtGO0FBQ2xGLGtIQUE0RjtBQXFGNUYsTUFBcUIsU0FBVSxTQUFRLGlCQUFRO0lBTTNDOzs7Ozs7OztPQVFHO0lBQ0gsWUFDSSxVQUFrQixJQUFBLHFCQUFhLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzNDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsRUFDRixRQUFzQztRQUV0QyxLQUFLLENBQ0QsSUFBQSxtQkFBVztRQUNQLGFBQWE7UUFDYixvQ0FBNEIsQ0FBQyxRQUFRLEVBQUUsRUFDdkMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsaUJBQWlCO1FBQ2IsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLHVCQUF1QjtZQUN2QixN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