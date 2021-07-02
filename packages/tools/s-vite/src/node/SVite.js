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
import __SPromise from '@coffeekraken/s-promise';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __listNodeModulesPackages from '@coffeekraken/sugar/node/npm/utils/listNodeModulesPackages';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import __rewritesPlugin from './plugins/rewritesPlugin';
import __SViteStartInterface from './start/interface/SViteStartInterface';
import __SFile from '@coffeekraken/s-file';
import { uglify as __uglifyPlugin } from "rollup-plugin-uglify";
import __rollupAnalyzerPlugin from 'rollup-plugin-analyzer';
import __sInternalWatcherReloadVitePlugin from './plugins/internalWatcherReloadPlugin';
import __sRiotjsPluginPostcssPreprocessor from '@coffeekraken/s-riotjs-plugin-postcss-preprocessor';
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
            vite: {}
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
            var _a;
            const config = Object.assign({ configFile: false }, __SugarConfig.get('vite'));
            if (!config.plugins)
                config.plugins = [];
            config.plugins.unshift(__rewritesPlugin((_a = config.rewrites) !== null && _a !== void 0 ? _a : []));
            config.plugins.unshift(__sInternalWatcherReloadVitePlugin());
            // resolve plugins paths
            config.plugins = config.plugins.map((p) => {
                var _a;
                if (typeof p === 'string') {
                    const plug = require(p);
                    return (_a = plug.default) !== null && _a !== void 0 ? _a : plug;
                }
                return p;
            });
            const server = yield __viteServer(config);
            const listen = yield server.listen();
            emit('log', {
                value: [
                    `<yellow>Vite</yellow> server started <green>successfully</green>`
                ].join('\n')
            });
            emit('log', {
                value: [
                    `<yellow>http://${listen.config.server.host}</yellow>:<cyan>${listen.config.server.port}</cyan>`
                ].join('\n')
            });
        }), {
            metas: {
                id: this.metas.id
            }
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
        const _this = this;
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const viteConfig = __SugarConfig.get('vite');
            let duration = new __SDuration(), buildTimeout;
            const config = __deepMerge(viteConfig, {
                logLevel: 'silent',
                build: {
                    watch: params.watch ? {} : false,
                    target: (_a = params.target) !== null && _a !== void 0 ? _a : 'modules',
                    write: false,
                    minify: params.minify,
                    rollupOptions: {
                        input: params.input,
                        plugins: [],
                        output: {
                            compact: true,
                            manualChunks(id) {
                                return 'index';
                            }
                        }
                    }
                }
            });
            // shortcuts
            if (params.bundle)
                params.type = 'bundle';
            if (params.lib)
                params.type = 'lib';
            if (params.prod)
                params.minify = true;
            // library mode
            if (params.type.toLowerCase() !== 'lib') {
                delete config.build.lib;
            }
            // plugins
            if (params.minify) {
                config.build.rollupOptions.plugins.push(__uglifyPlugin());
            }
            if (params.analyze) {
                config.build.rollupOptions.plugins.push(__rollupAnalyzerPlugin({
                    limit: 10,
                    summaryOnly: true
                }));
            }
            // plugins
            if (!config.plugins)
                config.plugins = [];
            config.plugins.unshift(__rewritesPlugin((_b = config.rewrites) !== null && _b !== void 0 ? _b : []));
            // resolve plugins paths
            config.plugins = config.plugins.map((p) => {
                if (typeof p === 'string')
                    return require(p).default;
            });
            // mode (production, development)
            if (params.prod) {
                config.mode = 'production';
            }
            // target
            if (params.type.toLowerCase() === 'bundle') {
                config.build.target = (_c = params.target) !== null && _c !== void 0 ? _c : 'es2015';
            }
            else if (params.type.toLowerCase() === 'lib') {
                config.build.target = (_d = params.target) !== null && _d !== void 0 ? _d : 'esnext';
            }
            else if (params.type.toLowerCase() === 'module') {
                config.build.target = (_e = params.target) !== null && _e !== void 0 ? _e : 'modules';
            }
            // external packages for library mode
            if (params.type.toLowerCase() === 'lib') {
                config.build.rollupOptions.external = [
                    ...((_f = config.build.rollupOptions.external) !== null && _f !== void 0 ? _f : []),
                    ...Object.keys(__listNodeModulesPackages({ monorepo: true }))
                ];
            }
            emit('log', {
                value: `<yellow>[build]</yellow> Starting build`
            });
            emit('log', {
                value: `<yellow>[build]</yellow> <bgBlack><white> Type </white></bgBlack><bgCyan><black> ${params.type.toLowerCase()} </black></bgCyan><bgBlack><white> Target </white></bgBlack><bgCyan><black> ${config.build.target} </black></bgCyan><bgBlack><white> Mode </white></bgBlack><bgCyan><black> ${params.prod ? 'production' : 'development'} </black></bgCyan><bgBlack><white> Format(s) </white></bgBlack><bgCyan><black> ${params.format.join(',')} </black></bgCyan><bgBlack><white> Chunks </white></bgBlack><${params.chunks ? 'bgGreen' : 'bgRed'}><black> ${params.chunks} </black></${params.chunks ? 'bgGreen' : 'bgRed'}>`
            });
            // setup outputs
            const outputs = [], outputsFilenames = [];
            params.format.forEach(format => {
                var _a;
                outputs.push(__deepMerge(Object.assign({ dir: __path.resolve(viteConfig.build.outDir), format }, ((_a = config.build.rollupOptions.output) !== null && _a !== void 0 ? _a : {}))));
                outputsFilenames.push(`${params.type}.${format}.js`);
            });
            // set the outputs
            config.build.rollupOptions.output = outputs;
            // process to bundle
            const res = yield __viteBuild(config);
            // handle generated bundles
            if (!params.noWrite) {
                // @ts.ignore
                res.forEach((bundleObj, i) => {
                    const output = bundleObj.output[0];
                    const baseOutputConfig = outputs[i], baseOutputFilenames = outputsFilenames[i];
                    __writeFileSync(`${baseOutputConfig.dir}/${baseOutputFilenames}`, output.code);
                    const file = new __SFile(`${baseOutputConfig.dir}/${baseOutputFilenames}`);
                    emit('log', {
                        value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
                    });
                });
            }
            emit('log', {
                value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
            });
            if (params.watch) {
                emit('log', {
                    value: `<cyan>[watch]</cyan> Watching for changes...`
                });
            }
            resolve(res);
        }), {
            metas: {
                id: this.metas.id
            }
        });
    }
}
SVite.interfaces = {
    startParams: __SViteStartInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLHlCQUF5QixNQUFNLDREQUE0RCxDQUFDO0FBRW5HLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxZQUFZLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sZ0JBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxxQkFBcUIsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxJQUFJLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sc0JBQXNCLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxrQ0FBa0MsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RixPQUFPLGtDQUFrQyxNQUFNLG9EQUFvRCxDQUFDO0FBdUJwRyxNQUFNLENBQUMsT0FBTyxPQUFPLEtBQU0sU0FBUSxRQUFRO0lBbUJ6Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTZCO1FBQ3ZDLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxJQUFJLEVBQUUsRUFBRTtTQUNULEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLHFDQUFxQztRQUNyQyxr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