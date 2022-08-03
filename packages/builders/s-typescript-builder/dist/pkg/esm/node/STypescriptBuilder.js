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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __getFiles from '@coffeekraken/sugar/node/fs/getFiles';
import __monorepoToPackageAbsolutePathDeepMap from '@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
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
                res = yield builder.build(Object.assign({ inDir: __path.dirname(path), glob: __path.basename(path), outDir: __path.dirname(path), formats: ['esm'], buildInitial: true }, (params !== null && params !== void 0 ? params : {})));
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
            const packageRoot = __packageRoot();
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
            if (process.cwd() !== __packageRoot(file.path)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sc0NBQXNDLE1BQU0sd0VBQXdFLENBQUM7QUFDNUgsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLEVBQUUsRUFBRSxRQUFRLElBQUksV0FBVyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFzRzlCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsVUFBVTtJQXNFdEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQStDO1FBQ3ZELEtBQUssQ0FDRCxXQUFXLENBQ1A7UUFDSSxhQUFhO1FBQ2IsZ0RBQWdEO1FBQ2hELG1EQUFtRDtTQUN0RCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBeEZOOztXQUVHO1FBQ0gsb0JBQWUsR0FBd0IsRUFBRSxDQUFDO0lBc0YxQyxDQUFDO0lBcEZEOzs7Ozs7Ozs7Ozs7Ozs7T0Fl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