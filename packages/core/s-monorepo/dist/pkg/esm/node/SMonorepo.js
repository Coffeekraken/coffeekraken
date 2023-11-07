var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SCodeFormatter from '@coffeekraken/s-code-formatter';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPackage from '@coffeekraken/s-package';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import __SVite from '@coffeekraken/s-vite';
import { __copy } from '@coffeekraken/sugar/clipboard';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __formatDuration } from '@coffeekraken/sugar/datetime';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __spawn } from '@coffeekraken/sugar/process';
import __childProcess from 'child_process';
import __fs from 'fs';
import __path from 'path';
import __SMonorepoCheckDependendiesParamsInterface from './interface/SMonorepoCheckDependenciesParamsInterface.js';
import __SMonorepoDevParamsInterface from './interface/SMonorepoDevParamsInterface.js';
import __SMonorepoExecParamsInterface from './interface/SMonorepoExecParamsInterface.js';
import __SMonorepoListParamsInteface from './interface/SMonorepoListParamsInterface.js';
import __SMonorepoPublishParamsInteface from './interface/SMonorepoPublishParamsInterface.js';
import __SMonorepoSettingsInterface from './interface/SMonorepoSettingsInterface.js';
import __SMonorepoUpgradeParamsInterface from './interface/SMonorepoUpgradeParamsInterface.js';
export default class SMonorepo extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(rootDir = __packageRootDir(process.cwd(), {
        highest: true,
    }), settings) {
        super(__deepMerge(
        // @ts-ignore
        __SMonorepoSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
            const finalParams = __SMonorepoCheckDependendiesParamsInterface.apply(params);
            const results = {};
            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];
                if (packageObj.name !== '@coffeekraken/s-sugarcss-plugin') {
                    // continue;
                }
                console.log(`<yellow>[check]</yellow> Checking dependencies for the package "<cyan>${packageObj.name}</cyan>"...`);
                const pack = new __SPackage(packageObj.path);
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
            const finalParams = __SMonorepoExecParamsInterface.apply(params);
            const results = [];
            console.log(`<yellow>[exec]</yellow> Searching for packages...`);
            // get all the packages
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
            });
            console.log(`<yellow>[exec]</yellow> Executing the command "<magenta>${finalParams.command}</magenta>" in these <cyan>${packages.length}</cyan> package(s)`);
            const duration = new __SDuration();
            let currentDuration = 0;
            for (let i = 0; i < packages.length; i++) {
                const pack = packages[i];
                console.log(`<yellow>[exec]</yellow> Executing command "<yellow>${finalParams.command}</yellow>" in folder:`);
                console.log(`<yellow>[exec]</yellow> <cyan>${pack.relPath}</cyan>`);
                const start = Date.now();
                const command = __spawn(finalParams.command, [], {
                    cwd: pack.path,
                });
                const commandResult = yield command;
                results.push(commandResult);
                const end = Date.now();
                currentDuration += end - start;
                const average = currentDuration / i;
                const remaining = average * (packages.length - i);
                console.log(`<green>[exec]</green> Command executed <green>successfully</green> in <yellow>${commandResult.formatedDuration}</yellow>`);
                console.log(`<green>[exec]</green> <magenta>${packages.length - (i + 1)}</magenta> folder(s), <cyan>~${__formatDuration(remaining)}</cyan> remaining...`);
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
            const finalParams = __SMonorepoListParamsInteface.apply(params);
            const result = [];
            const jsonResult = {};
            const rootPackageJson = __readJsonSync(`${this._rootDir}/package.json`);
            const files = __SGlob.resolveSync(`${finalParams.packagesGlob}/package.json`, {
                cwd: this._rootDir,
            });
            files.forEach((file) => {
                let version = 'unknown', name;
                const json = __readJsonSync(file.path);
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
                    relPath: __path.dirname(file.relPath),
                    path: __path.dirname(file.path),
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
                __copy(jsonStr);
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
            const finalParams = __SMonorepoPublishParamsInteface.apply(params);
            const result = {};
            const rootPackageJson = __readJsonSync(`${this._rootDir}/package.json`);
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
                    __childProcess.execSync(`npm publish --access public`, {
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
            const finalParams = __SMonorepoDevParamsInterface.apply(params);
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
            const srcRelDir = __path.relative(this._rootDir, __SSugarConfig.get('typescriptBuilder.inDir')), distRelDir = __path.relative(this._rootDir, __SSugarConfig.get('typescriptBuilder.outDir'));
            console.log(`<yellow>[dev]</yellow> Found <cyan>${packages.length}</cyan> package(s)`);
            // tests
            if (finalParams.test) {
                const vite = new __SVite();
                vite.test({
                    watch: true,
                    dir: __packageRootDir(),
                });
            }
            // code formatter
            if (finalParams.format) {
                const formatter = new __SCodeFormatter();
                formatter.format({
                    glob: `${__SSugarConfig.get('monorepo.packagesGlob')}/src/**/*`,
                    inDir: __packageRootDir(),
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
                    const builder = new __STypescriptBuilder({
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
                    const pack = new __SPackage(packageObj.path);
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
            const finalParams = __SMonorepoUpgradeParamsInterface.apply(params !== null && params !== void 0 ? params : {});
            const result = {};
            const rootPackageJson = __readJsonSync(`${this._rootDir}/package.json`);
            const files = __SGlob.resolveSync(`${finalParams.packagesGlob}/package.json`, {
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
            files.push(__SFile.new(`${this._rootDir}/package.json`));
            console.log(`<yellow>[upgrade]</yellow> Upgrading <cyan>${files.length}</cyan> packages with these informations:`);
            finalParams.fields.forEach((field) => {
                console.log({
                    type: __SLog.TYPE_INFO,
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
                const packageJson = __readJsonSync(file);
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
                    if (!__fs.existsSync(filePath))
                        return;
                    const json = __readJsonSync(filePath);
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
                    __writeJsonSync(filePath, json);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxvQkFBb0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RELE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBTzFCLE9BQU8sMkNBQTJDLE1BQU0sMERBQTBELENBQUM7QUFDbkgsT0FBTyw2QkFBNkIsTUFBTSw0Q0FBNEMsQ0FBQztBQUN2RixPQUFPLDhCQUE4QixNQUFNLDZDQUE2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