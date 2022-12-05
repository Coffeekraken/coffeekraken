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
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const currentModuleSystem_1 = __importDefault(require("@coffeekraken/sugar/shared/module/currentModuleSystem"));
const fs_2 = __importStar(require("fs"));
const path_2 = __importDefault(require("path"));
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
        super((0, object_1.__deepMerge)({
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
                        fs_2.default.unlinkSync(res.files[0].file.path);
                    }
                    catch (e) { }
                }
                // make sure the file does not stay when an error occured, etc...
                (0, process_1.__onProcessExit)(() => {
                    remove();
                });
                // @ts-ignore
                res = yield builder.build(Object.assign({ inDir: path_2.default.dirname(path), glob: path_2.default.basename(path), outDir: path_2.default.dirname(path), formats: [(0, currentModuleSystem_1.default)()], buildInitial: true }, (params !== null && params !== void 0 ? params : {})));
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
            const { default: __STypescriptBuilderBuildParamsInterface,
            // @ts-ignore
             } = yield Promise.resolve().then(() => __importStar(require(`${(0, fs_1.__dirname)()}/interface/STypescriptBuilderBuildParamsInterface`)));
            const buildedFiles = [];
            // // @ts-ignore
            // const finalParams: ISTypescriptBuilderBuildParams =
            //     __monorepoToPackageAbsolutePathDeepMap(
            //         __STypescriptBuilderBuildParamsInterface.apply(params),
            //         params.packageRoot ?? process.cwd(),
            //     );
            const finalParams = __STypescriptBuilderBuildParamsInterface.apply(params);
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
                    value: `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(`${(0, path_1.__packageRootDir)()}/`, '')}</cyan>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Output directory  : <cyan>${finalParams.outDir.replace(`${(0, path_1.__packageRootDir)()}/`, '')}</cyan>`,
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
            // @TODO        replace the __getFiles by the cleaner __pool function
            // const filesPromise1 = __pool(globs, {
            //     cwd: finalParams.inDir,
            //     watch: finalParams.watch,
            // });
            // filesPromise1.on('add,change', (f) => {
            //     console.log('FILE', f);
            // });
            // await filesPromise1.ready;
            // watch using chokidar
            const filesPromise = (0, fs_1.__getFiles)(globs, {
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
                var _a, _b, _c, _d;
                // avoid to process in loop the same file saved over and over
                const savedFileIdx = buildedStack.indexOf(filePath);
                if (savedFileIdx !== -1) {
                    return;
                }
                const relPath = path_2.default.relative(finalParams.inDir, filePath);
                let buildParams = Object.assign({}, finalParams);
                for (let [id, customSettings] of Object.entries((_a = s_sugar_config_1.default.getSafe('typescriptBuilder.customSettings')) !== null && _a !== void 0 ? _a : {})) {
                    if (s_glob_1.default.match(filePath, customSettings.glob)) {
                        formats =
                            (_c = (_b = customSettings.settings) === null || _b === void 0 ? void 0 : _b.formats) !== null && _c !== void 0 ? _c : formats;
                        buildParams = (0, object_1.__deepMerge)(buildParams, (_d = customSettings.settings) !== null && _d !== void 0 ? _d : {});
                        break;
                    }
                }
                // "localize" the file paths to the current package root
                // buildParams = __monorepoToPackageAbsolutePathDeepMap(
                //     buildParams,
                //     finalParams.packageRoot ?? process.cwd(),
                // );
                // generate all the requested formats
                for (let i = 0; i < formats.length; i++) {
                    const format = formats[i];
                    const buildedFilePromise = pipe(this._buildFile((0, object_1.__deepMerge)({
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
            const packageRoot = params.packageRoot;
            const module = file.format === 'cjs' ? 'commonjs' : 'es6';
            const outPath = path_2.default.dirname(`${file.outDir}/${file.relPath}`
                .replace('%moduleSystem', file.format)
                .replace('%platform', file.platform));
            const packageJsonOutPath = `${packageRoot}/dist/pkg/${file.format}/package.json`;
            // output file
            let outFilePath = `${outPath}/${path_2.default.basename(file.path)}`
                .replace('%moduleSystem', file.format)
                .replace(/\.ts$/, '.js');
            // delete output file if exists and that a proper ts file exists also
            // if (__fs.existsSync(file.path) && __fs.existsSync(outFilePath)) {
            //     try {
            //         __fs.unlinkSync(outFilePath);
            //     } catch (e) {}
            // }
            const source = fs_2.default.readFileSync(file.path).toString();
            const tsconfig = (_a = s_sugar_config_1.default.getSafe('typescriptBuilder.tsconfig')) !== null && _a !== void 0 ? _a : {};
            let filePath = file.relPath;
            if (process.cwd() !== (0, path_1.__packageRootDir)(file.path)) {
                filePath = path_2.default.relative(packageRoot, file.path);
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `Compiling "<cyan>${filePath}</cyan>" to <yellow>${file.format}</yellow> format, <magenta>${(_b = tsconfig.module) !== null && _b !== void 0 ? _b : module}</magenta> module system and <cyan>${(_c = tsconfig.target) !== null && _c !== void 0 ? _c : 'es6'}</cyan> as target...`,
            });
            let result = typescript_1.default.transpileModule(source, (0, object_1.__deepMerge)(tsconfig, {
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
                if (!fs_2.default.existsSync(outPath)) {
                    fs_2.default.mkdirSync(outPath, { recursive: true });
                }
                yield fs_2.promises.writeFile(outFilePath, result.outputText);
                // dirty hash to make the bin file(s) executable
                if (path_2.default.basename(outFilePath) === 'sugar.cli.js') {
                    fs_2.default.chmodSync(outFilePath, 0o755);
                }
            }
            // package.json
            if (params.save) {
                const packageJsonOutFolderPath = path_2.default.dirname(packageJsonOutPath);
                if (!fs_2.default.existsSync(packageJsonOutFolderPath)) {
                    fs_2.default.mkdirSync(packageJsonOutFolderPath, {
                        recursive: true,
                    });
                }
                if (!fs_2.default.existsSync(packageJsonOutPath)) {
                    fs_2.default.writeFileSync(packageJsonOutPath, JSON.stringify({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsa0VBQTJDO0FBQzNDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCwrQ0FBK0Q7QUFDL0QsdURBQXlEO0FBQ3pELG1EQUE0RDtBQUM1RCx5REFBOEQ7QUFDOUQsZ0hBQTBGO0FBQzFGLHlDQUFtRDtBQUNuRCxnREFBMEI7QUFDMUIsNERBQThCO0FBdUc5QixNQUFxQixrQkFBbUIsU0FBUSxtQkFBVTtJQWtFdEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQStDO1FBQ3ZELEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7UUFDSSxhQUFhO1FBQ2IsZ0RBQWdEO1FBQ2hELG1EQUFtRDtTQUN0RCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBcEZOOztXQUVHO1FBQ0gsb0JBQWUsR0FBd0IsRUFBRSxDQUFDO0lBa0YxQyxDQUFDO0lBaEZEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQ2pCLElBQVksRUFDWixNQUFnRCxFQUNoRCxXQUFpRCxFQUFFO1FBRW5ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1lBQ3pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckIsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztnQkFFdkQsSUFBSSxHQUFHLENBQUM7Z0JBRVIsU0FBUyxNQUFNO29CQUNYLElBQUk7d0JBQ0EsWUFBSSxDQUFDLFVBQVUs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