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
import __listNodeModulesPackages from '@coffeekraken/sugar/node/npm/listNodeModulesPackages';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __childProcess from 'child_process';
import __path from 'path';
import __rollupAnalyzerPlugin from 'rollup-plugin-analyzer';
import { uglify as __uglifyPlugin } from 'rollup-plugin-uglify';
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import { compression as __compression2 } from 'vite-plugin-compression2';
import __SViteBuildParamsInterface from './interface/SViteBuildParamsInterface';
import __SViteStartParamsInterface from './interface/SViteStartParamsInterface';
import __SViteTestParamsInterface from './interface/SViteTestParamsInterface';
import __sInternalWatcherReloadVitePlugin from './plugins/internalWatcherReloadPlugin';
import __rewritesPlugin from './plugins/rewritesPlugin';
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
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const finalParams = __SViteStartParamsInterface.apply(params);
            const config = Object.assign({ configFile: false }, __SugarConfig.get('vite'));
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
            if (!(yield __isPortFree(config.server.port))) {
                console.log(`Port <yellow>${config.server.port}</yellow> already in use. Please make sure to make it free before retrying...`);
                process.exit(1);
            }
            const server = yield __viteServer(config);
            let listen;
            try {
                listen = yield server.listen();
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
                        `<yellow>http://${config.server.host}</yellow>:<cyan>${config.server.port}</cyan>`,
                    ].join('\n'),
                    notify: true,
                    metas: {
                        title: 'Coffeekraken',
                        subtitle: 'Server ready at:',
                        open: `http://${config.server.host}:${config.server.port}`,
                    },
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
                                        files: [],
                                    };
                                    for (let [key, chunkObj] of Object.entries(chunks)) {
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
                                var _a, _b, _c;
                                const onwarnRes = (_c = (_b = (_a = viteConfig.build) === null || _a === void 0 ? void 0 : _a.rollupOptions) === null || _b === void 0 ? void 0 : _b.onwarn) === null || _c === void 0 ? void 0 : _c.call(_b, warning, warn);
                                console.log({
                                    margin: {
                                        top: 1,
                                    },
                                    type: __SLog.TYPE_WARNING,
                                    value: `<yellow>[warn]</yellow> (<magenta>${warning.code}</magenta>) ${warning.message}`,
                                });
                                console.log({
                                    margin: {
                                        bottom: 1,
                                    },
                                    type: __SLog.TYPE_WARNING,
                                    value: `at <cyan>${warning.loc.file}</cyan>:<yellow>${warning.loc.column}:${warning.loc.line}</yellow>`,
                                });
                                return onwarnRes;
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
                    files: [],
                };
                for (let i = 0; i < ((_k = buildResult[0].output) === null || _k === void 0 ? void 0 : _k.length); i++) {
                    const output = buildResult[0].output[i];
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
                //             const cssVarMatches = buildFileResult.code.match(
                //                 /var\s[a-zA-Z0-9-_]+type_style[a-zA-Z0-9-_]+/gm,
                //             );
                //             if (cssVarMatches) {
                //                 cssVarMatches.forEach((match) => {
                //                     const varName = match.replace(/var\s?/, '').trim();
                //                     const injectCode = `
                //     var $style = document.querySelector('style#${varName}');
                //     if (!$style) {
                //     $style = document.createElement('style');
                //     $style.setAttribute('id', '${varName}');
                //     $style.type = 'text/css';
                //     $style.appendChild(document.createTextNode(${varName}));
                //     document.head.appendChild($style);
                //     }
                // `;
                //                     buildFileResult.code += injectCode;
                //                 });
                //             }
                // handle generated bundles
                if (!buildParams.noWrite) {
                    // handle only js files
                    if (!buildFileResult.fileName.match(/\.js$/)) {
                        continue;
                    }
                    // rename the entry file with "index.%format.js"
                    if (buildFileResult.isEntry) {
                        buildFileResult.fileName = buildFileResult.fileName
                            .replace(/^index\./, `index.${buildFileResult.format}.`)
                            .replace(/\.[a-zA-Z0-9]+\.js/, '.js');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxZQUFZLEVBQ1osZUFBZSxFQUNmLGtCQUFrQixHQUNyQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLHlCQUF5QixNQUFNLHNEQUFzRCxDQUFDO0FBQzdGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHNCQUFzQixNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLElBQUksY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLEtBQUssSUFBSSxXQUFXLEVBQUUsWUFBWSxJQUFJLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxJQUFJLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTywyQkFB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