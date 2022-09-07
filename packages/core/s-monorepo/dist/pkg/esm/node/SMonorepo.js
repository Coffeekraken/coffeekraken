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
import { __copy } from '@coffeekraken/sugar/clipboard';
// import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
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
    constructor(rootDir = __packageRoot(process.cwd(), {
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
                    dir: __packageRoot(),
                }));
            }
            // code formatter
            if (finalParams.format) {
                const formatter = new __SCodeFormatter();
                pipe(formatter.format({
                    glob: `${__SSugarConfig.get('monorepo.packagesGlob')}/src/**/*`,
                    inDir: __packageRoot(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxvQkFBb0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdkQsZ0VBQWdFO0FBQ2hFLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sT0FBTyxNQUFNLHdDQUF3QyxDQUFDO0FBQzdELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLDhCQUE4QixNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8s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