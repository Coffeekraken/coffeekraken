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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
            config.plugins = plugins;
            if (!(yield __isPortFree(config.server.port))) {
                emit('log', {
                    type: __SLog.TYPE_ERROR,
                    value: `Port <yellow>${config.server.port}</yellow> already in use. Please make sure to make it free before retrying...`,
                });
                process.exit(1);
            }
            const server = yield __viteServer(config);
            let listen;
            try {
                listen = yield server.listen();
            }
            catch (e) {
                console.log('ERRROR', e);
            }
            __onProcessExit(() => __awaiter(this, void 0, void 0, function* () {
                emit('log', {
                    value: `<red>[kill]</red> Gracefully killing the <cyan>vite server</cyan>...`,
                });
                yield server.close();
                return true;
            }));
            // make sure it's the last emitted log for user convinience...
            setTimeout(() => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: [
                        `<yellow>Vite</yellow> server started <green>successfully</green> and is available at:`,
                    ].join('\n'),
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: [
                        `<yellow>http://${config.server.host}</yellow>:<cyan>${config.server.port}</cyan>`,
                    ].join('\n'),
                });
            }, 1000);
        }), {
            metas: {
                id: this.metas.id,
            },
        });
    }
    build(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
                if (buildParams.prod) {
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
                                    yield pipe(_this._handleBuildResult(buildResult, buildParams));
                                    emit('log', {
                                        type: __SLog.TYPE_INFO,
                                        value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                                    });
                                    // display the watch message
                                    if (buildParams.watch) {
                                        emit('log', {
                                            type: __SLog.TYPE_INFO,
                                            value: `<cyan>[watch]</cyan> Watching for changes...`,
                                        });
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
                        target: (_b = buildParams.target) !== null && _b !== void 0 ? _b : 'modules',
                        write: false,
                        minify: buildParams.minify,
                        cssCodeSplit: false,
                        rollupOptions: {
                            input: buildParams.input,
                            external: [],
                            plugins: [],
                            output: {},
                            onwarn(warning, warn) {
                                var _a, _b, _c;
                                const onwarnRes = (_c = (_b = (_a = viteConfig.build) === null || _a === void 0 ? void 0 : _a.rollupOptions) === null || _b === void 0 ? void 0 : _b.onwarn) === null || _c === void 0 ? void 0 : _c.call(_b, warning, warn);
                                emit('log', {
                                    margin: {
                                        top: 1,
                                    },
                                    type: __SLog.TYPE_WARNING,
                                    value: `<yellow>[warn]</yellow> (<magenta>${warning.code}</magenta>) ${warning.message}`,
                                });
                                emit('log', {
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
                if (buildParams.prod) {
                    config.mode = 'production';
                }
                // target
                if (buildType.toLowerCase() === 'bundle') {
                    config.build.target = (_e = buildParams.target) !== null && _e !== void 0 ? _e : 'es2015';
                }
                else if (buildType.toLowerCase() === 'lib') {
                    config.build.target = (_f = buildParams.target) !== null && _f !== void 0 ? _f : 'esnext';
                }
                else if (buildType.toLowerCase() === 'module') {
                    config.build.target = (_g = buildParams.target) !== null && _g !== void 0 ? _g : 'modules';
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
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Target      : ${buildParams.prod
                        ? '<green>production</green>'
                        : '<yellow>development</yellow>'}`,
                });
                outputsFilenames.forEach((filename) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), `${__path.resolve(viteConfig.build.outDir)}/${filename}`)}</cyan>`,
                    });
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Type        : ${buildType.toLowerCase()}`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Target      : ${config.build.target}`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Format      : ${finalFormats.join(',')}`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Minify      : ${typeof buildParams.minify === 'string'
                        ? `<green>${buildParams.minify}</green>`
                        : buildParams.minify === false
                            ? '<red>false</red>'
                            : '<green>esbuild</green>'}`,
                });
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
                buildResult = yield pipe(this._handleBuildResult(finalBuildResult, buildParams));
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            resolve(results);
        }), {
            metas: {
                id: this.metas.id,
            },
        });
    }
    _handleBuildResult(buildResult, buildParams) {
        return new __SPromise(({ resolve, reject, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
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
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                    });
                }
            }
            resolve(buildResult);
        }), {
            metas: {
                id: 'SVite',
            },
        });
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
        }), {
            metas: {
                id: this.metas.id,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxZQUFZLEVBQ1osZUFBZSxFQUNmLGtCQUFrQixHQUNyQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLHlCQUF5QixNQUFNLHNEQUFzRCxDQUFDO0FBQzdGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHNCQUFzQixNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLElBQUksY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLEtBQUssSUFBSSxXQUFXLEVBQUUsWUFBWSxJQUFJLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FB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