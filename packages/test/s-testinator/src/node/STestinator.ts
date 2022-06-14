import __SFile from '@coffeekraken/s-file';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __ts from 'typescript';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import __STestinatorStartParamsInterface from './interface/STestinatorStartParamsInterface';
import __STestinatorTestParamsInterface from './interface/STestinatorTestParamsInterface';
import __findUp from '@coffeekraken/sugar/node/fs/findUp';
import __SGlob from '@coffeekraken/s-glob';
import __monorepoToPackageAbsolutePathDeepMap from '@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap';
import __childProcess from 'child_process';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __SClass from '@coffeekraken/s-class';

import __STestinatorApi from './STestinatorApi';

/**
 * @name                STestinator
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent the jest tester that can run tests on your project with a simple and efficient API.
 *
 * @param           {ISTestinatorSettings}          [settings={}]           Some settings to configure your tester instance
 *
 * @example         js
 * import STestinator from '@coffeekraken/s-testinator';
 * const tester = new STestinator({
 *      // settings here...
 * });
 * await tester.test('/my/cool/file.test.js');
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISTestinatorSettings {}

export interface ISTestinatorTestParams {
    path: string;
}
export interface ISTestinatorTestResult {}

export interface ISTestinatorStartResult {
    glob: string[];
    inDir: string;
}

export interface ISTestinatorStartParams {
    glob: string[] | string;
    inDir: string;
    packageRoot?: string;
    watch: boolean;
    testInitial: boolean;
    exclude: string[];
}

export default class STestinator extends __SClass {
    /**
     * Store the chokidar watchers in an object where the key is the glob
     */
    _watchersByGlob: Record<string, any> = {};

    /**
     * Store all the tests function to execute one after the other
     */
    _testsStack: any[] = [];

    _currentTestPath: string = '';
    _currentTestPromise: any = null;

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISTestinatorSettings>) {
        super(
            __deepMerge(
                {
                    ...__SSugarConfig.get('testinator'),
                },
                settings ?? {},
            ),
        );
    }

    /**
     * @name            start
     * @type            Function
     * @async
     *
     * This method is the internal builder start one.
     * It will be called by the SBuilder class with the final params
     * for the build
     *
     * @param       {Partial<ISTestinatorStartParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params: ISTestinatorStartParams): Promise<ISTestinatorStartResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe, on }) => {
                let testsResults: any[] = [],
                    watchersReady: any[] = [],
                    testPromises: Promise<any>[] = [],
                    watchers: any[] = [];

                // @ts-ignore
                const finalParams: ISTestinatorStartParams = __monorepoToPackageAbsolutePathDeepMap(
                    __STestinatorStartParamsInterface.apply(params),
                    params.packageRoot ?? process.cwd(),
                );

                // watch init text
                if (finalParams.watch) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[watch]</yellow> Watching files for tests...`,
                    });
                }

                // get a new config file path
                const configFilePath = await this._generateJestConfigFile();

                // function used only when the finalParams.watch is false
                // and keeping track on the watchers ready state.
                // when all the watchers are in ready state, this mean that the
                // testPromises array is full of build promises and we can resolve
                // this process when they are all resolved
                function onWatcherReady(watcher: any) {
                    // watchersReady.push(watcher);
                    if (watchersReady.length === finalParams.glob.length) {
                        // when all promises are resolved, resolve the promise
                        Promise.all(testPromises).then(() => {
                            resolve(<ISTestinatorStartResult>{
                                glob: finalParams.glob,
                                inDir: finalParams.inDir,
                                files: testsResults,
                            });
                        });
                    }
                }

                const globs = Array.isArray(finalParams.glob)
                    ? finalParams.glob
                    : [finalParams.glob];

                // loop on each glob(s) and build the files
                globs.forEach((glob) => {
                    // listen for file update and add
                    const watcher = __chokidar.watch(glob, {
                        cwd: finalParams.inDir,
                        ignored: finalParams.exclude,
                        ignoreInitial:
                            finalParams.watch && !finalParams.testInitial,
                    });
                    watchers.push(watcher);

                    // keep track on the watchers ready state
                    // to know when we can watch for all the testPromises
                    // state and resolve the process at them end...
                    if (!finalParams.watch) {
                        watcher.on('ready', () => {
                            onWatcherReady(watcher);
                        });
                    }

                    ['add', 'change'].forEach((listener) => {
                        watcher.on(listener, async (relPath) => {
                            // do not process the same file if it is processed now
                            if (finalParams.watch && this._currentTestPromise) {
                                emit('log', {
                                    type: __SLog.TYPE_INFO,
                                    value: `A test is already running. Please wait until it is finished.`,
                                });
                                return;
                            }

                            let testParams = Object.assign({}, finalParams);

                            // "localize" the file paths to the current package root
                            testParams = __monorepoToPackageAbsolutePathDeepMap(
                                testParams,
                                finalParams.packageRoot ?? process.cwd(),
                            );

                            this._testsStack.push(() => {
                                return pipe(
                                    this._runJestOn(
                                        relPath,
                                        testParams,
                                        configFilePath,
                                    ),
                                );
                            });

                            this._next();
                        });
                    });

                    // store the watcher for later use
                    this._watchersByGlob[glob] = watcher;
                });

                // cancel
                on('cancel', () => {
                    watchers.forEach((watcher) => {
                        watcher.close();
                    });
                    this._testsStack = [];
                    this._currentTestPromise?.cancel?.();
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
     * @name            test
     * @type            Function
     * @async
     *
     * This method allows you to run a test file
     *
     * @param       {Partial<ISTestinatorTestParams>}        params        Some params for your test process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    test(
        params?: Partial<ISTestinatorTestParams>,
    ): Promise<ISTestinatorTestResult> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            const finalParams = __STestinatorTestParamsInterface.apply(params);

            const file = await __STypescriptBuilder.buildTemporary(
                finalParams.path,
            );

            const testinatorApi = new __STestinatorApi(params.path);

            testinatorApi.exposeMethods(global, pipe);

            await import(file.path);

            file.remove();

            setTimeout(async () => {
                await testinatorApi.run();
                // resolve();
            }, 100);
        });
    }

    // async _next() {
    //     if (this._currentTestPromise) {
    //         return;
    //     }
    //     if (!this._testsStack.length) return;
    //     const test = this._testsStack.shift();
    //     // @ts-ignore
    //     this._currentTestPromise = test();
    //     await this._currentTestPromise;
    //     this._currentTestPromise = null;
    //     this._next();
    // }

    // /**
    //  * This method take a relPath, check if a test exists and run jest on it if it does
    //  */
    // _runJestOn(relPath: string, testParams: any, configFilePath) {
    //     return new __SPromise(
    //         ({ resolve, reject, emit, pipe, on }) => {
    //             // check if a test file exists
    //             const absPath = __path.resolve(testParams.inDir, relPath),
    //                 folderAbsPath = __path.dirname(absPath),
    //                 fileName = __path.basename(absPath),
    //                 fileExt = __path.extname(fileName),
    //                 fileNameWithoutExt = fileName.replace(fileExt, ''),
    //                 potentialTestPath = `${folderAbsPath}/__tests__/${fileNameWithoutExt}.test${fileExt}`,
    //                 packageRoogRelPotentialTestFile = __path.relative(
    //                     __packageRoot(),
    //                     potentialTestPath,
    //                 ),
    //                 packageRootRelPath = __path.relative(
    //                     __packageRoot(),
    //                     absPath,
    //                 );
    //             let testFilePath;

    //             // test file directly
    //             if (relPath.match(/\.test\.\w+$/)) {
    //                 testFilePath = __path.resolve(testParams.inDir, relPath);
    //             } else if (__fs.existsSync(potentialTestPath)) {
    //                 testFilePath = potentialTestPath;
    //             } else {
    //                 emit('log', {
    //                     type: __SLog.TYPE_INFO,
    //                     value: `<yellow>[run]</yellow> No test file for "<magenta>${packageRootRelPath}</magenta>"`,
    //                 });
    //                 return resolve();
    //             }

    //             // if a typescript file exists instead of the js one, stop here
    //             if (
    //                 fileExt === '.js' &&
    //                 __fs.existsSync(`${folderAbsPath}/${fileNameWithoutExt}.ts`)
    //             ) {
    //                 emit('log', {
    //                     type: __SLog.TYPE.INFO,
    //                     value: `<yellow>[run]</yellow> A <yellow>.ts</yellow> file exists for this "<cyan>${relPath}</cyan>" file, so we will not run a test for it`,
    //                 });
    //                 return resolve();
    //             }

    //             emit('log', {
    //                 type: __SLog.TYPE_INFO,
    //                 value: `<yellow>[run]</yellow> Running test for "<cyan>${testFilePath}</cyan>" file`,
    //             });

    //             const jestCommand = `node --experimental-vm-modules ${__packageRoot()}/node_modules/jest/bin/jest.js`;

    //             // run the test
    //             const pro = __childProcess.spawn(
    //                 `${jestCommand} --runTestsByPath "${testFilePath}" --config "${configFilePath}"`,
    //                 [],
    //                 {
    //                     stdio: 'inherit',
    //                     shell: true,
    //                     cwd: __packageRoot(),
    //                 },
    //             );

    //             pro.on('close', (e) => {
    //                 resolve();
    //             });

    //             // cancel
    //             on('cancel', () => {
    //                 pro.kill?.();
    //             });
    //         },
    //         {
    //             eventEmitter: {
    //                 bind: this,
    //             },
    //         },
    //     );
    // }
}
