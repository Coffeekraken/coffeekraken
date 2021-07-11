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
import { uglify as __uglifyPlugin } from "rollup-plugin-uglify";
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import __sInternalWatcherReloadVitePlugin from './plugins/internalWatcherReloadPlugin';
import __rewritesPlugin from './plugins/rewritesPlugin';
import __SViteStartInterface from './start/interface/SViteStartInterface';


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
  format: ('es' | 'umd' | 'cjs' | 'iife')[];
  type: ('module' | 'modules' | 'lib' | 'bundle')[];
  chunks: boolean;
  bundle: boolean;
  lib: boolean;
  minify: boolean;
  analyze: boolean;
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
        const plugins: any[] = [];
        for (let i=0; i<config.plugins.length; i++) {
          const p = config.plugins[i];
          if (typeof p === 'string') {
            const { default: plug } = await import(p);
            plugins.push(plug.default ?? plug);
          } else {
            plugins.push(p);
          }
        }
        config.plugins = plugins;
      
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
      async ({ resolve, reject, emit, pipe }) => {
        const viteConfig = __SugarConfig.get('vite');
        const duration = new __SDuration();

        // object to store results of each "type"
        const results = {};

        for (let i = 0; i<params.type.length; i++) {
          const buildType = params.type[i];

          const config: any = __deepMerge(viteConfig, {
            logLevel: 'silent',
            build: {
              watch: params.watch ? {} : false,
              target: params.target ?? 'modules',
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
                  summaryOnly: true
                }));
          }

          // plugins
          if (!config.plugins) config.plugins = [];
          config.plugins.unshift(__rewritesPlugin(config.rewrites ?? []));

          // resolve plugins paths
          const plugins: any[] = [];
          for (let i=0; i<config.plugins.length; i++) {
            const p = config.plugins[i];
            if (typeof p === 'string') {
              const { default: plug } = await import(p);
              plugins.push(plug.default ?? plug);
            } else {
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
            config.build.target = params.target ?? 'es2015';
          } else if (buildType.toLowerCase() === 'lib') {
            config.build.target = params.target ?? 'esnext';
          } else if (buildType.toLowerCase() === 'module') {
            config.build.target = params.target ?? 'modules';
          }

          // external packages for library mode
          if (buildType.toLowerCase() === 'lib') {
            config.build.rollupOptions.external = [
              ...(config.build.rollupOptions.external ?? []),
              ...Object.keys(__listNodeModulesPackages({ monorepo: true }))
            ];
          }

          // automatic formats
          let finalFormats = params.format;
          if (!params.format.length) {
            switch(buildType) {
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
          const outputs: any[] = [];
          let outputsFilenames: string[] = [];
          finalFormats.forEach(format => {
            outputs.push(__deepMerge({
              dir: __path.resolve(
                viteConfig.build.outDir
              ),
              format,
              ...(config.build.rollupOptions.output ?? {})
            }));
            outputsFilenames.push(`${buildType === 'bundle' ? 'index' : buildType}.${format}.js`);
          });

          // prod filename
          if (params.prod) {
            outputsFilenames = outputsFilenames.map(filename => {
              return filename.replace(/\.js$/, '.prod.js');
            });
          }

          emit('log', {
            value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`
          });
          emit('log', {
            value: `<yellow>○</yellow> Environment : ${params.prod ? '<green>production</green>' : '<yellow>development</yellow>'}`
          });
          outputsFilenames.forEach(filename => {
            emit('log', {
              value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), `${__path.resolve(
                viteConfig.build.outDir
              )}/${filename}`)}</cyan>`
            });
          });
          emit('log', {
            value: `<yellow>○</yellow> Type        : ${buildType.toLowerCase()}`
          });
          emit('log', {
            value: `<yellow>○</yellow> Target      : ${config.build.target}`
          });
          emit('log', {
            value: `<yellow>○</yellow> Format(s)   : ${finalFormats.join(',')}`
          });

          // set the outputs
          config.build.rollupOptions.output = outputs;

          // process to bundle
          const res = await __viteBuild(config);

          // stacking res inside the results object
          results[buildType] = res;

          // handle generated bundles
          if (!params.noWrite) {
            // @ts-ignore
            res.forEach((bundleObj, i) => {
              const output = bundleObj.output[0];

              const baseOutputConfig = outputs[i],
                    baseOutputFilenames = outputsFilenames[i];

              __writeFileSync(`${baseOutputConfig.dir}/${baseOutputFilenames}`, output.code);

              const file = new __SFile(`${baseOutputConfig.dir}/${baseOutputFilenames}`);

              emit('log', {
                value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
              });

            });
          }

        }

        emit('log', {
          value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
        });
        if (params.watch) {
          emit('log', {
            value: `<cyan>[watch]</cyan> Watching for changes...`
          });
        }

        resolve(results);

      },
      {
        metas: {
          id: this.metas.id
        }
      }
    );
  }
}
