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
                    value: `Port <yellow>${config.server.port}</yellow> already in use. Try to kill it before continue...`,
                });
                yield __kill(`:${config.server.port}`);
            }
            const server = yield __viteServer(config);
            const listen = yield server.listen();
            emit('log', {
                value: [
                    `<yellow>Vite</yellow> server started <green>successfully</green>`,
                ].join('\n'),
            });
            emit('log', {
                value: [
                    `<yellow>http://${listen.config.server.host}</yellow>:<cyan>${listen.config.server.port}</cyan>`,
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const viteConfig = __SugarConfig.get('vite');
            const duration = new __SDuration();
            params = __SViteBuildInterface.apply(params);
            // if (params.watch) {
            //   throw new Error('The watch feature is not implemented yet...');
            // }
            // object to store results of each "type"
            const results = {};
            // types shortcuts
            if (params.lib && params.type.indexOf('lib') === -1)
                params.type = ['lib'];
            if (params.bundle && params.type.indexOf('bundle') === -1)
                params.type = ['bundle'];
            for (let i = 0; i < params.type.length; i++) {
                const buildType = params.type[i];
                const config = __deepMerge(viteConfig, {
                    logLevel: 'silent',
                    build: {
                        watch: params.watch ? {} : false,
                        target: (_a = params.target) !== null && _a !== void 0 ? _a : 'modules',
                        write: false,
                        minify: params.minify,
                        cssCodeSplit: false,
                        rollupOptions: {
                            input: params.input,
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
                if (params.prod) {
                    params.minify = true;
                }
                // library mode
                if (buildType.toLowerCase() !== 'lib') {
                    delete config.build.lib;
                }
                // plugins
                if (params.minify) {
                    config.build.rollupOptions.plugins.push(__uglifyPlugin());
                }
                if (params.analyze) {
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
                if (params.prod) {
                    config.mode = 'production';
                }
                // target
                if (buildType.toLowerCase() === 'bundle') {
                    config.build.target = (_d = params.target) !== null && _d !== void 0 ? _d : 'es2015';
                }
                else if (buildType.toLowerCase() === 'lib') {
                    config.build.target = (_e = params.target) !== null && _e !== void 0 ? _e : 'esnext';
                }
                else if (buildType.toLowerCase() === 'module') {
                    config.build.target = (_f = params.target) !== null && _f !== void 0 ? _f : 'modules';
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
                let finalFormats = params.format;
                if (!params.format.length) {
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
                if (params.prod) {
                    outputsFilenames = outputsFilenames.map((filename) => {
                        return filename.replace(/\.js$/, '.prod.js');
                    });
                }
                if (params.verbose) {
                    emit('log', {
                        value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`,
                    });
                    emit('log', {
                        value: `<yellow>○</yellow> Environment : ${params.prod
                            ? '<green>production</green>'
                            : '<yellow>development</yellow>'}`,
                    });
                    outputsFilenames.forEach((filename) => {
                        emit('log', {
                            value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), `${__path.resolve(viteConfig.build.outDir)}/${filename}`)}</cyan>`,
                        });
                    });
                    emit('log', {
                        value: `<yellow>○</yellow> Type        : ${buildType.toLowerCase()}`,
                    });
                    emit('log', {
                        value: `<yellow>○</yellow> Target      : ${config.build.target}`,
                    });
                    emit('log', {
                        value: `<yellow>○</yellow> Format(s)   : ${finalFormats.join(',')}`,
                    });
                }
                // set the outputs
                config.build.rollupOptions.output = outputs;
                // process to bundle
                const res = yield __viteBuild(config);
                if (((_h = res.constructor) === null || _h === void 0 ? void 0 : _h.name) === 'WatchEmitter') {
                    // @ts-ignore
                    res.on('change', () => __awaiter(this, void 0, void 0, function* () {
                        emit('log', {
                            value: `<yellow>[watch]</yellow> Update detected. Re-building...`,
                        });
                        yield pipe(this.build(Object.assign(Object.assign({}, params), { watch: false, verbose: false })));
                        emit('log', {
                            value: `<cyan>[watch]</cyan> Watching for changes...`,
                        });
                    }));
                    yield pipe(this.build(Object.assign(Object.assign({}, params), { watch: false, verbose: false })));
                    emit('log', {
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
                if (!params.noWrite) {
                    // @ts-ignore
                    res.forEach((bundleObj, i) => {
                        const output = bundleObj.output[0];
                        const baseOutputConfig = outputs[i], baseOutputFilenames = outputsFilenames[i];
                        __writeFileSync(`${baseOutputConfig.dir}/${baseOutputFilenames}`, output.code);
                        const file = new __SFile(`${baseOutputConfig.dir}/${baseOutputFilenames}`);
                        emit('log', {
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    });
                }
            }
            emit('log', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGtDQUFrQyxNQUFNLG9EQUFvRCxDQUFDO0FBQ3BHLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8seUJBQXlCLE1BQU0sNERBQTRELENBQUM7QUFDbkcsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sc0JBQXNCLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sSUFBSSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxZQUFZLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sa0NBQWtDLE1BQU0sdUNBQXVDLENBQUM7QUFDdkYsT0FBTyxnQkFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLHFCQUFxQixNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sTUFBTSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNELE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8scUJBQXFCLE1BQU0sdUNBQXVDLENBQUM7QUF3QjFFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBTSxTQUFRLFFBQVE7SUFtQnZDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBNkI7UUFDckMsS0FBSyxDQUNELFdBQVcsQ0FD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