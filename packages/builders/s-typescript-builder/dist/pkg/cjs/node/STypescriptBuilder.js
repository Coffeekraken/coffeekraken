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
const s_builder_1 = __importDefault(require("@coffeekraken/s-builder"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const getFiles_1 = __importDefault(require("@coffeekraken/sugar/node/fs/getFiles"));
const monorepoToPackageAbsolutePathDeepMap_1 = __importDefault(require("@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const onProcessExit_1 = __importDefault(require("@coffeekraken/sugar/node/process/onProcessExit"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
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
        // @ts-ignore
        // @TODO        integrate the settings interface
        // __STypescriptBuilderSettingsInterface.default(),
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * Store the chokidar watchers in an object where the key is the glob
         */
        this._watchersByGlob = {};
    }
    /**
     * @name            buildTemporary
     * @type            Function
     * @async
     * @static
     *
     * This static method allows you to build a file for and remove it after calling the returned callback.
     * This is usefull to compile a typescript file like tests, execute your test and deleting the compiled file.
     *
     * @param       {String}            path        The file path to build
     * @param      {Partial<ISTypescriptBuilderSettings>}       [settings={}]           Some settings to configure your builder instance
     * @return     {Promise<ISTypescriptBuildTemporaryResult>}          The result of the build with the compiled file path AND the delete callback function
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static buildTemporary(path, params, settings = {}) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (path.match(/\.ts$/)) {
                const builder = new STypescriptBuilder(settings !== null && settings !== void 0 ? settings : {});
                let res;
                function remove() {
                    try {
                        fs_1.default.unlinkSync(res.files[0].file.path);
                    }
                    catch (e) { }
                }
                // make sure the file does not stay when an error occured, etc...
                (0, onProcessExit_1.default)(() => {
                    remove();
                });
                // @ts-ignore
                res = yield builder.build(Object.assign({ inDir: path_1.default.dirname(path), glob: path_1.default.basename(path), outDir: path_1.default.dirname(path), formats: ['esm'], buildInitial: true }, (params !== null && params !== void 0 ? params : {})));
                setTimeout(() => {
                    remove();
                }, 10000);
                resolve({
                    path: (_a = res.files[0]) === null || _a === void 0 ? void 0 : _a.file.path,
                    remove,
                });
            }
            resolve({
                path,
                remove() { },
            });
        }));
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
            const { default: __STypescriptBuilderBuildParamsInterface,
            // @ts-ignore
             } = yield Promise.resolve().then(() => __importStar(require(`${(0, dirname_1.default)()}/interface/STypescriptBuilderBuildParamsInterface`)));
            const buildedFiles = [];
            // @ts-ignore
            const finalParams = (0, monorepoToPackageAbsolutePathDeepMap_1.default)(__STypescriptBuilderBuildParamsInterface.apply(params), (_a = params.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
            // this can be overrided by customSettings bellow
            let formats = Array.isArray(finalParams.formats)
                ? finalParams.formats
                : [finalParams.formats];
            const globs = Array.isArray(finalParams.glob)
                ? finalParams.glob
                : [finalParams.glob];
            if (!finalParams.silent) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Globs              : <yellow>${globs.join(',')}</yellow>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir}</cyan>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Output directory  : <cyan>${finalParams.outDir}</cyan>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Formats           : <yellow>${formats.join(',')}</yellow>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Platform          : <yellow>${finalParams.platform}</yellow>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Watch             : ${finalParams.watch
                        ? `<green>true</green>`
                        : `<red>false</red>`}`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Build initial     : ${finalParams.buildInitial
                        ? `<green>true</green>`
                        : `<red>false</red>`}`,
                });
            }
            // watch using chokidar
            const filesPromise = (0, getFiles_1.default)(globs, {
                cwd: finalParams.inDir,
                ignoreInitial: finalParams.watch && !finalParams.buildInitial,
                watch: finalParams.watch,
            });
            // handle no watch
            filesPromise.then(() => {
                resolve({
                    glob: finalParams.glob,
                    inDir: finalParams.inDir,
                    outDir: finalParams.outDir,
                    format: finalParams.formats,
                    platform: finalParams.platform,
                    files: buildedFiles,
                });
            });
            // save all the file paths that has just been savec by the formatter
            // to avoid process it over and over...
            const buildedStack = [];
            // listen for files change and add
            filesPromise.on('add,change', ({ file: filePath, resolve: resolveFile }) => __awaiter(this, void 0, void 0, function* () {
                var _b, _c, _d, _e, _f;
                // avoid to process in loop the same file saved over and over
                const savedFileIdx = buildedStack.indexOf(filePath);
                if (savedFileIdx !== -1) {
                    return;
                }
                const relPath = path_1.default.relative(finalParams.inDir, filePath);
                let buildParams = Object.assign({}, finalParams);
                for (let [id, customSettings] of Object.entries((_b = s_sugar_config_1.default.getSafe('typescriptBuilder.customSettings')) !== null && _b !== void 0 ? _b : {})) {
                    if (s_glob_1.default.match(filePath, customSettings.glob)) {
                        formats =
                            (_d = (_c = customSettings.settings) === null || _c === void 0 ? void 0 : _c.formats) !== null && _d !== void 0 ? _d : formats;
                        buildParams = (0, deepMerge_1.default)(buildParams, (_e = customSettings.settings) !== null && _e !== void 0 ? _e : {});
                        break;
                    }
                }
                // "localize" the file paths to the current package root
                buildParams = (0, monorepoToPackageAbsolutePathDeepMap_1.default)(buildParams, (_f = finalParams.packageRoot) !== null && _f !== void 0 ? _f : process.cwd());
                // generate all the requested formats
                for (let i = 0; i < formats.length; i++) {
                    const format = formats[i];
                    const buildedFilePromise = pipe(this._buildFile((0, deepMerge_1.default)({
                        cwd: finalParams.inDir,
                        relPath,
                        path: filePath,
                        format,
                        platform: finalParams.platform,
                        outDir: finalParams.outDir,
                    }, buildParams, {
                        watch: false,
                    }), finalParams));
                    const buildedFileRes = yield buildedFilePromise;
                    if (!buildedFiles.includes(buildedFileRes)) {
                        buildedFiles.push(buildedFileRes);
                    }
                }
                // set the file as resolved
                resolveFile();
            }));
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    _buildFile(file, params) {
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
            // delete output file if exists and that a proper ts file exists also
            // if (__fs.existsSync(file.path) && __fs.existsSync(outFilePath)) {
            //     try {
            //         __fs.unlinkSync(outFilePath);
            //     } catch (e) {}
            // }
            const source = fs_1.default.readFileSync(file.path).toString();
            const tsconfig = (_a = s_sugar_config_1.default.getSafe('typescriptBuilder.tsconfig')) !== null && _a !== void 0 ? _a : {};
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
            if (params.save && result.outputText) {
                // write the output file
                if (!fs_1.default.existsSync(outPath)) {
                    fs_1.default.mkdirSync(outPath, { recursive: true });
                }
                yield fs_1.promises.writeFile(outFilePath, result.outputText);
                // dirty hash to make the bin file(s) executable
                if (path_1.default.basename(outFilePath) === 'sugar.cli.js') {
                    fs_1.default.chmodSync(outFilePath, 0o755);
                }
            }
            // package.json
            if (params.save) {
                const packageJsonOutFolderPath = path_1.default.dirname(packageJsonOutPath);
                if (!fs_1.default.existsSync(packageJsonOutFolderPath)) {
                    fs_1.default.mkdirSync(packageJsonOutFolderPath, {
                        recursive: true,
                    });
                }
                if (!fs_1.default.existsSync(packageJsonOutPath)) {
                    fs_1.default.writeFileSync(packageJsonOutPath, JSON.stringify({
                        // avoid specifying a name to prevent yarn to yiel for ducplicate workspaces
                        // name: `@coffeekraken/internal-${__uniqid()}-${
                        //     file.format === 'cjs' ? 'commonjs' : 'module'
                        // }`,
                        type: file.format === 'cjs' ? 'commonjs' : 'module',
                        private: true,
                    }));
                }
            }
            resolve({
                input: file,
                format: file.format,
                platform: file.platform,
                module: (_g = tsconfig.module) !== null && _g !== void 0 ? _g : module,
                js: result.outputText,
                file: params.save ? new s_file_1.default(outFilePath) : undefined,
            });
        }));
    }
}
exports.default = STypescriptBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsa0VBQTJDO0FBQzNDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCxrRkFBNEQ7QUFDNUQsb0ZBQThEO0FBQzlELGtKQUE0SDtBQUM1SCw0RkFBc0U7QUFDdEUsbUdBQTZFO0FBQzdFLDRGQUFzRTtBQUN0RSx5Q0FBbUQ7QUFDbkQsZ0RBQTBCO0FBQzFCLDREQUE4QjtBQXNHOUIsTUFBcUIsa0JBQW1CLFNBQVEsbUJBQVU7SUFzRXREOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUErQztRQUN2RCxLQUFLLENBQ0QsSUFBQSxtQkFBVyxFQUNQO1FBQ0ksYUFBYTtRQUNiLGdEQUFnRDtRQUNoRCxtREFBbUQ7U0FDdEQsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXhGTjs7V0FFRztRQUNILG9CQUFlLEdBQXdCLEVBQUUsQ0FBQztJQXNGMUMsQ0FBQztJQXBGRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osTUFBZ0QsRUFDaEQsV0FBaUQsRUFBRTtRQUVuRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JCLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUM7Z0JBRXZELElBQUksR0FBRyxDQUFDO2dCQUVSLFNBQVMsTUFBTTtvQkFDWCxJQUFJO3dCQUNBLFlB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