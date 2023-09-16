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