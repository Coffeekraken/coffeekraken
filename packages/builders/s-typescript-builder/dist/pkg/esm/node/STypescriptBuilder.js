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
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageCacheDir, __packageRootDir, __srcRootDir, } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __currentModuleSystem from '@coffeekraken/sugar/shared/module/currentModuleSystem';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLFlBQVksR0FDZixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLHFCQUFxQixNQUFNLHVEQUF1RCxDQUFDO0FBQzFGLE9BQU8sSUFBSSxFQUFFLEVBQUUsUUFBUSxJQUFJLFdBQVcsRUFBRSxNQUFNLElBQUksQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxJQUFJLE1BQU0sWUFBWSxDQUFDO0FBRTlCLE9BQU8sS0FBSyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBRXRDLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFpSHBHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsVUFBVTtJQVF0RDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osTUFBZ0QsRUFDaEQsV0FBaUQsRUFBRTtRQUVuRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckIs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