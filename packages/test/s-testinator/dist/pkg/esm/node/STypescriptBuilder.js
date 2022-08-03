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
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __ts from 'typescript';
import __STypescriptBuilderBuildParamsInterface from './interface/STypescriptBuilderBuildParamsInterface';
import __SGlob from '@coffeekraken/s-glob';
import __monorepoToPackageAbsolutePathDeepMap from '@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap';
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
            typescriptBuilder: Object.assign({}, __SSugarConfig.get('typescriptBuilder')),
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let buildedFiles = [], watchersReady = [], buildPromises = [];
            // @ts-ignore
            const finalParams = __monorepoToPackageAbsolutePathDeepMap(__STypescriptBuilderBuildParamsInterface.apply(params), (_a = params.packageRoot) !== null && _a !== void 0 ? _a : process.cwd());
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
                const watcher = __chokidar.watch(glob, {
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
                        for (let [id, customSettings] of Object.entries(__SSugarConfig.get('typescriptBuilder.customSettings'))) {
                            if (__SGlob.match(`${finalParams.inDir}/${relPath}`, customSettings.glob)) {
                                formats =
                                    (_b = (_a = customSettings.settings) === null || _a === void 0 ? void 0 : _a.formats) !== null && _b !== void 0 ? _b : formats;
                                buildParams = __deepMerge(buildParams, (_c = customSettings.settings) !== null && _c !== void 0 ? _c : {});
                                break;
                            }
                        }
                        // "localize" the file paths to the current package root
                        buildParams = __monorepoToPackageAbsolutePathDeepMap(buildParams, (_d = finalParams.packageRoot) !== null && _d !== void 0 ? _d : process.cwd());
                        // generate all the requested formats
                        formats.forEach((format) => __awaiter(this, void 0, void 0, function* () {
                            const pro = pipe(this._buildFile(__deepMerge({
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
            const source = __fs.readFileSync(file.path).toString();
            const tsconfig = (_a = __SSugarConfig.get('typescriptBuilder.tsconfig')) !== null && _a !== void 0 ? _a : {};
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
            if (result.outputText) {
                // write the output file
                if (!__fs.existsSync(outPath)) {
                    __fs.mkdirSync(outPath, { recursive: true });
                }
                __fs.writeFileSync(outFilePath, result.outputText);
                // dirty hash to make the bin file(s) executable
                if (__path.basename(outFilePath) === 'sugar.cli.js') {
                    __fs.chmodSync(outFilePath, 0o755);
                }
            }
            // package.json
            const packageJsonOutFolderPath = __path.dirname(packageJsonOutPath);
            if (!__fs.existsSync(packageJsonOutFolderPath)) {
                __fs.mkdirSync(packageJsonOutFolderPath, { recursive: true });
            }
            if (!__fs.existsSync(packageJsonOutPath)) {
                __fs.writeFileSync(packageJsonOutPath, JSON.stringify({
                    name: `@coffeekraken/internal-${__uniqid()}-${file.format === 'cjs' ? 'commonjs' : 'module'}`,
                    type: file.format === 'cjs' ? 'commonjs' : 'module',
                    private: true,
                }));
            }
            resolve({
                input: file,
                format: file.format,
                platform: file.platform,
                module: (_g = tsconfig.module) !== null && _g !== void 0 ? _g : module,
                file: new __SFile(outFilePath),
            });
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQUM5QixPQUFPLHdDQUF3QyxNQUFNLG9EQUFvRCxDQUFDO0FBRTFHLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sc0NBQXNDLE1BQU0sd0VBQXdFLENBQUM7QUFtRzVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsVUFBVTtJQW9CdEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQW1EO1FBQzNELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxpQkFBaUIsb0JBQ1YsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUM3QztTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF4Qk47O1dBRUc7UUFDSCxvQkFBZSxHQUF3QixFQUFFLENBQUM7SUFzQjFDLENBQUM7SUF2Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSx5QkFB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