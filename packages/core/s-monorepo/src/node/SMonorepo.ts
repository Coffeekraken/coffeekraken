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

import type {
    ISPackageCheckDependenciesParams,
    ISPackageCheckDependenciesResult,
} from '@coffeekraken/s-package';

import __SMonorepoCheckDependendiesParamsInterface from './interface/SMonorepoCheckDependenciesParamsInterface.js';
import __SMonorepoDevParamsInterface from './interface/SMonorepoDevParamsInterface.js';
import __SMonorepoExecParamsInterface from './interface/SMonorepoExecParamsInterface.js';
import __SMonorepoListParamsInteface from './interface/SMonorepoListParamsInterface.js';
import __SMonorepoPublishParamsInteface from './interface/SMonorepoPublishParamsInterface.js';
import __SMonorepoSettingsInterface from './interface/SMonorepoSettingsInterface.js';
import __SMonorepoUpgradeParamsInterface from './interface/SMonorepoUpgradeParamsInterface.js';

/**
 * @name                SMonorepo
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 * @private
 *
 * This class represent a monorepo with some features like executing a command on all packages, list all the packages, upgrade each package's package.json, etc...
 *
 * @feature         Execute a command in every packages of the monorepo
 * @feature         List all the packages of the monorepo
 * @feature         Upgrade each package's package.json depending on the monorepo's one
 *
 * @param           {ISMonorepoSettings}          [settings={}]           Some settings to configure your monorepo instance
 *
 * @example         js
 * import SMonorepo from '@coffeekraken/s-monorepo';
 * const repo = new SMonorepo({
 *      monorepo: {
 *          // settings here...
 *      }
 * });
 * await repo.exec({
 *    command: 'ls -la'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISMonorepoSettings {
    packagesGlob: string;
}

export interface ISMonorepoRunParams {
    command: string;
    packagesGlob: string;
}
export interface ISMonorepoRunResult {}

export interface ISMonorepoListParams {
    packagesGlob: string;
    asJson: boolean;
    private: undefined | boolean;
    independent: boolean;
}
export interface ISMonorepoListResult {
    name: string;
    version: string;
    private: boolean;
    independent: boolean;
    path: string;
    relPath: string;
}

export interface ISMonorepoPublishParams {
    packagesGlob: string;
    yes: boolean;
}
export interface ISMonorepoPublishResult {
    published: boolean;
    error?: Error;
}

export interface ISMonorepoDevParams {
    packagesGlob: string;
    build: boolean;
    buildInitial: boolean;
    test: boolean;
    testInitial: boolean;
    format: boolean;
    formatInitial: boolean;
}
export interface ISMonorepoDevResult {}

export interface ISMonorepoCheckDependenciesParams
    extends ISPackageCheckDependenciesParams {
    packagesGlob: string;
}
export interface ISMonorepoCheckDependenciesResult
    extends ISPackageCheckDependenciesResult {}

export interface ISMonorepoUpgradeParams {
    packagesGlob: string;
    files: string[];
    fields: string[];
}
export interface ISMonorepoUpgradeResult {
    upgraded: boolean;
}

export default class SMonorepo extends __SClass {
    /**
     * Store the monorepo root directory path
     */
    private _rootDir: string;

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        rootDir: string = __packageRootDir(process.cwd(), {
            highest: true,
        }),
        settings?: Partial<ISMonorepoSettings>,
    ) {
        super(
            __deepMerge(
                // @ts-ignore
                __SMonorepoSettingsInterface.defaults(),
                settings ?? {},
            ),
        );
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
    checkDependencies(
        params: Partial<ISMonorepoCheckDependenciesParams>,
    ): Promise<Record<string, ISMonorepoCheckDependenciesResult>> {
        return new Promise(async (resolve, reject) => {
            // get all the packages
            const packages = await this.list({});

            // @ts-ignore
            const finalParams: ISMonorepoCheckDependenciesParams =
                __SMonorepoCheckDependendiesParamsInterface.apply(params);

            const results: Record<string, ISMonorepoCheckDependenciesResult> =
                {};

            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];

                console.log(
                    `<yellow>[check]</yellow> Checking dependencies for the package "<cyan>${packageObj.name}</cyan>"...`,
                );

                const pack = new __SPackage(packageObj.path);

                let result;
                try {
                    result = await pack.checkDependencies(finalParams);
                } catch (e) {
                    return reject(e);
                }

                results[packageObj.name] = result;

                if (!result.ok) {
                    console.error(
                        `<red>[check]</red> Your package has some dependencies issues`,
                    );

                    if (
                        !(await console.ask?.({
                            type: 'confirm',
                            message: 'Would you like to continue anyway?',
                            default: false,
                        }))
                    ) {
                        return reject(false);
                    }
                }
            }

            // all seems ok
            resolve(results);
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
     * @return      {Promise}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    exec(params: Partial<ISMonorepoRunParams>): Promise<ISMonorepoRunResult> {
        return new Promise(async (resolve) => {
            // @ts-ignore
            const finalParams: ISMonorepoRunParams =
                __SMonorepoExecParamsInterface.apply(params);

            const results: ISMonorepoRunResult[] = [];

            console.log(`<yellow>[exec]</yellow> Searching for packages...`);

            // get all the packages
            const packages = await this.list({
                packagesGlob: finalParams.packagesGlob,
            });

            console.log(
                `<yellow>[exec]</yellow> Executing the command "<magenta>${finalParams.command}</magenta>" in these <cyan>${packages.length}</cyan> package(s)`,
            );

            const duration = new __SDuration();

            let currentDuration = 0;

            for (let i = 0; i < packages.length; i++) {
                const pack = packages[i];

                console.log(
                    `<yellow>[exec]</yellow> Executing command "<yellow>${finalParams.command}</yellow>" in folder:`,
                );
                console.log(
                    `<yellow>[exec]</yellow> <cyan>${pack.relPath}</cyan>`,
                );

                const start = Date.now();

                const command = __spawn(finalParams.command, [], {
                    cwd: pack.path,
                });
                const commandResult = await command;

                results.push(commandResult);

                const end = Date.now();
                currentDuration += end - start;

                const average = currentDuration / i;
                const remaining = average * (packages.length - i);

                console.log(
                    `<green>[exec]</green> Command executed <green>successfully</green> in <yellow>${commandResult.formatedDuration}</yellow>`,
                );
                console.log(
                    `<green>[exec]</green> <magenta>${
                        packages.length - (i + 1)
                    }</magenta> folder(s), <cyan>~${__formatDuration(
                        remaining,
                    )}</cyan> remaining...`,
                );
                console.log(' ');
            }

            console.log(
                `<green>[success]</green> Command "<yellow>${
                    finalParams.command
                }</yellow>" executed <green>successfully</green> in <cyan>${
                    packages.length
                }</cyan> folder(s) in <yellow>${
                    duration.end().formatedDuration
                }</yellow>`,
            );

            resolve(results);
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
     * @return      {Promise<ISMonorepoListResult>}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    list(
        params: Partial<ISMonorepoListParams>,
    ): Promise<ISMonorepoListResult[]> {
        return new Promise(async (resolve) => {
            // @ts-ignore
            const finalParams: ISMonorepoListParams =
                __SMonorepoListParamsInteface.apply(params);

            const result: ISMonorepoListResult[] = [];
            const jsonResult: Record<string, string> = {};

            const rootPackageJson = __readJsonSync(
                `${this._rootDir}/package.json`,
            );

            const files = __SGlob.resolveSync(
                `${finalParams.packagesGlob}/package.json`,
                {
                    cwd: this._rootDir,
                },
            );

            files.forEach((file) => {
                let version = 'unknown',
                    name;

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
                    console.log(
                        `${
                            packageObj.private
                                ? '<magenta>[private]</magenta> '
                                : ''
                        }${
                            packageObj.independent
                                ? '<cyan>[independent]</cyan> '
                                : ''
                        }<yellow>${packageObj.name}</yellow> (<${
                            packageObj.version === rootPackageJson.version
                                ? 'green'
                                : 'red'
                        }>${packageObj.version}</${
                            packageObj.version === rootPackageJson.version
                                ? 'green'
                                : 'red'
                        }>) <cyan>${packageObj.relPath}</cyan>`,
                    );
                }
            });

            console.log(
                `<yellow>[list]</yellow> <cyan>${result.length}</cyan> packages found`,
            );

            if (finalParams.asJson) {
                const jsonStr = JSON.stringify(jsonResult, null, 4);
                __copy(jsonStr);
                console.log(
                    `<green>[list]</green> JSON copied into your clipboard`,
                );
            }

            resolve(finalParams.asJson ? jsonResult : result);
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
     * @return      {Promise<ISMonorepoListResult>}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    publish(
        params: Partial<ISMonorepoPublishParams>,
    ): Promise<ISMonorepoPublishResult[] | false> {
        return new Promise(async (resolve, reject) => {
            // @ts-ignore
            const finalParams: ISMonorepoPublishParams =
                __SMonorepoPublishParamsInteface.apply(params);

            const result: Record<string, ISMonorepoPublishResult> = {};

            const rootPackageJson = __readJsonSync(
                `${this._rootDir}/package.json`,
            );

            if (
                !finalParams.yes &&
                !(await console.ask?.({
                    type: 'confirm',
                    message: `Is <magenta>${rootPackageJson.version}</magenta> the version you want to publish?`,
                    default: true,
                }))
            ) {
                return reject(false);
            }

            // loop on all packages to publish them once at a time
            const packages = await this.list({
                packagesGlob: finalParams.packagesGlob,
                private: false,
                independent: false,
            });

            console.log(
                `<yellow>[publish]</yellow> <cyan>${packages.length}</cyan> packages found:`,
            );

            packages.forEach((packageObj) => {
                console.log(
                    `<yellow>[publish]</yellow> - <cyan>${packageObj.name}</cyan>`,
                );
            });

            if (
                !finalParams.yes &&
                !(await console.ask?.({
                    type: 'confirm',
                    message: `Are these packages the ones you want to publish?`,
                    default: true,
                }))
            ) {
                return reject(false);
            }

            if (
                !finalParams.yes &&
                !(await console.ask?.({
                    type: 'confirm',
                    message: `Are you sure your packages are ready? Don't forget about <yellow>docmap</yellow>, <yellow>builds</yellow> etc...? Just asking...`,
                    default: true,
                }))
            ) {
                return reject(false);
            }

            // upgrading monorepo
            try {
                await this.upgrade();
            } catch (e) {
                return reject(e);
            }

            if (
                !finalParams.yes &&
                !(await console.ask?.({
                    type: 'confirm',
                    message:
                        'All seems ok with your packages versions. Would you like to continue?',
                    default: true,
                }))
            ) {
                return reject(false);
            }

            // check dependencies
            try {
                await this.checkDependencies();
            } catch (e) {
                return reject(e);
            }

            if (
                !finalParams.yes &&
                !(await console.ask?.({
                    type: 'confirm',
                    message:
                        'All seems ok with your packages dependencies. Would you like to continue?',
                    default: true,
                }))
            ) {
                return reject(false);
            }

            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];
                try {
                    console.log(
                        `<yellow>[publish]</yellow> Publishing your package "<cyan>${packageObj.name}</cyan>"...`,
                    );
                    __childProcess.execSync(`npm publish --access public`, {
                        cwd: packageObj.path,
                    });
                    // populate the result
                    result[packageObj.name] = {
                        published: true,
                    };
                    console.log(
                        `<yellow>[publish]</yellow> <cyan>${
                            packages.length - i - 1
                        }</cyan> / ${packages.length} remaining package(s)`,
                    );
                    console.log(
                        `<green>[publish]</green> Your package "<cyan>${packageObj.name}</cyan>" has been published <green>successfully</green> in version <magenta>${rootPackageJson.version}</magenta>!`,
                    );
                } catch (e) {
                    console.error(e.toString()),
                        console.warn(
                            `<red>[publish]</red> Something goes wrong when publishing the "<cyan>${packageObj.name}</cyan>"`,
                        );
                    // populate the result
                    result[packageObj.name] = {
                        published: false,
                        error: <Error>e,
                    };
                    if (
                        !finalParams.yes &&
                        !(await console.ask?.({
                            type: 'confirm',
                            message: 'Would you like to continue anyway?',
                        }))
                    ) {
                        return reject(false);
                    }
                }
            }

            resolve(result);
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
     * @return      {Promise<ISMonorepoListResult>}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    dev(
        params: Partial<ISMonorepoDevParams>,
    ): Promise<ISMonorepoListResult[] | void> {
        return new Promise(async (resolve) => {
            // @ts-ignore
            const finalParams: ISMonorepoDevParams =
                __SMonorepoDevParamsInterface.apply(params);

            if (
                !finalParams.build &&
                !finalParams.test &&
                !finalParams.format
            ) {
                console.log(
                    '<red>[dev]</red> You must at least make use of one of these development features. <magenta>build</magenta>, <magenta>format</magenta>, <magenta>test</magenta>',
                );
                return resolve();
            }

            const packages = await this.list({
                packagesGlob: finalParams.packagesGlob,
                independent: true,
                private: true,
            });
            const srcRelDir = __path.relative(
                    this._rootDir,
                    __SSugarConfig.get('typescriptBuilder.inDir'),
                ),
                distRelDir = __path.relative(
                    this._rootDir,
                    __SSugarConfig.get('typescriptBuilder.outDir'),
                );

            console.log(
                `<yellow>[dev]</yellow> Found <cyan>${packages.length}</cyan> package(s)`,
            );

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
                    glob: `${__SSugarConfig.get(
                        'monorepo.packagesGlob',
                    )}/src/**/*`,
                    inDir: __packageRootDir(),
                    watch: true,
                    log: {
                        summary: false,
                    },
                    formatInitial: finalParams.formatInitial,
                });
            }

            if (finalParams.build) {
                console.log(
                    `<yellow>[watch]</yellow> Watching for file changes...`,
                );
            }

            packages.forEach((packageObj) => {
                if (finalParams.build) {
                    // typescript compilation
                    const inDir = `${packageObj.path}/${srcRelDir}`,
                        outDir = `${packageObj.path}/${distRelDir}`;

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
     * @return      {Promise<ISMonorepoUpgradeResult>}                                                          An Promise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    upgrade(
        params?: ISMonorepoUpgradeParams,
    ): Promise<ISMonorepoUpgradeResult | boolean> {
        return new Promise(async (resolve) => {
            // @ts-ignore
            const finalParams: ISMonorepoUpgradeParams =
                __SMonorepoUpgradeParamsInterface.apply(params ?? {});

            const result: Record<string, ISMonorepoUpgradeResult> = {};

            const rootPackageJson = __readJsonSync(
                `${this._rootDir}/package.json`,
            );

            const files = __SGlob.resolveSync(
                `${finalParams.packagesGlob}/package.json`,
                {
                    cwd: this._rootDir,
                },
            );

            // get the packages as json list
            const packagesListJson = await this.list({
                packagesGlob: finalParams.packagesGlob,
                asJson: true,
                private: false,
                independent: false,
            });

            // adding the root package
            packagesListJson[rootPackageJson.name] = rootPackageJson.version;
            files.push(__SFile.new(`${this._rootDir}/package.json`));

            console.log(
                `<yellow>[upgrade]</yellow> Upgrading <cyan>${files.length}</cyan> packages with these informations:`,
            );

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

            const processedPackages: string[] = [];

            files.forEach((file) => {
                let isUpgraded = false;

                const packageJson = __readJsonSync(file);

                // make sure the processed packlage is in the list
                if (
                    !packagesListJson[packageJson.name] ||
                    processedPackages.includes(packageJson.name)
                ) {
                    return;
                }

                // add the package in the processed stack
                processedPackages.push(packageJson.name);

                finalParams.files.forEach((fileName) => {
                    if (!fileName.match(/\.json$/)) {
                        throw new Error(
                            `Only json files are supported for the upgrade process for now...`,
                        );
                    }
                    const filePath = `${file.dirPath}/${fileName}`;
                    if (!__fs.existsSync(filePath)) return;
                    const json = __readJsonSync(filePath);

                    finalParams.fields.forEach((field) => {
                        if (json[field] === rootPackageJson[field]) {
                            console.log(
                                `<yellow>${json.name}</yellow> <cyan>${field}</cyan> field already up to date`,
                            );
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
                        console.log(
                            `<${packageNameColor}>${json.name}</${packageNameColor}> Treat this package as a <magenta>main sugar entry</magenta> one.`,
                        );
                        console.log(
                            `<${packageNameColor}>${json.name}</${packageNameColor}> Adding all the monorepo packages as dependencies.`,
                        );
                        json.dependencies = {
                            ...(json.dependencies ?? {}),
                            ...(packagesListJson ?? {}),
                        };
                        // delete current package name
                        delete json.dependencies[json.name];
                        // delete mono repo root package name
                        delete json.dependencies[rootPackageJson.name];
                    }

                    function updateDependencies(obj) {
                        // updating dependencies versions
                        for (let [
                            packageName,
                            packageVersion,
                        ] of Object.entries(obj)) {
                            if (
                                packageName.startsWith(
                                    `${
                                        rootPackageJson?.name?.split?.('/')[0]
                                    }/`,
                                ) &&
                                obj[packageName] !==
                                    `^${rootPackageJson.version}`
                            ) {
                                isUpgraded = true;
                                obj[
                                    packageName
                                ] = `^${rootPackageJson.version}`;
                            }
                        }
                        return obj;
                    }

                    json.dependencies && updateDependencies(json.dependencies);
                    json.devDependencies &&
                        updateDependencies(json.devDependencies);

                    __writeJsonSync(filePath, json);
                    console.log(
                        `<green>✓</green> <${packageNameColor}>${json.name}</${packageNameColor}> <cyan>${fileName}</cyan> upgraded <green>successfully</green>`,
                    );
                });
                result[packageJson.name] = {
                    upgraded: isUpgraded,
                };
            });

            resolve(result);
        });
    }
}
