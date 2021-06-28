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

export interface ISViteSettings {}
export interface ISViteCtorSettings {
  vite: Partial<ISViteSettings>;
}

export interface ISViteStartParams {}
export interface ISViteBuildParams {
  input: string;
  prod: boolean;
  noWrite: boolean;
  watch: boolean;
  target: string;
  type: 'default' | 'lib' | 'bundle';
  chunks: boolean;
  bundle: boolean;
  lib: boolean;
}

export default class SVite extends __SClass {
  static interfaces = {
    startParams: __SViteStartInterface
  };

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
  get viteSettings(): ISViteSettings {
    return (<any>this)._settings.vite;
  }

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
  constructor(settings?: ISViteCtorSettings) {
    super(
      __deepMerge(
        {
          vite: {}
        },
        settings ?? {}
      )
    );

    // register some riotjs preprocessors
    __sRiotjsPluginPostcssPreprocessor(__SugarConfig.get('postcss.plugins'));
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
  start(params: ISViteStartParams) {
    return new __SPromise(
      async ({ resolve, reject, emit }) => {
        const config = {
          configFile: false,
          // logLevel: 'silent',
          ...__SugarConfig.get('vite')
        };

        if (!config.plugins) config.plugins = [];
        config.plugins.unshift(__rewritesPlugin(config.rewrites ?? []));
        config.plugins.unshift(__sInternalWatcherReloadVitePlugin());

        // resolve plugins paths
        config.plugins = config.plugins.map((p) => {
          if (typeof p === 'string') {
            const plug = require(p);
            return plug.default ?? plug;
          }
          return p;
        });

      
        const server = await __viteServer(config);
        const listen = await server.listen();
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
      },
      {
        metas: {
          id: this.metas.id
        }
      }
    );
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
  build(params: ISViteBuildParams) {
    const _this = this;
    return new __SPromise(
      async ({ resolve, reject, emit, pipe }) => {
        const viteConfig = __SugarConfig.get('vite');
        let duration = new __SDuration(), buildTimeout;

        const config: any = __deepMerge(viteConfig, {
          logLevel: 'silent',
          build: {
            watch: params.watch ? {} : false,
            target: params.target ?? 'modules',
            write: false,
            rollupOptions: {
              plugins: [{
                buildStart() {
                  duration = new __SDuration();
                },
                generateBundle(options, bundle) {
                  if (params.noWrite) return;
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

        console.log(params);

        // shortcuts
        if (params.bundle) params.type = 'bundle';
        if (params.lib) params.type = 'lib';

        // library mode
        if (params.type.toLowerCase() !== 'lib') {
          delete config.build.lib;
        }

        // plugins
        if (!config.plugins) config.plugins = [];
        config.plugins.unshift(__rewritesPlugin(config.rewrites ?? []));

        // resolve plugins paths
        config.plugins = config.plugins.map((p) => {
          if (typeof p === 'string') return require(p).default;
        });

        // mode (production, development)
        if (params.prod) {
          config.mode = 'production';
        }

        // target
        if (params.type.toLowerCase() === 'bundle') {
          config.build.target = params.target ?? 'es2015';
        } else if (params.type.toLowerCase() === 'lib') {
          config.build.target = params.target ?? 'esnext';
        } else if (params.type.toLowerCase() === 'module') {
          config.build.target = params.target ?? 'modules';
        }

        // external packages for library mode
        if (params.type.toLowerCase() === 'lib') {
          config.build.rollupOptions.external = [
            ...(config.build.rollupOptions.external ?? []),
            ...Object.keys(__listNodeModulesPackages({ monorepo: true }))
          ];
        }

        emit('log', {
          value: `<yellow>[build]</yellow> Starting build`
        });
        emit('log', {
          value: `<yellow>[build]</yellow> <bgBlack><white> Type </white></bgBlack><bgCyan><black> ${params.type.toLowerCase()} </black></bgCyan><bgBlack><white> Target </white></bgBlack><bgCyan><black> ${
            config.build.target
          } </black></bgCyan><bgBlack><white> Mode </white></bgBlack><bgCyan><black> ${
            params.prod ? 'production' : 'development'
          } </black></bgCyan><bgBlack><white> Chunks </white></bgBlack><${
            params.chunks ? 'bgGreen' : 'bgRed'
          }><black> ${params.chunks} </black></${
            params.chunks ? 'bgGreen' : 'bgRed'
          }>`
        });

        const outputs: any[] = [];
        if (params.type === 'lib') {
          outputs.push({
            // file: __path.resolve(
            //   viteConfig.build.outDir,
            //   `lib.es.js`
            // ),
            dir: __path.resolve(
              viteConfig.build.outDir
            ),
            format: 'es',
            ...(config.build.rollupOptions.output ?? {})
          });
          outputs.push({
            // file: __path.resolve(
            //   viteConfig.build.outDir,
            //   `lib.umd.js`
            // ),
            dir: __path.resolve(
              viteConfig.build.outDir,
            ),
            format: 'umd',
            ...(config.build.rollupOptions.output ?? {})
          });
        } else if (params.type === 'bundle') {
          outputs.push({
            file: __path.resolve(
              viteConfig.build.outDir,
              `bundle.es.js`
            ),
            format: 'es',
            ...(config.build.rollupOptions.output ?? {})
          });
          outputs.push({
            file: __path.resolve(
              viteConfig.build.outDir,
              `bundle.umd.js`
            ),
            format: 'umd',
            ...(config.build.rollupOptions.output ?? {})
          });
        } else {
          outputs.push({
            file: __path.resolve(
              viteConfig.build.outDir,
              `index.es.js`
            ),
            format: 'es',
            ...(config.build.rollupOptions.output ?? {})
          });
          outputs.push({
            file: __path.resolve(
              viteConfig.build.outDir,
              `index.umd.js`
            ),
            format: 'umd',
            ...(config.build.rollupOptions.output ?? {})
          });
        }

        config.build.rollupOptions.output = outputs;

        __viteBuild(config);

      },
      {
        metas: {
          id: this.metas.id
        }
      }
    );
  }

  _writeBundleOnDisk(options, bundle, params) {
    return new __SPromise(({resolve, reject, emit}) => {

      Object.keys(bundle).forEach((fileName) => {
        const bundleFileObj = bundle[fileName];

        let outputFileName = `index.${fileName.split('.').slice(1).join('.')}`;
        if (params.type.toLowerCase() === 'lib') {
          outputFileName = `index.lib.${fileName.split('.').slice(1).join('.')}`
        } else if (params.type.toLowerCase() === 'bundle') {
          outputFileName = `index.bundle.${fileName.split('.').slice(1).join('.')}`
        }
        const outPath = __path.resolve(
            options.dir,
            outputFileName
          );
        const finalCode = bundleFileObj.code;

        switch (bundleFileObj.type) {
          case 'chunk':
            

            __writeFileSync(outPath, finalCode);

            const file = __SFile.new(outPath);

            if (params.type.toLowerCase() === 'bundle') {
              emit('log', {
                value: `<green>[save]</green> Saving bundle file under "<cyan>${__path.relative(
                  __packageRootDir(),
                  outPath
                )}</cyan>" <yellow>${
                  file.stats.kbytes
                }</yellow><yellow>kb</yellow>`
              });
            } else if (params.type.toLowerCase() === 'lib') {
              emit('log', {
                value: `<green>[save]</green> Saving lib file under "<cyan>${__path.relative(
                  __packageRootDir(),
                  outPath
                )}</cyan>" <yellow>${
                  file.stats.kbytes
                }</yellow><yellow>kb</yellow>`
              });
            } else {
              emit('log', {
                value: `<green>[save]</green> Saving file under "<cyan>${__path.relative(
                  __packageRootDir(),
                  outPath
                )}</cyan>" <yellow>${
                  file.stats.kbytes
                }</yellow><yellow>kb</yellow>`
              });
            }

            break;
          }
        });

       resolve();
    });


  }

}
