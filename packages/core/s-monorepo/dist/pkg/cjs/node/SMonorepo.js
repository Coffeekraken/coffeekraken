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
                    relPath: path_2.default.dirname(file.relPath),
                    path: path_2.default.dirname(file.path),
                });
                jsonResult[name] = `^${version}`;
            });
            result.forEach((packageObj) => {
                if (!finalParams.json) {
                    console.log(`${packageObj.private
                        ? '<magenta>[private]</magenta> '
                        : ''}<yellow>${packageObj.name}</yellow> (<${packageObj.version === rootPackageJson.version
                        ? 'green'
                        : 'red'}>${packageObj.version}</${packageObj.version === rootPackageJson.version
                        ? 'green'
                        : 'red'}>) <cyan>${packageObj.relPath}</cyan>`);
                }
            });
            console.log(`<yellow>[list]</yellow> <cyan>${result.length}</cyan> packages found`);
            if (finalParams.json) {
                const jsonStr = JSON.stringify(jsonResult, null, 4);
                (0, clipboard_1.__copy)(jsonStr);
                console.log(`<green>[list]</green> JSON copied into your clipboard`);
            }
            resolve(finalParams.json ? jsonResult : result);
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
                publish: true,
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
                    const builder = new s_typescript_builder_1.default();
                    builder.build({
                        silent: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHNGQUE4RDtBQUM5RCwwRUFBbUQ7QUFDbkQsa0VBQTJDO0FBQzNDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCw4RkFBc0U7QUFDdEUsa0VBQTJDO0FBRTNDLDZEQUF1RDtBQUN2RCwrQ0FBeUU7QUFFekUsMkRBQWdFO0FBQ2hFLHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQseURBQXNEO0FBQ3RELGtFQUEyQztBQUMzQyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCLDBHQUFvRjtBQUNwRiw0R0FBc0Y7QUFDdEYsNEdBQXFGO0FBQ3JGLGtIQUEyRjtBQUMzRix3R0FBa0Y7QUFDbEYsa0hBQTRGO0FBcUY1RixNQUFxQixTQUFVLFNBQVEsaUJBQVE7SUFNM0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUNJLFVBQWtCLElBQUEsdUJBQWdCLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzlDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsRUFDRixRQUFzQztRQUV0QyxLQUFLLENBQ0QsSUFBQSxvQkFBVztRQUNQLGFBQWE7UUFDYixvQ0FBNEIsQ0FBQyxRQUFRLEVBQUUsRUFDdkMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsaUJBQWlCO1FBQ2IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDekMsdUJBQXVCO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFF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