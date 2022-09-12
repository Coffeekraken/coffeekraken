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
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import __SVite from '@coffeekraken/s-vite';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __copy } from '@coffeekraken/sugar/clipboard';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __spawn } from '@coffeekraken/sugar/process';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __formatDuration from '@coffeekraken/sugar/shared/time/formatDuration';
import __childProcess from 'child_process';
import __fs from 'fs';
import __path from 'path';
import __SMonorepoDevParamsInterface from './interface/SMonorepoDevParamsInterface';
import __SMonorepoExecParamsInterface from './interface/SMonorepoExecParamsInterface';
import __SMonorepoListParamsInteface from './interface/SMonorepoListParamsInterface';
import __SMonorepoPublishParamsInteface from './interface/SMonorepoPublishParamsInterface';
import __SMonorepoSettingsInterface from './interface/SMonorepoSettingsInterface';
import __SMonorepoUpgradeParamsInterface from './interface/SMonorepoUpgradeParamsInterface';
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
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    checkDependencies() {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // get all the packages
            const packages = yield this.list({});
            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[check]</yellow> Checking dependencies for the package "<cyan>${packageObj.name}</cyan>"...`,
                });
                const pack = new __SPackage(packageObj.path);
                const result = yield pack.checkDependencies();
                if (result !== true) {
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SMonorepoExecParamsInterface.apply(params);
            const results = [];
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[exec]</yellow> Searching for packages...`,
            });
            // get all the packages
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[exec]</yellow> Executing the command "<magenta>${finalParams.command}</magenta>" in these <cyan>${packages.length}</cyan> package(s)`,
            });
            const duration = new __SDuration();
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
                const command = pipe(__spawn(finalParams.command, [], {
                    cwd: pack.path,
                }));
                const commandResult = yield command;
                results.push(commandResult);
                const end = Date.now();
                currentDuration += end - start;
                const average = currentDuration / i;
                const remaining = average * (packages.length - i);
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[exec]</green> Command executed <green>successfully</green> in <yellow>${commandResult.formatedDuration}</yellow>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[exec]</green> <magenta>${packages.length - (i + 1)}</magenta> folder(s), <cyan>~${__formatDuration(remaining)}</cyan> remaining...`,
                });
                emit('log', {
                    value: ' ',
                });
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SMonorepoListParamsInteface.apply(params);
            const result = [];
            const jsonResult = {};
            const rootPackageJson = __readJsonSync(`${this._rootDir}/package.json`);
            const files = __SGlob.resolve(`${finalParams.packagesGlob}/package.json`, {
                cwd: this._rootDir,
            });
            files.forEach((file) => {
                let version = 'unknown', name;
                const json = __readJsonSync(file.path);
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
                    relPath: __path.dirname(file.relPath),
                    path: __path.dirname(file.path),
                });
                jsonResult[name] = `^${version}`;
            });
            result.forEach((packageObj) => {
                if (!finalParams.json) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
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
                type: __SLog.TYPE_INFO,
                value: `<yellow>[list]</yellow> <cyan>${result.length}</cyan> packages found`,
            });
            if (finalParams.json) {
                const jsonStr = JSON.stringify(jsonResult, null, 4);
                __copy(jsonStr);
                emit('log', {
                    type: __SLog.TYPE_INFO,
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SMonorepoPublishParamsInteface.apply(params);
            const result = {};
            const rootPackageJson = __readJsonSync(`${this._rootDir}/package.json`);
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
                type: __SLog.TYPE_INFO,
                value: `<yellow>[publish]</yellow> <cyan>${packages.length}</cyan> packages found:`,
            });
            packages.forEach((packageObj) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
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
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[publish]</yellow> Publishing your package "<cyan>${packageObj.name}</cyan>"...`,
                    });
                    __childProcess.execSync(`npm publish --access public`, {
                        cwd: packageObj.path,
                    });
                    // populate the result
                    result[packageObj.name] = {
                        published: true,
                    };
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[publish]</yellow> <cyan>${packages.length - i - 1}</cyan> / ${packages.length} remaining package(s)`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_SUCCESS,
                        value: `<green>[publish]</green> Your package "<cyan>${packageObj.name}</cyan>" has been published <green>successfully</green> in version <magenta>${rootPackageJson.version}</magenta>!`,
                    });
                }
                catch (e) {
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        // @ts-ignore
                        value: e.toString(),
                    });
                    emit('log', {
                        type: __SLog.TYPE_WARNING,
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SMonorepoDevParamsInterface.apply(params);
            if (!finalParams.build &&
                !finalParams.test &&
                !finalParams.format) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: '<red>[dev]</red> You must at least make use of one of these development features. <magenta>build</magenta>, <magenta>format</magenta>, <magenta>test</magenta>',
                });
                return resolve();
            }
            const packages = yield this.list({
                packagesGlob: finalParams.packagesGlob,
            });
            const srcRelDir = __path.relative(this._rootDir, __SSugarConfig.get('typescriptBuilder.inDir')), distRelDir = __path.relative(this._rootDir, __SSugarConfig.get('typescriptBuilder.outDir'));
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[dev]</yellow> Found <cyan>${packages.length}</cyan> package(s)`,
            });
            // tests
            if (finalParams.test) {
                const vite = new __SVite();
                pipe(vite.test({
                    watch: true,
                    dir: __packageRootDir(),
                }));
            }
            // code formatter
            if (finalParams.format) {
                const formatter = new __SCodeFormatter();
                pipe(formatter.format({
                    glob: `${__SSugarConfig.get('monorepo.packagesGlob')}/src/**/*`,
                    inDir: __packageRootDir(),
                    watch: true,
                    formatInitial: finalParams.formatInitial,
                }));
            }
            if (finalParams.build) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[watch]</yellow> Watching for file changes...`,
                }, {
                    id: 'STypescriptBuilder',
                });
            }
            packages.forEach((packageObj) => {
                if (finalParams.build) {
                    // typescript compilation
                    const inDir = `${packageObj.path}/${srcRelDir}`, outDir = `${packageObj.path}/${distRelDir}`;
                    const builder = new __STypescriptBuilder();
                    pipe(builder.build({
                        silent: true,
                        inDir,
                        outDir,
                        packageRoot: packageObj.path,
                        buildInitial: finalParams.buildInitial,
                        watch: true,
                    }));
                    // exports
                    const pack = new __SPackage(packageObj.path);
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SMonorepoUpgradeParamsInterface.apply(params !== null && params !== void 0 ? params : {});
            const result = {};
            const rootPackageJson = __readJsonSync(`${this._rootDir}/package.json`);
            const files = __SGlob.resolve(`${finalParams.packagesGlob}/package.json`, {
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
            files.push(__SFile.new(`${this._rootDir}/package.json`));
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[upgrade]</yellow> Upgrading <cyan>${files.length}</cyan> packages with these informations:`,
            });
            finalParams.fields.forEach((field) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
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
                const packageJson = __readJsonSync(file);
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
                            emit('log', {
                                type: __SLog.TYPE_INFO,
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
                            type: __SLog.TYPE_INFO,
                            value: `<${packageNameColor}>${json.name}</${packageNameColor}> Treat this package as a <magenta>main sugar entry</magenta> one.`,
                        });
                        emit('log', {
                            type: __SLog.TYPE_INFO,
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
                    __writeJsonSync(filePath, json);
                    emit('log', {
                        type: __SLog.TYPE_INFO,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxvQkFBb0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxnQkFBZ0IsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sOEJBQThCLE1BQU0sMENBQTBDLENBQUM7QUFDdEYsT0FBTyw2QkFB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