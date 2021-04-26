import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SDuration from '@coffeekraken/s-duration';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __postCss from 'postcss';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SCompiler, { ISCompiler } from '@coffeekraken/s-compiler';
import __cleanCss from 'clean-css';

import __path from 'path';
import __fs from 'fs';
import __wait from '@coffeekraken/sugar/shared/time/wait';

import __SPostcssCompilerInterface from './interface/SPostcssCompilerInterface';

export interface ISPostcssCompilerParams {
  input: string | string[];
  outDir: string;
  inDir: string;
  rootDir: string;
  bundle: boolean;
  bundleSuffix: string;
  map: boolean;
  prod: boolean;
  minify: boolean;
  beautify: boolean;
  optimize: boolean;
  banner: string;
  save: boolean;
  watch: boolean;
  postcss: any;
}

export interface ISPostcssCompilerCtorSettings {
  postcssCompiler?: Partial<ISPostcssCompilerSettings>;
}
export interface ISPostcssCompilerSettings {}

export interface ISPostcssCompilerCtor {
  new (
    initialParams: any,
    settings?: ISPostcssCompilerCtorSettings
  ): ISPostcssCompiler;
}

export type ISPostcssCompiler = ISCompiler;

/**
 * @name                SPostcssCompiler
 * @namespace           s-postcss-compiler
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * Compiler that allows you to compile css using postcss
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param           {Partial<ISPostcssCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISPostcssCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SPostcssCompiler from '@coffeekraken/s-postcss-compiler';
 * const compiler = new SPostcssCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.css');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SPostcssCompiler extends __SCompiler implements ISCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SPostcssCompilerInterface
    }
  };

  /**
   * @name          postcssCompilerSettings
   * @type          ISPostcssCompilerSettings
   * @get
   *
   * Access the js compiler settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get postcssCompilerSettings(): ISPostcssCompilerSettings {
    return (<any>this)._settings.postcssCompiler;
  }

  /**
   * @name            constructor
   * @type             Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    initialParams?: Partial<ISPostcssCompilerParams>,
    settings?: ISPostcssCompilerCtorSettings
  ) {
    super(
      initialParams ?? {},
      __deepMerge(
        {
          postcssCompiler: {}
        },
        settings || {}
      )
    );
  }

  /**
   * @name              _compile
   * @type              Function
   * @async
   *
   * This method is the main one that allows you to actually compile the
   * code you pass either inline, either a file path.
   *
   * @param         {ISPostcssCompilerParams}            params          The params to use for this compilation process
   * @param         {Partial<ISPostcssCompilerSettings>}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _compile(
    params: ISPostcssCompilerParams,
    settings: Partial<ISPostcssCompilerSettings> = {}
  ) {
    return new __SPromise(
      async ({ resolve, reject, pipe, emit, on }) => {
        const set = __deepMerge(this.postcssCompilerSettings, {}, settings);

        const cssCompileConfig = __sugarConfig('css.compile');

        const input = Array.isArray(params.input)
          ? params.input
          : [params.input];

        emit('log', {
          value: 'Starting <yellow>CSS</yellow> file(s) compilation...'
        });

        // prod
        if (params.prod) {
          params.minify = true;
          params.beautify = false;
          params.optimize = true;
        }

        const pool = __fsPool(input, {
          watch: params.watch
        });
        on('finally', () => {
          pool.cancel();
        });

        const postCssPlugins: any[] = [];
        if (cssCompileConfig.plugins) {
          Object.keys(cssCompileConfig.plugins).forEach((pluginName) => {
            if (pluginName === 'cssnano' && !params.minify) return;
            if (pluginName === 'postcssImport' && !params.bundle) return;
            const pluginObj = cssCompileConfig.plugins[pluginName];
            let required = require(pluginObj.import); // eslint-disable-line
            required = required.default ?? required;

            postCssPlugins.push(
              required(
                {
                  ...pluginObj.settings
                } ?? {}
              )
            );
          });
        }

        pool.on(params.watch ? 'update' : 'files', async (files) => {
          const duration = new __SDuration();

          files = Array.isArray(files) ? files : [files];

          files.forEach(async (file, i) => {
            const fileDuration = new __SDuration();

            let res = await __postCss([
              require('@coffeekraken/s-postcss-sugar-plugin').default
            ]).process(file.content, {
              from: file.path
            });

            // console.log(
            //   res.css
            //     .split('\n')
            //     .map((l, i) => {
            //       return `${i} ${l}`;
            //     })
            //     .join('\n')
            // );

            res = await __postCss(postCssPlugins).process(res.css, {
              from: file.path
            });

            const outPath = __path.resolve(
              params.outDir,
              __path.relative(params.inDir, file.path)
            );

            const fileEnd = fileDuration.end();
            emit('log', {
              value: `<green>[success]</green> File "<cyan>${file.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${fileEnd.formatedDuration}</yellow>`
            });

            if (params.beautify && res.css) {
              res.css = new __cleanCss({
                format: 'beautify',
                level: 0
              }).minify(res.css).styles;
            }
            if (params.optimize && res.css) {
              res.css = new __cleanCss({
                level: 2
              }).minify(res.css).styles;
            }

            if (params.save && res.css) {
              __fs.writeFileSync(outPath, res.css);
              emit('log', {
                type: 'file',
                action: 'save',
                file: file.toObject(),
                to: __path.relative(params.rootDir, outPath)
              });
            }

            if (i >= files.length - 1) {
              const end = duration.end();
              if (params.watch) {
                emit('log', {
                  value: `<blue>[watch]</blue> Watching for changes...`
                });
              } else {
                emit('log', {
                  value: `<green>[success]</green> Compilation finished <green>successfully</green> in <yellow>${end.formatedDuration}</yellow>`
                });
              }
            }
          });
        });

        if (params.watch) {
          emit('log', {
            value: `<blue>[watch]</blue> Watching for changes...`
          });
        }
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }
}

export default SPostcssCompiler;
