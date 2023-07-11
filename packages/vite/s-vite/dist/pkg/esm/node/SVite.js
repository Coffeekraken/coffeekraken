var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import { __removeSync, __writeFileSync, __writeTmpFileSync, } from '@coffeekraken/sugar/fs';
import { __isPortFree } from '@coffeekraken/sugar/network';
import { __listNodeModulesPackages } from '@coffeekraken/sugar/npm';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __childProcess from 'child_process';
import __path from 'path';
import __rollupAnalyzerPlugin from 'rollup-plugin-analyzer';
import { uglify as __uglifyPlugin } from 'rollup-plugin-uglify';
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import { compression as __compression2 } from 'vite-plugin-compression2';
import __SViteBuildParamsInterface from './interface/SViteBuildParamsInterface.js';
import __SViteStartParamsInterface from './interface/SViteStartParamsInterface.js';
import __SViteTestParamsInterface from './interface/SViteTestParamsInterface.js';
import __sInternalWatcherReloadVitePlugin from './plugins/internalWatcherReloadPlugin.js';
import __rewritesPlugin from './plugins/rewritesPlugin.js';
export default class SVite extends __SClass {
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name          build
         * @type          Function
         *
         * Build the assets
         *
         * @param         {ISViteStartParams}         [params={}]             Some parameters to customize your process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.rebuildTimeoutByPath = {};
    }
    /**
     * @name          start
     * @type          Function
     *
     * Start the vite service with the server and the compilers
     *
     * @param         {ISViteStartParams}         [params={}]             Some parameters to customize your process
     * @return      Promise<Function>           A promise that will be resolved when the server has started with a function to stop it
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const finalParams = __SViteStartParamsInterface.apply(params !== null && params !== void 0 ? params : {});
            let config = Object.assign({ configFile: false }, __SugarConfig.get('vite'));
            config.server.host = finalParams.host;
            config.server.port = finalParams.port;
            if (!config.plugins)
                config.plugins = [];
            config.plugins.unshift(__rewritesPlugin((_a = config.rewrites) !== null && _a !== void 0 ? _a : []));
            config.plugins.unshift(__sInternalWatcherReloadVitePlugin());
            // resolve plugins paths
            const plugins = [];
            for (let i = 0; i < config.plugins.length; i++) {
                const p = config.plugins[i];
                if (typeof p === 'string') {
                    const { default: plug } = yield import(p);
                    plugins.push((_b = plug.default) !== null && _b !== void 0 ? _b : plug);
                }
                else {
                    plugins.push(p);
                }
            }
            config.plugins.push(__compression2({
                include: /.*\.(css|js|jsx|ts|tsx)(\?.*)?/,
            }));
            config.plugins = plugins;
            if (!(yield __isPortFree(finalParams.port))) {
                console.log(`Port <yellow>${finalParams.port}</yellow> already in use. Please make sure to make it free before retrying...`);
                return reject();
            }
            // process config is passed
            if (this.settings.processConfig) {
                config = this.settings.processConfig(config);
            }
            const server = yield __viteServer(config);
            try {
                yield server.listen();
            }
            catch (e) {
                console.error(e);
            }
            __onProcessExit(() => __awaiter(this, void 0, void 0, function* () {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>vite server</cyan>...`);
                yield server.close();
                return true;
            }));
            // make sure it's the last emitted log for user convinience...
            setTimeout(() => {
                console.log({
                    value: [
                        `<yellow>Vite</yellow> server started <green>successfully</green> and is available at:`,
                    ].join('\n'),
                });
                console.log({
                    type: __SLog.TYPE_SUCCESS,
                    value: [
                        `<yellow>http://${finalParams.host}</yellow>:<cyan>${finalParams.port}</cyan>`,
                    ].join('\n'),
                    notify: true,
                    metas: {
                        title: 'Coffeekraken',
                        subtitle: 'Server ready at:',
                        open: `http://${finalParams.host}:${finalParams.port}`,
                    },
                });
                // resolve
                resolve(() => {
                    return new Promise((_resolve) => __awaiter(this, void 0, void 0, function* () {
                        yield server.close();
                        _resolve();
                    }));
                });
            }, 1000);
        }));
    }
    build(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const viteConfig = __SugarConfig.get('vite'), outputDir = viteConfig.build.outDir, outputAssetsDir = `${outputDir}/${viteConfig.build.assetsDir}`;
            let duration = new __SDuration();
            // clean previous build
            __removeSync(outputAssetsDir);
            // @ts-ignore
            const finalParams = __SViteBuildParamsInterface.apply(params);
            // object to store results of each "type"
            const results = {};
            // types shortcuts
            if (finalParams.lib && finalParams.type.indexOf('lib') === -1)
                finalParams.type = ['lib'];
            if (finalParams.bundle &&
                finalParams.type.indexOf('bundle') === -1) {
                finalParams.type = ['bundle'];
            }
            for (let i = 0; i < finalParams.type.length; i++) {
                const buildType = finalParams.type[i];
                let buildResult;
                // @ts-ignore
                const buildParams = __deepMerge(Object.assign(finalParams), {
                    outputDir,
                    outputAssetsDir,
                });
                // shortcuts
                if (buildType === 'lib') {
                    buildParams.minify = 'esbuild';
                }
                if (buildParams.target === 'production') {
                    buildParams.minify = 'esbuild';
                }
                // automatic formats
                let finalFormats = buildParams.format;
                if (!buildParams.format.length) {
                    switch (buildType) {
                        case 'bundle':
                            finalFormats = ['amd'];
                            break;
                        case 'module':
                        case 'lib':
                            finalFormats = ['esm'];
                            break;
                    }
                }
                // set the formats in buildParams
                buildParams.formats = finalFormats;
                const _this = this;
                let isFirstGenerated; // track if the first build has been made using the "watch" param
                const config = __deepMerge(viteConfig, {
                    logLevel: 'silent',
                    plugins: [
                        ...((_a = viteConfig.plugins) !== null && _a !== void 0 ? _a : []),
                        {
                            name: 's-vite-end-detection',
                            generateBundle(bundle, chunks) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    if (!buildParams.watch) {
                                        return;
                                    }
                                    const buildResult = {
                                        type: buildType,
                                        format: finalFormats[0],
                                        entryFileName: '',
                                        files: [],
                                    };
                                    for (let [key, chunkObj] of Object.entries(chunks)) {
                                        if (chunkObj.isEntry) {
                                            buildResult.entryFileName =
                                                chunkObj.fileName;
                                        }
                                        buildResult.files.push({
                                            isEntry: chunkObj.isEntry,
                                            format: finalFormats[0],
                                            fileName: chunkObj.fileName,
                                            outDir: outputDir,
                                            code: chunkObj.code,
                                        });
                                    }
                                    // handle result
                                    yield _this._handleBuildResult(buildResult, buildParams);
                                    console.log(`<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
                                    // display the watch message
                                    if (buildParams.watch) {
                                        console.log(`<cyan>[watch]</cyan> Watching for changes...`);
                                    }
                                });
                            },
                        },
                    ],
                    build: {
                        watch: buildParams.watch
                            ? {
                                chokidar: {
                                    usePolling: true,
                                    interval: 500,
                                },
                            }
                            : false,
                        target: (_b = buildParams.version) !== null && _b !== void 0 ? _b : 'modules',
                        write: false,
                        minify: buildParams.minify,
                        terserOptions: {
                            ecma: 2016,
                            module: true,
                            toplevel: true,
                            compress: {
                                arguments: true,
                                booleans_as_integers: true,
                                drop_console: true,
                                keep_fargs: false,
                                toplevel: true,
                                ecma: 2016,
                                hoist_funs: true,
                                passes: 2,
                                unsafe: true,
                                unsafe_methods: true,
                                unsafe_proto: true,
                            },
                            // format: {
                            //     comments: false,
                            // },
                            mangle: {
                                toplevel: true,
                                properties: {
                                    regex: /^_/,
                                },
                            },
                            // toplevel: true,
                        },
                        cssCodeSplit: false,
                        rollupOptions: {
                            input: buildParams.input,
                            external: [],
                            plugins: [],
                            output: {},
                            onwarn(warning, warn) {
                                // const onwarnRes =
                                //     viteConfig.build?.rollupOptions?.onwarn?.(
                                //         warning,
                                //         warn,
                                //     );
                                var _a;
                                console.log({
                                    margin: {
                                        top: 1,
                                    },
                                    type: __SLog.TYPE_WARNING,
                                    value: `<yellow>[warn]</yellow> (<magenta>${warning.code}</magenta>) ${warning.message}`,
                                });
                                if ((_a = warning.loc) === null || _a === void 0 ? void 0 : _a.file) {
                                    console.log({
                                        margin: {
                                            bottom: 1,
                                        },
                                        type: __SLog.TYPE_WARNING,
                                        value: `at <cyan>${warning.loc.file}</cyan>:<yellow>${warning.loc.column}:${warning.loc.line}</yellow>`,
                                    });
                                }
                            },
                        },
                    },
                    server: {},
                });
                // library mode
                if (buildType.toLowerCase() !== 'lib') {
                    delete config.build.lib;
                }
                // plugins
                if (buildParams.minify) {
                    config.build.rollupOptions.plugins.push(__uglifyPlugin());
                }
                if (buildParams.analyze) {
                    config.build.rollupOptions.plugins.push(__rollupAnalyzerPlugin({
                        limit: 10,
                        summaryOnly: true,
                    }));
                }
                // plugins
                if (!config.plugins)
                    config.plugins = [];
                config.plugins.unshift(__rewritesPlugin((_c = config.rewrites) !== null && _c !== void 0 ? _c : []));
                // resolve plugins paths
                const plugins = [];
                for (let i = 0; i < config.plugins.length; i++) {
                    const p = config.plugins[i];
                    if (typeof p === 'string') {
                        const { default: plug } = yield import(p);
                        plugins.push((_d = plug.default) !== null && _d !== void 0 ? _d : plug);
                    }
                    else {
                        plugins.push(p);
                    }
                }
                config.plugins = plugins;
                // mode (production, development)
                if (buildParams.target === 'production') {
                    config.mode = 'production';
                }
                // target
                if (buildType.toLowerCase() === 'bundle') {
                    config.build.target = (_e = buildParams.version) !== null && _e !== void 0 ? _e : 'es2015';
                }
                else if (buildType.toLowerCase() === 'lib') {
                    config.build.target = (_f = buildParams.version) !== null && _f !== void 0 ? _f : 'esnext';
                }
                else if (buildType.toLowerCase() === 'module') {
                    config.build.target = (_g = buildParams.version) !== null && _g !== void 0 ? _g : 'modules';
                }
                // external packages for library mode
                if (buildType.toLowerCase() === 'lib') {
                    config.build.rollupOptions.external = [
                        ...((_h = config.build.rollupOptions.external) !== null && _h !== void 0 ? _h : []),
                        ...Object.keys(__listNodeModulesPackages({ monorepo: true }))
                            .filter((item) => {
                            return !item.match(/^(\/|\.)/);
                        })
                            .map((item) => {
                            return new RegExp(`^${item}`);
                        }),
                    ];
                }
                // setup outputs
                const outputs = [];
                let outputsFilenames = [];
                finalFormats.forEach((format) => {
                    var _a;
                    outputs.push(__deepMerge(Object.assign({ dir: __path.resolve(viteConfig.build.outDir), format }, ((_a = config.build.rollupOptions.output) !== null && _a !== void 0 ? _a : {}))));
                    outputsFilenames.push(`index.${format}.js`);
                });
                console.log(`<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`);
                console.log({
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Target      : ${buildParams.target === 'production'
                        ? '<green>production</green>'
                        : '<yellow>development</yellow>'}`,
                });
                outputsFilenames.forEach((filename) => {
                    console.log(`<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), `${__path.resolve(viteConfig.build.outDir)}/${filename}`)}</cyan>`);
                });
                console.log(`<yellow>○</yellow> Type        : ${buildType.toLowerCase()}`);
                console.log(`<yellow>○</yellow> Versiom     : ${config.build.target}`);
                console.log(`<yellow>○</yellow> Format      : ${finalFormats.join(',')}`);
                console.log(`<yellow>○</yellow> Minify      : ${typeof buildParams.minify === 'string'
                    ? `<green>${buildParams.minify}</green>`
                    : buildParams.minify === false
                        ? '<red>false</red>'
                        : '<green>esbuild</green>'}`);
                // set the outputs
                config.build.rollupOptions.output = outputs;
                // process to bundle
                buildResult = yield __viteBuild(config);
                // if the buildResult is a WatchEmitter instance,
                // it means that the build has been launchec with the "watch" attribute
                // and vite will returns something different that a normal build.
                // Handle that here...
                if (((_j = buildResult.constructor) === null || _j === void 0 ? void 0 : _j.name) === 'WatchEmitter') {
                    buildResult.on('change', () => {
                        duration = new __SDuration();
                    });
                    // stop here if the vite instance is set to watch mode
                    return;
                }
                const finalBuildResult = {
                    type: buildType,
                    format: finalFormats[0],
                    entryFileName: '',
                    files: [],
                };
                for (let i = 0; i < ((_k = buildResult[0].output) === null || _k === void 0 ? void 0 : _k.length); i++) {
                    const output = buildResult[0].output[i];
                    if (output.isEntry) {
                        finalBuildResult.entryFileName = output.fileName;
                    }
                    finalBuildResult.files.push({
                        isEntry: (_l = output.isEntry) !== null && _l !== void 0 ? _l : false,
                        format: finalFormats[0],
                        fileName: output.fileName,
                        outDir: outputDir,
                        code: output.code,
                    });
                }
                buildResult = yield this._handleBuildResult(finalBuildResult, buildParams);
            }
            console.log(`<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
            resolve(results);
        }));
    }
    _handleBuildResult(buildResult, buildParams) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < buildResult.files.length; i++) {
                const buildFileResult = buildResult.files[i];
                // handle generated bundles
                if (!buildParams.noWrite) {
                    // handle only js files
                    if (!buildFileResult.fileName.match(/\.js$/)) {
                        continue;
                    }
                    // rename the entry file with "index.%format.js"
                    if (buildFileResult.isEntry) {
                        buildFileResult.fileName = buildFileResult.fileName
                            .replace(/([a-zA-Z0-9]+)\-[a-zA-Z0-9]+\.js/, '$1.js')
                            .replace(/^index\./, `index.${buildFileResult.format}.`);
                    }
                    else {
                        // replace the file entry name inside the code
                        buildFileResult.code = buildFileResult.code
                            .split(buildResult.entryFileName)
                            .join(`index.${buildFileResult.format}.js`);
                    }
                    // write the file on the disk
                    __writeFileSync(`${buildFileResult.outDir}/${buildFileResult.fileName}`, buildFileResult.code);
                    const file = new __SFile(`${buildFileResult.outDir}/${buildFileResult.fileName}`);
                    console.log(`<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
                }
            }
            resolve(buildResult);
        }));
    }
    /**
     * @name          test
     * @type          Function
     *
     * Launch the tests
     *
     * @param         {ISViteTestParams}         [params={}]             Some parameters to customize your process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    test(params) {
        return new __SPromise(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            const viteConfig = __SugarConfig.get('vite');
            const duration = new __SDuration();
            // @ts-ignore
            const finalParams = __SViteTestParamsInterface.apply(params);
            const finalConfig = __deepMerge(viteConfig, {
                test: finalParams,
            });
            const configPath = __writeTmpFileSync(`export default ${JSON.stringify(finalConfig)};`, {
                path: 'vite.config.js',
            });
            const command = `npx vitest --dir "${__path.relative(__packageRootDir(), finalParams.dir)}" --config ${configPath} --root ${__packageRootDir()} --passWithNoTests --dom --globals ${finalParams.watch ? '--watch --changed' : '--run'} --ui --open`;
            // run the test
            const pro = __childProcess.spawn(command, [], {
                stdio: ['ignore', 1, 2],
                shell: true,
                detached: true,
                cwd: __packageRootDir(),
            });
            pro.on('close', (e) => {
                if (!finalParams.watch) {
                    resolve();
                }
            });
            __onProcessExit(() => __awaiter(this, void 0, void 0, function* () {
                pro.kill();
                return true;
            }));
            // cancel
            on('cancel', () => {
                var _a;
                (_a = pro.kill) === null || _a === void 0 ? void 0 : _a.call(pro);
            });
            if (!finalParams.watch) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[success]</green> Tests completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                });
            }
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxZQUFZLEVBQ1osZUFBZSxFQUNmLGtCQUFrQixHQUNyQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxzQkFBc0IsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxLQUFLLElBQUksV0FBVyxFQUFFLFlBQVksSUFBSSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsSUFBSSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLDJCQUEyQixNQUFNLDBDQUEwQyxDQUFDO0FBQ25G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