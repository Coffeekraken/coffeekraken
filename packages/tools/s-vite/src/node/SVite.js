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
            const config = __deepMerge(viteConfig, {
                logLevel: 'silent',
                build: {
                    target: 'es2015',
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
            if (!params.lib) {
                delete config.build.lib;
            }
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
                value: `<yellow>[build]</yellow> Target: <magenta>${config.build.target}</magenta> | Bundle: <${params.bundle ? 'green' : 'red'}>${params.bundle}</${params.bundle ? 'green' : 'red'}> | Chunks: <${params.chunks ? 'green' : 'red'}>${params.chunks}</${params.chunks ? 'green' : 'red'}> | Lib: <${params.lib ? 'green' : 'red'}>${params.lib}</${params.lib ? 'green' : 'red'}>`
            });
            let builds = yield __viteBuild(config);
            if (!Array.isArray(builds))
                builds = [builds];
            builds.forEach((build) => {
                if (build && build.output) {
                    build.output.forEach((output) => {
                        console.log(output);
                        switch (output.type) {
                            case 'chunk':
                                let outPath = __path.resolve(viteConfig.build.outDir, params.lib
                                    ? `index.${output.fileName.split('.').slice(1).join('.')}`
                                    : `${output.name}.js`);
                                let finalCode = output.code;
                                // // const importPaths = finalCode.match(/\s?from"([^"]*)";?/gm);
                                // const importPaths: string[] = [];
                                // const imports = __extractImports(finalCode).filter(
                                //   (importObj) => {
                                //     if (importPaths.indexOf(importObj.path) !== -1)
                                //       return false;
                                //     importPaths.push(importObj.path);
                                //     return true;
                                //   }
                                // );
                                // if (imports) {
                                //   imports.forEach((importObj) => {
                                //     const path = importObj.path
                                //       .trim()
                                //       .replace(/^from\s?"/, '')
                                //       .replace(/";?$/, '');
                                //     const splits = path.split('node_modules/');
                                //     if (splits.length >= 2) {
                                //       const potentialPath1Level = splits[1]
                                //         .split('/')
                                //         .slice(0, 1)
                                //         .join('/');
                                //       const potentialPath2Level = splits[1]
                                //         .split('/')
                                //         .slice(0, 2)
                                //         .join('/');
                                //       const potentialPathFull = splits[1];
                                //       const nodePotentialPath1Level = `${__packageRoot()}/node_modules/${potentialPath1Level}/package.json`;
                                //       const nodePotentialPath2Level = `${__packageRoot()}/node_modules/${potentialPath2Level}/package.json`;
                                //       const nodePotentialPath1LevelRoot = `${__packageRoot(
                                //         process.cwd(),
                                //         true
                                //       )}/node_modules/${potentialPath1Level}/package.json`;
                                //       const nodePotentialPath2LevelRoot = `${__packageRoot(
                                //         process.cwd(),
                                //         true
                                //       )}/node_modules/${potentialPath2Level}/package.json`;
                                //       const nodePotentialPathFull = `${__packageRoot()}/node_modules/${potentialPathFull}`;
                                //       const nodePotentialPathFullRoot = `${__packageRoot(
                                //         process.cwd(),
                                //         true
                                //       )}/node_modules/${potentialPathFull}`;
                                //       // if (
                                //       //   __fs.existsSync(nodePotentialPath2Level) ||
                                //       //   __fs.existsSync(nodePotentialPath2LevelRoot)
                                //       // ) {
                                //       //   finalCode = finalCode.replace(
                                //       //     `"${importObj.path}"`,
                                //       //     `"${potentialPath2Level}"`
                                //       //   );
                                //       // } else if (
                                //       //   __fs.existsSync(nodePotentialPath1Level) ||
                                //       //   __fs.existsSync(nodePotentialPath1LevelRoot)
                                //       // ) {
                                //       //   finalCode = finalCode.replace(
                                //       //     `"${importObj.path}"`,
                                //       //     `"${potentialPath1Level}"`
                                //       //   );
                                //       if (
                                //         __fs.existsSync(nodePotentialPathFull) ||
                                //         __fs.existsSync(nodePotentialPathFullRoot)
                                //       ) {
                                //         finalCode = finalCode.replace(
                                //           `"${importObj.path}"`,
                                //           `"${potentialPathFull}"`
                                //         );
                                //       }
                                //     }
                                //   });
                                // }
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
                                __writeFileSync(outPath, finalCode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLHFCQUFxQixNQUFNLHVDQUF1QyxDQUFDO0FBRTFFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFNeEQsT0FBTyxFQUFFLFlBQVksSUFBSSxZQUFZLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFpQnhFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBTSxTQUFRLFFBQVE7SUFtQnpDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBNkI7UUFDdkMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLElBQUksRUFBRSxFQUFFO1NBQ1QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQWpDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLFlBQVk7UUFDZCxPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUF1QkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssQ0FBQyxNQUF5QjtRQUM3QixPQUFPLElBQUksVUFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFF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