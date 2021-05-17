import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SPromise from '@coffeekraken/s-promise';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __listNodeModulesPackages from '@coffeekraken/sugar/node/npm/utils/listNodeModulesPackages';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import __rewritesPlugin from './plugins/rewritesPlugin';
import __SViteStartInterface from './start/interface/SViteStartInterface';
import __SFile from '@coffeekraken/s-file';

import __sRiotjsPluginPostcssPreprocessor from '@coffeekraken/s-riotjs-plugin-postcss-preprocessor';

export interface ISViteSettings {}
export interface ISViteCtorSettings {
  vite: Partial<ISViteSettings>;
}

export interface ISViteStartParams {}
export interface ISViteBuildParams {
  prod: boolean;
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
    __sRiotjsPluginPostcssPreprocessor(__sugarConfig('postcss.plugins'));
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
          ...__sugarConfig('vite')
        };

        if (!config.plugins) config.plugins = [];
        config.plugins.unshift(__rewritesPlugin(config.rewrites ?? []));

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
    return new __SPromise(
      async ({ resolve, reject, emit }) => {
        const viteConfig = __sugarConfig('vite');
        const duration = new __SDuration();
        const config: any = __deepMerge(viteConfig, {
          logLevel: 'silent',
          build: {
            target: params.target ?? 'modules',
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

        let builds: any = await __viteBuild(config);

        if (!Array.isArray(builds)) builds = [builds];

        builds.forEach((build) => {
          if (build && build.output) {
            build.output.forEach((output) => {
              switch (output.type) {
                case 'chunk':
                  let outPath = __path.resolve(
                    viteConfig.build.outDir,
                    params.lib
                      ? `index.${output.fileName.split('.').slice(1).join('.')}`
                      : `${output.name}.js`
                  );

                  let finalCode = output.code;

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
                        value: `<green>[save]</green> Saving bundle file under "<cyan>${__path.relative(
                          __packageRoot(),
                          outPath
                        )}</cyan>" <yellow>${
                          file.stats.kbytes
                        }</yellow><yellow>kb</yellow>`
                      });
                    } else {
                      emit('log', {
                        value: `<green>[save]</green> Saving chunk file under "<cyan>${__path.relative(
                          __packageRoot(),
                          outPath
                        )}</cyan>" <yellow>${
                          file.stats.kbytes
                        }</yellow><yellow>kb</yellow>`
                      });
                    }
                  } else {
                    emit('log', {
                      value: `<green>[save]</green> Saving file under "<cyan>${__path.relative(
                        __packageRoot(),
                        outPath
                      )}</cyan>" <yellow>${
                        file.stats.kbytes
                      }</yellow><yellow>kb</yellow>`
                    });
                  }

                  break;
              }
            });
          }
        });

        emit('log', {
          value: `<green>[success]</green> Build complete <green>successfully</green> in <yellow>${
            duration.end().formatedDuration
          }</yellow>`
        });
      },
      {
        metas: {
          id: this.metas.id
        }
      }
    );
  }
}
