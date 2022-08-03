"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SJestTesterStartParamsInterface_1 = __importDefault(require("./interface/SJestTesterStartParamsInterface"));
const monorepoToPackageAbsolutePathDeepMap_1 = __importDefault(require("@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap"));
const child_process_1 = __importDefault(require("child_process"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
class SJestTester extends s_class_1.default {
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
        super((0, deepMerge_1.default)(Object.assign({}, s_sugar_config_1.default.get('jestTester')), settings !== null && settings !== void 0 ? settings : {}));
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
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const jestConfigFilePath = `${packageRoot_1.default}/jest.config.js`;
            let baseConfig = {};
            if (fs_1.default.existsSync(jestConfigFilePath)) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `Fount a <cyan>jest.config.js</cyan> file in your package root.`,
                });
                // @ts-ignore
                baseConfig = (yield Promise.resolve().then(() => __importStar(require(jestConfigFilePath)))).default;
            }
            const finalConfig = (0, deepMerge_1.default)(baseConfig, {
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
            const tmpConfigFilePath = path_1.default.resolve((0, packageRoot_1.default)(), 'jest.config.json');
            (0, writeJsonSync_1.default)(tmpConfigFilePath, finalConfig);
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let testsResults = [], watchersReady = [], testPromises = [], watchers = [];
            // @ts-ignore
            const finalParams = (0, monorepoToPackageAbsolutePathDeepMap_1.default)(SJestTesterStartParamsInterface_1.default.apply(params), (_a = params.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
            // watch init text
            if (finalParams.watch) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
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
                const watcher = chokidar_1.default.watch(glob, {
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
                                type: s_log_1.default.TYPE_INFO,
                                value: `A test is already running. Please wait until it is finished.`,
                            });
                            return;
                        }
                        let testParams = Object.assign({}, finalParams);
                        // "localize" the file paths to the current package root
                        testParams = (0, monorepoToPackageAbsolutePathDeepMap_1.default)(testParams, (_a = finalParams.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe, on }) => {
            // check if a test file exists
            const absPath = path_1.default.resolve(testParams.inDir, relPath), folderAbsPath = path_1.default.dirname(absPath), fileName = path_1.default.basename(absPath), fileExt = path_1.default.extname(fileName), fileNameWithoutExt = fileName.replace(fileExt, ''), potentialTestPath = `${folderAbsPath}/__tests__/${fileNameWithoutExt}.test${fileExt}`, packageRoogRelPotentialTestFile = path_1.default.relative((0, packageRoot_1.default)(), potentialTestPath), packageRootRelPath = path_1.default.relative((0, packageRoot_1.default)(), absPath);
            let testFilePath;
            // test file directly
            if (relPath.match(/\.test\.\w+$/)) {
                testFilePath = path_1.default.resolve(testParams.inDir, relPath);
            }
            else if (fs_1.default.existsSync(potentialTestPath)) {
                testFilePath = potentialTestPath;
            }
            else {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[run]</yellow> No test file for "<magenta>${packageRootRelPath}</magenta>"`,
                });
                return resolve();
            }
            // if a typescript file exists instead of the js one, stop here
            if (fileExt === '.js' &&
                fs_1.default.existsSync(`${folderAbsPath}/${fileNameWithoutExt}.ts`)) {
                emit('log', {
                    type: s_log_1.default.TYPE.INFO,
                    value: `<yellow>[run]</yellow> A <yellow>.ts</yellow> file exists for this "<cyan>${relPath}</cyan>" file, so we will not run a test for it`,
                });
                return resolve();
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[run]</yellow> Running test for "<cyan>${testFilePath}</cyan>" file`,
            });
            const jestCommand = `node --experimental-vm-modules ${(0, packageRoot_1.default)()}/node_modules/jest/bin/jest.js`;
            // run the test
            const pro = child_process_1.default.spawn(`${jestCommand} --runTestsByPath "${testFilePath}" --config "${configFilePath}"`, [], {
                stdio: 'inherit',
                shell: true,
                cwd: (0, packageRoot_1.default)(),
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
exports.default = SJestTester;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCw0RkFBc0U7QUFDdEUsNEZBQXNFO0FBRXRFLHdEQUFrQztBQUNsQyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCLGtIQUE0RjtBQUc1RixrSkFBNEg7QUFDNUgsa0VBQTJDO0FBQzNDLDhGQUF3RTtBQUV4RSxvRUFBNkM7QUE0QzdDLE1BQXFCLFdBQVksU0FBUSxpQkFBUTtJQWM3Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBd0M7UUFDaEQsS0FBSyxDQUNELElBQUEsbUJBQVcsb0JBRUEsd0JBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBRXZDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBOUJOOztXQUVHO1FBQ0gsb0JBQWUsR0FBd0IsRUFBRSxDQUFDO1FBRTFDOztXQUVHO1FBQ0gsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFFeEIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBQzlCLHdCQUFtQixHQUFRLElBQUksQ0FBQztJQW9CaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILHVCQUF1QjtRQUNuQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RELE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxxQkFBYSxpQkFBaUIsQ0FBQztZQUM3RCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLGVB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