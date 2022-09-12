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
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __dirname, __getFiles } from '@coffeekraken/sugar/fs';
import { __monorepoToPackageAbsolutePathDeepMap } from '@coffeekraken/sugar/monorepo';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __currentModuleSystem from '@coffeekraken/sugar/shared/module/currentModuleSystem';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs, { promises as __fsPromise } from 'fs';
import __path from 'path';
import __ts from 'typescript';
export default class STypescriptBuilder extends __SBuilder {
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
        super(__deepMerge({
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
                        __fs.unlinkSync(res.files[0].file.path);
                    }
                    catch (e) { }
                }
                // make sure the file does not stay when an error occured, etc...
                __onProcessExit(() => {
                    remove();
                });
                // @ts-ignore
                res = yield builder.build(Object.assign({ inDir: __path.dirname(path), glob: __path.basename(path), outDir: __path.dirname(path), formats: [__currentModuleSystem()], buildInitial: true }, (params !== null && params !== void 0 ? params : {})));
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { default: __STypescriptBuilderBuildParamsInterface,
            // @ts-ignore
             } = yield import(`${__dirname()}/interface/STypescriptBuilderBuildParamsInterface`);
            const buildedFiles = [];
            // @ts-ignore
            const finalParams = __monorepoToPackageAbsolutePathDeepMap(__STypescriptBuilderBuildParamsInterface.apply(params), (_a = params.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
            // this can be overrided by customSettings bellow
            let formats = Array.isArray(finalParams.formats)
                ? finalParams.formats
                : [finalParams.formats];
            const globs = Array.isArray(finalParams.glob)
                ? finalParams.glob
                : [finalParams.glob];
            if (!finalParams.silent) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Globs              : <yellow>${globs.join(',')}</yellow>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir}</cyan>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Output directory  : <cyan>${finalParams.outDir}</cyan>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Formats           : <yellow>${formats.join(',')}</yellow>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Platform          : <yellow>${finalParams.platform}</yellow>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Watch             : ${finalParams.watch
                        ? `<green>true</green>`
                        : `<red>false</red>`}`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Build initial     : ${finalParams.buildInitial
                        ? `<green>true</green>`
                        : `<red>false</red>`}`,
                });
            }
            // watch using chokidar
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
                buildParams = __monorepoToPackageAbsolutePathDeepMap(buildParams, (_f = finalParams.packageRoot) !== null && _f !== void 0 ? _f : process.cwd());
                // generate all the requested formats
                for (let i = 0; i < formats.length; i++) {
                    const format = formats[i];
                    const buildedFilePromise = pipe(this._buildFile(__deepMerge({
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            const packageRoot = __packageRootDir();
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
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `Compiling "<cyan>${filePath}</cyan>" to <yellow>${file.format}</yellow> format, <magenta>${(_b = tsconfig.module) !== null && _b !== void 0 ? _b : module}</magenta> module system and <cyan>${(_c = tsconfig.target) !== null && _c !== void 0 ? _c : 'es6'}</cyan> as target...`,
            });
            let result = __ts.transpileModule(source, __deepMerge(tsconfig, {
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
                if (!__fs.existsSync(outPath)) {
                    __fs.mkdirSync(outPath, { recursive: true });
                }
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
                module: (_g = tsconfig.module) !== null && _g !== void 0 ? _g : module,
                js: result.outputText,
                file: params.save ? new __SFile(outFilePath) : undefined,
            });
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxxQkFBcUIsTUFBTSx1REFBdUQsQ0FBQztBQUMxRixPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksRUFBRSxFQUFFLFFBQVEsSUFBSSxXQUFXLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDbkQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQXVHOUIsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFBbUIsU0FBUSxVQUFVO0lBa0V0RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBK0M7UUFDdkQsS0FBSyxDQUNELFdBQVcsQ0FDUDtRQUNJLGFBQWE7UUFDYixnREFBZ0Q7UUFDaEQsbURBQW1EO1NBQ3RELEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFwRk47O1dBRUc7UUFDSCxvQkFBZSxHQUF3QixF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