var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __dirname, __getFiles } from '@coffeekraken/sugar/fs';
import { __currentModuleSystem } from '@coffeekraken/sugar/module';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageCacheDir, __packageRootDir, __srcRootDir, } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __fs, { promises as __fsPromise } from 'fs';
import __path from 'path';
import __ts from 'typescript';
import * as __tsMorph from 'ts-morph';
import __STypescriptBuilderSettingsInterface from './interface/STypescriptBuilderSettingsInterface';
export default class STypescriptBuilder extends __SBuilder {
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
                        __fs.unlinkSync(res.files[0].file.path);
                    }
                    catch (e) { }
                }
                // make sure the file does not stay when an error occured, etc...
                __onProcessExit(() => {
                    remove();
                });
                // @ts-ignore
                res = yield builder.build(Object.assign({ inDir: __path.dirname(path), glob: __path.basename(path), outDir: __path.dirname(path), formats: [__currentModuleSystem()], buildInitial: true, silent: true }, (params !== null && params !== void 0 ? params : {})));
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
        super(__deepMerge(
        // @ts-ignore
        __STypescriptBuilderSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
             } = yield import(`${__dirname()}/interface/STypescriptBuilderBuildParamsInterface`);
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
            if (!finalParams.silent && ((_a = this.settings.log) === null || _a === void 0 ? void 0 : _a.summary)) {
                console.log(`<yellow>○</yellow> Globs              : <yellow>${globs.join(',')}</yellow>`);
                console.log(`<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(`${__packageRootDir()}/`, '')}</cyan>`);
                console.log(`<yellow>○</yellow> Output directory  : <cyan>${finalParams.outDir.replace(`${__packageRootDir()}/`, '')}</cyan>`);
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
            const filesPromise = __getFiles(globs, {
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
                const relPath = __path.relative(finalParams.inDir, filePath);
                let buildParams = Object.assign({}, finalParams);
                for (let [id, customSettings] of Object.entries((_b = __SSugarConfig.getSafe('typescriptBuilder.customSettings')) !== null && _b !== void 0 ? _b : {})) {
                    if (__SGlob.match(filePath, customSettings.glob)) {
                        formats =
                            (_d = (_c = customSettings.settings) === null || _c === void 0 ? void 0 : _c.formats) !== null && _d !== void 0 ? _d : formats;
                        buildParams = __deepMerge(buildParams, (_e = customSettings.settings) !== null && _e !== void 0 ? _e : {});
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
                    const buildedFilePromise = this._buildFile(__deepMerge({
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
        const relSrcRootDir = __srcRootDir().replace(`${__packageRootDir()}/`, ''), globs = [`${packageRoot}/${relSrcRootDir}/**/*.ts`];
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
                outDir: `${__packageCacheDir()}/s-typescript-builder`,
            };
            if (!silent) {
                (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[d.ts]</yellow> Generating .d.ts file for "<cyan>${__path.relative(__packageRootDir(), outputFilePath)}</cyan>"`);
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
                (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<green>[d.ts]</green> .d.ts file generated <green>successfully</green> for "<cyan>${__path.relative(__packageRootDir(), outputFilePath)}</cyan>"`);
            }
            resolve(text);
        }));
    }
    _buildFile(file, params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            const packageRoot = params.packageRoot;
            const module = file.format === 'cjs' ? 'commonjs' : 'es6';
            const outPath = __path.dirname(`${file.outDir}/${file.relPath}`
                .replace('%moduleSystem', file.format)
                .replace('%platform', file.platform));
            const packageJsonOutPath = `${packageRoot}/dist/pkg/${file.format}/package.json`;
            // output file
            let outFilePath = `${outPath}/${__path.basename(file.path)}`
                .replace('%moduleSystem', file.format)
                .replace(/\.ts$/, '.js');
            // delete output file if exists and that a proper ts file exists also
            // if (__fs.existsSync(file.path) && __fs.existsSync(outFilePath)) {
            //     try {
            //         __fs.unlinkSync(outFilePath);
            //     } catch (e) {}
            // }
            const source = __fs.readFileSync(file.path).toString();
            const tsconfig = (_a = __SSugarConfig.getSafe('typescriptBuilder.tsconfig')) !== null && _a !== void 0 ? _a : {};
            let filePath = file.relPath;
            if (process.cwd() !== __packageRootDir(file.path)) {
                filePath = __path.relative(packageRoot, file.path);
            }
            if (!params.silent && ((_b = this.settings.log) === null || _b === void 0 ? void 0 : _b.compile)) {
                if (console.log !== global._console.log) {
                    console.log(`<yellow>[${new Date().toLocaleTimeString().split(' ')[0]}]</yellow> Compiling "<cyan>${filePath}</cyan>" to <yellow>${file.format}</yellow>:<magenta>${(_c = tsconfig.module) !== null && _c !== void 0 ? _c : module}</magenta>`);
                }
            }
            let result = __ts.transpileModule(source, __deepMerge(tsconfig, {
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
                    __fs.unlinkSync(outFilePath.replace(/\.js$/, '.d.ts'));
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
                    __fs.writeFileSync(outFilePath.replace(/\.js$/, '.d.ts'), declarationStr);
                }));
            }
            if (params.save && result.outputText) {
                // write the output file
                if (!__fs.existsSync(outPath)) {
                    __fs.mkdirSync(outPath, { recursive: true });
                }
                // save js file
                yield __fsPromise.writeFile(outFilePath, result.outputText);
                // dirty hash to make the bin file(s) executable
                if (__path.basename(outFilePath) === 'sugar.cli.js') {
                    __fs.chmodSync(outFilePath, 0o755);
                }
            }
            // package.json
            if (params.save) {
                const packageJsonOutFolderPath = __path.dirname(packageJsonOutPath);
                if (!__fs.existsSync(packageJsonOutFolderPath)) {
                    __fs.mkdirSync(packageJsonOutFolderPath, {
                        recursive: true,
                    });
                }
                if (!__fs.existsSync(packageJsonOutPath)) {
                    __fs.writeFileSync(packageJsonOutPath, JSON.stringify({
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
                file: params.save ? new __SFile(outFilePath) : undefined,
            });
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLFlBQVksR0FDZixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLElBQUksRUFBRSxFQUFFLFFBQVEsSUFBSSxXQUFXLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDbkQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQUU5QixPQUFPLEtBQUssU0FBUyxNQUFNLFVBQVUsQ0FBQztBQUV0QyxPQUFPLHFDQUFxQyxNQUFNLGlEQUFpRCxDQUFDO0FBaUhwRyxNQUFNLENBQUMsT0FBTyxPQUFPLGtCQUFtQixTQUFRLFVBQVU7SUFRdEQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDakIsSUFBWSxFQUNaLE1BQWdELEVBQ2hELFdBQWlELEVBQUU7UUFFbkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVB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