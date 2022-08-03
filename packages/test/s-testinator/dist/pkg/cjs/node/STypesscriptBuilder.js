'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const s_builder_1 = __importDefault(require('@coffeekraken/s-builder'));
const s_file_1 = __importDefault(require('@coffeekraken/s-file'));
const s_log_1 = __importDefault(require('@coffeekraken/s-log'));
const s_promise_1 = __importDefault(require('@coffeekraken/s-promise'));
const s_sugar_config_1 = __importDefault(
    require('@coffeekraken/s-sugar-config'),
);
const packageRoot_1 = __importDefault(
    require('@coffeekraken/sugar/node/path/packageRoot'),
);
const deepMerge_1 = __importDefault(
    require('@coffeekraken/sugar/shared/object/deepMerge'),
);
const uniqid_1 = __importDefault(
    require('@coffeekraken/sugar/shared/string/uniqid'),
);
const chokidar_1 = __importDefault(require('chokidar'));
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const typescript_1 = __importDefault(require('typescript'));
const STypescriptBuilderBuildParamsInterface_1 = __importDefault(
    require('./interface/STypescriptBuilderBuildParamsInterface'),
);
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
        super(
            (0, deepMerge_1.default)(
                {
                    typescriptBuilder: Object.assign(
                        {},
                        s_sugar_config_1.default.get('typescriptBuilder'),
                    ),
                },
                settings !== null && settings !== void 0 ? settings : {},
            ),
        );
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
        return new s_promise_1.default(
            ({ resolve, reject, emit, pipe }) =>
                __awaiter(this, void 0, void 0, function* () {
                    let buildedFiles = [],
                        watchersReady = [],
                        buildPromises = [];
                    // @ts-ignore
                    const finalParams = STypescriptBuilderBuildParamsInterface_1.default.apply(
                        params,
                    );
                    const formats = Array.isArray(finalParams.formats)
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
                            ignoreInitial:
                                finalParams.watch && !finalParams.buildInitial,
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
                            watcher.on(listener, (relPath) =>
                                __awaiter(this, void 0, void 0, function* () {
                                    // generate all the requested formats
                                    formats.forEach((format) =>
                                        __awaiter(
                                            this,
                                            void 0,
                                            void 0,
                                            function* () {
                                                const pro = pipe(
                                                    this._buildFile({
                                                        cwd: finalParams.inDir,
                                                        relPath,
                                                        path: `${finalParams.inDir}/${relPath}`,
                                                        format,
                                                        platform:
                                                            finalParams.platform,
                                                        outDir:
                                                            finalParams.outDir,
                                                    }),
                                                );
                                                buildPromises.push(pro);
                                                const fileResult = yield pro;
                                                buildedFiles.push(fileResult);
                                            },
                                        ),
                                    );
                                }),
                            );
                        });
                        // store the watcher for later use
                        this._watchersByGlob[glob] = watcher;
                    });
                }),
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }
    _buildFile(file) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) =>
            __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g;
                const packageRoot = (0, packageRoot_1.default)();
                const module = file.format === 'cjs' ? 'commonjs' : 'es6';
                const outPath = path_1.default.dirname(
                    `${file.outDir}/${file.relPath}`
                        .replace('%format', file.format)
                        .replace('%platform', file.platform),
                );
                const packageJsonOutPath = `${packageRoot}/dist/pkg/${file.format}/package.json`;
                // output file
                let outFilePath = `${outPath}/${path_1.default.basename(
                    file.path,
                )}`
                    .replace('%format', file.format)
                    .replace(/\.ts$/, '.js');
                const source = fs_1.default.readFileSync(file.path).toString();
                const tsconfig =
                    (_a = s_sugar_config_1.default.get(
                        'typescriptBuilder.tsconfig',
                    )) !== null && _a !== void 0
                        ? _a
                        : {};
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `Compiling "<cyan>${
                        file.relPath
                    }</cyan>" to <yellow>${
                        file.format
                    }</yellow> format, <magenta>${
                        (_b = tsconfig.module) !== null && _b !== void 0
                            ? _b
                            : module
                    }</magenta> module system and <cyan>${
                        (_c = tsconfig.target) !== null && _c !== void 0
                            ? _c
                            : 'es6'
                    }</cyan> as target...`,
                });
                let result = typescript_1.default.transpileModule(
                    source,
                    (0, deepMerge_1.default)(tsconfig, {
                        compilerOptions: {
                            lib: (
                                (_d = tsconfig.lib) !== null && _d !== void 0
                                    ? _d
                                    : file.platform === 'node'
                            )
                                ? ['esnext']
                                : ['esnext', 'DOM'],
                            target:
                                (_e = tsconfig.target) !== null && _e !== void 0
                                    ? _e
                                    : 'es6',
                            module:
                                (_f = tsconfig.module) !== null && _f !== void 0
                                    ? _f
                                    : module,
                        },
                    }),
                );
                if (result.outputText) {
                    // write the output file
                    if (!fs_1.default.existsSync(outPath)) {
                        fs_1.default.mkdirSync(outPath, { recursive: true });
                    }
                    fs_1.default.writeFileSync(outFilePath, result.outputText);
                    // dirty hash to make the bin file(s) executable
                    if (
                        path_1.default.basename(outFilePath) === 'sugar.cli.js'
                    ) {
                        fs_1.default.chmodSync(outFilePath, 0o755);
                    }
                }
                // package.json
                const packageJsonOutFolderPath = path_1.default.dirname(
                    packageJsonOutPath,
                );
                if (!fs_1.default.existsSync(packageJsonOutFolderPath)) {
                    fs_1.default.mkdirSync(packageJsonOutFolderPath, {
                        recursive: true,
                    });
                }
                if (!fs_1.default.existsSync(packageJsonOutPath)) {
                    fs_1.default.writeFileSync(
                        packageJsonOutPath,
                        JSON.stringify({
                            name: `@coffeekraken/${(0, uniqid_1.default)()}`,
                            type: file.format === 'cjs' ? 'commonjs' : 'module',
                            private: true,
                        }),
                    );
                }
                resolve({
                    input: file,
                    format: file.format,
                    platform: file.platform,
                    module:
                        (_g = tsconfig.module) !== null && _g !== void 0
                            ? _g
                            : module,
                    file: new s_file_1.default(outFilePath),
                });
            }),
        );
    }
}
exports.default = STypescriptBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCw0RkFBc0U7QUFDdEUsNEZBQXNFO0FBQ3RFLHNGQUFnRTtBQUNoRSx3REFBa0M7QUFDbEMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw0REFBOEI7QUFDOUIsZ0lBQTBHO0FBd0YxRyxNQUFxQixrQkFBbUIsU0FBUSxtQkFBVTtJQW9CdEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQW1EO1FBQzNELEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSxpQkFBaUIsb0JBQ1Ysd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FDN0M7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBeEJOOztXQUVHO1FBQ0gsb0JBQWUsR0FBd0IsRUFBRSxDQUFDO0lBc0IxQyxDQUFDO0lBdkNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkseUJBQXlCO1FBQ3pCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDO0lBNkJEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUNGLE1BQXNDO1FBRXRDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QyxJQUFJLFlBQVksR0FBb0MsRUFBRSxFQUNsRCxhQUFhLEdBQVUsRUFBRSxFQUN6QixhQUFhLEdBQW1CLEVBQUUsQ0FBQztZQUV2QyxhQUFhO1lBQ2IsTUFBTSxXQUFXLEdBQW1DLGdEQUF3QyxDQUFDLEtBQUssQ0FDOUYsTUFB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
