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
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
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
                                value: `<green>[save]</green> Saving bundle file under "<cyan>${__path.relative(__packageRootDir(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
                            });
                        }
                        else if (params.type.toLowerCase() === 'lib') {
                            emit('log', {
                                value: `<green>[save]</green> Saving lib file under "<cyan>${__path.relative(__packageRootDir(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
                            });
                        }
                        else {
                            emit('log', {
                                value: `<green>[save]</green> Saving file under "<cyan>${__path.relative(__packageRootDir(), outPath)}</cyan>" <yellow>${file.stats.kbytes}</yellow><yellow>kb</yellow>`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLHlCQUF5QixNQUFNLDREQUE0RCxDQUFDO0FBQ25HLE9BQU8sZ0JBQWdCLE1BQU0sOENBQThDLENBQUM7QUFDNUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxLQUFLLElBQUksV0FBVyxFQUFFLFlBQVksSUFBSSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxnQkFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLHFCQUFxQixNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE9BQU8sa0NBQWtDLE1BQU0sdUNBQXVDLENBQUM7QUFDdkYsT0FBTyxrQ0FBa0MsTUFBTSxvREFBb0QsQ0FBQztBQW9CcEcsTUFBTSxDQUFDLE9BQU8sT0FBTyxLQUFNLFNBQVEsUUFBUTtJQW1CekM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE2QjtRQUN2QyxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsSUFBSSxFQUFFLEVBQUU7U0FDVCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFFRixxQ0FBcUM7UUFDckMsa0NBQWtDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7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