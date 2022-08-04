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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const monorepoToPackageAbsolutePathDeepMap_1 = __importDefault(require("@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const chokidar_1 = __importDefault(require("chokidar"));
const STestinatorStartParamsInterface_1 = __importDefault(require("./interface/STestinatorStartParamsInterface"));
const STestinatorTestParamsInterface_1 = __importDefault(require("./interface/STestinatorTestParamsInterface"));
const STestinatorApi_1 = __importDefault(require("./STestinatorApi"));
class STestinator extends s_class_1.default {
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
        super((0, deepMerge_1.default)(Object.assign({}, s_sugar_config_1.default.get('testinator')), settings !== null && settings !== void 0 ? settings : {}));
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let testsResults = [], watchersReady = [], testPromises = [], watchers = [];
            // @ts-ignore
            const finalParams = (0, monorepoToPackageAbsolutePathDeepMap_1.default)(STestinatorStartParamsInterface_1.default.apply(params), (_a = params.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = STestinatorTestParamsInterface_1.default.apply(params);
            const file = yield s_typescript_builder_1.default.buildTemporary(finalParams.path);
            const testinatorApi = new STestinatorApi_1.default(params.path);
            testinatorApi.exposeMethods(global, pipe);
            yield Promise.resolve().then(() => __importStar(require(file.path)));
            file.remove();
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield testinatorApi.run();
                // resolve();
            }), 100);
        }));
    }
}
exports.default = STestinator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsOEZBQXNFO0FBQ3RFLGtKQUE0SDtBQUM1SCw0RkFBc0U7QUFDdEUsd0RBQWtDO0FBQ2xDLGtIQUE0RjtBQUM1RixnSEFBMEY7QUFFMUYsc0VBQWdEO0FBOENoRCxNQUFxQixXQUFZLFNBQVEsaUJBQVE7SUFjN0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQXdDO1FBQ2hELEtBQUssQ0FDRCxJQUFBLG1CQUFXLG9CQUVBLHdCQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUV2QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTlCTjs7V0FFRztRQUNILG9CQUFlLEdBQXdCLEVBQUUsQ0FBQztRQUUxQzs7V0FFRztRQUNILGdCQUFXLEdBQVUsRUFBRSxDQUFDO1FBRXhCLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUM5Qix3QkFBbUIsR0FBUSxJQUFJLENBQUM7SUFvQmhDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILEtBQUssQ0FBQyxNQUErQjtRQUNqQyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOztZQUMxQyxJQUFJLFlBQVksR0FBVSxFQUFFLEVBQ3hCLGFBQWEsR0FBVSxFQUFFLEVBQ3pCLFlBQVksR0FBbUIsRUFBRSxFQUNqQyxRQUFRLEdBQVUsRUFBRSxDQUFDO1lBRXpCLGFBQWE7WUFDYixNQUFNLFdBQVcsR0FBNEIsSUFBQSw4Q0FBc0MsRUFDL0UseUNBQWlDLENB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