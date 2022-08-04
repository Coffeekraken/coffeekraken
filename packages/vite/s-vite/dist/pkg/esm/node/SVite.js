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
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __isPortFree from '@coffeekraken/sugar/node/network/utils/isPortFree';
import __listNodeModulesPackages from '@coffeekraken/sugar/node/npm/listNodeModulesPackages';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __kill from '@coffeekraken/sugar/node/process/kill';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
import __writeTmpFileSync from '@coffeekraken/sugar/node/fs/writeTmpFileSync';
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
                    type: __SLog.TYPE_WARN,
                    value: `Port <yellow>${config.server.port}</yellow> already in use. Try to kill it before continue...`,
                });
                yield __kill(`:${config.server.port}`);
            }
            const server = yield __viteServer(config);
            let listen;
            try {
                listen = yield server.listen();
            }
            catch (e) {
                console.log('ERRROR', e);
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: [
                    `<yellow>Vite</yellow> server started <green>successfully</green>`,
                ].join('\n'),
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: [
                    `<yellow>http://${config.server.host}</yellow>:<cyan>${config.server.port}</cyan>`,
                ].join('\n'),
            });
        }), {
            metas: {
                id: this.metas.id,
            },
        });
    }
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
    build(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const viteConfig = __SugarConfig.get('vite');
            const duration = new __SDuration();
            // @ts-ignore
            const finalParams = __SViteBuildParamsInterface.apply(params);
            // object to store results of each "type"
            const results = {};
            // types shortcuts
            if (finalParams.lib && finalParams.type.indexOf('lib') === -1)
                finalParams.type = ['lib'];
            if (finalParams.bundle &&
                finalParams.type.indexOf('bundle') === -1)
                finalParams.type = ['bundle'];
            for (let i = 0; i < finalParams.type.length; i++) {
                const buildType = finalParams.type[i];
                // @ts-ignore
                const buildParams = __deepMerge(Object.assign(finalParams), {});
                // shortcuts
                if (buildType === 'lib') {
                    buildParams.minify = true;
                }
                if (buildParams.prod) {
                    buildParams.minify = true;
                }
                const config = __deepMerge(viteConfig, {
                    logLevel: 'silent',
                    build: {
                        watch: buildParams.watch ? {} : false,
                        target: (_a = buildParams.target) !== null && _a !== void 0 ? _a : 'modules',
                        write: false,
                        minify: buildParams.minify,
                        cssCodeSplit: false,
                        rollupOptions: {
                            input: buildParams.input,
                            external: [],
                            plugins: [],
                            output: {
                                compact: true,
                                manualChunks(id) {
                                    return 'index';
                                },
                            },
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
                                // emit('log', {
                                //     margin: {
                                //         bottom: 2,
                                //     },
                                //     type: __SLog.TYPE_WARNING,
                                //     value: warning.frame,
                                // });
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
                config.plugins.unshift(__rewritesPlugin((_b = config.rewrites) !== null && _b !== void 0 ? _b : []));
                // resolve plugins paths
                const plugins = [];
                for (let i = 0; i < config.plugins.length; i++) {
                    const p = config.plugins[i];
                    if (typeof p === 'string') {
                        const { default: plug } = yield import(p);
                        plugins.push((_c = plug.default) !== null && _c !== void 0 ? _c : plug);
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
                    config.build.target = (_d = buildParams.target) !== null && _d !== void 0 ? _d : 'es2015';
                }
                else if (buildType.toLowerCase() === 'lib') {
                    config.build.target = (_e = buildParams.target) !== null && _e !== void 0 ? _e : 'esnext';
                }
                else if (buildType.toLowerCase() === 'module') {
                    config.build.target = (_f = buildParams.target) !== null && _f !== void 0 ? _f : 'modules';
                }
                // external packages for library mode
                if (buildType.toLowerCase() === 'lib') {
                    config.build.rollupOptions.external = [
                        ...((_g = config.build.rollupOptions.external) !== null && _g !== void 0 ? _g : []),
                        ...Object.keys(__listNodeModulesPackages({ monorepo: true }))
                            .filter((item) => {
                            return !item.match(/^(\/|\.)/);
                        })
                            .map((item) => {
                            return new RegExp(`^${item}`);
                        }),
                    ];
                }
                // automatic formats
                let finalFormats = buildParams.format;
                if (!buildParams.format.length) {
                    switch (buildType) {
                        case 'bundle':
                            finalFormats = ['iife'];
                            break;
                        case 'module':
                        case 'lib':
                            finalFormats = ['esm'];
                            break;
                    }
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
                    value: `<yellow>○</yellow> Environment : ${buildParams.prod
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
                // set the outputs
                config.build.rollupOptions.output = outputs;
                // process to bundle
                const res = yield __viteBuild(config);
                if (((_h = res.constructor) === null || _h === void 0 ? void 0 : _h.name) === 'WatchEmitter') {
                    // @ts-ignore
                    res.on('change', () => __awaiter(this, void 0, void 0, function* () {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[watch]</yellow> Update detected. Re-building...`,
                        });
                        yield pipe(this.build(Object.assign(Object.assign({}, params), { watch: false, verbose: false })));
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<cyan>[watch]</cyan> Watching for changes...`,
                        });
                    }));
                    yield pipe(this.build(Object.assign(Object.assign({}, params), { watch: false, verbose: false })));
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<cyan>[watch]</cyan> Watching for changes...`,
                    });
                    return;
                }
                // @TODO        check to replace this dirty fix
                let outCode = res[0].output[0].code;
                // var SCodeExample_vue_vue_type_style_index_0_scoped_true_lang
                const cssVarMatches = outCode.match(/var\s[a-zA-Z0-9-_]+type_style[a-zA-Z0-9-_]+/gm);
                if (cssVarMatches) {
                    cssVarMatches.forEach((match) => {
                        const varName = match.replace(/var\s?/, '').trim();
                        const injectCode = `
                var $style = document.querySelector('style#${varName}');
                if (!$style) {
                  $style = document.createElement('style');
                  $style.setAttribute('id', '${varName}');
                  $style.type = 'text/css';
                  $style.appendChild(document.createTextNode(${varName}));
                  document.head.appendChild($style);
                }
              `;
                        outCode += injectCode;
                        res[0].output[0].code = outCode;
                    });
                }
                // stacking res inside the results object
                results[buildType] = res;
                // handle generated bundles
                if (!buildParams.noWrite) {
                    // @ts-ignore
                    res.forEach((bundleObj, i) => {
                        const output = bundleObj.output[0];
                        const baseOutputConfig = outputs[i], baseOutputFilenames = outputsFilenames[i];
                        __writeFileSync(`${baseOutputConfig.dir}/${baseOutputFilenames}`, output.code);
                        const file = new __SFile(`${baseOutputConfig.dir}/${baseOutputFilenames}`);
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    });
                }
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
            const command = `npx vitest --dir "${__path.relative(__packageRoot(), finalParams.dir)}" --config ${configPath} --root ${__packageRoot()} --passWithNoTests --dom --globals ${finalParams.watch ? '--watch' : '--run'}`;
            // run the test
            const pro = __childProcess.spawn(command, [], {
                stdio: ['ignore', 1, 2],
                shell: true,
                detached: true,
                cwd: __packageRoot(),
            });
            pro.on('close', (e) => {
                if (!finalParams.watch) {
                    resolve();
                }
            });
            __onProcessExit(() => {
                console.log('EXIT');
                pro.kill();
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8seUJBQXlCLE1BQU0sc0RBQXNELENBQUM7QUFDN0YsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sdUNBQXVDLENBQUM7QUFDM0QsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHNCQUFzQixNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLElBQUksY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLEtBQUssSUFBSSxXQUFXLEVBQUUsWUFBWSxJQUFJLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLGtDQUFrQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZG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