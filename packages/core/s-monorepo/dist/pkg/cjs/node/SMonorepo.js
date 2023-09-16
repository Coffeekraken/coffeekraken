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
const SMonorepoCheckDependenciesParamsInterface_js_1 = __importDefault(require("./interface/SMonorepoCheckDependenciesParamsInterface.js"));
const SMonorepoDevParamsInterface_js_1 = __importDefault(require("./interface/SMonorepoDevParamsInterface.js"));
const SMonorepoExecParamsInterface_js_1 = __importDefault(require("./interface/SMonorepoExecParamsInterface.js"));
const SMonorepoListParamsInterface_js_1 = __importDefault(require("./interface/SMonorepoListParamsInterface.js"));
const SMonorepoPublishParamsInterface_js_1 = __importDefault(require("./interface/SMonorepoPublishParamsInterface.js"));
const SMonorepoSettingsInterface_js_1 = __importDefault(require("./interface/SMonorepoSettingsInterface.js"));
const SMonorepoUpgradeParamsInterface_js_1 = __importDefault(require("./interface/SMonorepoUpgradeParamsInterface.js"));
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
        SMonorepoSettingsInterface_js_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
    checkDependencies(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // get all the packages
            const packages = yield this.list({});
            // @ts-ignore
            const finalParams = SMonorepoCheckDependenciesParamsInterface_js_1.default.apply(params);
            const results = {};
            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];
                console.log(`<yellow>[check]</yellow> Checking dependencies for the package "<cyan>${packageObj.name}</cyan>"...`);
                const pack = new s_package_1.default(packageObj.path);
                let result;
                try {
                    result = yield pack.checkDependencies(finalParams);
                }
                catch (e) {
                    return reject(e);
                }
                results[packageObj.name] = result;
                if (!result.ok) {
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
            resolve(results);
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
            const finalParams = SMonorepoExecParamsInterface_js_1.default.apply(params);
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
            const finalParams = SMonorepoListParamsInterface_js_1.default.apply(params);
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
            const finalParams = SMonorepoPublishParamsInterface_js_1.default.apply(params);
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
            const finalParams = SMonorepoDevParamsInterface_js_1.default.apply(params);
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
            const finalParams = SMonorepoUpgradeParamsInterface_js_1.default.apply(params !== null && params !== void 0 ? params : {});
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
            const processedPackages = [];
            files.forEach((file) => {
                let isUpgraded = false;
                const packageJson = (0, fs_1.__readJsonSync)(file);
                // make sure the processed packlage is in the list
                if (!packagesListJson[packageJson.name] ||
                    processedPackages.includes(packageJson.name)) {
                    return;
                }
                // add the package in the processed stack
                processedPackages.push(packageJson.name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHNGQUE4RDtBQUM5RCwwRUFBbUQ7QUFDbkQsa0VBQTJDO0FBQzNDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCw4RkFBc0U7QUFDdEUsa0VBQTJDO0FBRTNDLDZEQUF1RDtBQUN2RCwrQ0FBeUU7QUFFekUsMkRBQWdFO0FBQ2hFLHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQseURBQXNEO0FBQ3RELGtFQUEyQztBQUMzQyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBTzFCLDRJQUFtSDtBQUNuSCxnSEFBdUY7QUFDdkYsa0hBQXlGO0FBQ3pGLGtIQUF3RjtBQUN4Rix3SEFBOEY7QUFDOUYsOEdBQXFGO0FBQ3JGLHdIQUErRjtBQStGL0YsTUFBcUIsU0FBVSxTQUFRLGlCQUFRO0lBTTNDOzs7Ozs7OztPQVFHO0lBQ0gsWUFDSSxVQUFrQixJQUFBLHVCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUM5QyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLEVBQ0YsUUFBc0M7UUFFdEMsS0FBSyxDQUNELElBQUEsb0JBQVc7UUFDUCxhQUFhO1FBQ2IsdUNBQTRCLENBQUMsUUFBUSxFQUFFLEVBQ3ZDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILGlCQUFpQixDQUNiLE1BQWtEO1FBRWxELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1lBQ3pDLHVCQUF1QjtZQUN2QixNQUFNLFFBQVEsR0FBRyxNQUFN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