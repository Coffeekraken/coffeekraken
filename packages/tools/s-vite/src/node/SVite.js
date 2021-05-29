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
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import __rewritesPlugin from './plugins/rewritesPlugin';
import __SViteStartInterface from './start/interface/SViteStartInterface';
import __SFile from '@coffeekraken/s-file';
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const viteConfig = __SugarConfig.get('vite');
            const duration = new __SDuration();
            const config = __deepMerge(viteConfig, {
                logLevel: 'silent',
                build: {
                    target: (_a = params.target) !== null && _a !== void 0 ? _a : 'modules',
                    write: false,
                    rollupOptions: {
                        output: {
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
            // library mode
            if (params.type.toLowerCase() !== 'lib') {
                delete config.build.lib;
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
                value: `<yellow>[build]</yellow> <bgBlack><white> Type </white></bgBlack><bgCyan><black> ${params.type.toLowerCase()} </black></bgCyan><bgBlack><white> Target </white></bgBlack><bgCyan><black> ${config.build.target} </black></bgCyan><bgBlack><white> Mode </white></bgBlack><bgCyan><black> ${params.prod ? 'production' : 'development'} </black></bgCyan><bgBlack><white> Chunks </white></bgBlack><${params.chunks ? 'bgGreen' : 'bgRed'}><black> ${params.chunks} </black></${params.chunks ? 'bgGreen' : 'bgRed'}>`
            });
            let builds = yield __viteBuild(config);
            if (!Array.isArray(builds))
                builds = [builds];
            builds.forEach((build) => {
                if (build && build.output) {
                    build.output.forEach((output) => {
                        switch (output.type) {
                            case 'chunk':
                                let outPath = __path.resolve(viteConfig.build.outDir, params.lib
                                    ? `index.${output.fileName.split('.').slice(1).join('.')}`
                                    : `${output.name}.js`);
                                const finalCode = output.code;
                                if (params.bundle) {
                                    if (output.name === 'index') {
                                        outPath = outPath.replace(/\.js$/, '.bundle.js');
                                    }
                                }
                                __writeFileSync(outPath, finalCode);
                                const file = __SFile.new(outPath);
                                if (params.bundle) {
                                    if (output.name === 'index') {
                                        emit('log', {
                                            value: `<green>[save]</green> Saving bundle file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
                                        });
                                    }
                                    else {
                                        emit('log', {
                                            value: `<green>[save]</green> Saving chunk file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
                                        });
                                    }
                                }
                                else {
                                    emit('log', {
                                        value: `<green>[save]</green> Saving file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
                                    });
                                }
                                break;
                        }
                    });
                }
            });
            emit('log', {
                value: `<green>[success]</green> Build complete <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLHlCQUF5QixNQUFNLDREQUE0RCxDQUFDO0FBQ25HLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxZQUFZLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sZ0JBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxxQkFBcUIsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxPQUFPLGtDQUFrQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZGLE9BQU8sa0NBQWtDLE1BQU0sb0RBQW9ELENBQUM7QUFpQnBHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBTSxTQUFRLFFBQVE7SUFtQnpDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBNkI7UUFDdkMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLElBQUksRUFBRSxFQUFFO1NBQ1QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYscUNBQXFDO1FBQ3JDLGtDQUFrQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lB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