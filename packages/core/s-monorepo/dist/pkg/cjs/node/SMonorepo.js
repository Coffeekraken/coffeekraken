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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const s_vite_1 = __importDefault(require("@coffeekraken/s-vite"));
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
const fs_1 = require("@coffeekraken/sugar/fs");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const child_process_1 = __importDefault(require("child_process"));
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
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
    constructor(rootDir = (0, path_1.__packageRootDir)(process.cwd(), {
        highest: true,
    }), settings) {
        super((0, object_1.__deepMerge)(
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
     * @return      {Promise}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    checkDependencies() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // get all the packages
            const packages = yield this.list({});
            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];
                console.log(`<yellow>[check]</yellow> Checking dependencies for the package "<cyan>${packageObj.name}</cyan>"...`);
                const pack = new s_package_1.default(packageObj.path);
                const result = yield pack.checkDependencies();
                if (result !== true) {
                    console.error(`<red>[check]</red> Your package has some dependencies issues`);
                    if (!(yield ((_a = console.ask) === null || _a === void 0 ? void 0 : _a.call(console, {
                        type: 'confirm',
                        message: 'Would you like to continue anyway?',
                        default: false,
                    })))) {
                        return reject(false);
                    }
                }
            }
            // all seems ok
            resolve(true);
        }));
    }
    /**
     * @name            exec
     * @type            Function
     * @async
     *
     * This method allows you to run a command in every packages of the monorepo
     *
     * @param       {Partial<ISMonorepoRunParams>}          [params={}]         Some params for your run process
     * @return      {Promise}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    exec(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoExecParamsInterface_1.default.apply(params);
            const results = [];
            console.log(`<yellow>[exec]</yellow> Searching for packages...`);
            // get all the packages
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
            });
            console.log(`<yellow>[exec]</yellow> Executing the command "<magenta>${finalParams.command}</magenta>" in these <cyan>${packages.length}</cyan> package(s)`);
            const duration = new s_duration_1.default();
            let currentDuration = 0;
            for (let i = 0; i < packages.length; i++) {
                const pack = packages[i];
                console.log(`<yellow>[exec]</yellow> Executing command "<yellow>${finalParams.command}</yellow>" in folder:`);
                console.log(`<yellow>[exec]</yellow> <cyan>${pack.relPath}</cyan>`);
                const start = Date.now();
                const command = (0, process_1.__spawn)(finalParams.command, [], {
                    cwd: pack.path,
                });
                const commandResult = yield command;
                results.push(commandResult);
                const end = Date.now();
                currentDuration += end - start;
                const average = currentDuration / i;
                const remaining = average * (packages.length - i);
                console.log(`<green>[exec]</green> Command executed <green>successfully</green> in <yellow>${commandResult.formatedDuration}</yellow>`);
                console.log(`<green>[exec]</green> <magenta>${packages.length - (i + 1)}</magenta> folder(s), <cyan>~${(0, datetime_1.__formatDuration)(remaining)}</cyan> remaining...`);
                console.log(' ');
            }
            console.log(`<green>[success]</green> Command "<yellow>${finalParams.command}</yellow>" executed <green>successfully</green> in <cyan>${packages.length}</cyan> folder(s) in <yellow>${duration.end().formatedDuration}</yellow>`);
            resolve(results);
        }));
    }
    /**
     * @name            list
     * @type            Function
     * @async
     *
     * This method allows you to list all the repo in the monorepo
     *
     * @param       {Partial<ISMonorepoListParams>}          [params={}]         Some params for your list process
     * @return      {Promise<ISMonorepoListResult>}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    list(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoListParamsInterface_1.default.apply(params);
            const result = [];
            const jsonResult = {};
            const rootPackageJson = (0, fs_1.__readJsonSync)(`${this._rootDir}/package.json`);
            const files = s_glob_1.default.resolveSync(`${finalParams.packagesGlob}/package.json`, {
                cwd: this._rootDir,
            });
            files.forEach((file) => {
                let version = 'unknown', name;
                const json = (0, fs_1.__readJsonSync)(file.path);
                version = json.version;
                name = json.name;
                // check for "independent" packages
                if (!finalParams.independent && json.independent) {
                    return;
                }
                // check if we want this package in the list
                if (!finalParams.private && json.private) {
                    return;
                }
                result.push({
                    name,
                    version,
                    private: json.private,
                    independent: json.independent === true,
                    relPath: path_2.default.dirname(file.relPath),
                    path: path_2.default.dirname(file.path),
                });
                jsonResult[name] = `^${version}`;
            });
            result.forEach((packageObj) => {
                if (!finalParams.asJson) {
                    console.log(`${packageObj.private
                        ? '<magenta>[private]</magenta> '
                        : ''}${packageObj.independent
                        ? '<cyan>[independent]</cyan> '
                        : ''}<yellow>${packageObj.name}</yellow> (<${packageObj.version === rootPackageJson.version
                        ? 'green'
                        : 'red'}>${packageObj.version}</${packageObj.version === rootPackageJson.version
                        ? 'green'
                        : 'red'}>) <cyan>${packageObj.relPath}</cyan>`);
                }
            });
            console.log(`<yellow>[list]</yellow> <cyan>${result.length}</cyan> packages found`);
            if (finalParams.asJson) {
                const jsonStr = JSON.stringify(jsonResult, null, 4);
                (0, clipboard_1.__copy)(jsonStr);
                console.log(`<green>[list]</green> JSON copied into your clipboard`);
            }
            resolve(finalParams.asJson ? jsonResult : result);
        }));
    }
    /**
     * @name            publish
     * @type            Function
     * @async
     *
     * This method allows you to publish all the repo in the monorepo
     *
     * @param       {Partial<ISMonorepoListParams>}          [params={}]         Some params for your list process
     * @return      {Promise<ISMonorepoListResult>}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    publish(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            // @ts-ignore
            const finalParams = SMonorepoPublishParamsInterface_1.default.apply(params);
            const result = {};
            const rootPackageJson = (0, fs_1.__readJsonSync)(`${this._rootDir}/package.json`);
            if (!finalParams.yes &&
                !(yield ((_a = console.ask) === null || _a === void 0 ? void 0 : _a.call(console, {
                    type: 'confirm',
                    message: `Is <magenta>${rootPackageJson.version}</magenta> the version you want to publish?`,
                    default: true,
                })))) {
                return reject(false);
            }
            // loop on all packages to publish them once at a time
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
                private: false,
                independent: false,
            });
            console.log(`<yellow>[publish]</yellow> <cyan>${packages.length}</cyan> packages found:`);
            packages.forEach((packageObj) => {
                console.log(`<yellow>[publish]</yellow> - <cyan>${packageObj.name}</cyan>`);
            });
            if (!finalParams.yes &&
                !(yield ((_b = console.ask) === null || _b === void 0 ? void 0 : _b.call(console, {
                    type: 'confirm',
                    message: `Are these packages the ones you want to publish?`,
                    default: true,
                })))) {
                return reject(false);
            }
            if (!finalParams.yes &&
                !(yield ((_c = console.ask) === null || _c === void 0 ? void 0 : _c.call(console, {
                    type: 'confirm',
                    message: `Are you sure your packages are ready? Don't forget about <yellow>docmap</yellow>, <yellow>builds</yellow> etc...? Just asking...`,
                    default: true,
                })))) {
                return reject(false);
            }
            // upgrading monorepo
            try {
                yield this.upgrade();
            }
            catch (e) {
                return reject(e);
            }
            if (!finalParams.yes &&
                !(yield ((_d = console.ask) === null || _d === void 0 ? void 0 : _d.call(console, {
                    type: 'confirm',
                    message: 'All seems ok with your packages versions. Would you like to continue?',
                    default: true,
                })))) {
                return reject(false);
            }
            // check dependencies
            try {
                yield this.checkDependencies();
            }
            catch (e) {
                return reject(e);
            }
            if (!finalParams.yes &&
                !(yield ((_e = console.ask) === null || _e === void 0 ? void 0 : _e.call(console, {
                    type: 'confirm',
                    message: 'All seems ok with your packages dependencies. Would you like to continue?',
                    default: true,
                })))) {
                return reject(false);
            }
            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];
                try {
                    console.log(`<yellow>[publish]</yellow> Publishing your package "<cyan>${packageObj.name}</cyan>"...`);
                    child_process_1.default.execSync(`npm publish --access public`, {
                        cwd: packageObj.path,
                    });
                    // populate the result
                    result[packageObj.name] = {
                        published: true,
                    };
                    console.log(`<yellow>[publish]</yellow> <cyan>${packages.length - i - 1}</cyan> / ${packages.length} remaining package(s)`);
                    console.log(`<green>[publish]</green> Your package "<cyan>${packageObj.name}</cyan>" has been published <green>successfully</green> in version <magenta>${rootPackageJson.version}</magenta>!`);
                }
                catch (e) {
                    console.error(e.toString()),
                        console.warn(`<red>[publish]</red> Something goes wrong when publishing the "<cyan>${packageObj.name}</cyan>"`);
                    // populate the result
                    result[packageObj.name] = {
                        published: false,
                        error: e,
                    };
                    if (!finalParams.yes &&
                        !(yield ((_f = console.ask) === null || _f === void 0 ? void 0 : _f.call(console, {
                            type: 'confirm',
                            message: 'Would you like to continue anyway?',
                        })))) {
                        return reject(false);
                    }
                }
            }
            resolve(result);
        }));
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
     * @return      {Promise<ISMonorepoListResult>}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    dev(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoDevParamsInterface_1.default.apply(params);
            if (!finalParams.build &&
                !finalParams.test &&
                !finalParams.format) {
                console.log('<red>[dev]</red> You must at least make use of one of these development features. <magenta>build</magenta>, <magenta>format</magenta>, <magenta>test</magenta>');
                return resolve();
            }
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
                independent: true,
                private: true,
            });
            const srcRelDir = path_2.default.relative(this._rootDir, s_sugar_config_1.default.get('typescriptBuilder.inDir')), distRelDir = path_2.default.relative(this._rootDir, s_sugar_config_1.default.get('typescriptBuilder.outDir'));
            console.log(`<yellow>[dev]</yellow> Found <cyan>${packages.length}</cyan> package(s)`);
            // tests
            if (finalParams.test) {
                const vite = new s_vite_1.default();
                vite.test({
                    watch: true,
                    dir: (0, path_1.__packageRootDir)(),
                });
            }
            // code formatter
            if (finalParams.format) {
                const formatter = new s_code_formatter_1.default();
                formatter.format({
                    glob: `${s_sugar_config_1.default.get('monorepo.packagesGlob')}/src/**/*`,
                    inDir: (0, path_1.__packageRootDir)(),
                    watch: true,
                    log: {
                        summary: false,
                    },
                    formatInitial: finalParams.formatInitial,
                });
            }
            if (finalParams.build) {
                console.log(`<yellow>[watch]</yellow> Watching for file changes...`);
            }
            packages.forEach((packageObj) => {
                if (finalParams.build) {
                    // typescript compilation
                    const inDir = `${packageObj.path}/${srcRelDir}`, outDir = `${packageObj.path}/${distRelDir}`;
                    const builder = new s_typescript_builder_1.default({
                        log: {
                            summary: false,
                        },
                    });
                    builder.build({
                        inDir,
                        outDir,
                        packageRoot: packageObj.path,
                        buildInitial: finalParams.buildInitial,
                        watch: true,
                    });
                    // exports
                    const pack = new s_package_1.default(packageObj.path);
                    pack.exports({
                        watch: true,
                        buildInitial: finalParams.buildInitial,
                    });
                }
            });
        }));
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
     * @return      {Promise<ISMonorepoUpgradeResult>}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    upgrade(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SMonorepoUpgradeParamsInterface_1.default.apply(params !== null && params !== void 0 ? params : {});
            const result = {};
            const rootPackageJson = (0, fs_1.__readJsonSync)(`${this._rootDir}/package.json`);
            const files = s_glob_1.default.resolveSync(`${finalParams.packagesGlob}/package.json`, {
                cwd: this._rootDir,
            });
            // get the packages as json list
            const packagesListJson = yield this.list({
                packagesGlob: finalParams.packagesGlob,
                asJson: true,
                private: false,
                independent: false,
            });
            // adding the root package
            packagesListJson[rootPackageJson.name] = rootPackageJson.version;
            files.push(s_file_1.default.new(`${this._rootDir}/package.json`));
            console.log(`<yellow>[upgrade]</yellow> Upgrading <cyan>${files.length}</cyan> packages with these informations:`);
            finalParams.fields.forEach((field) => {
                console.log({
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
                            console.log(`<yellow>${json.name}</yellow> <cyan>${field}</cyan> field already up to date`);
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
                        console.log(`<${packageNameColor}>${json.name}</${packageNameColor}> Treat this package as a <magenta>main sugar entry</magenta> one.`);
                        console.log(`<${packageNameColor}>${json.name}</${packageNameColor}> Adding all the monorepo packages as dependencies.`);
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
                    json.dependencies && updateDependencies(json.dependencies);
                    json.devDependencies &&
                        updateDependencies(json.devDependencies);
                    (0, fs_1.__writeJsonSync)(filePath, json);
                    console.log(`<green>✓</green> <${packageNameColor}>${json.name}</${packageNameColor}> <cyan>${fileName}</cyan> upgraded <green>successfully</green>`);
                });
                result[packageJson.name] = {
                    upgraded: isUpgraded,
                };
            });
            resolve(result);
        }));
    }
}
exports.default = SMonorepo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHNGQUE4RDtBQUM5RCwwRUFBbUQ7QUFDbkQsa0VBQTJDO0FBQzNDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCw4RkFBc0U7QUFDdEUsa0VBQTJDO0FBRTNDLDZEQUF1RDtBQUN2RCwrQ0FBeUU7QUFFekUsMkRBQWdFO0FBQ2hFLHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQseURBQXNEO0FBQ3RELGtFQUEyQztBQUMzQyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCLDBHQUFvRjtBQUNwRiw0R0FBc0Y7QUFDdEYsNEdBQXFGO0FBQ3JGLGtIQUEyRjtBQUMzRix3R0FBa0Y7QUFDbEYsa0hBQTRGO0FBd0Y1RixNQUFxQixTQUFVLFNBQVEsaUJBQVE7SUFNM0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUNJLFVBQWtCLElBQUEsdUJBQWdCLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzlDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsRUFDRixRQUFzQztRQUV0QyxLQUFLLENBQ0QsSUFBQSxvQkFBVztRQUNQLGFBQWE7UUFDYixvQ0FBNEIsQ0FBQyxRQUFRLEVBQUUsRUFDdkMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsaUJBQWlCO1FBQ2IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDekMsdUJBQXVCO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFF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