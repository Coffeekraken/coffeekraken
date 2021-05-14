import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SDuration from '@coffeekraken/s-duration';
import __SViteStartInterface from './start/interface/SViteStartInterface';
import __SViteBuildInterface from './build/interface/SViteBuildInterface';
import __SPromise from '@coffeekraken/s-promise';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __rewritesPlugin from './plugins/rewritesPlugin';
import __SProcess, {
  SProcessManager as __SProcessManager,
  ISProcessSettings,
  ISProcessManagerProcessSettings
} from '@coffeekraken/s-process';
import { createServer as __viteServer, build as __viteBuild } from 'vite';
import __path from 'path';
import __fs from 'fs';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __extractImports from '@coffeekraken/sugar/node/module/extractImport';

export interface ISViteSettings {}
export interface ISViteCtorSettings {
  vite: Partial<ISViteSettings>;
}

export interface ISViteStartParams {}
export interface ISViteBuildParams {
  bundle: boolean;
  prod: boolean;
  target: string;
  lib: boolean;
  chunks: boolean;
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

        if (!config.plugins) config.plugins = [];
        config.plugins.unshift(__rewritesPlugin(config.rewrites ?? []));

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
          value: `<yellow>[build]</yellow> Target: <magenta>${
            config.build.target
          }</magenta> | Bundle: <${params.bundle ? 'green' : 'red'}>${
            params.bundle
          }</${params.bundle ? 'green' : 'red'}> | Chunks: <${
            params.chunks ? 'green' : 'red'
          }>${params.chunks}</${params.chunks ? 'green' : 'red'}> | Lib: <${
            params.lib ? 'green' : 'red'
          }>${params.lib}</${params.lib ? 'green' : 'red'}>`
        });

        let builds: any = await __viteBuild(config);

        if (!Array.isArray(builds)) builds = [builds];

        builds.forEach((build) => {
          if (build && build.output) {
            build.output.forEach((output) => {
              console.log(output);

              switch (output.type) {
                case 'chunk':
                  let outPath = __path.resolve(
                    viteConfig.build.outDir,
                    params.lib
                      ? `index.${output.fileName.split('.').slice(1).join('.')}`
                      : `${output.name}.js`
                  );

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
                        value: `<green>[save]</green> Saving bundle file under "<cyan>${__path.relative(
                          __packageRoot(),
                          outPath
                        )}</cyan>"`
                      });
                    } else {
                      emit('log', {
                        value: `<green>[save]</green> Saving chunk file under "<cyan>${__path.relative(
                          __packageRoot(),
                          outPath
                        )}</cyan>"`
                      });
                    }
                  } else {
                    emit('log', {
                      value: `<green>[save]</green> Saving file under "<cyan>${__path.relative(
                        __packageRoot(),
                        outPath
                      )}</cyan>"`
                    });
                  }

                  __writeFileSync(outPath, finalCode);

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
