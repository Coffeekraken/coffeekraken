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
        const _this = this;
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            const viteConfig = __SugarConfig.get('vite');
            let duration = new __SDuration(), buildTimeout;
            const config = __deepMerge(viteConfig, {
                logLevel: 'silent',
                build: {
                    watch: params.watch ? {} : false,
                    target: (_a = params.target) !== null && _a !== void 0 ? _a : 'modules',
                    write: false,
                    rollupOptions: {
                        plugins: [{
                                buildStart() {
                                    duration = new __SDuration();
                                },
                                generateBundle(options, bundle) {
                                    if (params.noWrite)
                                        return;
                                    pipe(_this._writeBundleOnDisk(options, bundle, params));
                                    clearTimeout(buildTimeout);
                                    buildTimeout = setTimeout(() => {
                                        emit('log', {
                                            value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
                                        });
                                        if (params.watch) {
                                            emit('log', {
                                                value: `<cyan>[watch]</cyan> Watching for changes...`
                                            });
                                        }
                                    }, 500);
                                }
                            }],
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
            const outputs = [];
            if (params.type === 'lib') {
                outputs.push(Object.assign({ 
                    // file: __path.resolve(
                    //   viteConfig.build.outDir,
                    //   `lib.es.js`
                    // ),
                    dir: __path.resolve(viteConfig.build.outDir), format: 'es' }, ((_g = config.build.rollupOptions.output) !== null && _g !== void 0 ? _g : {})));
                outputs.push(Object.assign({ 
                    // file: __path.resolve(
                    //   viteConfig.build.outDir,
                    //   `lib.umd.js`
                    // ),
                    dir: __path.resolve(viteConfig.build.outDir), format: 'umd' }, ((_h = config.build.rollupOptions.output) !== null && _h !== void 0 ? _h : {})));
            }
            else if (params.type === 'bundle') {
                outputs.push(Object.assign({ file: __path.resolve(viteConfig.build.outDir, `bundle.es.js`), format: 'es' }, ((_j = config.build.rollupOptions.output) !== null && _j !== void 0 ? _j : {})));
                outputs.push(Object.assign({ file: __path.resolve(viteConfig.build.outDir, `bundle.umd.js`), format: 'umd' }, ((_k = config.build.rollupOptions.output) !== null && _k !== void 0 ? _k : {})));
            }
            else {
                outputs.push(Object.assign({ file: __path.resolve(viteConfig.build.outDir, `index.es.js`), format: 'es' }, ((_l = config.build.rollupOptions.output) !== null && _l !== void 0 ? _l : {})));
                outputs.push(Object.assign({ file: __path.resolve(viteConfig.build.outDir, `index.umd.js`), format: 'umd' }, ((_m = config.build.rollupOptions.output) !== null && _m !== void 0 ? _m : {})));
            }
            config.build.rollupOptions.output = outputs;
            __viteBuild(config);
        }), {
            metas: {
                id: this.metas.id
            }
        });
    }
    _writeBundleOnDisk(options, bundle, params) {
        return new __SPromise(({ resolve, reject, emit }) => {
            Object.keys(bundle).forEach((fileName) => {
                const bundleFileObj = bundle[fileName];
                let outputFileName = `index.${fileName.split('.').slice(1).join('.')}`;
                if (params.type.toLowerCase() === 'lib') {
                    outputFileName = `index.lib.${fileName.split('.').slice(1).join('.')}`;
                }
                else if (params.type.toLowerCase() === 'bundle') {
                    outputFileName = `index.bundle.${fileName.split('.').slice(1).join('.')}`;
                }
                const outPath = __path.resolve(options.dir, outputFileName);
                const finalCode = bundleFileObj.code;
                switch (bundleFileObj.type) {
                    case 'chunk':
                        __writeFileSync(outPath, finalCode);
                        const file = __SFile.new(outPath);
                        if (params.type.toLowerCase() === 'bundle') {
                            emit('log', {
                                value: `<green>[save]</green> Saving bundle file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
                            });
                        }
                        else if (params.type.toLowerCase() === 'lib') {
                            emit('log', {
                                value: `<green>[save]</green> Saving lib file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
                            });
                        }
                        else {
                            emit('log', {
                                value: `<green>[save]</green> Saving file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
                            });
                        }
                        break;
                }
            });
            resolve();
        });
    }
}
SVite.interfaces = {
    startParams: __SViteStartInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLHlCQUF5QixNQUFNLDREQUE0RCxDQUFDO0FBQ25HLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxZQUFZLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sZ0JBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxxQkFBcUIsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxPQUFPLGtDQUFrQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZGLE9BQU8sa0NBQWtDLE1BQU0sb0RBQW9ELENBQUM7QUFvQnBHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBTSxTQUFRLFFBQVE7SUFtQnpDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBNkI7UUFDdkMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLElBQUksRUFBRSxFQUFFO1NBQ1QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYscUNBQXFDO1FBQ3JDLGtDQUFrQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFwQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxZQUFZO1FBQ2QsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBMEJEOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLENBQUMsTUFBeUI7UUFDN0IsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDbEMsTUFBTSxNQUFNLG1CQUNWLFVBQVUsRUFBRSxLQUFLLElBRWQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FDN0IsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDO1lBRTdELHdCQUF3QjtZQUN4QixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7O2dCQUN4QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDekIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixPQUFPLE1BQUEsSUFBSSxDQUFDLE9BQU8sbUNBQUksSUFBSSxDQUFDO2lCQUM3QjtnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBR0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsa0VBQWtFO2lCQUNuRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDYixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRTtvQkFDTCxrQkFBa0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxtQkFBbUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTO2lCQUNqRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDYixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUEsRUFDRDtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2FBQ2xCO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLENBQUMsTUFBeUI7UUFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN4QyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLElBQUksUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLEVBQUUsWUFBWSxDQUFDO1lBRS9DLE1BQU0sTUFBTSxHQUFRLFdBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQzFDLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSztvQkFDaEMsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksU0FBUztvQkFDbEMsS0FBSyxFQUFFLEtBQUs7b0JBQ1osYUFBYSxFQUFFO3dCQUNiLE9BQU8sRUFBRSxDQUFDO2dDQUNSLFVBQVU7b0NBQ1IsUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7Z0NBQy9CLENBQUM7Z0NBQ0QsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNO29DQUM1QixJQUFJLE1BQU0sQ0FBQyxPQUFPO3dDQUFFLE9BQU87b0NBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO29DQUN4RCxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7b0NBQzNCLFlBQVksR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO3dDQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFOzRDQUNWLEtBQUssRUFBRSxtRkFBbUYsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixXQUFXO3lDQUNySSxDQUFDLENBQUM7d0NBQ0gsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFOzRDQUNoQixJQUFJLENBQUMsS0FBSyxFQUFFO2dEQUNWLEtBQUssRUFBRSw4Q0FBOEM7NkNBQ3RELENBQUMsQ0FBQzt5Q0FDSjtvQ0FDSCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ1YsQ0FBQzs2QkFDRixDQUFDO3dCQUNGLE1BQU0sRUFBRTs0QkFDTixZQUFZLENBQUMsRUFBRTtnQ0FDYixPQUFPLE9BQU8sQ0FBQzs0QkFDakIsQ0FBQzt5QkFDRjtxQkFDRjtpQkFDRjthQUNGLENBQUMsQ0FBQztZQUVILFlBQVk7WUFDWixJQUFJLE1BQU0sQ0FBQyxNQUFNO2dCQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQzFDLElBQUksTUFBTSxDQUFDLEdBQUc7Z0JBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFFcEMsZUFBZTtZQUNmLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7Z0JBQ3ZDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDekI7WUFFRCxVQUFVO1lBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO2dCQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQUEsTUFBTSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVoRSx3QkFBd0I7WUFDeEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7b0JBQUUsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3ZELENBQUMsQ0FBQyxDQUFDO1lBRUgsaUNBQWlDO1lBQ2pDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDZixNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQzthQUM1QjtZQUVELFNBQVM7WUFDVCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO2dCQUMxQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLFFBQVEsQ0FBQzthQUNqRDtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUM5QyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLFFBQVEsQ0FBQzthQUNqRDtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO2dCQUNqRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLFNBQVMsQ0FBQzthQUNsRDtZQUVELHFDQUFxQztZQUNyQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUc7b0JBQ3BDLEdBQUcsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDO29CQUM5QyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDOUQsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUseUNBQXlDO2FBQ2pELENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLG9GQUFvRixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSwrRUFDbEgsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUNmLDZFQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsYUFDL0IsZ0VBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUM5QixZQUFZLE1BQU0sQ0FBQyxNQUFNLGNBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FDOUIsR0FBRzthQUNKLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztZQUMxQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUN6QixPQUFPLENBQUMsSUFBSTtvQkFDVix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtvQkFDN0IsZ0JBQWdCO29CQUNoQixLQUFLO29CQUNMLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUNqQixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDeEIsRUFDRCxNQUFNLEVBQUUsSUFBSSxJQUNULENBQUMsTUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxFQUM1QyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxJQUFJO29CQUNWLHdCQUF3QjtvQkFDeEIsNkJBQTZCO29CQUM3QixpQkFBaUI7b0JBQ2pCLEtBQUs7b0JBQ0wsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUN4QixFQUNELE1BQU0sRUFBRSxLQUFLLElBQ1YsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDLEVBQzVDLENBQUM7YUFDSjtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNuQyxPQUFPLENBQUMsSUFBSSxpQkFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDbEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3ZCLGNBQWMsQ0FDZixFQUNELE1BQU0sRUFBRSxJQUFJLElBQ1QsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDLEVBQzVDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLElBQUksaUJBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ2xCLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUN2QixlQUFlLENBQ2hCLEVBQ0QsTUFBTSxFQUFFLEtBQUssSUFDVixDQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUMsRUFDNUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLGlCQUNWLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUNsQixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDdkIsYUFBYSxDQUNkLEVBQ0QsTUFBTSxFQUFFLElBQUksSUFDVCxDQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUMsRUFDNUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsSUFBSSxpQkFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDbEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3ZCLGNBQWMsQ0FDZixFQUNELE1BQU0sRUFBRSxLQUFLLElBQ1YsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDLEVBQzVDLENBQUM7YUFDSjtZQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFFNUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRCLENBQUMsQ0FBQSxFQUNEO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7YUFDbEI7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQ3hDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRTtZQUVoRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN2QyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXZDLElBQUksY0FBYyxHQUFHLFNBQVMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3ZDLGNBQWMsR0FBRyxhQUFhLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFBO2lCQUN2RTtxQkFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUNqRCxjQUFjLEdBQUcsZ0JBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFBO2lCQUMxRTtnQkFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUMxQixPQUFPLENBQUMsR0FBRyxFQUNYLGNBQWMsQ0FDZixDQUFDO2dCQUNKLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7Z0JBRXJDLFFBQVEsYUFBYSxDQUFDLElBQUksRUFBRTtvQkFDMUIsS0FBSyxPQUFPO3dCQUdWLGVBQWUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBRXBDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBRWxDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQUU7NEJBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0NBQ1YsS0FBSyxFQUFFLHlEQUF5RCxNQUFNLENBQUMsUUFBUSxDQUM3RSxhQUFhLEVBQUUsRUFDZixPQUFPLENBQ1Isb0JBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUNiLDhCQUE4Qjs2QkFDL0IsQ0FBQyxDQUFDO3lCQUNKOzZCQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7NEJBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0NBQ1YsS0FBSyxFQUFFLHNEQUFzRCxNQUFNLENBQUMsUUFBUSxDQUMxRSxhQUFhLEVBQUUsRUFDZixPQUFPLENBQ1Isb0JBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUNiLDhCQUE4Qjs2QkFDL0IsQ0FBQyxDQUFDO3lCQUNKOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0NBQ1YsS0FBSyxFQUFFLGtEQUFrRCxNQUFNLENBQUMsUUFBUSxDQUN0RSxhQUFhLEVBQUUsRUFDZixPQUFPLENBQ1Isb0JBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUNiLDhCQUE4Qjs2QkFDL0IsQ0FBQyxDQUFDO3lCQUNKO3dCQUVELE1BQU07aUJBQ1A7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVKLE9BQU8sRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7SUFHTCxDQUFDOztBQXRWTSxnQkFBVSxHQUFHO0lBQ2xCLFdBQVcsRUFBRSxxQkFBcUI7Q0FDbkMsQ0FBQyJ9