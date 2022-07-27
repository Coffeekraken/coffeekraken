import __SClass from '@coffeekraken/s-class';
import __SCodeFormatter from '@coffeekraken/s-code-formatter';
import __SDuration from '@coffeekraken/s-duration';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPackage from '@coffeekraken/s-package';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import __SVite from '@coffeekraken/s-vite';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
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
import __SMonorepoListParamsInteface from './interface/SMonorepoListParamsInterface';
import __SMonorepoPublishParamsInteface from './interface/SMonorepoPublishParamsInterface';
import __SMonorepoRunParamsInterface from './interface/SMonorepoRunParamsInterface';
import __SMonorepoSettingsInterface from './interface/SMonorepoSettingsInterface';
import __SMonorepoUpgradeParamsInterface from './interface/SMonorepoUpgradeParamsInterface';

/**
 * @name                SMonorepo
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a monorepo with some features like executing a command on all packages, list all the packages, upgrade each package's package.json, etc...
 *
 * @feature         Execute a command in every packages of the monorepo
 * @feature         List all the packages of the monorepo
 * @feature         Upgrade each package's package.json depending on the monorepo's one
 *
 * @param           {ISMonorepoCtorSettings}          [settings={}]           Some settings to configure your monorepo instance
 *
 * @example         js
 * import SMonorepo from '@coffeekraken/s-monorepo';
 * const repo = new SMonorepo({
 *      monorepo: {
 *          // settings here...
 *      }
 * });
 * await repo.run({
 *    command: 'ls -la'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISMonorepoSettings {
    packagesGlob: string;
}

export interface ISMonorepoCtorSettings {
    monorepo: Partial<ISMonorepoSettings>;
}

export interface ISMonorepoRunParams {
    command: string;
    packagesGlob: string;
}
export interface ISMonorepoRunResult {}

export interface ISMonorepoListParams {
    packagesGlob: string;
    json: boolean;
}
export interface ISMonorepoListResult {
    name: string;
    version: string;
    path: string;
    relPath: string;
}

export interface ISMonorepoPublishParams {
    packagesGlob: string;
    yes: boolean;
}
export interface ISMonorepoPublishResult {}

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

export interface ISMonorepoUpgradeParams {
    packagesGlob: string;
    files: string[];
    fields: string[];
}
export interface ISMonorepoUpgradeResult {}

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
        rootDir: string = __packageRoot(process.cwd(), {
            highest: true,
        }),
        settings?: Partial<ISMonorepoCtorSettings>,
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
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    checkDependencies(): Promise<boolean> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            // get all the packages
            const packages = await this.list({});

            for (let i = 0; i < packages.length; i++) {
                const packageObj = packages[i];

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[check]</yellow> Checking dependencies for the package "<cyan>${packageObj.name}</cyan>"...`,
                });

                const pack = new __SPackage(packageObj.path);

                const result = await pack.checkDependencies();

                if (result !== true) {
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        message: `<red>[check]</red> Your package has some dependencies issues`,
                    });

                    if (
                        !(await emit('ask', {
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
            resolve(true);
        });
    }

    /**
     * @name            run
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
    run(params: Partial<ISMonorepoRunParams>): Promise<ISMonorepoRunResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoRunParams =
                    __SMonorepoRunParamsInterface.apply(params);

                const results: ISMonorepoRunResult[] = [];

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[run]</yellow> Searching for packages...`,
                });

                // get all the packages
                const packages = await this.list({
                    packagesGlob: finalParams.packagesGlob,
                });

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[run]</yellow> Executing the command "<magenta>${finalParams.command}</magenta>" in these <cyan>${packages.length}</cyan> package(s)`,
                });

                const duration = new __SDuration();

                let currentDuration = 0;

                for (let i = 0; i < packages.length; i++) {
                    const pack = packages[i];

                    emit('log', {
                        value: `<yellow>[run]</yellow> Executing command "<yellow>${finalParams.command}</yellow>" in folder:`,
                    });
                    emit('log', {
                        value: `<yellow>[run]</yellow> <cyan>${pack.relPath}</cyan>`,
                    });

                    const start = Date.now();

                    const command = pipe(
                        __spawn(finalParams.command, [], {
                            cwd: pack.path,
                        }),
                    );
                    const commandResult = await command;

                    results.push(commandResult);

                    const end = Date.now();
                    currentDuration += end - start;

                    const average = currentDuration / i;
                    const remaining = average * (packages.length - i);

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[run]</green> Command executed <green>successfully</green> in <yellow>${commandResult.formatedDuration}</yellow>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[run]</green> <magenta>${
                            packages.length - (i + 1)
                        }</magenta> folder(s), <cyan>~${__formatDuration(
                            remaining,
                        )}</cyan> remaining...`,
                    });
                    emit('log', {
                        value: ' ',
                    });
                }

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[success]</green> Command "<yellow>${
                        finalParams.command
                    }</yellow>" executed <green>successfully</green> in <cyan>${
                        packages.length
                    }</cyan> folder(s) in <yellow>${
                        duration.end().formatedDuration
                    }</yellow>`,
                });

                resolve(results);
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
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
    list(
        params: Partial<ISMonorepoListParams>,
    ): Promise<ISMonorepoListResult[]> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoListParams =
                    __SMonorepoListParamsInteface.apply(params);

                const result: ISMonorepoListResult[] = [];
                const jsonResult: Record<string, string> = {};

                const rootPackageJson = __readJsonSync(
                    `${this._rootDir}/package.json`,
                );

                const files = __SGlob.resolve(
                    `${finalParams.packagesGlob}/package.json`,
                    {
                        cwd: this._rootDir,
                    },
                );

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[list]</yellow> <cyan>${files.length}</cyan> packages found:`,
                });

                files.forEach((file) => {
                    let version = 'unknown',
                        name;

                    if (file.relPath.match(/package\.json$/)) {
                        const json = __readJsonSync(file.path);
                        version = json.version;
                        name = json.name;
                    }

                    result.push({
                        name,
                        version,
                        relPath: __path.dirname(file.relPath),
                        path: __path.dirname(file.path),
                    });

                    jsonResult[name] = `^${version}`;

                    if (!finalParams.json) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>${
                                name ?? file.relPath.split('/').pop()
                            }</yellow> (<${
                                version === rootPackageJson.version
                                    ? 'green'
                                    : 'red'
                            }>${version}</${
                                version === rootPackageJson.version
                                    ? 'green'
                                    : 'red'
                            }>) <cyan>${file.relPath}</cyan>`,
                        });
                    }
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
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
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
    publish(
        params: Partial<ISMonorepoPublishParams>,
    ): Promise<ISMonorepoPublishResult[] | false> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoPublishParams =
                    __SMonorepoPublishParamsInteface.apply(params);

                const result: ISMonorepoPublishResult[] = [];

                const rootPackageJson = __readJsonSync(
                    `${this._rootDir}/package.json`,
                );

                if (
                    !finalParams.yes &&
                    !(await emit('ask', {
                        type: 'confirm',
                        message: `Is <yellow>${rootPackageJson.version}</yellow> the version you want to publish?`,
                        default: true,
                    }))
                ) {
                    return reject(false);
                }

                // loop on all packages to publish them once at a time
                const packages = await this.list({
                    packagesGlob: finalParams.packagesGlob,
                });

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[publish]</yellow> <cyan>${packages.length}</cyan> packages found:`,
                });

                // upgrading monorepo
                const upgradeResult = await pipe(this.upgrade());
                if (upgradeResult !== true) {
                    return reject(false);
                }

                if (
                    !finalParams.yes &&
                    !(await emit('ask', {
                        type: 'confirm',
                        message:
                            'All seems ok with your packages versions. Would you like to continue?',
                        default: true,
                    }))
                ) {
                    return reject(false);
                }

                // check dependencies
                const dependenciesResult = await pipe(this.checkDependencies());
                if (dependenciesResult !== true) {
                    return reject(false);
                }

                if (
                    !finalParams.yes &&
                    !(await emit('ask', {
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
                    let result = true;
                    try {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[publish]</yellow> Publishing your package "<cyan>${packageObj.name}</cyan>"...`,
                        });
                        __childProcess.execSync(`npm publish --access public`, {
                            cwd: packageObj.path,
                        });
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[publish]</yellow> <cyan>${
                                packages.length - i - 1
                            }</cyan> remaining package(s)`,
                        });
                        emit('log', {
                            type: __SLog.TYPE_SUCCESS,
                            value: `<green>[publish]</green> Your package "<cyan>${packageObj.name}</cyan>" has been published <green>successfully</green> in version <cyan>${rootPackageJson.version}</cyan>!`,
                        });
                    } catch (e) {
                        result = false;
                        emit('log', {
                            type: __SLog.TYPE_ERROR,
                            value: e.toString(),
                        });
                        emit('log', {
                            type: __SLog.TYPE_WARNING,
                            value: `<red>[publish]</red> Something goes wrong when publishing the "<cyan>${packageObj.name}</cyan>"`,
                        });
                        if (
                            !finalParams.yes &&
                            !(await emit('ask', {
                                type: 'confirm',
                                message: 'Would you like to continue anyway?',
                            }))
                        ) {
                            return reject(false);
                        }
                    }
                }

                resolve(result);
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
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
    dev(params: Partial<ISMonorepoDevParams>): Promise<ISMonorepoListResult[]> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoDevParams =
                    __SMonorepoDevParamsInterface.apply(params);

                if (
                    !finalParams.build &&
                    !finalParams.test &&
                    !finalParams.format
                ) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: '<red>[dev]</red> You must at least make use of one of these development features. <magenta>build</magenta>, <magenta>format</magenta>, <magenta>test</magenta>',
                    });
                    return resolve();
                }

                const packages = await this.list({
                    packagesGlob: finalParams.packagesGlob,
                });
                const srcRelDir = __path.relative(
                        this._rootDir,
                        __SSugarConfig.get('typescriptBuilder.inDir'),
                    ),
                    distRelDir = __path.relative(
                        this._rootDir,
                        __SSugarConfig.get('typescriptBuilder.outDir'),
                    );

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[dev]</yellow> Found <cyan>${packages.length}</cyan> package(s)`,
                });

                // tests
                if (finalParams.test) {
                    const vite = new __SVite();
                    pipe(
                        vite.test({
                            watch: true,
                            dir: __packageRoot(),
                        }),
                    );
                }

                // code formatter
                if (finalParams.format) {
                    const formatter = new __SCodeFormatter();
                    pipe(
                        formatter.format({
                            glob: `${__SSugarConfig.get(
                                'monorepo.packagesGlob',
                            )}/src/**/*`,
                            inDir: __packageRoot(),
                            watch: true,
                            formatInitial: finalParams.formatInitial,
                        }),
                    );
                }

                if (finalParams.build) {
                    emit(
                        'log',
                        {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[watch]</yellow> Watching for file changes...`,
                        },
                        {
                            id: 'STypescriptBuilder',
                        },
                    );
                }

                packages.forEach((packageObj) => {
                    if (finalParams.build) {
                        // typescript compilation
                        const inDir = `${packageObj.path}/${srcRelDir}`,
                            outDir = `${packageObj.path}/${distRelDir}`;

                        const builder = new __STypescriptBuilder();
                        pipe(
                            builder.build({
                                silent: true, // @TODO      find a way more elegant to avoid settings displays
                                inDir,
                                outDir,
                                packageRoot: packageObj.path,
                                buildInitial: finalParams.buildInitial,
                                watch: true,
                            }),
                        );

                        // exports
                        const pack = new __SPackage(packageObj.path);
                        pipe(
                            pack.exports({
                                watch: true,
                                buildInitial: finalParams.buildInitial,
                            }),
                        );
                    }
                });
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
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
    upgrade(
        params?: ISMonorepoUpgradeParams,
    ): Promise<ISMonorepoUpgradeResult | boolean> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoUpgradeParams =
                    __SMonorepoUpgradeParamsInterface.apply(params ?? {});

                const result: Record<string, ISMonorepoUpgradeResult> = {};

                const rootPackageJson = __readJsonSync(
                    `${this._rootDir}/package.json`,
                );

                const files = __SGlob.resolve(
                    `${finalParams.packagesGlob}/package.json`,
                    {
                        cwd: this._rootDir,
                    },
                );

                // get the packages as json list
                const packagesListJson = await this.list({
                    packagesGlob: finalParams.packagesGlob,
                    json: true,
                });

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
                                emit('log', {
                                    type: __SLog.TYPE_INFO,
                                    value: `<yellow>${json.name}</yellow> <cyan>${field}</cyan> field already up to date`,
                                });
                                return;
                            }
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
                            json.dependencies = {
                                ...(json.dependencies ?? {}),
                                ...(packagesListJson ?? {}),
                            };
                            // delete current package name
                            delete json.dependencies[json.name];
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
                                            rootPackageJson?.name?.split?.(
                                                '/',
                                            )[0]
                                        }/`,
                                    )
                                ) {
                                    obj[
                                        packageName
                                    ] = `^${rootPackageJson.version}`;
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
                });

                resolve(true);
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }
}
