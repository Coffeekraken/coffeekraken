var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __SJestTesterStartParamsInterface from './interface/SJestTesterStartParamsInterface';
import __monorepoToPackageAbsolutePathDeepMap from '@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap';
import __childProcess from 'child_process';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __SClass from '@coffeekraken/s-class';
export default class SJestTester extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge(Object.assign({}, __SSugarConfig.get('jestTester')), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * Store the chokidar watchers in an object where the key is the glob
         */
        this._watchersByGlob = {};
        /**
         * Store all the tests function to execute one after the other
         */
        this._testsStack = [];
        this._currentTestPath = '';
        this._currentTestPromise = null;
    }
    /**
     * This method will simply generate a config file that will be used for the jest tester instance.
     * It will get the jest.config.js file at root of the package before extending it with typescript preset.
     */
    _generateJestConfigFile() {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const jestConfigFilePath = `${__packageRoot}/jest.config.js`;
            let baseConfig = {};
            if (__fs.existsSync(jestConfigFilePath)) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `Fount a <cyan>jest.config.js</cyan> file in your package root.`,
                });
                // @ts-ignore
                baseConfig = (yield import(jestConfigFilePath)).default;
            }
            const finalConfig = __deepMerge(baseConfig, {
                preset: 'ts-jest/presets/default-esm',
                globals: {
                    'ts-jest': {
                        useESM: true,
                        isolatedModules: true,
                    },
                },
                // resolver: '<rootDir>/resolver.cjs',
                extensionsToTreatAsEsm: ['.ts'],
                moduleNameMapper: {
                    '^(\\.{1,2}/.*)\\.js$': '$1',
                },
            });
            // save the config file
            const tmpConfigFilePath = __path.resolve(__packageRoot(), 'jest.config.json');
            __writeJsonSync(tmpConfigFilePath, finalConfig);
            resolve(tmpConfigFilePath);
        }));
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
     * @param       {Partial<ISJestTesterStartParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        return new __SPromise(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let testsResults = [], watchersReady = [], testPromises = [], watchers = [];
            // @ts-ignore
            const finalParams = __monorepoToPackageAbsolutePathDeepMap(__SJestTesterStartParamsInterface.apply(params), (_a = params.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
            // watch init text
            if (finalParams.watch) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[watch]</yellow> Watching files for tests...`,
                });
            }
            // get a new config file path
            const configFilePath = yield this._generateJestConfigFile();
            // function used only when the finalParams.watch is false
            // and keeping track on the watchers ready state.
            // when all the watchers are in ready state, this mean that the
            // testPromises array is full of build promises and we can resolve
            // this process when they are all resolved
            function onWatcherReady(watcher) {
                // watchersReady.push(watcher);
                if (watchersReady.length === finalParams.glob.length) {
                    // when all promises are resolved, resolve the promise
                    Promise.all(testPromises).then(() => {
                        resolve({
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
                    ignoreInitial: finalParams.watch && !finalParams.testInitial,
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
                    watcher.on(listener, (relPath) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
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
                        testParams = __monorepoToPackageAbsolutePathDeepMap(testParams, (_a = finalParams.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
                        this._testsStack.push(() => {
                            return pipe(this._runJestOn(relPath, testParams, configFilePath));
                        });
                        this._next();
                    }));
                });
                // store the watcher for later use
                this._watchersByGlob[glob] = watcher;
            });
            // cancel
            on('cancel', () => {
                var _a, _b;
                watchers.forEach((watcher) => {
                    watcher.close();
                });
                this._testsStack = [];
                (_b = (_a = this._currentTestPromise) === null || _a === void 0 ? void 0 : _a.cancel) === null || _b === void 0 ? void 0 : _b.call(_a);
            });
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    _next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._currentTestPromise) {
                return;
            }
            if (!this._testsStack.length)
                return;
            const test = this._testsStack.shift();
            // @ts-ignore
            this._currentTestPromise = test();
            yield this._currentTestPromise;
            this._currentTestPromise = null;
            this._next();
        });
    }
    /**
     * This method take a relPath, check if a test exists and run jest on it if it does
     */
    _runJestOn(relPath, testParams, configFilePath) {
        return new __SPromise(({ resolve, reject, emit, pipe, on }) => {
            // check if a test file exists
            const absPath = __path.resolve(testParams.inDir, relPath), folderAbsPath = __path.dirname(absPath), fileName = __path.basename(absPath), fileExt = __path.extname(fileName), fileNameWithoutExt = fileName.replace(fileExt, ''), potentialTestPath = `${folderAbsPath}/__tests__/${fileNameWithoutExt}.test${fileExt}`, packageRoogRelPotentialTestFile = __path.relative(__packageRoot(), potentialTestPath), packageRootRelPath = __path.relative(__packageRoot(), absPath);
            let testFilePath;
            // test file directly
            if (relPath.match(/\.test\.\w+$/)) {
                testFilePath = __path.resolve(testParams.inDir, relPath);
            }
            else if (__fs.existsSync(potentialTestPath)) {
                testFilePath = potentialTestPath;
            }
            else {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[run]</yellow> No test file for "<magenta>${packageRootRelPath}</magenta>"`,
                });
                return resolve();
            }
            // if a typescript file exists instead of the js one, stop here
            if (fileExt === '.js' &&
                __fs.existsSync(`${folderAbsPath}/${fileNameWithoutExt}.ts`)) {
                emit('log', {
                    type: __SLog.TYPE.INFO,
                    value: `<yellow>[run]</yellow> A <yellow>.ts</yellow> file exists for this "<cyan>${relPath}</cyan>" file, so we will not run a test for it`,
                });
                return resolve();
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[run]</yellow> Running test for "<cyan>${testFilePath}</cyan>" file`,
            });
            const jestCommand = `node --experimental-vm-modules ${__packageRoot()}/node_modules/jest/bin/jest.js`;
            // run the test
            const pro = __childProcess.spawn(`${jestCommand} --runTestsByPath "${testFilePath}" --config "${configFilePath}"`, [], {
                stdio: 'inherit',
                shell: true,
                cwd: __packageRoot(),
            });
            pro.on('close', (e) => {
                resolve();
            });
            // cancel
            on('cancel', () => {
                var _a;
                (_a = pro.kill) === null || _a === void 0 ? void 0 : _a.call(pro);
            });
        }, {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8saUNBQWlDLE1BQU0sNkNBQTZDLENBQUM7QUFHNUYsT0FBTyxzQ0FBc0MsTUFBTSx3RUFBd0UsQ0FBQztBQUM1SCxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFFeEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUE0QzdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLFFBQVE7SUFjN0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQXdDO1FBQ2hELEtBQUssQ0FDRCxXQUFXLG1CQUVBLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBRXZDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBOUJOOztXQUVHO1FBQ0gsb0JBQWUsR0FBd0IsRUFBRSxDQUFDO1FBRTFDOztXQUVHO1FBQ0gsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFFeEIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBQzlCLHdCQUFtQixHQUFRLElBQUksQ0FBQztJQW9CaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILHVCQUF1QjtRQUNuQixPQUFPLElB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