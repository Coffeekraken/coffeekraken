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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const module_1 = require("@coffeekraken/sugar/module");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const fs_2 = __importStar(require("fs"));
const path_2 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const __tsMorph = __importStar(require("ts-morph"));
const STypescriptBuilderSettingsInterface_1 = __importDefault(require("./interface/STypescriptBuilderSettingsInterface"));
class STypescriptBuilder extends s_builder_1.default {
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (path.match(/\.ts$/)) {
                const builder = new STypescriptBuilder(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})));
                let res;
                // @ts-ignore
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
                res = yield builder.build(Object.assign({ inDir: path_2.default.dirname(path), glob: path_2.default.basename(path), outDir: path_2.default.dirname(path), formats: [(0, module_1.__currentModuleSystem)()], buildInitial: true, silent: true }, (params !== null && params !== void 0 ? params : {})));
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
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)(
        // @ts-ignore
        STypescriptBuilderSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * Store the chokidar watchers in an object where the key is the glob
         */
        this._watchersByGlob = {};
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            var _b;
            const { default: __STypescriptBuilderBuildParamsInterface,
            // @ts-ignore
             } = yield (_a = `${(0, fs_1.__dirname)()}/interface/STypescriptBuilderBuildParamsInterface`, Promise.resolve().then(() => __importStar(require(_a))));
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
            // @ts-ignore
            if (!finalParams.silent && ((_b = this.settings.log) === null || _b === void 0 ? void 0 : _b.summary)) {
                console.log(`<yellow>○</yellow> Globs              : <yellow>${globs.join(',')}</yellow>`);
                console.log(`<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(`${(0, path_1.__packageRootDir)()}/`, '')}</cyan>`);
                console.log(`<yellow>○</yellow> Output directory  : <cyan>${finalParams.outDir.replace(`${(0, path_1.__packageRootDir)()}/`, '')}</cyan>`);
                console.log(`<yellow>○</yellow> Formats           : <yellow>${formats.join(',')}</yellow>`);
                console.log(`<yellow>○</yellow> Platform          : <yellow>${finalParams.platform}</yellow>`);
                console.log(`<yellow>○</yellow> Watch             : ${finalParams.watch
                    ? `<green>true</green>`
                    : `<red>false</red>`}`);
                console.log(`<yellow>○</yellow> Build initial     : ${finalParams.buildInitial
                    ? `<green>true</green>`
                    : `<red>false</red>`}`);
            }
            // watch getFiles
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
                    declarationFiles: finalParams.declarationFiles,
                    files: buildedFiles,
                });
            });
            // save all the file paths that has just been savec by the formatter
            // to avoid process it over and over...
            const buildedStack = [];
            // listen for files change and add
            filesPromise.on('add,change', ({ file: filePath, resolve: resolveFile }) => __awaiter(this, void 0, void 0, function* () {
                var _c, _d, _e, _f;
                // avoid to process in loop the same file saved over and over
                const savedFileIdx = buildedStack.indexOf(filePath);
                if (savedFileIdx !== -1) {
                    return;
                }
                const relPath = path_2.default.relative(finalParams.inDir, filePath);
                let buildParams = Object.assign({}, finalParams);
                for (let [id, customSettings] of Object.entries((_c = s_sugar_config_1.default.getSafe('typescriptBuilder.customSettings')) !== null && _c !== void 0 ? _c : {})) {
                    if (s_glob_1.default.match(filePath, customSettings.glob)) {
                        formats =
                            (_e = (_d = customSettings.settings) === null || _d === void 0 ? void 0 : _d.formats) !== null && _e !== void 0 ? _e : formats;
                        buildParams = (0, object_1.__deepMerge)(buildParams, (_f = customSettings.settings) !== null && _f !== void 0 ? _f : {});
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
                    const buildedFilePromise = this._buildFile((0, object_1.__deepMerge)({
                        cwd: finalParams.inDir,
                        relPath,
                        path: filePath,
                        format,
                        silent: finalParams.silent,
                        platform: finalParams.platform,
                        declarationFile: finalParams.declarationFiles,
                        outDir: finalParams.outDir,
                    }, buildParams, {
                        watch: false,
                    }), finalParams);
                    const buildedFileRes = yield buildedFilePromise;
                    if (!buildedFiles.includes(buildedFileRes)) {
                        buildedFiles.push(buildedFileRes);
                    }
                }
                // set the file as resolved
                resolveFile();
            }));
        }));
    }
    _createTsProgramIfNeeded(compilerOptions, packageRoot = process.cwd()) {
        if (this._tsProject) {
            return this._tsProject;
        }
        const relSrcRootDir = (0, path_1.__srcRootDir)().replace(`${(0, path_1.__packageRootDir)()}/`, ''), globs = [`${packageRoot}/${relSrcRootDir}/**/*.ts`];
        this._tsProject = new __tsMorph.Project({
            skipAddingFilesFromTsConfig: true,
            compilerOptions,
        });
        this._tsProject.addSourceFilesAtPaths(globs);
        return this._tsProject;
    }
    _buildDeclarationFile(filePath, outputFilePath, packageRoot = process.cwd(), silent = false) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const compilerOptions = {
                allowJs: true,
                declaration: true,
                emitDeclarationOnly: true,
                outDir: `${(0, path_1.__packageCacheDir)()}/s-typescript-builder`,
            };
            if (!silent) {
                (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[d.ts]</yellow> Generating .d.ts file for "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), outputFilePath)}</cyan>"`);
            }
            const project = this._createTsProgramIfNeeded(compilerOptions, packageRoot);
            const sourceFile = project.getSourceFile(filePath);
            // if (!sourceFile) {
            //     return resolve('');
            // }
            // update the file in memory with the one on the filesystem
            yield sourceFile.refreshFromFileSystem();
            if (!sourceFile) {
                return resolve('');
            }
            const emitOutput = sourceFile.getEmitOutput(), outputFile = emitOutput.getOutputFiles()[0];
            if (!outputFile || !outputFile.getText) {
                return resolve('');
            }
            const text = outputFile
                .getText()
                .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
            if (!silent) {
                (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<green>[d.ts]</green> .d.ts file generated <green>successfully</green> for "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), outputFilePath)}</cyan>"`);
            }
            resolve(text);
        }));
    }
    _buildFile(file, params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
            if (!params.silent && ((_b = this.settings.log) === null || _b === void 0 ? void 0 : _b.compile)) {
                if (console.log !== global._console.log) {
                    console.log(`<yellow>[${new Date().toLocaleTimeString().split(' ')[0]}]</yellow> Compiling "<cyan>${filePath}</cyan>" to <yellow>${file.format}</yellow>:<magenta>${(_c = tsconfig.module) !== null && _c !== void 0 ? _c : module}</magenta>`);
                }
            }
            let result = typescript_1.default.transpileModule(source, (0, object_1.__deepMerge)(tsconfig, {
                compilerOptions: {
                    declaration: true,
                    lib: ((_d = tsconfig.lib) !== null && _d !== void 0 ? _d : file.platform === 'node')
                        ? ['esnext']
                        : ['esnext', 'DOM'],
                    target: (_e = tsconfig.target) !== null && _e !== void 0 ? _e : 'es6',
                    module: (_f = tsconfig.module) !== null && _f !== void 0 ? _f : module,
                },
            }));
            // generating .d.ts file
            if (file.declarationFile && outFilePath.match(/\/dist\//)) {
                try {
                    fs_2.default.unlinkSync(outFilePath.replace(/\.js$/, '.d.ts'));
                }
                catch (e) { }
                const declarationPromise = this._buildDeclarationFile(file.path, outFilePath.replace(/\.js$/, '.d.ts'), params.packageRoot, params.silent);
                declarationPromise.then((declarationStr) => __awaiter(this, void 0, void 0, function* () {
                    // prevent empty file
                    if (!declarationStr) {
                        return;
                    }
                    // try {
                    //     __fs.unlinkSync(outFilePath.replace(/\.js$/, '.d.ts'));
                    // } catch (e) {
                    //     console.log(e);
                    // }
                    // save declaration file if needed
                    fs_2.default.writeFileSync(outFilePath.replace(/\.js$/, '.d.ts'), declarationStr);
                }));
            }
            if (params.save && result.outputText) {
                // write the output file
                if (!fs_2.default.existsSync(outPath)) {
                    fs_2.default.mkdirSync(outPath, { recursive: true });
                }
                // save js file
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
                declarationFiles: file.declarationFile,
                module: (_g = tsconfig.module) !== null && _g !== void 0 ? _g : module,
                js: result.outputText,
                file: params.save ? new s_file_1.default(outFilePath) : undefined,
            });
        }));
    }
}
exports.default = STypescriptBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsa0VBQTJDO0FBQzNDLGtFQUEyQztBQUMzQyxrRkFBMEQ7QUFDMUQsK0NBQStEO0FBQy9ELHVEQUFtRTtBQUNuRSx1REFBeUQ7QUFDekQsbURBSWtDO0FBQ2xDLHlEQUE4RDtBQUM5RCx5Q0FBbUQ7QUFDbkQsZ0RBQTBCO0FBQzFCLDREQUE4QjtBQUU5QixvREFBc0M7QUFFdEMsMEhBQW9HO0FBaUhwRyxNQUFxQixrQkFBbUIsU0FBUSxtQkFBVTtJQVF0RDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osTUFBZ0QsRUFDaEQsV0FBaUQsRUFBRTtRQUVuRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckIsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsbUJBQy9CLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLEVBQ3JCLENBQUM7Z0JBRUgsSUFBSSxHQUFHLENBQUM7Z0JBRVIsYUFBYTtnQkFDYixTQUFTLE1BQU07b0JBQ1gsSUFBSTt3QkFDQSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMzQztvQkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO2dCQUNsQixDQUFDO2dCQUVELGlFQUFpRTtnQkFDakUsSUFBQSx5QkFBZSxFQUFDLEdBQUcsRUFBRTtvQkFDakIsTUFBTSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUM7Z0JB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