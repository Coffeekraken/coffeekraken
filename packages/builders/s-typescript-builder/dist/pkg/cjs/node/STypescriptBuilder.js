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
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const currentModuleSystem_1 = __importDefault(require("@coffeekraken/sugar/shared/module/currentModuleSystem"));
const fs_2 = __importStar(require("fs"));
const path_2 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const __tsMorph = __importStar(require("ts-morph"));
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
                res = yield builder.build(Object.assign({ inDir: path_2.default.dirname(path), glob: path_2.default.basename(path), outDir: path_2.default.dirname(path), formats: [(0, currentModuleSystem_1.default)()], buildInitial: true, silent: true }, (params !== null && params !== void 0 ? params : {})));
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
            if (!finalParams.silent) {
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
                var _b, _c, _d, _e;
                // avoid to process in loop the same file saved over and over
                const savedFileIdx = buildedStack.indexOf(filePath);
                if (savedFileIdx !== -1) {
                    return;
                }
                const relPath = path_2.default.relative(finalParams.inDir, filePath);
                let buildParams = Object.assign({}, finalParams);
                for (let [id, customSettings] of Object.entries((_b = s_sugar_config_1.default.getSafe('typescriptBuilder.customSettings')) !== null && _b !== void 0 ? _b : {})) {
                    if (s_glob_1.default.match(filePath, customSettings.glob)) {
                        formats =
                            (_d = (_c = customSettings.settings) === null || _c === void 0 ? void 0 : _c.formats) !== null && _d !== void 0 ? _d : formats;
                        buildParams = (0, object_1.__deepMerge)(buildParams, (_e = customSettings.settings) !== null && _e !== void 0 ? _e : {});
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
            var _a, _b, _c, _d, _e, _f;
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
            if (!params.silent) {
                if (console.log !== global._console.log) {
                    console.log(`<yellow>[${new Date().toLocaleTimeString().split(' ')[0]}]</yellow> Compiling "<cyan>${filePath}</cyan>" to <yellow>${file.format}</yellow>:<magenta>${(_b = tsconfig.module) !== null && _b !== void 0 ? _b : module}</magenta>`);
                }
            }
            let result = typescript_1.default.transpileModule(source, (0, object_1.__deepMerge)(tsconfig, {
                compilerOptions: {
                    declaration: true,
                    lib: ((_c = tsconfig.lib) !== null && _c !== void 0 ? _c : file.platform === 'node')
                        ? ['esnext']
                        : ['esnext', 'DOM'],
                    target: (_d = tsconfig.target) !== null && _d !== void 0 ? _d : 'es6',
                    module: (_e = tsconfig.module) !== null && _e !== void 0 ? _e : module,
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
                module: (_f = tsconfig.module) !== null && _f !== void 0 ? _f : module,
                js: result.outputText,
                file: params.save ? new s_file_1.default(outFilePath) : undefined,
            });
        }));
    }
}
exports.default = STypescriptBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsa0VBQTJDO0FBQzNDLGtFQUEyQztBQUMzQyxrRkFBMEQ7QUFDMUQsK0NBQStEO0FBQy9ELHVEQUF5RDtBQUN6RCxtREFJa0M7QUFDbEMseURBQThEO0FBQzlELGdIQUEwRjtBQUMxRix5Q0FBbUQ7QUFDbkQsZ0RBQTBCO0FBQzFCLDREQUE4QjtBQUU5QixvREFBc0M7QUE0R3RDLE1BQXFCLGtCQUFtQixTQUFRLG1CQUFVO0lBUXREOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQ2pCLElBQVksRUFDWixNQUFnRCxFQUNoRCxXQUFpRCxFQUFFO1FBRW5ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNyQixNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixtQkFDL0IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFDckIsQ0FBQztnQkFFSCxJQUFJLEdBQUcsQ0FBQztnQkFFUixhQUFhO2dCQUNiLFNBQVMsTUFBTTtvQkFDWCxJQUFJO3dCQUNBLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzNDO29CQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7Z0JBQ2xCLENBQUM7Z0JBRUQsaUVBQWlFO2dCQUNqRSxJQUFBLHlCQUFlLEVBQUMsR0FBRyxFQUFFO29CQUNqQixNQUFNLEVBQUUsQ0FBQztnQkFDYixDQUFDLENBQUMsQ0FBQztnQkFFSCxhQUFhO2dCQUNi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