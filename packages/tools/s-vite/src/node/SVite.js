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
            const listen = yield server.listen();
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
            emit('log', {
                type: __SLog.TYPE_SUMMARY,
                value: {
                    status: 'success',
                    value: `<yellow>http://${listen.config.server.host}</yellow>:<cyan>${listen.config.server.port}</cyan>`,
                    collapse: true,
                },
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
                // prod filename
                if (finalParams.prod) {
                    outputsFilenames = outputsFilenames.map((filename) => {
                        return filename.replace(/\.js$/, '.prod.js');
                    });
                }
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