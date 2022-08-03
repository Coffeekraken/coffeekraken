"use strict";
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
const s_builder_1 = __importDefault(require("@coffeekraken/s-builder"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const STypescriptBuilderBuildParamsInterface_1 = __importDefault(require("./interface/STypescriptBuilderBuildParamsInterface"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const monorepoToPackageAbsolutePathDeepMap_1 = __importDefault(require("@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap"));
class STypescriptBuilder extends s_builder_1.default {
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
        super((0, deepMerge_1.default)({
            typescriptBuilder: Object.assign({}, s_sugar_config_1.default.get('typescriptBuilder')),
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * Store the chokidar watchers in an object where the key is the glob
         */
        this._watchersByGlob = {};
    }
    /**
     * @name            typescriptBuilderSettings
     * @type            ISTypescriptBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get typescriptBuilderSettings() {
        return this._settings.typescriptBuilder;
    }
    /**
     * @name            _build
     * @type            Function
     * @async
     *
     * This method is the internal builder _build one.
     * It will be called by the SBuilder class with the final params
     * for the build
     *
     * @param       {Partial<ISTypescriptBuilderBuildParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let buildedFiles = [], watchersReady = [], buildPromises = [];
            // @ts-ignore
            const finalParams = (0, monorepoToPackageAbsolutePathDeepMap_1.default)(STypescriptBuilderBuildParamsInterface_1.default.apply(params), (_a = params.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
            // this can be overrided by customSettings bellow
            let formats = Array.isArray(finalParams.formats)
                ? finalParams.formats
                : [finalParams.formats];
            // function used only when the finalParams.watch is false
            // and keeping track on the watchers ready state.
            // when all the watchers are in ready state, this mean that the
            // buildPromises array is full of build promises and we can resolve
            // this process when they are all resolved
            function onWatcherReady(watcher) {
                watchersReady.push(watcher);
                if (watchersReady.length === finalParams.glob.length) {
                    // when all promises are resolved, resolve the promise
                    Promise.all(buildPromises).then(() => {
                        resolve({
                            glob: finalParams.glob,
                            inDir: finalParams.inDir,
                            outDir: finalParams.outDir,
                            formats,
                            platform: finalParams.platform,
                            files: buildedFiles,
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
                    ignoreInitial: finalParams.watch && !finalParams.buildInitial,
                });
                // keep track on the watchers ready state
                // to know when we can watch for all the buildPromises
                // state and resolve the process at them end...
                if (!finalParams.watch) {
                    watcher.on('ready', () => {
                        onWatcherReady(watcher);
                    });
                }
                ['add', 'change'].forEach((listener) => {
                    watcher.on(listener, (relPath) => __awaiter(this, void 0, void 0, function* () {
                        // @TODO     Implement local file settings
                        // const localConfigFile = await __findUp(
                        //     'typescriptBuilder.config.js',
                        //     {
                        //         cwd: `${finalParams.inDir}/${__path.dirname(
                        //             relPath,
                        //         )}`,
                        //     },
                        // );
                        var _a, _b, _c, _d;
                        // let localConfig = {};
                        // if (localConfigFile?.length) {
                        //     localConfig = (
                        //         await import(localConfigFile[0].path)
                        //     ).default;
                        // }
                        let buildParams = Object.assign({}, finalParams);
                        for (let [id, customSettings] of Object.entries(s_sugar_config_1.default.get('typescriptBuilder.customSettings'))) {
                            if (s_glob_1.default.match(`${finalParams.inDir}/${relPath}`, customSettings.glob)) {
                                formats =
                                    (_b = (_a = customSettings.settings) === null || _a === void 0 ? void 0 : _a.formats) !== null && _b !== void 0 ? _b : formats;
                                buildParams = (0, deepMerge_1.default)(buildParams, (_c = customSettings.settings) !== null && _c !== void 0 ? _c : {});
                                break;
                            }
                        }
                        // "localize" the file paths to the current package root
                        buildParams = (0, monorepoToPackageAbsolutePathDeepMap_1.default)(buildParams, (_d = finalParams.packageRoot) !== null && _d !== void 0 ? _d : process.cwd());
                        // generate all the requested formats
                        formats.forEach((format) => __awaiter(this, void 0, void 0, function* () {
                            const pro = pipe(this._buildFile((0, deepMerge_1.default)({
                                cwd: finalParams.inDir,
                                relPath,
                                path: `${finalParams.inDir}/${relPath}`,
                                format,
                                platform: finalParams.platform,
                                outDir: finalParams.outDir,
                            }, buildParams, {
                                watch: false,
                            })));
                            buildPromises.push(pro);
                            const fileResult = yield pro;
                            buildedFiles.push(fileResult);
                        }));
                    }));
                });
                // store the watcher for later use
                this._watchersByGlob[glob] = watcher;
            });
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    _buildFile(file) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            const packageRoot = (0, packageRoot_1.default)();
            const module = file.format === 'cjs' ? 'commonjs' : 'es6';
            const outPath = path_1.default.dirname(`${file.outDir}/${file.relPath}`
                .replace('%moduleSystem', file.format)
                .replace('%platform', file.platform));
            const packageJsonOutPath = `${packageRoot}/dist/pkg/${file.format}/package.json`;
            // output file
            let outFilePath = `${outPath}/${path_1.default.basename(file.path)}`
                .replace('%moduleSystem', file.format)
                .replace(/\.ts$/, '.js');
            const source = fs_1.default.readFileSync(file.path).toString();
            const tsconfig = (_a = s_sugar_config_1.default.get('typescriptBuilder.tsconfig')) !== null && _a !== void 0 ? _a : {};
            let filePath = file.relPath;
            if (process.cwd() !== (0, packageRoot_1.default)(file.path)) {
                filePath = path_1.default.relative(packageRoot, file.path);
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `Compiling "<cyan>${filePath}</cyan>" to <yellow>${file.format}</yellow> format, <magenta>${(_b = tsconfig.module) !== null && _b !== void 0 ? _b : module}</magenta> module system and <cyan>${(_c = tsconfig.target) !== null && _c !== void 0 ? _c : 'es6'}</cyan> as target...`,
            });
            let result = typescript_1.default.transpileModule(source, (0, deepMerge_1.default)(tsconfig, {
                compilerOptions: {
                    lib: ((_d = tsconfig.lib) !== null && _d !== void 0 ? _d : file.platform === 'node')
                        ? ['esnext']
                        : ['esnext', 'DOM'],
                    target: (_e = tsconfig.target) !== null && _e !== void 0 ? _e : 'es6',
                    module: (_f = tsconfig.module) !== null && _f !== void 0 ? _f : module,
                },
            }));
            if (result.outputText) {
                // write the output file
                if (!fs_1.default.existsSync(outPath)) {
                    fs_1.default.mkdirSync(outPath, { recursive: true });
                }
                fs_1.default.writeFileSync(outFilePath, result.outputText);
                // dirty hash to make the bin file(s) executable
                if (path_1.default.basename(outFilePath) === 'sugar.cli.js') {
                    fs_1.default.chmodSync(outFilePath, 0o755);
                }
            }
            // package.json
            const packageJsonOutFolderPath = path_1.default.dirname(packageJsonOutPath);
            if (!fs_1.default.existsSync(packageJsonOutFolderPath)) {
                fs_1.default.mkdirSync(packageJsonOutFolderPath, { recursive: true });
            }
            if (!fs_1.default.existsSync(packageJsonOutPath)) {
                fs_1.default.writeFileSync(packageJsonOutPath, JSON.stringify({
                    name: `@coffeekraken/internal-${(0, uniqid_1.default)()}-${file.format === 'cjs' ? 'commonjs' : 'module'}`,
                    type: file.format === 'cjs' ? 'commonjs' : 'module',
                    private: true,
                }));
            }
            resolve({
                input: file,
                format: file.format,
                platform: file.platform,
                module: (_g = tsconfig.module) !== null && _g !== void 0 ? _g : module,
                file: new s_file_1.default(outFilePath),
            });
        }));
    }
}
exports.default = STypescriptBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCw0RkFBc0U7QUFDdEUsNEZBQXNFO0FBQ3RFLHNGQUFnRTtBQUNoRSx3REFBa0M7QUFDbEMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw0REFBOEI7QUFDOUIsZ0lBQTBHO0FBRTFHLGtFQUEyQztBQUMzQyxrSkFBNEg7QUFtRzVILE1BQXFCLGtCQUFtQixTQUFRLG1CQUFVO0lBb0J0RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBbUQ7UUFDM0QsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFDUDtZQUNJLGlCQUFpQixvQkFDVix3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUM3QztTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF4Qk47O1dBRUc7UUFDSCxvQkFBZSxHQUF3QixFQUFFLENBQUM7SUFzQjFDLENBQUM7SUF2Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSx5QkFBeUI7UUFDekIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDO0lBQ25ELENBQUM7SUE2QkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQ0YsTUFBc0M7UUFFdEMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN0QyxJQUFJLFlBQVksR0FBb0MsRUFBRSxFQUNsRCxhQUFhLEdBQVUsRUFBRSxFQUN6QixhQUFhLEdBQW1CLEVBQUUsQ0FBQztZQUV2QyxhQUFhO1lBQ2IsTUFBTSxXQUFXLEdBQW1D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