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
import __SPromise from '@coffeekraken/s-promise';
import __sRiotjsPluginPostcssPreprocessor from '@coffeekraken/s-riotjs-plugin-postcss-preprocessor';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __listNodeModulesPackages from '@coffeekraken/sugar/node/npm/utils/listNodeModulesPackages';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import __rollupAnalyzerPlugin from 'rollup-plugin-analyzer';
import { uglify as __uglifyPlugin } from 'rollup-plugin-uglify';
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import __sInternalWatcherReloadVitePlugin from './plugins/internalWatcherReloadPlugin';
import __rewritesPlugin from './plugins/rewritesPlugin';
import __SViteStartInterface from './start/interface/SViteStartInterface';
import __kill from '@coffeekraken/sugar/node/process/kill';
import __isPortFree from '@coffeekraken/sugar/node/network/utils/isPortFree';
import __SViteBuildInterface from './build/interface/SViteBuildInterface';
import __SLog from '@coffeekraken/s-log';
export default class SVite extends __SClass {
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            vite: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        // register some riotjs preprocessors
        __sRiotjsPluginPostcssPreprocessor(__SugarConfig.get('postcss.plugins'));
    }
    /**
     * @name            viteSettings
     * @type            ISViteSettings
     * @get
     *
     * Access the vite settings
     *
     * @since           2.0.09
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get viteSettings() {
        return this._settings.vite;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(params) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
                    `<yellow>http://${listen.config.server.host}</yellow>:<cyan>${listen.config.server.port}</cyan>`,
                ].join('\n'),
            });
            // emit('log', {
            //     type: __SLog.TYPE_SUMMARY,
            //     value: {
            //         status: 'success',
            //         value: `<yellow>http://${listen.config.server.host}</yellow>:<cyan>${listen.config.server.port}</cyan>`,
            //         collapse: true,
            //     },
            // });
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const viteConfig = __SugarConfig.get('vite');
            const duration = new __SDuration();
            const finalParams = __SViteBuildInterface.apply(params);
            // if (params.watch) {
            //   throw new Error('The watch feature is not implemented yet...');
            // }
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
                const config = __deepMerge(viteConfig, {
                    logLevel: 'silent',
                    build: {
                        watch: finalParams.watch ? {} : false,
                        target: (_a = finalParams.target) !== null && _a !== void 0 ? _a : 'modules',
                        write: false,
                        minify: finalParams.minify,
                        cssCodeSplit: false,
                        rollupOptions: {
                            input: finalParams.input,
                            plugins: [],
                            output: {
                                compact: true,
                                manualChunks(id) {
                                    return 'index';
                                },
                            },
                        },
                    },
                });
                // shortcuts
                if (finalParams.prod) {
                    finalParams.minify = true;
                }
                // library mode
                if (buildType.toLowerCase() !== 'lib') {
                    delete config.build.lib;
                }
                // plugins
                if (finalParams.minify) {
                    config.build.rollupOptions.plugins.push(__uglifyPlugin());
                }
                if (finalParams.analyze) {
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
                if (finalParams.prod) {
                    config.mode = 'production';
                }
                // target
                if (buildType.toLowerCase() === 'bundle') {
                    config.build.target = (_d = finalParams.target) !== null && _d !== void 0 ? _d : 'es2015';
                }
                else if (buildType.toLowerCase() === 'lib') {
                    config.build.target = (_e = finalParams.target) !== null && _e !== void 0 ? _e : 'esnext';
                }
                else if (buildType.toLowerCase() === 'module') {
                    config.build.target = (_f = finalParams.target) !== null && _f !== void 0 ? _f : 'modules';
                }
                // external packages for library mode
                if (buildType.toLowerCase() === 'lib') {
                    config.build.rollupOptions.external = [
                        ...((_g = config.build.rollupOptions.external) !== null && _g !== void 0 ? _g : []),
                        ...Object.keys(__listNodeModulesPackages({ monorepo: true })),
                        'vue',
                    ];
                }
                // automatic formats
                let finalFormats = finalParams.format;
                if (!finalParams.format.length) {
                    switch (buildType) {
                        case 'bundle':
                            finalFormats = ['iife'];
                            break;
                        case 'module':
                        case 'lib':
                            finalFormats = ['es'];
                            break;
                    }
                }
                // setup outputs
                const outputs = [];
                let outputsFilenames = [];
                finalFormats.forEach((format) => {
                    var _a;
                    outputs.push(__deepMerge(Object.assign({ dir: __path.resolve(viteConfig.build.outDir), format }, ((_a = config.build.rollupOptions.output) !== null && _a !== void 0 ? _a : {}))));
                    outputsFilenames.push(`${buildType === 'bundle' ? 'index' : buildType}.${format}.js`);
                });
                // // prod filename
                // if (finalParams.prod) {
                //     outputsFilenames = outputsFilenames.map((filename) => {
                //         return filename.replace(/\.js$/, '.prod.js');
                //     });
                // }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Environment : ${finalParams.prod
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
                    value: `<yellow>○</yellow> Format(s)   : ${finalFormats.join(',')}`,
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
                if (!finalParams.noWrite) {
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
}
SVite.interfaces = {
    startParams: __SViteStartInterface,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGtDQUFrQyxNQUFNLG9EQUFvRCxDQUFDO0FBQ3BHLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8seUJBQXlCLE1BQU0sNERBQTRELENBQUM7QUFDbkcsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sc0JBQXNCLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sSUFBSSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxZQUFZLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sa0NBQWtDLE1BQU0sdUNBQXVDLENBQUM7QUFDdkYsT0FBTyxnQkFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLHFCQUFxQixNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sTUFBTSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNELE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8scUJBQXFCLE1BQU0sdUNBQXVDLENBQUM7QUFDMUUsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUF3QnpDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBTSxTQUFRLFFBQVE7SUFtQnZDOzs7Ozs7Ozs7T0FTRztJQUNILFlB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