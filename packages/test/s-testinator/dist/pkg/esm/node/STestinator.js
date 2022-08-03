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
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import __monorepoToPackageAbsolutePathDeepMap from '@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __chokidar from 'chokidar';
import __STestinatorStartParamsInterface from './interface/STestinatorStartParamsInterface';
import __STestinatorTestParamsInterface from './interface/STestinatorTestParamsInterface';
import __STestinatorApi from './STestinatorApi';
export default class STestinator extends __SClass {
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
        super(__deepMerge(Object.assign({}, __SSugarConfig.get('testinator')), settings !== null && settings !== void 0 ? settings : {}));
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
    start(params) {
        return new __SPromise(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let testsResults = [], watchersReady = [], testPromises = [], watchers = [];
            // @ts-ignore
            const finalParams = __monorepoToPackageAbsolutePathDeepMap(__STestinatorStartParamsInterface.apply(params), (_a = params.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
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
    test(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = __STestinatorTestParamsInterface.apply(params);
            const file = yield __STypescriptBuilder.buildTemporary(finalParams.path);
            const testinatorApi = new __STestinatorApi(params.path);
            testinatorApi.exposeMethods(global, pipe);
            yield import(file.path);
            file.remove();
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield testinatorApi.run();
                // resolve();
            }), 100);
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxzQ0FBc0MsTUFBTSx3RUFBd0UsQ0FBQztBQUM1SCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxpQ0FBaUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUM1RixPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLE9BQU8sZ0JBQWdCLE1BQU0sa0JBQWtCLENBQUM7QUE4Q2hELE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLFFBQVE7SUFjN0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQXdDO1FBQ2hELEtBQUssQ0FDRCxXQUFXLG1CQUVBLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBRXZDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBOUJOOztXQUVHO1FBQ0gsb0JBQWUsR0FBd0IsRUFBRSxDQUFDO1FBRTFDOztXQUVHO1FBQ0gsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFFeEIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBQzlCLHdCQUFtQixHQUFRLElBQUksQ0FBQztJQW9CaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsS0FBSyxDQUFDLE1BQStCO1FBQ2pDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUs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