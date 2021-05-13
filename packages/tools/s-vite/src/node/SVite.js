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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SDuration from '@coffeekraken/s-duration';
import __SViteStartInterface from './start/interface/SViteStartInterface';
import __SPromise from '@coffeekraken/s-promise';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __rewritesPlugin from './plugins/rewritesPlugin';
import { createServer as __viteServer, build as __viteBuild } from 'vite';
import __path from 'path';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
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
            const config = Object.assign({ configFile: false }, __sugarConfig('vite'));
            if (!config.plugins)
                config.plugins = [];
            config.plugins.unshift(__rewritesPlugin((_a = config.rewrites) !== null && _a !== void 0 ? _a : []));
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
            var _a;
            const viteConfig = __sugarConfig('vite');
            const duration = new __SDuration();
            const config = __deepMerge(Object.assign(Object.assign({}, viteConfig), { logLevel: 'silent', build: {
                    target: 'es2015',
                    write: false,
                    rollupOptions: {
                        output: {
                            manualChunks(id) {
                                return 'index';
                            }
                        }
                    }
                } }));
            if (!config.plugins)
                config.plugins = [];
            config.plugins.unshift(__rewritesPlugin((_a = config.rewrites) !== null && _a !== void 0 ? _a : []));
            if (params.prod) {
                config.mode = 'production';
            }
            if (!params.bundle) {
                config.build.target = 'esnext';
                config.build.rollupOptions.external = [/node_modules/];
            }
            if (params.target) {
                config.build.target = params.target;
            }
            emit('log', {
                value: `<yellow>[build]</yellow> Starting build`
            });
            emit('log', {
                value: `<yellow>[build]</yellow> Target: <magenta>${config.build.target}</magenta> | Bundle: <${params.bundle ? 'green' : 'red'}>${params.bundle}</${params.bundle ? 'green' : 'red'}> | Chunks: <${params.chunks ? 'green' : 'red'}>${params.chunks}</${params.chunks ? 'green' : 'red'}>`
            });
            const build = yield __viteBuild(config);
            if (build && build.output) {
                build.output.forEach((output) => {
                    switch (output.type) {
                        case 'chunk':
                            let outPath = __path.resolve(viteConfig.build.outDir, `${output.name}.js`);
                            if (params.bundle) {
                                if (output.name === 'index') {
                                    outPath = outPath.replace(/\.js$/, '.bundle.js');
                                }
                                if (output.name === 'index') {
                                    emit('log', {
                                        value: `<green>[save]</green> Saving bundle file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>"`
                                    });
                                }
                                else {
                                    emit('log', {
                                        value: `<green>[save]</green> Saving chunk file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>"`
                                    });
                                }
                            }
                            else {
                                emit('log', {
                                    value: `<green>[save]</green> Saving file under "<cyan>${__path.relative(__packageRoot(), outPath)}</cyan>"`
                                });
                            }
                            __writeFileSync(outPath, output.code);
                            break;
                    }
                });
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLHFCQUFxQixNQUFNLHVDQUF1QyxDQUFDO0FBRTFFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFNeEQsT0FBTyxFQUFFLFlBQVksSUFBSSxZQUFZLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFleEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxLQUFNLFNBQVEsUUFBUTtJQW1CekM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE2QjtRQUN2QyxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsSUFBSSxFQUFFLEVBQUU7U0FDVCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBakNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksWUFBWTtRQUNkLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQXVCRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsS0FBSyxDQUFDLE1BQXlCO1FBQzdCLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7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