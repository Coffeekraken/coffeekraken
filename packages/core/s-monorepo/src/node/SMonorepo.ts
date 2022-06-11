import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __SGlob from '@coffeekraken/s-glob';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __fs from 'fs';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __SDuration from '@coffeekraken/s-duration';
import __formatDuration from '@coffeekraken/sugar/shared/time/formatDuration';
import __path from 'path';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import __SPackage from '@coffeekraken/s-package';
import __SJestTester from '@coffeekraken/s-jest-tester';
import __SMochaTester from '@coffeekraken/s-mocha-tester';

import __srcDir from '@coffeekraken/sugar/node/path/srcRootDir';
import __distDir from '@coffeekraken/sugar/node/path/distRootDir';

import __SMonorepoRunParamsInterface from './interface/SMonorepoRunParamsInterface';
import __SMonorepoListParamsInteface from './interface/SMonorepoListParamsInterface';
import __SMonorepoDevParamsInterface from './interface/SMonorepoDevParamsInterface';
import __SMonorepoSettingsInterface from './interface/SMonorepoSettingsInterface';

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
    rootDir: string;
    packagesGlobs: string[];
}

export interface ISMonorepoCtorSettings {
    monorepo: Partial<ISMonorepoSettings>;
}

export interface ISMonorepoRunParams {
    command: string;
    packagesGlobs: string[];
}
export interface ISMonorepoRunResult {}

export interface ISMonorepoListParams {
    packagesGlobs: string[];
}
export interface ISMonorepoListResult {
    name: string;
    version: string;
    path: string;
    relPath: string;
}

export interface ISMonorepoDevParams {
    packagesGlobs: string[];
    buildInitial: boolean;
    tests: boolean;
    testInitial: boolean;
}
export interface ISMonorepoDevResult {}

export interface ISMonorepoUpgradeParams {
    packagesGlobs: string;
    files: string[];
    fields: string[];
}
export interface ISMonorepoUpgradeResult {}

export default class SMonorepo extends __SClass {
    /**
     * @name            monorepoSettings
     * @type            ISMonorepoSettings
     * @get
     *
     * Access the monorepo settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get monorepoSettings(): ISMonorepoSettings {
        return (<any>this).settings.monorepo;
    }

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISMonorepoCtorSettings>) {
        super(
            __deepMerge(
                {
                    // @ts-ignore
                    monorepo: __SMonorepoSettingsInterface.defaults(),
                },
                settings ?? {},
            ),
        );
        // handle root dir if not set
        if (!this.monorepoSettings.rootDir) {
            this.monorepoSettings.rootDir = __packageRoot(process.cwd(), {
                highest: true,
            });
        }
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
    run(params: ISMonorepoRunParams): Promise<ISMonorepoRunResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoRunParams = __SMonorepoRunParamsInterface.apply(
                    params,
                );

                const results: ISMonorepoRunResult[] = [];

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[run]</yellow> Searching for packages...`,
                });

                // get all the packages
                const packages = await this.list({
                    packagesGlobs: finalParams.packagesGlobs,
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
    list(params: ISMonorepoListParams): Promise<ISMonorepoListResult[]> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoListParams = __SMonorepoListParamsInteface.apply(
                    params,
                );

                const result: ISMonorepoListResult[] = [];

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[list]</yellow> Searching for packages...`,
                });

                const rootPackageJson = __readJsonSync(
                    `${this.monorepoSettings.rootDir}/package.json`,
                );

                const files = __SGlob.resolve(finalParams.packagesGlobs, {
                    cwd: this.monorepoSettings.rootDir,
                });

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<cyan>${files.length}</cyan> packages found:`,
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
                });

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
    dev(params: ISMonorepoDevParams): Promise<ISMonorepoListResult[]> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoDevParams = __SMonorepoDevParamsInterface.apply(
                    params,
                );

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[list]</yellow> Searching for packages...`,
                });

                const packages = await this.list(finalParams);

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[list]</yellow> Found <cyan>${packages.length}</cyan> package(s)`,
                });

                const srcRelDir = __path.relative(
                        this.monorepoSettings.rootDir,
                        __SSugarConfig.get('typescriptBuilder.inDir'),
                    ),
                    distRelDir = __path.relative(
                        this.monorepoSettings.rootDir,
                        __SSugarConfig.get('typescriptBuilder.outDir'),
                    );

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[list]</yellow> Starting the typescript build process...`,
                });

                packages.forEach((packageObj) => {
                    // typescript compilation
                    const inDir = `${packageObj.path}/${srcRelDir}`,
                        outDir = `${packageObj.path}/${distRelDir}`;

                    const builder = new __STypescriptBuilder();
                    pipe(
                        builder.build({
                            inDir,
                            outDir,
                            packageRoot: packageObj.path,
                            buildInitial: finalParams.buildInitial,
                            watch: true,
                        }),
                    );

                    // tests
                    if (finalParams.tests) {
                        const mochaTester = new __SMochaTester();
                        pipe(
                            mochaTester.start({
                                inDir,
                                packageRoot: packageObj.path,
                                testInitial: finalParams.testInitial,
                                watch: true,
                            }),
                        );
                    }

                    // exports
                    const pack = new __SPackage({
                        package: {
                            rootDir: packageObj.path,
                        },
                    });
                    pipe(
                        pack.exports({
                            watch: true,
                            buildInitial: finalParams.buildInitial,
                        }),
                    );
                });

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[list]</yellow> Watching for changes...`,
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
    upgrade(params: ISMonorepoUpgradeParams): Promise<ISMonorepoUpgradeResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISMonorepoUpgradeParams = __SMonorepoListParamsInteface.apply(
                    params,
                );

                const result: Record<string, ISMonorepoUpgradeResult> = {};

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[list]</yellow> Searching for packages...`,
                });

                const rootPackageJson = __readJsonSync(
                    `${this.monorepoSettings.rootDir}/package.json`,
                );

                const files = __SGlob.resolve(finalParams.packagesGlobs, {
                    cwd: this.monorepoSettings.rootDir,
                });

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `Upgrading <cyan>${files.length}</cyan> packages with these informations:`,
                });

                finalParams.fields.forEach((field) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        marginBottom: 1,
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

                        __writeJsonSync(filePath, json);
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<green>✓</green> <yellow>${json.name}</yellow> <cyan>${fileName}</cyan> upgraded <green>successfully</green>`,
                        });
                    });
                });

                resolve(result);
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }
}
